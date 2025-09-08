import React from "react";
import { Button } from "@/components/ui/button";
// import FeatureCard from "./FeatureCard";
import { PulseBeamsSecond } from "@/components/ui/PulseBeam";

interface HeroProps {
    className?: string;
}

const Integration: React.FC<HeroProps> = ({ className = "" }) => {
    return (
        <div className="min-h-screen dark pl-20 pr-10 overflow-hidden relative">
     
<div className="home-hero_gradient"></div>
      {/* <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-900/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
      
     
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div> */}
      <div className="relative z-10 brightness-105">
        
        <div className=" mx-auto min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between pt-8">
          {/* <Hero className="md:flex-1 pt-6 md:pt-16" /> */}
           <div className={`relative z-10 ${className} max-w-3xl`}>
      <div className="inline-block px-4 py-1 rounded-full border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm mb-5">
        <span className="text-sm text-gray-300">The new B2B channel</span>
      </div>

      <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-semibold mb-6 leading-relaxed">
        Accelerate Your{" "}
        <br/>
        <span className="gradient-text ">Market Intelligence</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
        Highly personalized new business connections, expertly curated to meet your objectives and drive your business forward.
      </p>

      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-600/20">
        Get started
      </Button>
    </div>

    <div className="md:flex-1 relative justify-center items-center flex h-[500px] md:h-[600px] w-full"><PulseBeamsSecond/></div>
        </div>
      </div>
    </div>
    );
};

export default Integration;



// import React from "react";
// import { Button } from "./button";
// import FeatureCard from "./FeatureCard";

// interface HeroProps {
//   className?: string;
// }

// const Integration: React.FC<HeroProps> = ({ className = "" }) => {
//   return (
   
//     <div className="min-h-screen bg-[#0a0a0d] hero-pattern overflow-hidden relative">
//       {/* Gradient overlays for the background */}
//       <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-900/30 to-transparent"></div>
//       <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
//       <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl"></div>
      
//       {/* Additional light effects */}
//       <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>

//       {/* Content */}
//       <div className="relative z-10 brightness-105">
        
//         <div className="container mx-auto px-4 min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-between pt-8">
//           {/* <Hero className="md:flex-1 pt-6 md:pt-16" /> */}
//            <div className={`relative z-10 ${className} max-w-3xl`}>
//       <div className="inline-block px-4 py-1 rounded-full border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm mb-5">
//         <span className="text-sm text-gray-300">The new B2B channel</span>
//       </div>

//       <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
//         Accelerate Your{" "}
//         <span className="gradient-text">Market Intelligence</span>
//       </h1>

//       <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
//         Highly personalized new business connections, expertly curated to meet your objectives and drive your business forward.
//       </p>

//       <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-purple-600/20">
//         Get started
//       </Button>
//     </div>
          
//           {/* Visual elements for right side */}
//           <div className="md:flex-1 relative h-[500px] md:h-[600px] w-full">
//             {/* The floating cards */}
//             <FeatureCard type="ai" position="top" title="AI Expertise" location="London, UK" />
//             <FeatureCard type="stats" position="middle" />
//             <FeatureCard type="expert" position="bottom" title="Pidge Expert" location="Los Angeles, US" hasAvatar />
//             <FeatureCard type="logo" position="middle" />
//             <FeatureCard type="customer" position="bottom" />

//             {/* Central orbit element */}
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
//               <div className="w-full h-full rounded-full border border-purple-500/20 animate-[spin_30s_linear_infinite]"></div>
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-purple-500/30 animate-[spin_25s_linear_infinite_reverse]"></div>
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-purple-500/40 animate-[spin_20s_linear_infinite]"></div>
//             </div>

//             {/* Connection lines */}
//             <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
//               <line x1="30%" y1="25%" x2="60%" y2="50%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
//               <line x1="60%" y1="50%" x2="30%" y2="75%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
//               <line x1="70%" y1="30%" x2="60%" y2="50%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
//               <line x1="60%" y1="50%" x2="80%" y2="70%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
//             </svg>

//             {/* Dots on intersection points */}
//             <div className="absolute top-[25%] left-[30%] w-2 h-2 bg-purple-400 rounded-full"></div>
//             <div className="absolute top-[75%] left-[30%] w-2 h-2 bg-purple-400 rounded-full"></div>
//             <div className="absolute top-[30%] left-[70%] w-2 h-2 bg-purple-400 rounded-full"></div>
//             <div className="absolute top-[70%] left-[80%] w-2 h-2 bg-purple-400 rounded-full"></div>
//             <div className="absolute top-[50%] left-[60%] w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
//           </div>
//         </div>

//         {/* Floating persona tag */}
//         <div className="absolute top-32 right-24 glass-card py-2 px-4 text-sm backdrop-blur-md">
//           <div className="flex items-center space-x-2">
//             <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
//               <span className="text-gray-800 text-xs font-bold">JD</span>
//             </div>
//             <div className="text-xs text-gray-300">Chief Executive Officer at Movium</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Integration;
