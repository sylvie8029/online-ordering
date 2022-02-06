import { IResolvers } from "apollo-server-express";
import { Database, User } from "../../../lib/types";
import { UserArgs, UserListingsArgs, UserListingsData, UserOrderingsArgs, UserOrderingsData } from "./types";
import { Request } from "express";
import { authorize } from "../../../lib/utils";
export const userResolvers: IResolvers = {
  Query: {
    user: async (_root: undefined, { id }: UserArgs, { db, req }: { db: Database; req: Request }): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("User cannot be found");
        }

        const register = await authorize(db, req);
        if (register && register._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`Failed to Query User:${error}`);
      }
    },
  },
  User: {
    id: (user: User): string => {
      return user._id;
    },
    hasWallet: (user: User): boolean => {
      return Boolean(user.walletId);
    },

    orderings: async (user: User, { limit, page }: UserOrderingsArgs, { db }: { db: Database }): Promise<UserOrderingsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }

        const data: UserOrderingsData = {
          total: 0,
          result: [],
        };
        let cursor = await db.orderings.find({
          _id: { $in: user.orderings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        //page=1,limit=10,cursor starts at 0
        //page=2,limit=10,cursor starts at 10
        //......
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();
        return data;
      } catch (error) {
        throw new Error(`Failed to query user orderings:${error}`);
      }
    },
    listings: async (user: User, { limit, page }: UserListingsArgs, { db }: { db: Database }): Promise<UserListingsData | null> => {
      try {
        const data: UserListingsData = {
          total: 0,
          result: [],
        };
        let cursor = await db.listings.find({
          _id: { $in: user.listings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        //page=1,limit=10,cursor starts at 0
        //page=2,limit=10,cursor starts at 10
        //......
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();
        return data;
      } catch (error) {
        throw new Error(`Failed to query user listings:${error}`);
      }
    },
  },
};
