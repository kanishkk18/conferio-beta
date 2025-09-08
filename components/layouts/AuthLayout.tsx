import app from '@/lib/app';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading?: string;
  description?: string;
}

export default function AuthLayout({
  children,
  heading,
  description,
}: AuthLayoutProps) {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
       
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
      </div>
    </>
  );
}
