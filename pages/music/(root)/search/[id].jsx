// import Search from "../search/_components/Search";

// export const generateMetadata = ({ params }) => {
//     return {
//         title: `Search Results - ${decodeURI(params.id).toLocaleUpperCase()}`,
//         description: `Viewing search results for ${decodeURI(params.id)}`,
//     };
// };
// export default function Page({ params }) {
//     return(
//         <Search params={params}/>
//     )
// }

import { useRouter } from "next/router";
import Head from "next/head";
import Search from "./_components/Search";

export default function SearchPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <div>Loading...</div>;

  const decodedId = decodeURI(id).toLocaleUpperCase();

  return (
    <>
      <Head>
        <title>Search Results - {decodedId}</title>
        <meta name="description" content={`Viewing search results for ${decodedId}`} />
      </Head>
      <Search params={{ id }} />
    </>
  );
}
