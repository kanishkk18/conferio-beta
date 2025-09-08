import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link  from "next/link";
import { cn } from "@/lib/utils";
import { useTranslation } from 'next-i18next';
import Image from "next/image";


function FloatingNavbar({ className }: any) {
  const { scrollYProgress } = useScroll();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [navWidth, setNavWidth] = useState("90%");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [blur, setBlur] = useState("0px");
   const { t } = useTranslation('common');

  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious?.();
      const direction = previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.03) {
        setVisible(true);
        setNavWidth("82%");
        setBackgroundColor("transparent");
        setBlur("0px");
      } else {
        if (direction < 0) {
          setVisible(false);
          setNavWidth("65%");
          setBackgroundColor("rgb(13,13,13)");
          setBlur("90px");
        } else {
          setVisible(true);
          setNavWidth("60%");
          setBackgroundColor("rgb(13,13,13)");
          setBlur("90px");
        }
      }
    }
  });

  const navLinks = [
    {
      name: "create room",
      links: [
        
        { title: "Dashboard", href: "/maindashboard" },
        { title: "schedule meeting", href: "/calendar/page" },
        { title: "join meeting", href: "/meetings/page" },
      ],
    },
    {
      name: "Pricing",
      links: [ 
        { title: "Individual", href: "/pricing" },
      ],
    },
    {
      name: "Support",
      links: [
        { title: "FAQ", href: "/support" },
      ],
    },
  ];

  const handleMouseEnter = (index: number) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150); // Adds a delay before hiding the dropdown
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className={cn(
          "hidden sm:flex fixed z-[5000] text-white top-3 inset-x-0 mx-auto px-4 py-2 rounded-full items-center justify-between",
          className
        )}
        style={{
          borderRadius: "30px",
          width: navWidth,
          backgroundColor: backgroundColor,
          backdropFilter: `blur(${blur})`,
          transition:
            "width 0.3s ease, background-color 0.3s ease, backdrop-filter 0.3s ease",
        }}
      >
        <Link href="/" className="flex items-center space-x-1">
          <Image height={1000} width={1000}
            src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png"
            alt="logo"
            className="text-black p-1 rounded-md h-12 w-12"
          />
        </Link>

        <div className="flex items-center space-x-6">
          {navLinks.map((navLink, index) => (
            <div
              key={navLink.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="#" className="relative flex items-center">
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 rounded-[20px] bg-neutral-800"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.15 } }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10 text-sm text-white font-normal py-2 px-3 rounded-[20px] hover:text-neutral-300">
                  {navLink.name}
                </span>
              </Link>

              {/* Dropdown for sub-links */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-[150px] bg-black border items-center justify-center  border-white/[0.2] p-4 rounded-lg space-y-2 z-50"
                >
                  {navLink.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="block text-white hover:text-gray-300"
                    >
                      {link.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <button className="border text-sm text-white font-medium relative border-white/[0.2] dark:text-white px-4 py-2 rounded-full">
          <Link
          href="/auth/join"
         className="btn btn-primary btn-md py-3 px-2 sm:px-4 text-white">
                            {t('sign-up')}
                          </Link>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default FloatingNavbar;