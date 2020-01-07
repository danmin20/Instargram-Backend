import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { usernam, firstNam, lastNam, bio } = args;
        const {user}=request;
        return prisma.
    }
  }
};
