
import React, { useState, useEffect } from 'react';
import { getParadoxExplanation } from '../services/geminiService';

interface ExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getParadoxExplanation().then(res => {
        setContent(res);
        setLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-800">The Mathematical Truth</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto text-slate-700 leading-relaxed">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 animate-pulse font-medium">Consulting Gemini for the solution...</p>
            </div>
          ) : (
            <div className="prose prose-slate prose-indigo">
               <p className="whitespace-pre-wrap">{content}</p>
               <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 italic text-sm text-indigo-900">
                  <span className="font-bold">Summary:</span> Arrangement A is slightly bent inwards (concave), while Arrangement B is slightly bent outwards (convex). The difference in area of those two thin triangles equals exactly 1 square unit!
               </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all active:scale-95"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationModal;
