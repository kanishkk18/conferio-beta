import React from 'react';

const Keyboard = () => {
  return (
    <div className="absolute md:relative rounded-xl bg-zinc-800 p-1 scale-[1.7] translate-x-10 w-fit h-fit mx-auto">
      {/* First Row */}
      <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        {/* ESC Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">esc</div>
          </div>
        </div>
        {/* F1 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M12 5l0 .01"></path>
                <path d="M17 7l0 .01"></path>
                <path d="M19 12l0 .01"></path>
                <path d="M17 17l0 .01"></path>
                <path d="M12 19l0 .01"></path>
                <path d="M7 17l0 .01"></path>
                <path d="M5 12l0 .01"></path>
                <path d="M7 7l0 .01"></path>
              </svg>
              <span className="inline-block mt-1">F1</span>
            </div>
          </div>
        </div>
        {/* F2 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M12 5l0 -2"></path>
                <path d="M17 7l1.4 -1.4"></path>
                <path d="M19 12l2 0"></path>
                <path d="M17 17l1.4 1.4"></path>
                <path d="M12 19l0 2"></path>
                <path d="M7 17l-1.4 1.4"></path>
                <path d="M6 12l-2 0"></path>
                <path d="M7 7l-1.4 -1.4"></path>
              </svg>
              <span className="inline-block mt-1">F2</span>
            </div>
          </div>
        </div>
        {/* F3 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
                <path d="M3 10h18"></path>
                <path d="M10 3v18"></path>
              </svg>
              <span className="inline-block mt-1">F3</span>
            </div>
          </div>
        </div>
        {/* F4 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
              </svg>
              <span className="inline-block mt-1">F4</span>
            </div>
          </div>
        </div>
        {/* F5 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"></path>
                <path d="M5 10a7 7 0 0 0 14 0"></path>
                <path d="M8 21l8 0"></path>
                <path d="M12 17l0 4"></path>
              </svg>
              <span className="inline-block mt-1">F5</span>
            </div>
          </div>
        </div>
        {/* F6 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
              </svg>
              <span className="inline-block mt-1">F6</span>
            </div>
          </div>
        </div>
        {/* F7 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M21 5v14l-8 -7z"></path>
                <path d="M10 5v14l-8 -7z"></path>
              </svg>
              <span className="inline-block mt-1">F7</span>
            </div>
          </div>
        </div>
        {/* F8 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M4 5v14l12 -7z"></path>
                <path d="M20 5l0 14"></path>
              </svg>
              <span className="inline-block mt-1">F8</span>
            </div>
          </div>
        </div>
        {/* F9 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M3 5v14l8 -7z"></path>
                <path d="M14 5v14l8 -7z"></path>
              </svg>
              <span className="inline-block mt-1">F9</span>
            </div>
          </div>
        </div>
        {/* F10 Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
                <path d="M16 10l4 4m0 -4l-4 4"></path>
              </svg>
              <span className="inline-block mt-1">F10</span>
            </div>
          </div>
        </div>
        {/* F11 Key */}
                {/* F12 Key */}
                <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[6px] w-[6px]">
                <path d="M15 8a5 5 0 0 1 0 8"></path>
                <path d="M17.7 5a9 9 0 0 1 0 14"></path>
                <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"></path>
              </svg>
              <span className="inline-block mt-1">F12</span>
            </div>
          </div>
        </div>
        {/* Power Button */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
              <div className="h-4 w-4 rounded-full bg-gradient-to-b from-20% from-neutral-900 via-black via-50% to-neutral-900 to-95% p-px">
                <div className="bg-black h-full w-full rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Number Row */}
      <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        {['~`', '!1', '@2', '#3', '$4', '%5', '^6', '&7', '*8', '(9', ')0', '—_', '+='].map((symbols, index) => (
          <div key={index} className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
            <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
              <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                {symbols.split('').map((char, i) => (
                  <span key={i} className="block">{char}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Delete Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-end pr-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-end text-white">delete</div>
          </div>
        </div>
      </div>

      {/* Tab Row */}
      <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-10 items-end justify-start pl-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">tab</div>
          </div>
        </div>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'].map((key, index) => (
          <div key={index} className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
            <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
              <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                <span className="block">{key}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Caps Lock Row */}
      <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">caps lock</div>
          </div>
        </div>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';:', '"\'',].map((key, index) => (
          <div key={index} className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
            <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
              <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                {key.split('').map((char, i) => (
                  <span key={i} className="block">{char}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Return Key */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-end text-white">return</div>
          </div>
        </div>
      </div>

      {/* Shift Row */}
      <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-start text-white">shift</div>
          </div>
        </div>
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<,', '>.', '?/'].map((key, index) => (
          <div key={index} className={`p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100 ${(key === 'C' || key === 'V') ? 'scale-100' : ''}`}>
            <div className="h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
              <div className="text-[5px] w-full flex justify-center items-center flex-col text-white">
                {key.split('').map((char, i) => (
                  <span key={i} className="block">{char}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {/* Right Shift */}
        <div className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
          <div className="h-6 bg-[#0A090D] rounded-[3.5px] flex w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]" style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
            <div className="text-[5px] w-full flex justify-center flex-col items-end text-white">shift</div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        {/* Function Keys */}
        {['fn', 'control', 'option', 'command', 'space', 'command', 'option'].map((key, index) => (
          <div key={index} className="p-[0.5px] rounded-[4px] bg-white/[0.2] shadow-md shadow-white/50 hover:shadow-none hover:scale-[0.98] cursor-pointer transition duration-100">
            <div className={`h-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center ${
              key === 'space' ? 'w-[8.2rem]' : key === 'command' ? 'w-8' : 'w-6'
            }`} style={{ boxShadow: 'rgb(13, 13, 15) 0px -0.5px 2px 0px inset, rgb(13, 13, 15) -0.5px 0px 2px 0px inset' }}>
              <div className="text-[5px] w-full flex items-center flex-col h-full justify-between py-[4px] text-white">
                {/* Add appropriate icons/text for each key */}
              </div>
            </div>
          </div>
        ))}
        {/* Arrow Keys */}
        <div className="w-[4.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center">
          {/* Arrow keys structure */}
        </div>
      </div>
    </div>
  );
};

export default Keyboard;