import { motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

function CustomArrow({ onClick, direction }: { onClick?: () => void; direction: "left" | "right" }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === "left" ? "left-4" : "right-4"
      } z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all duration-300`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
}

export function SuccessStories() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      business: "Kumar Tech Solutions",
      image: "/assets/rajesh.jfif",
      text: "The mentorship and funding support helped me scale my startup from a small office to a 50+ employee company. Truly transformational!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      business: "Sharma Exports",
      image: "/assets/priya.jfif",
      text: "Being part of this community opened doors I never knew existed. The network and resources are invaluable for any entrepreneur.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      business: "Patel Manufacturing",
      image: "/assets/amit.jfif",
      text: "From ideation to execution, the support was phenomenal. The community's collective wisdom helped me avoid costly mistakes.",
      rating: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#0F2C59] mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            Success Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from entrepreneurs who have transformed their businesses with our support
          </p>
        </motion.div>

        <div className="relative px-12">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-[#D4AF37]"
                    />
                    <h3 className="text-[#0F2C59] mb-1" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                      {testimonial.name}
                    </h3>
                    <p className="text-[#D4AF37] mb-4" style={{ fontWeight: 500 }}>
                      {testimonial.business}
                    </p>
                    <p className="text-gray-600 mb-4 min-h-[80px]">{testimonial.text}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
