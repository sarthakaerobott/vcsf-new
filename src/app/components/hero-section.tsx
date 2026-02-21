import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BecomeMemberModal } from "./become-a-member";




function CustomArrow({ onClick, direction }: { onClick?: () => void; direction: "left" | "right" }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "left" ? "left-6 md:left-12" : "right-6 md:right-12"
      } z-10 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-300`}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
    </button>
  );
}

interface SlideProps {
  image: string;
  heading: string;
  subheading: string;
  onDonateClick: () => void;
  onContactClick: () => void;
  onMemberClick: () => void;
}

function HeroSlide({ image, heading, subheading, onDonateClick, onContactClick, onMemberClick  }: SlideProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Subtle Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 12, ease: "linear" }}
      >
        <ImageWithFallback
          src={image}
          alt="Hero background"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.9) blur(2px)" }}
        />
        {/* Enhanced Dark Overlay for Better Readability */}
        <div className="absolute inset-0 bg-[#0F2C59]/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F2C59]/65 via-black/40 to-[#0F2C59]/55"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-[900px] mx-auto">

          {/* Top Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span
              className="text-[#D4AF37] text-sm md:text-base tracking-[0.2em] uppercase drop-shadow-lg"
              style={{ fontWeight: 600 }}
            >
              COMMUNITY • GROWTH • EMPOWERMENT
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-2xl"
            style={{ fontWeight: 700, lineHeight: 1.2 }}
          >
            {heading}
          </motion.h1>

          {/* Animated Gold Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-[#D4AF37] mx-auto mb-6 shadow-lg"
          />

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/90 text-lg md:text-xl lg:text-2xl mb-12 drop-shadow-lg"
            style={{ fontWeight: 500 }}
          >
            {subheading}
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-5">
            {/* Secondary Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-col md:flex-row gap-4 flex-wrap justify-center"
            >
              <button
                onClick={onMemberClick}
                className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-[10px] hover:bg-white hover:text-[#0F2C59] transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-lg min-w-[200px]"
                style={{ fontWeight: 600 }}
              >
                Become a Member
              </button>
              <button
                onClick={onDonateClick}
                className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-[10px] hover:bg-white hover:text-[#0F2C59] transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-lg min-w-[200px]"
                style={{ fontWeight: 600 }}
              >
                Donate / Support
              </button>
              <button
                onClick={onContactClick}
                className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-[10px] hover:bg-white hover:text-[#0F2C59] transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-lg min-w-[200px]"
                style={{ fontWeight: 600 }}
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1 },
          y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 cursor-pointer"
      >
        <ChevronDown className="w-6 h-6 drop-shadow-lg" />
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const [showQR, setShowQR] = useState(false);
  const [showMember, setShowMember] = useState(false);

  const handleContactClick = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };


  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80",
      heading: "Empowering Vaishya Entrepreneurs for a Stronger Future",
      subheading: "Supporting visionary leaders to build impactful businesses.",
    },
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80",
      heading: "Education. Innovation. Growth.",
      subheading: "Equipping the community with mentorship and practical knowledge.",
    },
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80",
      heading: "Fueling Startups with Strategic Support",
      subheading: "Connecting founders with funding and guidance.",
    },
    {
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80",
      heading: "Stronger Together as a Community",
      subheading: "Building networks that create lasting impact.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    cssEase: "ease-in-out",
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-8 w-full">
        <ul className="flex justify-center gap-3"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-all duration-300" />
    ),
  };

  return (
    <>
      <section className="hero-carousel">
        <style>{`
          .hero-carousel .slick-dots li button:before {
            display: none;
          }
          .hero-carousel .slick-dots li.slick-active button {
            background: #D4AF37;
            width: 36px;
            border-radius: 9999px;
          }
          .hero-carousel .slick-slide > div {
            height: 100vh;
          }
        `}</style>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <HeroSlide key={index} {...slide} onDonateClick={() => setShowQR(true)} onContactClick={handleContactClick} onMemberClick={() => setShowMember(true)}
/>
          ))}
        </Slider>
      </section>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[#0F2C59] text-xl mb-1" style={{ fontWeight: 700 }}>
                Donate via UPI
              </h3>
              <p className="text-gray-500 text-sm mb-4">Scan the QR code with any UPI app</p>
              <img
                src="/assets/PNB QR_page-0001.jpg"
                alt="PNB Donation QR Code"
                className="w-full rounded-xl border border-gray-100"
              />
              <button
                onClick={() => setShowQR(false)}
                className="mt-5 w-full py-2.5 bg-[#0F2C59] text-white rounded-xl text-sm hover:bg-[#082040] transition-colors"
                style={{ fontWeight: 600 }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BecomeMemberModal isOpen={showMember} onClose={() => setShowMember(false)} />
    </>
  );
}