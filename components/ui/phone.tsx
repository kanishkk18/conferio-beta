import Image from 'next/image';
import React, { useEffect, useRef } from 'react';


const Phone = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play();
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.5 } // Play when 50% of the video is in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className=" py-10 bg-black">
        <div className="flex flex-col w-full justify-start pb-16 px-20 items-start ">
            <p className='text-2xl text-blue-600 text-start font-semibold'>Our Platform in Action</p>
            <h1 className='text-5xl font-semibold text-white'>Conferio in your pocket to<br /> empower your in app<br /> communication</h1>
        </div>

        <div className="absolute p-4 space-y-32 flex flex-col right-0 w-[40%]">

       <span className='bg-purple-400 ml-auto mr-32  flex w-fit gap-4 px-4 py-2 rounded-[16px] items-center'>
        <Image height={1000} width={1000} className='h-10 w-10 rounded-full' src="https://avatars.githubusercontent.com/u/35677084?v=4" alt="" />
       <p className='text-black font-bold font-sans'>Jacob Simmons</p>
       <p className='bg-black  items-center justify-center h-8 w-8 pt-[2px] text-white text-center rounded-[100%]'>?</p>
       </span>

       <span className='flex ml-auto gap-4 bg-purple-600 px-6 py-2 rounded-[16px] w-fit'>
       <Image height={1000} width={1000} className='h-14 w-14 rounded-full' src="https://avatars.githubusercontent.com/u/39114868?v=4" alt="" />
        <div className="">
       <p className='text-white font-bold'>Alex</p>
       <p className='text-white'>Hello! how are you?</p>
       </div>
       </span>

       <div className='pr-8 ml-auto mr-20 space-y-4 text-center rounded-[16px] bg-[#121417] flex flex-col w-fit items-center justify-center '>
        <Image height={1000} width={1000} className='h-28 w-fit rounded-[16px]' src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1727771594/CONFERIO/bprqltttpgy3qffkkg5v.png" alt="" />
       <p className='text-[16px] pl-6 pb-2 font-semibold text-neutral-600'>Speaker</p>
       </div>
      </div>

      <div className="absolute w-[30%] p-4 flex flex-col space-y-20">

<span className='bg-[#0f0f0f] ml-auto mr-5 w-fit flex flex-col gap-2 p-2 rounded-[16px]'>
  <div className=" w-full text-center px-2 pt-2 items-center flex justify-between">
  <p className='text-white font-semibold text-lg font-sans'>Translation</p>
  
  <label className="switch">
  <input type="checkbox"/>
  <span className="slider"></span>
</label>
</div>

<div className=" w-fit grid grid-cols-2 gap-4 p-2">
<div className="flex items-center gap-2">
<Image height={1000} width={1000} className='w-10 h-10 rounded-full' src="https://www.svgrepo.com/show/401651/flag-for-india.svg" alt="" />
<p className='text-white font-semibold font-sans'>Hindi</p>
</div>
<div className="flex items-center gap-2">
<Image height={1000} width={1000} className='w-10 h-10 rounded-full'  src="https://www.svgrepo.com/show/25276/british-indian-ocean-territory.svg" alt="" />
<p className='text-white font-semibold font-sans'>English</p>
</div>
<div className="flex items-center gap-2">
<Image height={1000} width={1000} className='w-10 h-10 rounded-full' src="https://www.svgrepo.com/show/401612/flag-for-germany.svg" alt="" />
<p className='text-white font-semibold font-sans'>German</p>
</div>
<div className="flex items-center gap-2">
<Image height={1000} width={1000} className='w-10 h-10 rounded-full' src="https://svgrepo.com/show/242350/spain.svg" alt="" />
<p className='text-white font-semibold font-sans'>Spanish</p>
</div>
</div>
</span>

