import React, { useState } from 'react';
import { FlashcardData, Language } from '../types';
import { RotateCcw, Lightbulb } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface FlashcardProps {
  data: FlashcardData;
  lang: Language;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, lang }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="group w-full max-w-md h-80 cursor-pointer perspective-1000 mx-auto my-6"
      onClick={handleFlip}
    >
      <div 
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 flex flex-col justify-between items-center text-center transition-colors">
            <div className="w-full flex justify-between items-start">
                <span className="bg-togaf-100 dark:bg-togaf-900 text-togaf-600 dark:text-togaf-200 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors">
                    {data.tag}
                </span>
                <Lightbulb className="w-5 h-5 text-yellow-500 opacity-50 dark:text-yellow-400" />
            </div>
            
            <div className="flex-grow flex items-center justify-center">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                    {data.front}
                </h3>
            </div>

            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                {UI_TEXT[lang].tapToFlip}
            </p>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-togaf-900 dark:bg-togaf-950 rounded-2xl shadow-xl p-8 flex flex-col justify-between items-center text-center border border-togaf-800">
            <div className="w-full flex justify-end">
                <RotateCcw className="w-5 h-5 text-white opacity-50" />
            </div>

            <div className="flex-grow flex items-center justify-center overflow-y-auto no-scrollbar">
                <p className="text-lg text-white leading-relaxed font-medium">
                    {data.back}
                </p>
            </div>

            <div className="w-full pt-4 border-t border-white/10">
                 <p className="text-togaf-100 text-sm">{UI_TEXT[lang].togafConcept}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;