import React from "react";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-slate-200">
      {/* Modern Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
              A
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">
              AI Pipeline <span className="text-blue-500">Autofixer</span>
            </span>
          </div>
          <div className="flex gap-4">
            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              System Ready
            </span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6">
        <Home />
      </main>
    </div>
  );
}

export default App;