/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

import { Google } from "./../../../lib/api/Google";
import { Database, Register, User } from "./../../../lib/types";
import { IResolvers } from "apollo-server-express";
import { LogInArgs } from "./types";
import crypto from "crypto";
import { Response, Request } from "express";
import { NullValueNode } from "graphql";

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
};

const logInViaGoogle = async (code: string, token: string, db: Database, res: Response): Promise<User | null> => {
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

  res.cookie("register", userId, { ...cookieOptions, maxAge: 365 * 24 * 60 * 60 * 1000 });

  return register;
};

const logInViaCookie = async (token: string, db: Database, req: Request, res: Response): Promise<User | null> => {
  const updateRes = await db.users.findOneAndUpdate({ _id: req.signedCookies.register }, { $set: { token } }, { returnDocument: "after" });

  const register = updateRes.value;

  if (!register) {
    res.clearCookie("register", cookieOptions);
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
    logIn: async (_root: undefined, { input }: LogInArgs, { db, req, res }: { db: Database; req: Request; res: Response }): Promise<Register> => {
      // return "Mutation.logIn";
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString("hex");
        const register: User | null = code ? await logInViaGoogle(code, token, db, res) : await logInViaCookie(token, db, req, res);

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
    logOut: (_root: undefined, _args: null, { res }: { res: Response }): Register => {
      try {
        res.clearCookie("register", cookieOptions);
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
