import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  CheckCircle2,
  Copy,
  Terminal,
  Activity,
  Wrench,
  ShieldCheck,
  Zap,
  Monitor,
} from "lucide-react";

import { motion } from "framer-motion";

const ResultPanel = ({ result }) => {
  if (!result) return null;

  //  Parse Result
  let parsedResult =
    typeof result === "object"
      ? { ...result }
      : { analysis: result };

  const formatText = (data) => {
    if (!data) return "";

    if (typeof data === "object") {
      return JSON.stringify(data, null, 2);
    }

    return String(data).replace(/\\n/g, "\n");
  };

  //  Copy Full Report
  const copyToClipboard = () => {
    const textToCopy = `
Analysis:
${formatText(parsedResult.analysis)}

Fix:
${formatText(parsedResult.fix)}

Validation:
${formatText(parsedResult.validation)}
`;

    navigator.clipboard.writeText(textToCopy);

    alert("Report copied to clipboard!");
  };

  //  Markdown Renderer
  const MarkdownComponent = ({ content }) => (
    <ReactMarkdown
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <div className="relative my-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
              
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <span className="text-[10px] uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Terminal size={12} />
                  {match[1]}
                </span>
              </div>

              <SyntaxHighlighter
                style={atomDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.85rem",
                  background: "#020617",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code
              className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 text-xs"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {formatText(content)}
    </ReactMarkdown>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full space-y-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        
        <div className="flex items-center gap-2 text-green-400">
          <CheckCircle2 size={18} />
          <h2 className="text-sm font-bold uppercase tracking-wider">
            Diagnostic Report
          </h2>
        </div>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-all duration-300 border border-slate-700 px-3 py-2 rounded-lg text-xs text-slate-300"
        >
          <Copy size={14} />
          Copy Report
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="space-y-5 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">

        {/* Root Cause */}
        {parsedResult.analysis && (
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <Activity size={16} />
              <h3 className="text-xs uppercase tracking-widest font-bold">
                Root Cause Analysis
              </h3>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
              <MarkdownComponent content={parsedResult.analysis} />
            </div>
          </section>
        )}

        {/* Recommended Fix */}
        {parsedResult.fix && (
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Wrench size={16} />
              <h3 className="text-xs uppercase tracking-widest font-bold">
                Recommended Fix
              </h3>
            </div>

            <div className="space-y-5">

              {/* Windows */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                
                <div className="flex items-center gap-2 mb-3 text-blue-400">
                  <Monitor size={15} />
                  <h4 className="font-semibold text-sm">
                    Windows Fix
                  </h4>
                </div>

                <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                  <MarkdownComponent content={parsedResult.fix} />
                </div>
              </div>

              {/* Linux */}
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                
                <div className="flex items-center gap-2 mb-3 text-orange-400">
                  <Terminal size={15} />
                  <h4 className="font-semibold text-sm">
                    Linux/macOS Fix
                  </h4>
                </div>

                <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                  <MarkdownComponent content={parsedResult.fix} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Validation */}
        {parsedResult.validation && (
          <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">

            <div className="flex items-center gap-2 mb-4 text-amber-400">
              <ShieldCheck size={16} />
              <h3 className="text-xs uppercase tracking-widest font-bold">
                Risk & Validation
              </h3>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed">
              <MarkdownComponent content={parsedResult.validation} />
            </div>
          </section>
        )}

        {/* Terminal Command */}
        {parsedResult.auto_fix && (
          <section className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5">

            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Zap size={16} />
              <h3 className="text-xs uppercase tracking-widest font-bold">
                Terminal Command
              </h3>
            </div>

            <MarkdownComponent
              content={`\`\`\`bash\n${parsedResult.auto_fix}\n\`\`\``}
            />
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default ResultPanel;