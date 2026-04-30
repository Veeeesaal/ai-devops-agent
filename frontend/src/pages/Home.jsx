import React, { useState } from "react";
import LogInput from "../components/LogInput";
import ResultPanel from "../components/ResultPanel";
import Loader from "../components/Loader";
import { analyzeLogs } from "../services/api";
import { Terminal, Cpu, Zap } from "lucide-react"; // Icons ke liye

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (logs) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await analyzeLogs(logs);
      setResult(res);
    } catch (err) {
      setResult({ analysis: "❌ Error connecting to backend. Please check if FastAPI is running." });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-6">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Automated <span className="text-blue-500">CI/CD Autofixer</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Apne pipeline ke error logs niche paste karein. Hamara AI agent unhe analyze karke aapko fix aur code suggestion dega.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Input Area */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4 text-blue-400">
            <Terminal size={20} />
            <h3 className="font-medium">Paste Pipeline Logs</h3>
          </div>
          <LogInput onSubmit={handleAnalyze} loading={loading} />
          
          {/* Features Tag */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/30 p-2 rounded-lg">
              <Cpu size={14} /> Powered by Groq AI
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/30 p-2 rounded-lg">
              <Zap size={14} /> Real-time Analysis
            </div>
          </div>
        </div>

        {/* Right Side: Result Area */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm min-h-[400px] flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-purple-400">
            <Zap size={20} />
            <h3 className="font-medium">AI Analysis & Fix</h3>
          </div>
          
          <div className="flex-grow relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <ResultPanel result={result} />
            )}

            {!loading && !result && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 border-2 border-dashed border-slate-800 rounded-xl py-20">
                <p>Waiting for logs to analyze...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;