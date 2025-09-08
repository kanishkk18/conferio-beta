import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { OrbitingCirclesDemo } from "@/components/ui/OrbitingCirclesDemo";


const PromoCard = () => {

  useEffect(()=>{
	  (async function () {
		const cal = await getCalApi({"namespace":"conferio-bookings"});
		cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
	  })();
	}, [])


  return (
    <div className="border h-screen p-2 rounded-[20px] overflow-hidden shadow-lg hidden md:flex lg:flex items-center justify-center">
     
     
      {/* Left section with text */}
      <div className="w-1/2 relative overflow-hidden h-full flex flex-col justify-center  items-center max-h-full"> 
      <div className="-z-10 top-0 absolute left-0 w-full h-full flex items-center overflow-hidden rounded-l-[20px] justify-center">
  <img src="https://framerusercontent.com/images/C8iXhZOAtTSW3ZP6tIsYg6xPIlU.png" alt="" className="h-full w-full object-cover" />
</div>
      </div>

      <div className="flex flex-col gap-6 z-50 inset-x-0 text-center overflow-hidden absolute items-center justify-center h-full max-h-full ">
<div className=" justify-center flex items-center w-full ">
 <OrbitingCirclesDemo/>
 </div>

<div className=" w-full flex flex-col items-center gap-4 justify-center">
        <h1 className="text-white text-3xl font-bold ">
          Collaborate join and grow!
        </h1>
        <p className="text-gray-300 text-base ">
         Are you ready to scale the unscalable? Talk with <br /> us to get a tailored approach to your business! <span className="text-yellow-400">✨</span>
        </p>
        
          <button className="text-sm text-white font-medium relative w-[20%] bg-blue-800  dark:text-white px-4 py-2 rounded-full" data-cal-namespace="conferio-bookings"
	  data-cal-link="kanishkkb18/conferio-bookings"
	  data-cal-config='{"layout":"month_view"}'
	  >
            <span>Book a demo</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px" />
        </button>

        
      </div>
</div>
      {/* Right section with images */}
      <div className="w-1/2 relative h-full max-h-full overflow-hidden">
      
 <div className="-z-10 absolute top-0 right-0 w-full h-full flex items-center overflow-hidden rounded-r-[20px] justify-center">
  <img src="https://framerusercontent.com/images/XBtz1phaWuFmJnHyQtKgezPJHUU.png" alt="" className="h-full w-full object-cover" />
</div>
</div>

    </div>
  );
};

export default PromoCard;
