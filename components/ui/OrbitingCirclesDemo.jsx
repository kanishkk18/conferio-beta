import OrbitingCircles from "./orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[440px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-transparent ">
      
     <div className="h-16 w-16 p-2 border-dashed border rounded-full border-neutral-700"><img className="h-full w-full" src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png" alt="" /></div>
      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent z-50"
       
        delay={20}
        radius={80}
      >
        <Icons.img1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent z-50"
      
        delay={10}
        radius={80}
        
      >
        <Icons.img3 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent z-50"
      
        delay={15}
        radius={80}
        
      >
        <Icons.img8 />
      </OrbitingCircles>
       <OrbitingCircles
        className="size-[50px] border-none bg-transparent z-50"
      
        delay={25}
        radius={80}
        
      >
        <Icons.img15 />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        reverse
      >
        <Icons.img1 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
        delay={24}
        reverse
      >
        <Icons.img2 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={30}
        reverse
      >
        <Icons.img2 />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        reverse
      >
        <Icons.img4 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={28}
        reverse
      >
        <Icons.img5 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={26}
        reverse
      >
        <Icons.img6 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={32}
        reverse
      >
        <Icons.img7 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={22}
        reverse
      >
        <Icons.img8 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={22}
        reverse
      >
        <Icons.img9 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={22}
        reverse
      >
        <Icons.img10 />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={20}
        reverse
      >
        <Icons.img11 />
      </OrbitingCircles>

      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={18}
        reverse
      >
        <Icons.img12 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={16}
        reverse
      >
        <Icons.img13 />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[60px] border-none bg-transparent z-50"
        radius={190}
       
        delay={14}
        reverse
      >
        <Icons.img14 />
      </OrbitingCircles>
      
    </div>
  );
}

const Icons = {
  img1: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://typehero.dev/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F10430358%3Fv%3D4&w=64&q=75" alt="GitHub" />
  ),
  img2: () => (
   <img className=" z-50 bg-black rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/4351432?v=4" alt="GitHub" />
  ),
  img3: () => (
   <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://typehero.dev/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F34467318%3Fv%3D4&w=64&q=75" alt="GitHub" />
  ),
  img4: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/87698149?v=4" alt="GitHub" />
  ),
  img5: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/34709632?v=4" alt="GitHub" />
  ),
  img6: () => (
    <img className=" z-50 bg-black rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/43565572?v=4" alt="GitHub" />
  ),
  img7: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/20263648?v=4" alt="GitHub" />
  ),
  img8: () => (
   <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/713006?v=4" alt="GitHub" />
  ),
  img9: () => (
   <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://typehero.dev/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F34467318%3Fv%3D4&w=64&q=75" alt="GitHub" />
  ),
  img10: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/4298450?v=4" alt="GitHub" />
  ),
  img11: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/35374649?v=4" alt="GitHub" />
  ),
  img12: () => (
    <img className=" z-50 bg-black rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/18241258?v=4" alt="GitHub" />
  ),
  img13: () => (
    <img className=" z-50 rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/29686866?v=4" alt="GitHub" />
  ),
  img14: () => (
    <img className=" z-50 bg-black rounded-full p-1 border border-dashed border-gray-500" src="https://typehero.dev/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F5495587%3Fv%3D4&w=64&q=75" alt="GitHub" />
  ),
  img15: () => (
    <img className=" z-50 bg-black rounded-full p-1 border border-dashed border-gray-500" src="https://avatars.githubusercontent.com/u/61590976?v=4" alt="GitHub" />
  ),
  
};
