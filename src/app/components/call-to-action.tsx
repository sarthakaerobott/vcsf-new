import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BecomeMemberModal } from "./become-a-member";

export function CallToAction() {
  const [showQR, setShowQR] = useState(false);
  const [showMember, setShowMember] = useState(false);

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-[#0F2C59] to-[#082040] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6" style={{ fontSize: "3rem", fontWeight: 700 }}>
              Join the Movement. Build the Future.
            </h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
              Be part of a thriving community that's shaping the future of entrepreneurship
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowMember(true)}
                className="px-10 py-4 bg-[#D4AF37] text-[#0F2C59] rounded-xl hover:bg-[#E5C158] transition-all duration-300 shadow-2xl hover:shadow-[#D4AF37]/50 min-w-[220px]"
                style={{ fontWeight: 600, fontSize: "1.125rem" }}
              >
                Become a Member
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowQR(true)}
                className="px-10 py-4 bg-transparent text-white border-2 border-white rounded-xl hover:bg-white hover:text-[#0F2C59] transition-all duration-300 shadow-2xl min-w-[220px]"
                style={{ fontWeight: 600, fontSize: "1.125rem" }}
              >
                Donate Now
              </motion.button>
            </div>
          </motion.div>
        </div>
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