
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const PulseBeamsSecond = () => {
  return (
    <div className="flex h-[25rem] w-full absolute items-center justify-center antialiased overflow-hidden">
     
      <div className="relative">
        <button className="bg-slate-900 w-[200px] z-40 -ml-12 -mt-8 h-[80px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full  text-xs font-semibold leading-6 text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex justify-center w-[200px] text-center space-x-2 h-[80px] items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-900 to-black p-6 rounded-3xl">
        <Image src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png" alt="CK Logo" width={100} height={100} className="mx-auto" />
      </div>
          </div>
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs />
      </div>
    </div>
  );
};

export const SVGs = () => {
  const width = 650; // Reduced width
  const height = 350; // Reduced height
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      <path
        d="M200 150H12C6.4772 150 2 154.477 2 160V280"
        stroke="var(--slate-800)"
      />
      <path
        d="M400 150H600C606 150 610 146 610 140V30"
        stroke="var(--slate-800)"
      />
      <path
        d="M300 200V250C300 255 295 260 290 260H100C95 260 90 265 90 270V310"
        stroke="var(--slate-800)"
      />
      <path
        d="M350 200V250C350 255 355 260 360 260H500C505 260 510 265 510 270V310"
        stroke="var(--slate-800)"
      />
      <path
        d="M250 120V10C250 5 255 0 260 0H275"
        stroke="var(--slate-800)"
      />

      {/* Gradient Beams */}

      <path
        d="M200 150H12C6.4772 150 2 154.477 2 160V280"
        stroke="url(#grad1)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M400 150H600C606 150 610 146 610 140V30"
        stroke="url(#grad2)"
      />
      <path
        d="M300 200V250C300 255 295 260 290 260H100C95 260 90 265 90 270V310"
        stroke="url(#grad3)"
      />
      <path
        d="M350 200V250C350 255 355 260 360 260H500C505 260 510 265 510 270V310"
        stroke="url(#grad4)"
      />
      <path
        d="M250 120V10C250 5 255 0 260 0H275"
        stroke="url(#grad5)"
      />

      <defs>
        <motion.linearGradient
          animate={{
            x1: [0, width * 1.2],
            x2: [0, width],
            y1: [height, height / 2],
            y2: [height * 1.2, height],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
          gradientUnits="userSpaceOnUse"
          id="grad1"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          animate={{
            x1: [0, width * 1.2],
            x2: [0, width],
            y1: [height, height / 2],
            y2: [height * 1.2, height],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
          id="grad2"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          animate={{
            x1: [0, width * 1.2],
            x2: [0, width],
            y1: [height, height / 2],
            y2: [height * 1.2, height],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
          gradientUnits="userSpaceOnUse"
          id="grad3"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          animate={{
            x1: [0, width * 1.2],
            x2: [0, width],
            y1: [height, height / 2],
            y2: [height * 1.2, height],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
          gradientUnits="userSpaceOnUse"
          id="grad4"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          animate={{
            x1: [0, width * 1.2],
            x2: [0, width],
            y1: [height, height / 2],
            y2: [height * 1.2, height],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
          gradientUnits="userSpaceOnUse"
          id="grad5"
        >
          <GradientColors />
        </motion.linearGradient>
      </defs>
<svg x="600" y="20" width="30px" height="30px" viewBox="-3.2 -3.2 38.40 38.40" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-3.2" y="-3.2" width="38.40" height="38.40" rx="5.376" fill="#ffffff" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>file_type_outlook</title><path d="M19.484,7.937v5.477L21.4,14.619a.489.489,0,0,0,.21,0l8.238-5.554a1.174,1.174,0,0,0-.959-1.128Z" fill="#0072c6"></path><path d="M19.484,15.457l1.747,1.2a.522.522,0,0,0,.543,0c-.3.181,8.073-5.378,8.073-5.378V21.345a1.408,1.408,0,0,1-1.49,1.555H19.483V15.457Z" fill="#0072c6"></path><path d="M10.44,12.932a1.609,1.609,0,0,0-1.42.838,4.131,4.131,0,0,0-.526,2.218A4.05,4.05,0,0,0,9.02,18.2a1.6,1.6,0,0,0,2.771.022,4.014,4.014,0,0,0,.515-2.2,4.369,4.369,0,0,0-.5-2.281A1.536,1.536,0,0,0,10.44,12.932Z" fill="#0072c6"></path><path d="M2.153,5.155V26.582L18.453,30V2ZM13.061,19.491a3.231,3.231,0,0,1-2.7,1.361,3.19,3.19,0,0,1-2.64-1.318A5.459,5.459,0,0,1,6.706,16.1a5.868,5.868,0,0,1,1.036-3.616A3.267,3.267,0,0,1,10.486,11.1a3.116,3.116,0,0,1,2.61,1.321,5.639,5.639,0,0,1,1,3.484A5.763,5.763,0,0,1,13.061,19.491Z" fill="#0072c6"></path></g></svg><svg x="495" y="290" aria-label="Microsoft" role="img" viewBox="0 0 512 512" width="30px" height="30px" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect width="512" height="512" rx="15%" fill="#ffffff"></rect><path d="M75 75v171h171v-171z" fill="#f25022"></path><path d="M266 75v171h171v-171z" fill="#7fba00"></path><path d="M75 266v171h171v-171z" fill="#00a4ef"></path><path d="M266 266v171h171v-171z" fill="#ffb900"></path></g></svg><svg y="285" x="75" width="30px" height="30px" viewBox="-25.6 -25.6 307.20 307.20" version="1.1" xmlns="http://www.w3.org/2000/svg"  preserveAspectRatio="xMidYMid" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-25.6" y="-25.6" width="307.20" height="307.20" rx="55.29599999999999" fill="#ffffff" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M53.8412698,161.320635 C53.8412698,176.152381 41.8539683,188.139683 27.0222222,188.139683 C12.1904762,188.139683 0.203174603,176.152381 0.203174603,161.320635 C0.203174603,146.488889 12.1904762,134.501587 27.0222222,134.501587 L53.8412698,134.501587 L53.8412698,161.320635 Z M67.2507937,161.320635 C67.2507937,146.488889 79.2380952,134.501587 94.0698413,134.501587 C108.901587,134.501587 120.888889,146.488889 120.888889,161.320635 L120.888889,228.368254 C120.888889,243.2 108.901587,255.187302 94.0698413,255.187302 C79.2380952,255.187302 67.2507937,243.2 67.2507937,228.368254 L67.2507937,161.320635 Z" fill="#E01E5A"> </path> <path d="M94.0698413,53.6380952 C79.2380952,53.6380952 67.2507937,41.6507937 67.2507937,26.8190476 C67.2507937,11.9873016 79.2380952,-7.10542736e-15 94.0698413,-7.10542736e-15 C108.901587,-7.10542736e-15 120.888889,11.9873016 120.888889,26.8190476 L120.888889,53.6380952 L94.0698413,53.6380952 Z M94.0698413,67.2507937 C108.901587,67.2507937 120.888889,79.2380952 120.888889,94.0698413 C120.888889,108.901587 108.901587,120.888889 94.0698413,120.888889 L26.8190476,120.888889 C11.9873016,120.888889 0,108.901587 0,94.0698413 C0,79.2380952 11.9873016,67.2507937 26.8190476,67.2507937 L94.0698413,67.2507937 Z" fill="#36C5F0"> </path> <path d="M201.549206,94.0698413 C201.549206,79.2380952 213.536508,67.2507937 228.368254,67.2507937 C243.2,67.2507937 255.187302,79.2380952 255.187302,94.0698413 C255.187302,108.901587 243.2,120.888889 228.368254,120.888889 L201.549206,120.888889 L201.549206,94.0698413 Z M188.139683,94.0698413 C188.139683,108.901587 176.152381,120.888889 161.320635,120.888889 C146.488889,120.888889 134.501587,108.901587 134.501587,94.0698413 L134.501587,26.8190476 C134.501587,11.9873016 146.488889,-1.42108547e-14 161.320635,-1.42108547e-14 C176.152381,-1.42108547e-14 188.139683,11.9873016 188.139683,26.8190476 L188.139683,94.0698413 Z" fill="#2EB67D"> </path> <path d="M161.320635,201.549206 C176.152381,201.549206 188.139683,213.536508 188.139683,228.368254 C188.139683,243.2 176.152381,255.187302 161.320635,255.187302 C146.488889,255.187302 134.501587,243.2 134.501587,228.368254 L134.501587,201.549206 L161.320635,201.549206 Z M161.320635,188.139683 C146.488889,188.139683 134.501587,176.152381 134.501587,161.320635 C134.501587,146.488889 146.488889,134.501587 161.320635,134.501587 L228.571429,134.501587 C243.403175,134.501587 255.390476,146.488889 255.390476,161.320635 C255.390476,176.152381 243.403175,188.139683 228.571429,188.139683 L161.320635,188.139683 Z" fill="#ECB22E"> </path> </g> </g></svg>
     <svg width="38px" height="38px" x="0" y="270" viewBox="0 0 32.00 32.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.984"></g><g id="SVGRepo_iconCarrier"> <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"></path> <path d="M16.0019 12.4507L12.541 6.34297C12.6559 6.22598 12.7881 6.14924 12.9203 6.09766C11.8998 6.43355 11.4315 7.57961 11.4315 7.57961L5.10895 18.7345C5.01999 19.0843 4.99528 19.4 5.0064 19.6781H11.9072L16.0019 12.4507Z" fill="#34A853"></path> <path d="M16.002 12.4507L20.0967 19.6781H26.9975C27.0086 19.4 26.9839 19.0843 26.8949 18.7345L20.5724 7.57961C20.5724 7.57961 20.1029 6.43355 19.0835 6.09766C19.2145 6.14924 19.3479 6.22598 19.4628 6.34297L16.002 12.4507Z" fill="#FBBC05"></path> <path d="M16.0019 12.4514L19.4628 6.34371C19.3479 6.22671 19.2144 6.14997 19.0835 6.09839C18.9327 6.04933 18.7709 6.01662 18.5954 6.00781H18.4125H13.5913H13.4084C13.2342 6.01536 13.0711 6.04807 12.9203 6.09839C12.7894 6.14997 12.6559 6.22671 12.541 6.34371L16.0019 12.4514Z" fill="#188038"></path> <path d="M11.9082 19.6782L8.48687 25.7168C8.48687 25.7168 8.3732 25.6614 8.21875 25.5469C8.70434 25.9206 9.17633 25.9998 9.17633 25.9998H22.6134C23.3547 25.9998 23.5092 25.7168 23.5092 25.7168C23.5116 25.7155 23.5129 25.7142 23.5153 25.713L20.0965 19.6782H11.9082Z" fill="#4285F4"></path> <path d="M11.9086 19.6782H5.00781C5.04241 20.4985 5.39826 20.9778 5.39826 20.9778L5.65773 21.4281C5.67627 21.4546 5.68739 21.4697 5.68739 21.4697L6.25205 22.461L7.51976 24.6676C7.55683 24.7569 7.60008 24.8386 7.6458 24.9166C7.66309 24.9431 7.67915 24.972 7.69769 24.9972C7.70263 25.0047 7.70757 25.0123 7.71252 25.0198C7.86944 25.2412 8.04489 25.4123 8.22034 25.5469C8.37479 25.6627 8.48847 25.7168 8.48847 25.7168L11.9086 19.6782Z" fill="#1967D2"></path> <path d="M20.0967 19.6782H26.9974C26.9628 20.4985 26.607 20.9778 26.607 20.9778L26.3475 21.4281C26.329 21.4546 26.3179 21.4697 26.3179 21.4697L25.7532 22.461L24.4855 24.6676C24.4484 24.7569 24.4052 24.8386 24.3595 24.9166C24.3422 24.9431 24.3261 24.972 24.3076 24.9972C24.3026 25.0047 24.2977 25.0123 24.2927 25.0198C24.1358 25.2412 23.9604 25.4123 23.7849 25.5469C23.6305 25.6627 23.5168 25.7168 23.5168 25.7168L20.0967 19.6782Z" fill="#EA4335"></path> </g></svg>
     <svg className="absolute" x="270" y="-2" width="38px" height="38px" viewBox="0 0 32.00 32.00" fill="none" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"></path> <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335"></path> <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05"></path> <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853"></path> <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F"></path> <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F"></path> <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F"></path> <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4"></path> </g></svg>
    </svg>
  );
};
const GradientColors = () => {
  return (
    <>
      <stop stopColor="#18CCFC" stopOpacity="0"></stop>
      <stop stopColor="#18CCFC"></stop>
      <stop offset="0.325" stopColor="#6344F5"></stop>
      <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
    </>
  );
};
 


// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export const PulseBeamsSecond = () => {
//   return (
//     <div className="flex h-full min-h-full w-full bg-red-500 relative items-center justify-center antialiased overflow-hidden">
//       <Image
//         src="/gradients/bghero.webp"
//         alt="hero beam"
//         width="1400"
//         height="1400"
//         className="select-none pointer-events none absolute right-0 top-0"
//       />
//       <div className="relative">
//         <button className="bg-slate-800 w-[320px] z-40 h-[120px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
//           <span className="absolute inset-0 overflow-hidden rounded-full">
//             <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//           </span>
//           <div className="relative flex justify-center w-[320px] text-center space-x-2 h-[120px]  items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
//             <span className="md:text-4xl text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-600 to-neutral-300">
//               Connect
//             </span>
//           </div>
//         </button>
//       </div>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <SVGs />
//       </div>
//     </div>
//   );
// };

// export const SVGs = () => {
//   const width = 858;
//   const height = 434;
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="flex flex-shrink-0"
//     >
//       <path
//         d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M568 200H841C846.523 200 851 195.523 851 190V40"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M380 168V17C380 11.4772 384.477 7 390 7H414"
//         stroke="var(--slate-800)"
//       />

//       {/* Gradient Beams */}

//       <path
//         d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
//         stroke="url(#grad1)"
//         strokeLinecap="round"
//         strokeWidth="2"
//       />
//       <path
//         d="M568 200H841C846.523 200 851 195.523 851 190V40"
//         stroke="url(#grad2)"
//       />
//       <path
//         d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
//         stroke="url(#grad3)"
//       />
//       <path
//         d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
//         stroke="url(#grad4)"
//       />
//       <path
//         d="M380 168V17C380 11.4772 384.477 7 390 7H414"
//         stroke="url(#grad5)"
//       />

//       <defs>
//         <motion.linearGradient
//           animate={{
//             x1: [0, width * 1.2],
//             x2: [0, width],
//             y1: [height, height / 2],
//             y2: [height * 1.2, height],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//             ease: "linear",
//             repeatDelay: 2,
//           }}
//           gradientUnits="userSpaceOnUse"
//           id="grad1"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           animate={{
//             x1: [0, width * 1.2],
//             x2: [0, width],
//             y1: [height, height / 2],
//             y2: [height * 1.2, height],
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             ease: "linear",
//             repeatDelay: 3,
//           }}
//           id="grad2"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           animate={{
//             x1: [0, width * 1.2],
//             x2: [0, width],
//             y1: [height, height / 2],
//             y2: [height * 1.2, height],
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             ease: "linear",
//             repeatDelay: 2,
//           }}
//           gradientUnits="userSpaceOnUse"
//           id="grad3"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           animate={{
//             x1: [0, width * 1.2],
//             x2: [0, width],
//             y1: [height, height / 2],
//             y2: [height * 1.2, height],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "linear",
//             repeatDelay: 2,
//           }}
//           gradientUnits="userSpaceOnUse"
//           id="grad4"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           animate={{
//             x1: [0, width * 1.2],
//             x2: [0, width],
//             y1: [height, height / 2],
//             y2: [height * 1.2, height],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "linear",
//             repeatDelay: 2,
//           }}
//           gradientUnits="userSpaceOnUse"
//           id="grad5"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//       </defs>
//       <circle
//         cx="851"
//         cy="34"
//         r="6.5"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="770"
//         cy="427"
//         r="6.5"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="142"
//         cy="427"
//         r="6.5"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="6.5"
//         cy="398.5"
//         r="6"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="420.5"
//         cy="6.5"
//         r="6"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//     </svg>
//   );
// };
// const GradientColors = () => {
//   return (
//     <>
//       <stop stopColor="#18CCFC" stopOpacity="0"></stop>
//       <stop stopColor="#18CCFC"></stop>
//       <stop offset="0.325" stopColor="#6344F5"></stop>
//       <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
//     </>
//   );
// };



// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const grad1 = {
//   initial: {
//     x1: "0%",
//     x2: "0%",
//     y1: "80%",
//     y2: "100%",
//   },
//   animate: {
//     x1: ["0%", "0%", "200%"],
//     x2: ["0%", "0%", "180%"],
//     y1: ["80%", "0%", "0%"],
//     y2: ["100%", "20%", "20%"],
//   },
// };

// const grad2 = {
//   initial: {
//     x1: "0%",
//     x2: "0%",
//     y1: "80%",
//     y2: "100%",
//   },
//   animate: {
//     x1: ["20%", "100%", "100%"],
//     x2: ["0%", "90%", "90%"],
//     y1: ["80%", "80%", "-20%"],
//     y2: ["100%", "100%", "0%"],
//   },
// };
// const grad3 = {
//   initial: {
//     x1: "0%",
//     x2: "0%",
//     y1: "80%",
//     y2: "100%",
//   },
//   animate: {
//     x1: ["20%", "100%", "100%"],
//     x2: ["0%", "90%", "90%"],
//     y1: ["80%", "80%", "-20%"],
//     y2: ["100%", "100%", "0%"],
//   },
// };
// const grad4 = {
//   initial: {
//     x1: "40%",
//     x2: "50%",
//     y1: "160%",
//     y2: "180%",
//   },
//   animate: {
//     x1: "0%",
//     x2: "10%",
//     y1: "-40%",
//     y2: "-20%",
//   },
// };
// const grad5 = {
//   initial: {
//     x1: "-40%",
//     x2: "-10%",
//     y1: "0%",
//     y2: "20%",
//   },
//   animate: {
//     x1: ["40%", "0%", "0%"],
//     x2: ["10%", "0%", "0%"],
//     y1: ["0%", "0%", "180%"],
//     y2: ["20%", "20%", "200%"],
//   },
// };
// export const PulseBeams = () => {
//   return (
//     <div className="flex h-[40rem] relative items-center justify-center antialiased bg-red-500 overflow-hidden">
//       <button className="bg-slate-800 w-[320px] z-40 h-[120px] no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
//         <span className="absolute inset-0 overflow-hidden rounded-full">
//           <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//         </span>
//         <div className="relative flex justify-center w-[320px] text-center space-x-2 h-[120px]  items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
//           <span className="md:text-4xl text-base inline-block bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 via-neutral-600 to-neutral-300">
//             Connect
//           </span>
//         </div>
//       </button>
//       {/* Core SVGs component */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <SVGs />
//       </div>
//     </div>
//   );
// };

// export const SVGs = () => {
//   return (
//     <svg
//       width="858"
//       height="434"
//       viewBox="0 0 858 434"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="flex flex-shrink-0"
//     >
//       <path
//         d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M568 200H841C846.523 200 851 195.523 851 190V40"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
//         stroke="var(--slate-800)"
//       />
//       <path
//         d="M380 168V17C380 11.4772 384.477 7 390 7H414"
//         stroke="var(--slate-800)"
//       />

//       {/* Gradient Beams */}

//       <path
//         d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
//         stroke="url(#grad1)"
//       />
//       <path
//         d="M568 200H841C846.523 200 851 195.523 851 190V40"
//         stroke="url(#grad2)"
//       />
//       <path
//         d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
//         stroke="url(#grad3)"
//       />
//       <path
//         d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
//         stroke="url(#grad4)"
//       />
//       <path
//         d="M380 168V17C380 11.4772 384.477 7 390 7H414"
//         stroke="url(#grad5)"
//       />

//       <defs>
//         <motion.linearGradient
//           variants={grad5}
//           animate="animate"
//           initial="initial"
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "linear",
//             repeatDelay: 2,
//             delay: Math.random() * 2,
//           }}
//           id="grad5"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           variants={grad1}
//           animate="animate"
//           initial="initial"
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "linear",
//             repeatDelay: 2,
//             delay: Math.random() * 2,
//           }}
//           id="grad1"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           variants={grad2}
//           animate="animate"
//           initial="initial"
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "linear",
//             repeatDelay: 2,
//             delay: Math.random() * 2,
//           }}
//           id="grad2"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           variants={grad3}
//           animate="animate"
//           initial="initial"
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "linear",
//             repeatDelay: 2,
//             delay: Math.random() * 2,
//           }}
//           id="grad3"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//         <motion.linearGradient
//           variants={grad4}
//           animate="animate"
//           initial="initial"
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "linear",
//             repeatDelay: 2,
//             delay: Math.random() * 2,
//           }}
//           id="grad4"
//         >
//           <GradientColors />
//         </motion.linearGradient>
//       </defs>
//       <circle
//         cx="851"
//         cy="34"
//         r="6.5"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="770"
//         cy="427"
//         r="6.5"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="142"
//         cy="427"
//         r="6.5"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="6.5"
//         cy="398.5"
//         r="6"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//       <circle
//         cx="420.5"
//         cy="6.5"
//         r="6"
//         fill="var(--slate-700)"
//         stroke="var(--slate-600)"
//       />
//     </svg>
//   );
// };
// const GradientColors = () => {
//   return (
//     <>
//       <stop stopColor="#18CCFC" stopOpacity="0"></stop>
//       <stop stopColor="#18CCFC"></stop>
//       <stop offset="0.325" stopColor="#6344F5"></stop>
//       <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
//     </>
//   );
// };

