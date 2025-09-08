import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Album from "../album/_components/Album"; // adjust path if needed
import { getAlbumById } from "../../../../lib/fetch";

export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;

  const [albumData, setAlbumData] = useState(null);

  useEffect(() => {
    if (id) {
      getAlbumById(id).then(async (res) => {
        const data = await res.json();
        setAlbumData(data);
      });
    }
  }, [id]);

  if (!id || !albumData) return <div>Loading...</div>;

  return (
    <main>
      <Album id={id} data={albumData.data} />
    </main>
  );
}