<span className='bg-white gap-2 items-center rounded-[16px] flex p-2 w-fit'>
<div className="flex">
<svg className='' fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M8,2 C8.55228475,2 9,2.44771525 9,3 L9,21 C9,21.5522847 8.55228475,22 8,22 C7.44771525,22 7,21.5522847 7,21 L7,3 C7,2.44771525 7.44771525,2 8,2 Z M20,4 C20.5522847,4 21,4.44771525 21,5 L21,19 C21,19.5522847 20.5522847,20 20,20 C19.4477153,20 19,19.5522847 19,19 L19,5 C19,4.44771525 19.4477153,4 20,4 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,7 C11,6.44771525 11.4477153,6 12,6 Z M4,9 C4.55228475,9 5,9.44771525 5,10 L5,14 C5,14.5522847 4.55228475,15 4,15 C3.44771525,15 3,14.5522847 3,14 L3,10 C3,9.44771525 3.44771525,9 4,9 Z M16,10 C16.5522847,10 17,10.4477153 17,11 L17,13 C17,13.5522847 16.5522847,14 16,14 C15.4477153,14 15,13.5522847 15,13 L15,11 C15,10.4477153 15.4477153,10 16,10 Z"></path> </g></svg>
<svg className='ml-[-5px]' fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M8,2 C8.55228475,2 9,2.44771525 9,3 L9,21 C9,21.5522847 8.55228475,22 8,22 C7.44771525,22 7,21.5522847 7,21 L7,3 C7,2.44771525 7.44771525,2 8,2 Z M20,4 C20.5522847,4 21,4.44771525 21,5 L21,19 C21,19.5522847 20.5522847,20 20,20 C19.4477153,20 19,19.5522847 19,19 L19,5 C19,4.44771525 19.4477153,4 20,4 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,7 C11,6.44771525 11.4477153,6 12,6 Z M4,9 C4.55228475,9 5,9.44771525 5,10 L5,14 C5,14.5522847 4.55228475,15 4,15 C3.44771525,15 3,14.5522847 3,14 L3,10 C3,9.44771525 3.44771525,9 4,9 Z M16,10 C16.5522847,10 17,10.4477153 17,11 L17,13 C17,13.5522847 16.5522847,14 16,14 C15.4477153,14 15,13.5522847 15,13 L15,11 C15,10.4477153 15.4477153,10 16,10 Z"></path> </g></svg>
<svg className='transform scale-x-[-1] ml-[-5px]' fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M8,2 C8.55228475,2 9,2.44771525 9,3 L9,21 C9,21.5522847 8.55228475,22 8,22 C7.44771525,22 7,21.5522847 7,21 L7,3 C7,2.44771525 7.44771525,2 8,2 Z M20,4 C20.5522847,4 21,4.44771525 21,5 L21,19 C21,19.5522847 20.5522847,20 20,20 C19.4477153,20 19,19.5522847 19,19 L19,5 C19,4.44771525 19.4477153,4 20,4 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,7 C11,6.44771525 11.4477153,6 12,6 Z M4,9 C4.55228475,9 5,9.44771525 5,10 L5,14 C5,14.5522847 4.55228475,15 4,15 C3.44771525,15 3,14.5522847 3,14 L3,10 C3,9.44771525 3.44771525,9 4,9 Z M16,10 C16.5522847,10 17,10.4477153 17,11 L17,13 C17,13.5522847 16.5522847,14 16,14 C15.4477153,14 15,13.5522847 15,13 L15,11 C15,10.4477153 15.4477153,10 16,10 Z"></path> </g></svg>
<svg className='transform scale-x-[-1] ml-[-5px]' fill="#000000" width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M8,2 C8.55228475,2 9,2.44771525 9,3 L9,21 C9,21.5522847 8.55228475,22 8,22 C7.44771525,22 7,21.5522847 7,21 L7,3 C7,2.44771525 7.44771525,2 8,2 Z M20,4 C20.5522847,4 21,4.44771525 21,5 L21,19 C21,19.5522847 20.5522847,20 20,20 C19.4477153,20 19,19.5522847 19,19 L19,5 C19,4.44771525 19.4477153,4 20,4 Z M12,6 C12.5522847,6 13,6.44771525 13,7 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,7 C11,6.44771525 11.4477153,6 12,6 Z M4,9 C4.55228475,9 5,9.44771525 5,10 L5,14 C5,14.5522847 4.55228475,15 4,15 C3.44771525,15 3,14.5522847 3,14 L3,10 C3,9.44771525 3.44771525,9 4,9 Z M16,10 C16.5522847,10 17,10.4477153 17,11 L17,13 C17,13.5522847 16.5522847,14 16,14 C15.4477153,14 15,13.5522847 15,13 L15,11 C15,10.4477153 15.4477153,10 16,10 Z"></path> </g></svg>

