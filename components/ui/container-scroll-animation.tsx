"use client";
import React, { useRef } from "react";
// import Image from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Image from "next/image";
// import HeroImage from "@/public/img/better.png";

export default function ContainerScroll ({
  // titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 2], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.6], [0, -100]);

  return (
    <div
      className="h-[40rem] md:h-[54rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  // children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-8xl -mt-72 mx-auto h-[30rem] md:h-[45rem] w-full border-4 border-[#3D3D3D] p-2 md:p-6 bg-[#000000] rounded-[30px] "
    >
      <div className=" h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl ">
        <Image height={1000} width={1000}
        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1730729897/CONFERIO/bmbhrbkat477mw40ozic.png"
        alt=""
        property=""
        className="h-full w-full object-cover"
        />
      </div>
    </motion.div>
  );
};
