import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export const initialProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user.id) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  });

  if (user) return user;

  // user should already exist from auth, but if not, redirect to sign-in
  redirect("/auth/login");
};
