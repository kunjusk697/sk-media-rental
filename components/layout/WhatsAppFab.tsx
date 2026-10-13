"use client";

import { whatsappUrl } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappUrl(
        "Hi Royal Specs, I would like help choosing the perfect frames.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[5.25rem] right-[max(1rem,calc((100vw-28rem)/2+1rem))] z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 md:right-[calc((100vw-28rem)/2+1.25rem)]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
}