</div>
  <svg className="bg-black p-2 rounded-full" fill="#454545" width="42px" height="42px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960.315 96.818c-186.858 0-338.862 152.003-338.862 338.861v484.088c0 186.858 152.004 338.862 338.862 338.862 186.858 0 338.861-152.004 338.861-338.862V435.68c0-186.858-152.003-338.861-338.861-338.861M427.818 709.983V943.41c0 293.551 238.946 532.497 532.497 532.497 293.55 0 532.496-238.946 532.496-532.497V709.983h96.818V943.41c0 330.707-256.438 602.668-580.9 627.471l-.006 252.301h242.044V1920H669.862v-96.818h242.043l-.004-252.3C587.438 1546.077 331 1274.116 331 943.41V709.983h96.818ZM960.315 0c240.204 0 435.679 195.475 435.679 435.68v484.087c0 240.205-195.475 435.68-435.68 435.68-240.204 0-435.679-195.475-435.679-435.68V435.68C524.635 195.475 720.11 0 960.315 0Z" fill-rule="evenodd"></path> </g></svg>
</span>

<span className='flex gap-4 ml-auto mr-5 bg-blue-700 px-6 py-2 rounded-[16px] w-fit'>
  <Image height={1000} width={1000} className='h-14 w-14 rounded-full' src="https://i.pinimg.com/564x/ce/85/a2/ce85a2d5378205f16e4b083c417fe242.jpg" alt="" />
  <div className="">
 <p className='text-white font-bold'>Mary</p>
 <p className='text-white'>Let's discuss a new Project?</p>
 </div>
 </span>

 <span className='bg-pink-500 ml-auto text-center justify-center flex w-fit gap-2 px-2 py-1.5 rounded-[20px] items-center'>
 <svg className='bg-white p-1 rounded-[50%]' width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 13V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.0799 18 6.2 18H16.2446C16.5263 18 16.6672 18 16.8052 18.0193C16.9277 18.0365 17.0484 18.065 17.1656 18.1044C17.2977 18.1488 17.4237 18.2118 17.6757 18.3378L21 20V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H13M8.12132 3.87868C9.29289 5.05025 9.29289 6.94975 8.12132 8.12132C6.94975 9.29289 5.05025 9.29289 3.87868 8.12132C2.70711 6.94975 2.70711 5.05025 3.87868 3.87868C5.05025 2.70711 6.94975 2.70711 8.12132 3.87868Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
 <p className='text-black font-semibold font-sans'>New messages</p>

 </span>
</div>

      <video
        ref={videoRef}
        src="https://res.cloudinary.com/kanishkkcloud18/video/upload/v1747601626/CONFERIO/mmtmofeywc8bxpnky2rm.mp4"
        muted
        className="w-full pt-12 h-[90vh]"
      />
      <div className="flex justify-between items-center px-28">
        <div className="w-[30%]">
          <h1 className='text-white font-sans font-semibold pb-2 text-2xl'>Messaging & Chat</h1>
          <p className='text-neutral-400 text-[18px]'>Flexible, secure, and feature-rich video calling for web and mobile apps—easily integrate, manage, and scale with seamless performance.</p>
        </div>
        <div className="w-[30%]">
          <h1 className='text-white font-sans pb-2 font-semibold text-2xl'>Video & Voice calling </h1>
          <p className='text-neutral-400 text-[18px]'>Unmatched security, powerful infrastructure, and an intuitive interface—designed for seamless video conferencing across all devices.</p>
        </div>
      </div>

    </div>
  );
};

export default Phone;
