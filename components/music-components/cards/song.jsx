"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useContext } from "react";
import { MusicContext } from "../../../hooks/use-context";
import { Play } from "lucide-react";
import { Button } from "../ui/button";

export default function SongCard({ title, image, artist, id, desc }) {
    const ids = useContext(MusicContext);
    const setLastPlayed = () => {
        localStorage.clear();
        localStorage.setItem("last-played", id);
    };
    return (
        <div className="h-fit w-[200px] rounded-3xl  p-3 relative overflow-hidden group bg-gradient-to-br from-[#090979] to-[#020024]">
            <div className="overflow-hidden rounded-2xl">
                {image ? (
                    <div className="relative" onClick={() => { ids.setMusic(id); setLastPlayed(); }}>
                        <img src={image} alt={title} className="w-full aspect-square object-cover rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300" />
                       </div>
                ) : (
                    <Skeleton className="w-full h-[182px]" />
                )}
            </div>
            <div className="cursor-pointer">
                {title ? (
                    <div onClick={() => { ids.setMusic(id); setLastPlayed(); }} className=" flex items-center justify-between">
                        <h1 className="font-medium text-white truncate">{title.slice(0, 20)}{title.length > 20 && '...'}</h1>
                    </div>
                ) : (
                    <Skeleton className="w-[70%] h-4 mt-2" />
                )}
                {desc && (
                    <p className="text-xs text-muted-foreground">{desc.slice(0, 30)}</p>
                )}
                {artist ? (
                    <p className="text-sm text-gray-300 truncate pt-1">{artist.slice(0, 20)}{artist.length > 20 && '...'}</p>
                ) : (
                    <Skeleton className="w-10 h-2 mt-2" />
                )}
            </div>
            <Button size="icon" className="absolute right-3 bottom-3 text-white rounded-full bg-white/20 hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="h-4 w-4" />
                  </Button>
        </div>
    )
}
