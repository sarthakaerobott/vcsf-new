import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F2C59] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Mission */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-lg p-1.5">
                <img
                  src="/assets/logo.png"
                  alt="Vaishya Community Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl tracking-tight leading-none" style={{ fontWeight: 800 }}>
                Vaishya <span className="text-[#D4AF37]">Community</span>
              </span>
            </div>
            <p className="text-white/80 leading-relaxed max-w-sm">
              Building unity through education, entrepreneurship, and service.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Success Stories
                </a>
              </li>
              {/*<li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Events
                </a>
              </li>*/}
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="mb-4" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Programs</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Funding Support
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Mentorship
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Skill Development
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Networking Events
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Business Workshops
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="mb-4" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Downloads
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#D4AF37] transition-colors duration-300">
                  Guidelines
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-white/60 text-sm">
              © Vaishya Community Startup Foundation
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61565981560352&sk=followers"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/vaishyacommunitystartupfoundat/"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/vaishya-community-55120232b/"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>

            </div>

            {/* Legal Links */}
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
