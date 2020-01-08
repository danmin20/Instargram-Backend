import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const comment = await prisma.$exists.comment({ id });
      if (comment) {
        return prisma.deleteComment({ id });
      } else {
        throw Error("You can't delete");
      }
    }
  }
};
