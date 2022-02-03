import { Google } from "./../../../lib/api/Google";
import { Database, Register, User } from "./../../../lib/types";
import { IResolvers } from "apollo-server-express";
import { LogInArgs } from "./types";
import crypto from "crypto";

const logInViaGoogle = async (code: string, token: string, db: Database): Promise<User | null> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error("Google login error");
  }
  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList = user.emailAddresses && user.emailAddresses.length ? user.emailAddresses : null;

  const userName = userNamesList ? userNamesList[0].displayName : null;
  const userId = userNamesList && userNamesList[0].metadata && userNamesList[0].metadata.source ? userNamesList[0].metadata.source.id : null;
  const userAvatar = userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;
  const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;
  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnDocument: "after" }
  );
  let register = updateRes.value;
  // console.log(`register:`, register);

  // return register as User;

  // if (!register) {
  //   try {
  //     const newUser = {
  //       _id: userId,
  //       token,
  //       name: userName,
  //       avatar: userAvatar,
  //       contact: userEmail,
  //       orderings: [],
  //       listings: [],
  //     };
  //     await db.users.insertOne(newUser);

  //     register = newUser;
  //   } catch (error) {
  //     throw new Error(`fail to inser one ${error}`);
  //   }
  // }

  if (!register) {
    const insertRes = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      orderings: [],
      listings: [],
    });
    register = await db.users.findOne({ _id: insertRes.insertedId });
  }

  return register;
};

export const registerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`fail to query Google Auth Url:${error}`);
      }
    },
  },
  Mutation: {
    logIn: async (_root: undefined, { input }: LogInArgs, db: Database): Promise<Register> => {
      // return "Mutation.logIn";
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");
        const register: User | null = code ? await logInViaGoogle(code, token, db) : null;

        if (!register) {
          return { didRequest: true };
        }
        return {
          _id: register._id,
          token: register.token,
          avatar: register.avatar,
          walletId: register.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`fail to log in: ${error}`);
      }
    },
    logOut: (): Register => {
      try {
        return { didRequest: true };
      } catch (error) {
        throw new Error(`Fail to log out: ${error}`);
      }
    },
  },
  Register: {
    id: (register: Register): string | undefined => {
      return register._id;
    },
    hasWallet: (register: Register): boolean | undefined => {
      return register.walletId ? true : undefined;
    },
  },
};
