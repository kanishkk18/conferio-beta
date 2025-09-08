import { Teams } from '@/components/team';
import Mainsidebar from '@/components/ui/mainSideBar';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types/next';

const AllTeams: NextPageWithLayout = () => {
  return (
    <div className="flex h-full w-full">
      <Mainsidebar />
      <div className=" w-full p-6">
      <Teams />
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

export default AllTeams;
