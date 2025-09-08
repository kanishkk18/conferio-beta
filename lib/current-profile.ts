import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { prisma } from "utils/db";

export const currentProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  const profile = await prisma.profile.findUnique({
    where: { id: session.user.id }
  });

  return profile;
};
