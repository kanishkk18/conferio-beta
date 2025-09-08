import Link from "next/link";

export default function ArtistCard({ image, name, id }) {
    return (

        <div className="group border hover:bg-neutral-900/80 rounded-lg py-2 w-28 cursor-pointer border-none bg-transparent transition-shadow duration-200 hover:shadow-md sm:w-36 sm:border-solid md:w-48">
        <Link href={"/music/(root)/search/" + `${encodeURI(name.toLowerCase().split(" ").join("+"))}`}>
            <div className=" relative w-full overflow-hidden rounded-full flex justify-center ">
                <img src={image} alt={name} className="hover:scale-105 transition cursor-pointer border rounded-full h-[160px] min-w-[160px] object-cover"/>
            </div>
            <div className="mt-2 text-center">
                <h1 className="text-md font-semibold text-ellipsis text-nowrap overflow-hidden">{name.split(" ")[0] || null} {name.split(" ")[1] || null}</h1>
            </div>
        </Link>
        </div>
    )
}
