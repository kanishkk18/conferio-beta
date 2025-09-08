import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-5 backdrop-blur-3xl mt-8 px-6 md:px-20 lg:px-32">
            {/* <div>
                <h1 className="text-xl font-bold">Music<span className="opacity-50">hub</span></h1>
            </div> */}
            <p className="text-center text-muted-foreground text-sm mt-2 max-w-lg font-light">Built for educational purpose.</p>
            <p className="text-center text-sm text-muted-foreground">Made with ♥ by <a className="underline text-primary hover:text-primary" href="#">
            k9codrr</a>.</p>
           
        </footer>
    )
}