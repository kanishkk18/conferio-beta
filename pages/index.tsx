// import Link from 'next/link';
import { type ReactElement } from 'react';
import type { NextPageWithLayout } from 'types/index';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import env from '@/lib/env';
import { Hero } from '@/components/landingpage/Hero';
import Integration from '@/components/landingpage/integration';
import Phone from '@/components/ui/phone';
import Opportunity from '@/components/landingpage/opportunity';
import PromoCard from "@/components/landingpage/Promocard"
import Testimonials from '@/components/landingpage/testimonials';
import Cta from '@/components/landingpage/cta';
import FloatingNavbar from '@/components/ui/navbar';
// import Footer from '@/components/landingpage/footer';
// import { signIn, getSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import {  useState } from 'react'
// import { IntroDisclosureDemo } from '@/components/ui/IntroDisclosureDemo';
// import MagicBento from '@/components/ui/MagicBento';
// import CircularText from '@/components/ui/CircularTextLoader';
// import Link from 'next/link';
// import Keyboard from '@/components/ui/keyboard';
// import { CardStack } from '@/components/ui/card-stack';
// const CARDS = [
  
//     {
//       id: 0,
//       name: "Satoshi Nakamoto",
//       designation: "Blockchain Pioneer",
//       content: (
//         <p>
//           The Proof of Transaction (POT) concept is a game-changer. 
//           Transparent, secure, and lightning-fast transactions make this a must-have for the 
//           crypto community.
//         </p>
//       ),
//     },
//     {
//       id: 1,
//       name: "Vitalik Buterin",
//       designation: "Ethereum Co-Founder",
//       content: (
//         <p>
//          POT is redefining crypto transparency. It's exactly what we need 
//           for seamless and verifiable transactions across decentralized networks.
//         </p>
//       ),
//     },
//     {
//       id: 2,
//       name: "CZ Binance",
//       designation: "Crypto Exchange Mogul",
//       content: (
//         <p>
//           With POT integration, tracking transactions has never been easier. 
//           This could be the future of verifiable and decentralized financial proof.
//         </p>
//       ),
//     },
//   ];

const Home: NextPageWithLayout = () => {
  //  const router = useRouter()
  // const [loading, setLoading] = useState(false)
  //   const [isAppleHovered, setIsAppleHovered] = useState(false);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const session = await getSession()
  //     if (session) {
  //       router.push('/maindashboard')
  //     }
  //   }
  //   checkSession()
  // }, [router])
  return (
    <>
      <div className="">

        <FloatingNavbar/>
      {/* <IntroDisclosureDemo/> */}
        <Hero/>
        <Integration />
        {/* <MagicBento
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/> */}
{/* <CircularText
  text="CONFERIO*CALLS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/> */}
        <Phone/>
      <Opportunity/>
      <div className="mx-16 my-20">
        <PromoCard/>
        </div>
        <Testimonials />
        <Cta />
        {/* <div className="md:min-h-screen overflow-hidden hidden w-full md:flex justify-start px-72 items-center z-50 bg-gray-950 my-32">
        <div className="flex justify-start ">
      <Keyboard/>
      </div>

      <div className=" h-[400px] w-[450px] rounded-2xl z-50 ml-20 px-8 bg-neutral-900 flex justify-center items-center">
      <CardStack items={CARDS} />
    </div>
      </div>

     

      <div className="md:min-h-screen md:hidden flex w-full justify-start items-center z-50 bg-gray-950 my-24">
        <div className="flex justify-start ">
     <img src="https://www.fey.com/marketing/_next/static/media/keyboard_2x.3a539063.jpg" alt="" />
      </div>

      <div className=" h-[150px] w-[150px] rounded-2xl absolute right-2 flex-col pt-6  px-8 bg-neutral-900 flex justify-center items-center">
      <CardStack items={CARDS} />
    </div>
      </div>

         <section className="bg-black py-16 ">
      
      <div className=" max-w-3xl lg:max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-8">
            <button className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors">
              <span>Watch the guided tour</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.25 14.75V9.25L14.75 12L10.25 14.75Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-300">
              Crypto is finally effortless.
            </span>
          </h2>

          <Link href="#"  onMouseEnter={() => setIsAppleHovered(true)}
            onMouseLeave={() => setIsAppleHovered(false)} className="border text-white px-5 py-2 rounded-full font-semibold hover:text-gray-900 hover:bg-gray-100 transition-colors">
      Join it today
          </Link>
        </div>

        <div className="relative h-[297px] w-full">
          
          <div className="absolute inset-0 flex justify-center">
            <img
              src="https://www.fey.com/marketing/_next/static/media/light.2e8d1e67.svg"
              alt=""
              className="w-[1140px] h-full object-cover"
            />
          </div>

          <img
            src="https://www.fey.com/marketing/_next/static/media/shadow.438a35a1.svg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          
          <img
            src="https://www.fey.com/marketing/_next/static/media/laptop-closed-off_4x.434654c4.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0">
            <img
              src="https://www.fey.com/marketing/_next/static/media/laptop-closed-on_4x.06eb6128.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

         
          <div 
            className="absolute inset-0"
            onMouseEnter={() => setIsAppleHovered(true)}
            onMouseLeave={() => setIsAppleHovered(false)}
          >
            <img
              src="https://www.fey.com/marketing/_next/static/media/apple-unhovered_4x.f4daffa8.png"
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                isAppleHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <img
              src="https://www.fey.com/marketing/_next/static/media/apple-hovered_4x.981e3b1f.png"
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                isAppleHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>
      </div>
    </section> */}
        {/* <Footer/> */}
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Redirect to login page if landing page is disabled
  if (env.hideLandingPage) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};


Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
