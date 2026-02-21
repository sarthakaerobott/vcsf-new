import { HeroSection } from "./components/hero-section";
import { SuccessStories } from "./components/success-stories";
import { CallToAction } from "./components/call-to-action";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero Carousel */}
      <HeroSection />
      
      {/* Section 2: Success Stories / Testimonials */}
      <SuccessStories />
      
      {/* Section 3: Call to Action */}
      <CallToAction />
      
      {/* Section 4: Contact & Newsletter */}
      <ContactSection />
      
      {/* Section 5: Footer */}
      <Footer />
    </div>
  );
}