import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Code2, BrainCircuit, Terminal, Sparkles } from "lucide-react";

const Loader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: "Scanning Error Tracebacks...", icon: <Search size={18} /> },
    { text: "Identifying Root Cause...", icon: <BrainCircuit size={18} /> },
    { text: "Consulting Knowledge Base...", icon: <Terminal size={18} /> },
    { text: "Generating Fix Suggestions...", icon: <Code2 size={18} /> },
    { text: "Optimizing Solution...", icon: <Sparkles size={18} /> },
  ];

  // Steps rotate karne ke liye logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500); // Har 2.5 second mein step badlega
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-16 px-4">
      {/* Central Animated Logo/Scanner */}
      <div className="relative">
        {/* Outer Pulsing Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full"
        />
        
        {/* Main Rotating Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-2 border-dashed border-blue-500/40 rounded-full flex items-center justify-center"
        >
            <div className="w-20 h-20 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        </motion.div>

        {/* Static Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-blue-400">
           <motion.div
             animate={{ y: [0, -5, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
           >
             <BrainCircuit size={40} strokeWidth={1.5} />
           </motion.div>
        </div>
      </div>

      {/* Dynamic Status Text */}
      <div className="h-12 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 text-blue-400 font-mono text-sm tracking-wide"
          >
            {steps[currentStep].icon}
            <span>{steps[currentStep].text}</span>
          </motion.div>
        </AnimatePresence>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mt-3 font-semibold"
        >
          AI Agent at work
        </motion.p>
      </div>

      {/* Modern Progress Bar */}
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
        <motion.div
          animate={{ 
            x: ["-100%", "100%"] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        />
      </div>

      {/* Background Decorative Element */}
      <div className="text-slate-800 font-mono text-[8px] select-none absolute bottom-10 opacity-20 hidden lg:block">
        HEX_TRACE: 0x4F2A 0x89BC 0x1102 0xFA92
      </div>
    </div>
  );
};

export default Loader;