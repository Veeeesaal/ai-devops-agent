import React, { useState } from "react";
import { Trash2, Send } from "lucide-react";

const LogInput = ({ onSubmit, loading }) => {
  const [logs, setLogs] = useState("");

  const handleClear = () => {
    setLogs("");
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="relative group flex-grow">
        {/* Terminal Header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800/80 rounded-t-xl border-b border-slate-700 flex items-center px-4 gap-1.5 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
          <span className="ml-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
            ci-cd-logs.log
          </span>
        </div>

        {/* Textarea */}
        <textarea
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
          placeholder="Paste your pipeline error logs here (e.g., Python Traceback, NPM errors, Docker build logs)..."
          className="w-full h-[350px] pt-12 pb-4 px-4 bg-slate-950/50 text-blue-100 font-mono text-sm rounded-xl border border-slate-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all resize-none scrollbar-thin scrollbar-thumb-slate-700"
        />

        {/* Floating Clear Button */}
        {logs && (
          <button
            onClick={handleClear}
            className="absolute bottom-4 right-4 p-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors border border-slate-700"
            title="Clear Logs"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Action Button */}
      <button
        className={`w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
          !logs || loading
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-[0.98]"
        }`}
        onClick={() => onSubmit(logs)}
        disabled={!logs || loading}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Analyzing Pipeline...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Analyze Logs</span>
          </>
        )}
      </button>
    </div>
  );
};

export default LogInput;