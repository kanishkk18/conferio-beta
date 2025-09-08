"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pause, Play, Repeat, Repeat1, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getSongsById } from "@/lib/fetch";
import Link from "next/link";
import { MusicContext } from "../../../hooks/use-context";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {  Heart, SkipBack, SkipForward, Shuffle, Volume2 } from "lucide-react"

export default function Player() {
    const [data, setData] = useState([]);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioURL, setAudioURL] = useState("");
    const [isLooping, setIsLooping] = useState(false);
    const values = useContext(MusicContext);

    const getSong = async () => {
        const get = await getSongsById(values.music);
        const data = await get.json();
        setData(data.data[0]);
        if (data?.data[0]?.downloadUrl[2]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[2]?.url);
        } else if (data?.data[0]?.downloadUrl[1]?.url) {
            setAudioURL(data?.data[0]?.downloadUrl[1]?.url);
        } else {
            setAudioURL(data?.data[0]?.downloadUrl[0]?.url);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const togglePlayPause = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const handleSeek = (e) => {
        const seekTime = e[0];
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const loopSong = () => {
        audioRef.current.loop = !audioRef.current.loop;
        setIsLooping(!isLooping);
        if (isLooping) {
            toast.success('Removed from Loop!');
        } else {
            toast.success('Added to Loop!');
        }
    };

    // useEffect(() => {
    //     if (values?.music) {
    //         getSong();
    //         if (localStorage.getItem("c")) {
    //             audioRef.current.currentTime = parseFloat(localStorage.getItem("c") + 1);
    //             localStorage.removeItem("c");
    //         }
    //         setPlaying(localStorage.getItem("p") == "true" && true || !localStorage.getItem("p") && true);
    //         const handleTimeUpdate = () => {
    //             try {
    //                 setCurrentTime(audioRef.current.currentTime);
    //                 setDuration(audioRef.current.duration);
    //             }
    //             catch (e) {
    //                 setPlaying(false);
    //             }
    //         };
    //         audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    //         return () => {
    //             if (audioRef.current) {
    //                 audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    //             }
    //         };
    //     }
    // }, [values?.music]);

    useEffect(() => {
    if (values?.music) {
        getSong();
        const storedTime = localStorage.getItem("c");

        if (storedTime) {
            const time = parseFloat(storedTime);
            audioRef.current.currentTime = time + 1;
            localStorage.removeItem("c");
        }

        setPlaying(localStorage.getItem("p") === "true" || !localStorage.getItem("p"));

        const handleTimeUpdate = () => {
            try {
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
                localStorage.setItem("c", audioRef.current.currentTime); // <-- store current time
            } catch (e) {
                setPlaying(false);
            }
        };

        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }
}, [values?.music]);

    return (
        <main className="px-3">
            <audio autoPlay={playing} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedData={() => setDuration(audioRef.current.duration)} src={audioURL} ref={audioRef}></audio>
            {values?.music && <div className="shadow-lg bg-neutral-900  fixed flex items-center bottom-0 right-0 left-0 justify-center  border-border overflow-hidden z-999 px-4 py-2 gap-3">
                <div className="relative p-2">
                    <img src={data.image ? data?.image[1]?.url : ""} alt={data?.name} className="rounded-md h-14 min-w-14 hover:opacity-85 transition" />
                    <img src={data.image ? data?.image[1]?.url : ""} alt={data?.name} className="rounded-md h-[110%] min-w-[110%] opacity-40 hidden dark:block absolute top-0 left-0 right-0 blur-3xl -z-10" />
                </div>
                <div className=" justify-between min-w-[18%] flex items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="space-y-1">
                            {!data?.name ? <Skeleton className="h-4 w-32" /> : (
                                <>
                                    <Link href={`/music/(player)/${values.music}?c=${currentTime}`} className="text-base hover:opacity-85 transition font-medium flex md:hidden gap-2 items-center text-white">{data?.name?.slice(0, 10)}{data?.name?.length >= 11 ? ".." : ""}
                                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Link>
                                    <Link href={`/music/(player)/${values.music}?c=${currentTime}`} className="text-base hover:opacity-85 transition font-medium gap-2 items-center hidden md:flex text-white">{data?.name?.slice(0, 10)}
                                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Link>
                                </>
                            )}
                            {!data?.artists?.primary[0]?.name ? <Skeleton className="h-3 w-14 mt-1" /> : (
                                <>
                                    <h2 className="block md:hidden text-xs -mt-0.5 text-muted-foreground">{data?.artists?.primary[0]?.name.slice(0, 20)}{data?.artists?.primary[0]?.name.length > 20 ? ".." : ""}</h2>
                                    <h2 className="hidden md:block text-xs -mt-0.5 text-muted-foreground">{data?.artists?.primary[0]?.name}</h2>
                                </>
                            )}
                        </div>
                       
                    </div>
                    <div className="flex items-center gap-4">
            
            <Button variant="ghost" size="icon" className="rounded-full text-white">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full h-10 w-10 p-[10px] bg-white/20 text-white hover:bg-gray-400" onClick={togglePlayPause}>
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>  
          
                </div>
                <div className="w-full px-12 flex justify-center mt-3 flex-col gap-1 ">
                        {!duration ? <Skeleton className="h-2 w-full " /> : (
                            <Slider onValueChange={handleSeek} value={[currentTime]} max={duration} className="w-full bg-red-600" />
                        )}
                        <div className="flex items-center justify-between ">
                            <span className="text-[10px] font-light text-muted-foreground ">{formatTime(currentTime)}</span>
                            {!duration ? <Skeleton className="h-2 w-10 " /> : (
                                <span className="text-[10px] font-light text-muted-foreground">{formatTime(duration)}</span>
                            )}
                        </div>
                    </div>
                <div className="flex items-center gap-4 ">
        <Button variant="ghost" size="icon" className="rounded-full text-white">
            <Heart className="h-5 w-5" />
          </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-white">
              <Shuffle className="h-5 w-5" />
            </Button>
            <Button size="icon" className="p-0 h-8 w-8 text-white" variant={!isLooping ? "ghost" : "secondary"} onClick={loopSong}>
                                {!isLooping ? <Repeat className="h-5 w-5" /> : <Repeat1 className="h-5 w-5" />}
                            </Button>
          <Volume2 className="h-5 w-5 text-white" />
        </div>
       
       
            </div>}
        </main >
    )
}
