import React, { useState } from 'react';
import { Story, VocabularyItem } from '../types';
import { Volume2, ChevronLeft, ChevronRight, RotateCw, CheckCircle, RefreshCw, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlashcardsProps {
  story: Story;
  learnedWords: string[];
  toggleLearnedWord: (word: string) => void;
  speechRate: number;
}

export default function Flashcards({
  story,
  learnedWords,
  toggleLearnedWord,
  speechRate,
}: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'need-practice' | 'mastered'>('all');

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Get words based on selected filter
  const getFilteredWords = () => {
    switch (filterMode) {
      case 'need-practice':
        return story.vocabulary.filter((v) => !learnedWords.includes(v.word.toLowerCase()));
      case 'mastered':
        return story.vocabulary.filter((v) => learnedWords.includes(v.word.toLowerCase()));
      case 'all':
      default:
        return story.vocabulary;
    }
  };

  const filteredWords = getFilteredWords();
  const currentWord: VocabularyItem | undefined = filteredWords[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFilterChange = (mode: 'all' | 'need-practice' | 'mastered') => {
    setFilterMode(mode);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const totalMasteredCount = story.vocabulary.filter((v) =>
    learnedWords.includes(v.word.toLowerCase())
  ).length;

  return (
    <div id="flashcards-section" className="max-w-2xl mx-auto space-y-6">
      
      {/* Filtering and Progress header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white rounded-3xl border-4 border-[#2D3436] shadow-[4px_4px_0px_#2D3436]">
        
        {/* Progress indicators */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#747D8C] uppercase tracking-wider">Tiến độ thuộc bài:</span>
            <span className="text-sm font-black text-[#FF7675] font-mono">
              {totalMasteredCount}/{story.vocabulary.length} từ
            </span>
          </div>
          <div className="w-48 h-3.5 bg-[#F1F2F6] border-2 border-[#2D3436] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#55E6C1] rounded-full transition-all duration-300"
              style={{ width: `${(totalMasteredCount / story.vocabulary.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex bg-[#F1F2F6] border-2 border-[#2D3436] rounded-xl p-1 gap-1">
          {(['all', 'need-practice', 'mastered'] as const).map((mode) => (
            <button
              key={mode}
              id={`filter-btn-${mode}`}
              onClick={() => handleFilterChange(mode)}
              className={`px-3 py-1.5 text-xs font-black rounded-lg transition-all ${
                filterMode === mode
                  ? 'bg-[#55E6C1] text-[#2D3436] border-2 border-[#2D3436] shadow-[1px_1px_0px_#2D3436]'
                  : 'text-[#747D8C] hover:text-[#2D3436]'
              }`}
            >
              {mode === 'all' && 'Tất cả'}
              {mode === 'need-practice' && 'Chưa thuộc'}
              {mode === 'mastered' && 'Đã thuộc'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard stage */}
      {filteredWords.length > 0 && currentWord ? (
        <div className="space-y-6">
          
          {/* Card Wrapper with 3D flip effect */}
          <div className="perspective-1000 h-[360px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div
              className={`relative w-full h-full duration-500 transform-style-3d shadow-[8px_8px_0px_#2D3436] rounded-3xl border-4 border-[#2D3436] transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT SIDE (English Word) */}
              <div className="absolute w-full h-full backface-hidden bg-[#FF7675] text-white rounded-[20px] p-8 flex flex-col justify-between overflow-hidden">
                
                {/* Background ambient details */}
                <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 text-xs text-[#FFEAA7] uppercase tracking-widest font-black">
                    <Bookmark className="w-3.5 h-3.5 stroke-[2.5px]" />
                    Thẻ từ vựng {currentIndex + 1}/{filteredWords.length}
                  </div>
                  <div className="text-xs bg-white text-[#2D3436] border-2 border-[#2D3436] px-3 py-1.5 rounded-xl font-black shadow-[2px_2px_0px_#2D3436]">
                    Nhấp để lật nghĩa
                  </div>
                </div>

                <div className="text-center space-y-3 z-10 py-6">
                  <h2 className="text-4xl md:text-5xl font-black font-mono tracking-tighter drop-shadow-sm capitalize text-white">
                    {currentWord.word}
                  </h2>
                  <p className="text-sm md:text-base text-[#FFEAA7] font-black font-mono">
                    {currentWord.phonetic}
                  </p>
                </div>

                <div className="flex items-center justify-between z-10">
                  {/* Pronunciation block */}
                  <button
                    id="flashcard-speak-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Don't flip card
                      speak(currentWord.word);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#FFEAA7] hover:bg-[#FFEAA7]/90 text-[#2D3436] border-2 border-[#2D3436] rounded-xl font-black text-xs shadow-[2px_2px_0px_#2D3436]"
                  >
                    <Volume2 className="w-4 h-4 stroke-[2.5px]" /> Nghe phát âm
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-[#2D3436] font-black bg-white border-2 border-[#2D3436] px-3 py-2 rounded-xl">
                    <RotateCw className="w-3.5 h-3.5 stroke-[2.5px]" /> Lật thẻ
                  </div>
                </div>

              </div>

              {/* BACK SIDE (Meaning & Description) */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-[20px] p-8 flex flex-col justify-between overflow-hidden text-[#2D3436]">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#747D8C] font-black uppercase tracking-wider">
                    {currentWord.word} • Định nghĩa & Ví dụ
                  </span>
                  <div className="text-xs bg-[#FFEAA7] px-2.5 py-1 rounded-lg border-2 border-[#2D3436] text-[#2D3436] font-black font-mono">
                    {currentWord.phonetic}
                  </div>
                </div>

                <div className="space-y-4 my-auto">
                  {/* Vietnamese explanation */}
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#747D8C] uppercase tracking-widest">Nghĩa tiếng Việt</span>
                    <p className="text-2xl font-black text-[#FF7675]">{currentWord.vietnamese}</p>
                  </div>

                  {/* English definition */}
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#747D8C] uppercase tracking-widest">Định nghĩa tiếng Anh</span>
                    <p className="text-sm text-[#2D3436] font-bold leading-relaxed font-sans">{currentWord.definition}</p>
                  </div>

                  {/* Context sentence */}
                  <div className="bg-[#DFF9FB] p-3 rounded-2xl border-2 border-[#2D3436] space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2D3436]/60">Câu ví dụ thực tế</span>
                    <p className="text-xs text-[#2D3436] font-bold font-mono italic">
                      "{currentWord.example}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    id="flashcard-speak-example-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Don't flip card
                      speak(currentWord.example);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#55E6C1] hover:bg-[#26DE81] border-2 border-[#2D3436] rounded-xl text-xs text-[#2D3436] font-black shadow-[2px_2px_0px_#2D3436]"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.5px]" /> Nghe ví dụ
                  </button>

                  <div className="flex items-center gap-1.5 text-xs text-[#747D8C] font-black">
                    <RotateCw className="w-3.5 h-3.5 animate-spin-slow stroke-[2.5px]" /> Nhấp để xem lại từ
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Master / Not learned buttons and Card deck index switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quick Master/Revise indicator */}
            <button
              id={`deck-master-btn-${currentWord.word}`}
              onClick={() => toggleLearnedWord(currentWord.word)}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-3 border-[#2D3436] text-sm font-black transition-all ${
                learnedWords.includes(currentWord.word.toLowerCase())
                  ? 'bg-[#55E6C1] text-[#2D3436] shadow-[3px_3px_0px_#2D3436]'
                  : 'bg-white text-[#2D3436] shadow-[4px_4px_0px_#2D3436] hover:bg-[#F1F2F6]'
              }`}
            >
              <CheckCircle className={`w-4 h-4 stroke-[2.5px] ${learnedWords.includes(currentWord.word.toLowerCase()) ? 'fill-[#55E6C1]' : ''}`} />
              {learnedWords.includes(currentWord.word.toLowerCase()) ? 'Đã thuộc từ này' : 'Đánh dấu đã thuộc'}
            </button>

            {/* Stepper Controllers */}
            <div className="flex items-center gap-3">
              <button
                id="deck-prev-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-3 rounded-xl border-3 border-[#2D3436] bg-white text-[#2D3436] shadow-[3px_3px_0px_#2D3436] active:shadow-none active:translate-y-0.5 disabled:opacity-40 disabled:hover:bg-white disabled:active:shadow-[3px_3px_0px_#2D3436] disabled:active:translate-y-0 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5px]" />
              </button>

              <span className="text-sm font-black text-[#2D3436] font-mono">
                {currentIndex + 1} / {filteredWords.length}
              </span>

              <button
                id="deck-next-btn"
                onClick={handleNext}
                disabled={currentIndex === filteredWords.length - 1}
                className="p-3 rounded-xl border-3 border-[#2D3436] bg-white text-[#2D3436] shadow-[3px_3px_0px_#2D3436] active:shadow-none active:translate-y-0.5 disabled:opacity-40 disabled:hover:bg-white disabled:active:shadow-[3px_3px_0px_#2D3436] disabled:active:translate-y-0 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5px]" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl border-4 border-[#2D3436] p-12 text-center space-y-4 shadow-[8px_8px_0px_#2D3436]">
          <div className="inline-flex p-4 bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] rounded-2xl shadow-[3px_3px_0px_#2D3436]">
            <CheckCircle className="w-8 h-8 stroke-[2.5px]" />
          </div>
          <h3 className="text-xl font-black text-[#2D3436] uppercase tracking-wide">Tuyệt vời! Không tìm thấy thẻ phù hợp</h3>
          <p className="text-sm text-[#747D8C] font-bold max-w-md mx-auto">
            {filterMode === 'need-practice'
              ? 'Chúc mừng! Bạn đã thuộc toàn bộ từ vựng trong câu chuyện này!'
              : 'Hãy học thêm từ mới trong mục Story và tích dấu "Đã thuộc" nhé!'}
          </p>
          <button
            id="reset-filter-btn"
            onClick={() => handleFilterChange('all')}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-black text-white bg-[#FF7675] border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436]"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5px]" /> Xem lại tất cả từ
          </button>
        </div>
      )}

      {/* Styled 3D Perspective CSS Injection */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

    </div>
  );
}
