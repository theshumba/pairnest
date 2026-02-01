"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";
import ShinyButton from "@/components/ui/ShinyButton";

interface HoloModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const HoloModal = ({ isOpen, onClose, title, children }: HoloModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              className="pointer-events-auto w-full max-w-sm relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF00CC] via-[#00FFFF] to-[#CCFF00] opacity-75 blur-lg animate-pulse" />

              <div className="relative bg-[#2a0a3d] border-2 border-white/50 rounded-3xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase italic">
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="text-white" />
                    </button>
                  </div>

                  <div className="text-white/90">{children}</div>

                  <div className="mt-6">
                    <ShinyButton variant="cyan" onClick={onClose}>
                      CLOSE
                    </ShinyButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
