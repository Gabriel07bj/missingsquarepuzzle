
import React, { useState } from 'react';
import { PIECES, GRID_SIZE } from './constants';
import { HintMode } from './types';
import PuzzlePiece from './components/PuzzlePiece';
import ExplanationModal from './components/ExplanationModal';

const App: React.FC = () => {
  const [hintMode, setHintMode] = useState<HintMode>(HintMode.NONE);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReset = () => {
    window.dispatchEvent(new CustomEvent('reset-pieces'));
    setHintMode(HintMode.NONE);
  };

  const cycleHint = () => {
    setHintMode(prev => {
      if (prev === HintMode.NONE) return HintMode.SOLID;
      if (prev === HintMode.SOLID) return HintMode.HOLE;
      return HintMode.NONE;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 select-none">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            ?
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Missing Square Paradox</h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Geometry Challenge</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Reset
          </button>
          <button 
            onClick={cycleHint}
            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-sm ${
              hintMode !== HintMode.NONE ? 'bg-amber-100 text-amber-700' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {hintMode === HintMode.NONE ? 'Show Hint' : hintMode === HintMode.SOLID ? 'Next Hint' : 'Hide Hint'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            Reveal Secret
          </button>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden relative">
        
        {/* The Game Board */}
        <div 
          id="game-container"
          className="relative bg-white rounded-2xl shadow-2xl border-2 border-slate-200 grid-pattern overflow-hidden"
          style={{ width: 640, height: 400 }}
        >
          {/* Guide SVG */}
          <svg className="absolute inset-0 pointer-events-none z-0">
             {/* Base Reference Frame (13x5 Triangle) */}
             <path 
                d={`M40,320 L560,320 L40,120 Z`} 
                fill="none" 
                stroke="#94a3b8" 
                strokeWidth="2" 
                strokeDasharray="8,8" 
                className="opacity-30"
             />
             
             {/* Dimensions Labels */}
             <text x="50" y="310" fill="#94a3b8" fontSize="12" fontWeight="bold">HEIGHT: 5</text>
             <text x="280" y="340" fill="#94a3b8" fontSize="12" fontWeight="bold">WIDTH: 13</text>

             {/* Hint 1: Solid (Arrangement A) */}
             <g className={`transition-opacity duration-500 ${hintMode === HintMode.SOLID ? 'opacity-40' : 'opacity-0'}`}>
                {/* Red Triangle */}
                <path d="M40,320 L360,320 L40,200 Z" fill="none" stroke="red" strokeWidth="3" />
                {/* Blue Triangle */}
                <path d="M360,200 L560,200 L360,120 Z" fill="none" stroke="blue" strokeWidth="3" />
                {/* Rect Block area */}
                <rect x="360" y="200" width="200" height="120" fill="none" stroke="green" strokeWidth="2" strokeDasharray="4,4" />
                <text x="200" y="160" fill="black" fontWeight="bold" fontSize="24">Form 1: The "Straight" Triangle</text>
             </g>

             {/* Hint 2: Hole (Arrangement B) */}
             <g className={`transition-opacity duration-500 ${hintMode === HintMode.HOLE ? 'opacity-40' : 'opacity-0'}`}>
                {/* Blue Triangle */}
                <path d="M40,320 L240,320 L40,240 Z" fill="none" stroke="blue" strokeWidth="3" />
                {/* Red Triangle */}
                <path d="M240,240 L560,240 L240,120 Z" fill="none" stroke="red" strokeWidth="3" />
                {/* Rect Block area */}
                <rect x="240" y="240" width="320" height="80" fill="none" stroke="green" strokeWidth="2" strokeDasharray="4,4" />
                {/* The Hole */}
                <rect x="360" y="240" width="40" height="40" fill="#ef4444" opacity="0.8" />
                <text x="200" y="80" fill="#ef4444" fontWeight="bold" fontSize="24">Form 2: The Mystery Hole</text>
             </g>
          </svg>

          {/* Puzzle Pieces */}
          {PIECES.map(piece => (
            <PuzzlePiece 
              key={piece.id} 
              data={piece} 
              onDragStart={() => {}}
              onDragEnd={() => {}}
            />
          ))}
        </div>

        {/* Mission Card */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow-lg border border-slate-200 max-w-2xl w-full z-20">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
             </div>
             <h3 className="font-bold text-slate-800 text-lg">Active Missions</h3>
          </div>
          <ul className="space-y-3 text-slate-600 text-sm">
            <li className="flex gap-3">
              <span className="font-bold text-indigo-600">01</span>
              <span>Drag the pieces to fit exactly within the dashed triangle frame. Can you make it look perfectly full?</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-indigo-600">02</span>
              <span>Swap the positions of the <span className="font-semibold text-red-500">Red</span> and <span className="font-semibold text-blue-600">Blue</span> triangles. Fit the other pieces. Where did the hole come from?</span>
            </li>
            <li className="flex gap-3 italic">
              <span className="font-bold text-slate-400">TIP</span>
              <span>No rotation needed. Simply drag and drop to snap to the grid!</span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="py-4 text-center text-xs text-slate-400 font-medium border-t border-slate-100 bg-white">
        Curry's Paradox Puzzle &bull; Interactive Geometry Explorer &bull; Powered by Gemini 3.0
      </footer>

      {/* AI Explanation Modal */}
      <ExplanationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;
