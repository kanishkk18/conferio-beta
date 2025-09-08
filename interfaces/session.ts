import { Session as NextAuthSession } from "next-auth";
import { Role as PrismaRole } from "@prisma/client"; // ✅ Prisma enum import

export default interface Session extends NextAuthSession {
  user: User;
  expires: string;
}

interface User {
  id: string;
  roles: { teamId: string; role: PrismaRole }[]; // ✅ Use exact enum type
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
