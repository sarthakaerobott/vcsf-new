import { motion } from "motion/react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, CheckCircle } from "lucide-react";
import { useState } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzKJnB413FaD7BEfoKyrVNgg6gaGvfWEkdFvykzcIBFuf6BrckbYbVM_N_i7nwJlYHaZg/exec";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>("idle");

  // ── Shared fetch helper ──────────────────────────────────────
  async function postToSheet(payload: object) {
    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: true,
    });
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionTime, ...payload }),
    });
  }

  // ── Contact form submit ──────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("loading");
    try {
      await postToSheet({
        formType: "contact",
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setContactStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setContactStatus("idle"), 3000);
    } catch {
      setContactStatus("error");
      setTimeout(() => setContactStatus("idle"), 3000);
    }
  };

  // ── Newsletter form submit ───────────────────────────────────
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    try {
      await postToSheet({
        formType: "newsletter",
        email: newsletterEmail,
      });
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    } catch {
      setNewsletterStatus("error");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0F2C59] mb-2" style={{ fontSize: "2rem", fontWeight: 700 }}>
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>

            {/* Contact success state */}
            {contactStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 gap-4 text-center"
              >
                <CheckCircle className="w-14 h-14 text-green-500" />
                <h3 className="text-xl font-bold text-[#0F2C59]">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#0F2C59] mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#0F2C59] mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#0F2C59] mb-2">Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>

                {contactStatus === "error" && (
                  <p className="text-sm text-red-500">Failed to send. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={contactStatus === "loading"}
                  className="w-full px-8 py-4 bg-[#D4AF37] text-[#0F2C59] rounded-lg hover:bg-[#E5C158] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600 }}
                >
                  {contactStatus === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0F2C59] mb-8" style={{ fontSize: "2rem", fontWeight: 700 }}>
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#0F2C59]" />
                </div>
                <div>
                  <h3 className="text-[#0F2C59] mb-1" style={{ fontWeight: 600 }}>Address</h3>
                  <p className="text-gray-600">
                    Aerobott, Ground Floor, Hotel Sahara Star
                    <br />
                    Vile Parle East, Mumbai
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#0F2C59]" />
                </div>
                <div>
                  <h3 className="text-[#0F2C59] mb-1" style={{ fontWeight: 600 }}>Phone</h3>
                  <p className="text-gray-600">+91 96609 90000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#0F2C59]" />
                </div>
                <div>
                  <h3 className="text-[#0F2C59] mb-1" style={{ fontWeight: 600 }}>Email</h3>
                  <p className="text-gray-600">vaishyacommunitystartupfoundat@gmail.com</p>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-[#0F2C59] mb-4" style={{ fontWeight: 600 }}>Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61565981560352&sk=followers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0F2C59] rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                  >
                    <Facebook className="w-6 h-6 text-white group-hover:text-[#0F2C59]" />
                  </a>
                  <a
                    href="https://www.instagram.com/vaishyacommunitystartupfoundat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0F2C59] rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                  >
                    <Instagram className="w-6 h-6 text-white group-hover:text-[#0F2C59]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vaishya-community-55120232b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#0F2C59] rounded-lg flex items-center justify-center hover:bg-[#D4AF37] transition-all duration-300 group"
                  >
                    <Linkedin className="w-6 h-6 text-white group-hover:text-[#0F2C59]" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#F5F5F5] rounded-2xl p-12 text-center"
        >
          <h2 className="text-[#0F2C59] mb-4" style={{ fontSize: "2rem", fontWeight: 700 }}>
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest news, events, and opportunities from our community
          </p>

          {newsletterStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-[#0F2C59] font-semibold">You're subscribed! Thank you.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                  placeholder="Enter your email"
                  required
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-8 py-4 bg-[#D4AF37] text-[#0F2C59] rounded-lg hover:bg-[#E5C158] transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontWeight: 600 }}
                >
                  {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {newsletterStatus === "error" && (
                <p className="text-sm text-red-500 mt-3">Failed to subscribe. Please try again.</p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}