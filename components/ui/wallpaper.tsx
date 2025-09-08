import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Wallpaper = () => {
  const [wallpaper, setWallpaper] = useState('');
  const router = useRouter();

  const handleBack = () =>{
    router.back()
  }

  useEffect(() => {
    const savedWallpaper = localStorage.getItem('chatWallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  const predefinedWallpapers = [
    'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723039065/Kanishkk/chathive/wcnjgdf4z8hodm3hhint.jpg',
    'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723372423/Kanishkk/chathive/kjxc0mg0zjuarr4s0gfy.jpg',
    'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723372468/Kanishkk/chathive/u14ymeadswknrtibkbjb.jpg',
    'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723039065/Kanishkk/chathive/e7odgpv2lly8mraznhl3.jpg',
    'https://i.pinimg.com/564x/58/ff/43/58ff43c01c9cd2a339c550f675a6d11a.jpg',
    'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723372468/Kanishkk/chathive/y9wasxsktssvqh9kafo3.jpg',
    'https://i.pinimg.com/736x/8e/66/dd/8e66ddb57658576cd1127e75eda89531.jpg',
    'https://i.pinimg.com/564x/aa/16/33/aa1633d52335909313fb6d3d7280a81b.jpg',
    'https://i.pinimg.com/564x/e2/01/89/e20189a915ab6655e01e928dd83adeee.jpg',
    'https://res.cloudinary.com/kanishkkcloud18/image/upload/v1723372443/Kanishkk/chathive/garr7ligutmfcnbrl4b9.jpg',
    'https://i.pinimg.com/564x/32/10/71/3210715256ddae84f900e048cfba5fc2.jpg',
    'https://i.pinimg.com/564x/85/4f/72/854f727d8c725d7ff31ebd167a1c5417.jpg',
    "https://i.pinimg.com/1200x/d4/aa/30/d4aa30301476fddc5d07d45e1a2002e2.jpg"
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const wallpaperData = reader.result;
      if (typeof wallpaperData === 'string') {
        setWallpaper(wallpaperData);
        localStorage.setItem('chatWallpaper', wallpaperData);
        console.log('Wallpaper set from file upload:', wallpaperData);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePredefinedWallpaperClick = (wallpaper) => {
    setWallpaper(wallpaper);
    localStorage.setItem('chatWallpaper', wallpaper);
    console.log('Wallpaper set from predefined selection:', wallpaper);
  };

  return (
    <div className='bg-black h-[100%] lg:h-[100%]'> 
    <div className="flex w-[100%] h-[40px] items-center text-center justify-center mb-[20px]">
      
      <button className='text-blue-500 absolute left-1 flex' onClick={handleBack}><svg width="24px" height="24px" viewBox="0 0 1024.00 1024.00" fill="#3b82f6" className="icon" version="1.1"  transform="rotate(270)" stroke="#3b82f6" strokeWidth="35.839999999999996"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M509.928 387.16c7.24-7.991 17.58-7.898 24.782 0.333l270.568 309.222c7.759 8.867 21.237 9.765 30.103 2.007 8.867-7.759 9.766-21.237 2.007-30.103L566.82 359.397c-24-27.429-64.127-27.792-88.507-0.89L197.526 668.342c-7.912 8.73-7.249 22.221 1.482 30.133 8.73 7.912 22.221 7.249 30.133-1.482L509.928 387.16z" fill=""></path></g></svg>
        Back</button>
     <h3 className='text-white text-center text-[18px] font-sans font-medium'>Select Wallpaper</h3>

     </div>
      <div className='mr-[10px] ml-[10px]'>

      <div className='bg-zinc-900 mb-[3px] h-12 rounded-[10px] py-[5px] text-blue-600'>
     <p className=' ml-2 mt-1 bg-transparent items-center text-start  text-blue-600 text-[18px]'>Choose From Photos</p>
        <input type="file" className='items-center opacity-0' onChange={handleFileChange} />
      </div>
      <p className='text-zinc-500 mb-5 font-sans text-[14px] ml-[3px]'>From here, you can set a custom background image</p>

        <div className="bg-zinc-900 w-[100%] max-md:w-[100%] h-auto px-[5px] py-[5px] rounded-[16px] grid grid-cols-3 gap-[5px] ">
          {predefinedWallpapers.map((wallpaper, index) => (
            <Image
            height={1000}
            width={1000}
            className=' rounded-[16px] h-[100%] focus:border-zinc-500 focus:border-[1px]'
              key={index}
              src={wallpaper}
              alt={`Wallpaper ${index + 1}`}
              onClick={() => handlePredefinedWallpaperClick(wallpaper)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallpaper;
