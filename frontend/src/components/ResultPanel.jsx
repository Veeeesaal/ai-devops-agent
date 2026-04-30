import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CheckCircle2, Copy, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const ResultPanel = ({ result }) => {
  if (!result) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.analysis);
    alert("Solution copied to clipboard!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-green-500/20 p-1 rounded-md">
            <CheckCircle2 size={16} className="text-green-400" />
          </div>
          <span className="font-bold uppercase tracking-widest text-[10px] text-slate-300">
            Analysis Complete
          </span>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-1.5 px-3 rounded-lg transition-all border border-slate-700 active:scale-95"
        >
          <Copy size={14} />
          Copy Fix
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow bg-slate-950/40 rounded-xl border border-slate-800/50 p-5 overflow-y-auto max-h-[550px] custom-scrollbar shadow-inner">
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown 
            components={{
              // Multi-line code blocks with Syntax Highlighting
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative my-4 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
                    <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Terminal size={12} /> {match[1]}
                      </span>
                    </div>
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: '0.85rem',
                        background: '#0a0a0a',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono text-xs border border-blue-500/20" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {result.analysis}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 flex items-center gap-3">
        <div className="text-blue-400 animate-pulse">
            <Sparkles size={14} />
        </div>
        <span className="text-[11px] text-slate-400 leading-relaxed">
          AI Agent has analyzed the traceback. Ensure you have the right permissions before running the suggested commands.
        </span>
      </div>
    </motion.div>
  );
};

export default ResultPanel;