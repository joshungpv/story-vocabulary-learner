import React, { useState } from 'react';
import { Story, VocabularyItem } from '../types';
import { Volume2, CheckCircle, HelpCircle, Eye, EyeOff, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StoryViewerProps {
  story: Story;
  learnedWords: string[];
  toggleLearnedWord: (word: string) => void;
  speechRate: number;
}

export default function StoryViewer({
  story,
  learnedWords,
  toggleLearnedWord,
  speechRate,
}: StoryViewerProps) {
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
  const [hideEnglish, setHideEnglish] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');

  // Text-to-Speech function for English words/sentences
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support Speech Synthesis.');
    }
  };

  // Helper to read the entire English story
  const readEntireStory = () => {
    speak(story.englishStory);
  };

  // Parser for the Vietnamese story with bracket markup [english](vietnamese)
  const parseStoryText = (text: string) => {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const word = match[1].trim();
        const translation = match[2].trim();
        const vocabItem = story.vocabulary.find(
          (v) => v.word.toLowerCase() === word.toLowerCase()
        );

        return {
          id: `word-${index}`,
          isWord: true,
          word,
          translation,
          vocabItem,
        };
      }
      return {
        id: `text-${index}`,
        isWord: false,
        text: part,
      };
    });
  };

  const parsedSegments = parseStoryText(story.vietnameseStory);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm leading-relaxed';
      case 'base': return 'text-base leading-relaxed';
      case 'lg': return 'text-lg md:text-xl leading-loose';
      case 'xl': return 'text-xl md:text-2xl leading-loose';
    }
  };

  const getWordStyle = (word: string, isSelected: boolean, isLearned: boolean) => {
    if (isSelected) {
      return 'bg-[#2D3436] text-white border-3 border-[#2D3436] shadow-none scale-[1.05] z-10';
    }
    
    const code = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const mod = code % 4;
    
    let bgClass = 'bg-[#FFEAA7] hover:bg-[#F1C40F]';
    if (mod === 1) bgClass = 'bg-[#FAB1A0] hover:bg-[#E17055]';
    else if (mod === 2) bgClass = 'bg-[#DFF9FB] hover:bg-[#22A6B3]';
    else if (mod === 3) bgClass = 'bg-[#55E6C1] hover:bg-[#26DE81]';
    
    if (isLearned) {
      return `${bgClass} border-3 border-[#2D3436] text-[#2D3436] opacity-75 line-through decoration-2 shadow-[2px_2px_0px_#2D3436]`;
    }
    
    return `${bgClass} border-3 border-[#2D3436] text-[#2D3436] shadow-[4px_4px_0px_#2D3436] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none`;
  };

  return (
    <div id="story-viewer-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* Left 2 Columns: Story Display & Controls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Story Card */}
        <div className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-6 md:p-8 space-y-6 transition-all">
          
          {/* Controls Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#DFE4EA]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#747D8C]">Cỡ chữ:</span>
              <div className="inline-flex rounded-xl p-1 bg-[#F1F2F6] border-2 border-[#2D3436]">
                {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    id={`btn-font-${sz}`}
                    onClick={() => setFontSize(sz)}
                    className={`px-2.5 py-1 text-xs font-black rounded-lg transition-all ${
                      fontSize === sz
                        ? 'bg-[#55E6C1] text-[#2D3436] border-2 border-[#2D3436] shadow-[1px_1px_0px_#2D3436]'
                        : 'text-[#747D8C] hover:text-[#2D3436]'
                    }`}
                  >
                    {sz.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Toggle Show Translations */}
              <button
                id="toggle-translations-btn"
                onClick={() => setShowTranslations(!showTranslations)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl border-2 border-[#2D3436] transition-all ${
                  showTranslations
                    ? 'bg-[#55E6C1] text-[#2D3436] shadow-[2px_2px_0px_#2D3436]'
                    : 'bg-white text-[#747D8C] hover:text-[#2D3436]'
                }`}
              >
                {showTranslations ? <Eye className="w-3.5 h-3.5 stroke-[2.5px]" /> : <EyeOff className="w-3.5 h-3.5 stroke-[2.5px]" />}
                Dịch nghĩa: {showTranslations ? 'Bật' : 'Tắt'}
              </button>

              {/* Toggle Mask English */}
              <button
                id="toggle-english-btn"
                onClick={() => setHideEnglish(!hideEnglish)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl border-2 border-[#2D3436] transition-all ${
                  hideEnglish
                    ? 'bg-[#FFEAA7] text-[#2D3436] shadow-[2px_2px_0px_#2D3436]'
                    : 'bg-white text-[#747D8C] hover:text-[#2D3436]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 stroke-[2.5px]" />
                Thử thách ẩn từ: {hideEnglish ? 'Bật' : 'Tắt'}
              </button>
            </div>
          </div>

          {/* Story Body */}
          <div className={`text-[#2D3436] ${getFontSizeClass()} font-sans leading-relaxed space-y-4`}>
            <div className="whitespace-pre-line">
              {parsedSegments.map((segment) => {
                if (segment.isWord) {
                  const isLearned = learnedWords.includes(segment.word.toLowerCase());
                  const isSelected = selectedWord?.word.toLowerCase() === segment.word.toLowerCase();

                  return (
                    <span key={segment.id} className="inline-block mx-1 my-1">
                      <button
                        id={`vocab-badge-${segment.word}`}
                        onClick={() => {
                          if (segment.vocabItem) {
                            setSelectedWord(segment.vocabItem);
                            speak(segment.word);
                          }
                        }}
                        className={`inline-flex items-center px-3 py-1 rounded-xl font-extrabold transition-all cursor-pointer ${getWordStyle(segment.word, isSelected, isLearned)}`}
                      >
                        <span className="font-mono tracking-tight text-sm md:text-base">
                          {hideEnglish ? '_______' : segment.word}
                        </span>
                        
                        {showTranslations && (
                          <span className="ml-1 text-[75%] font-bold text-[#2D3436]/60 italic">
                            ({segment.translation})
                          </span>
                        )}
                      </button>
                    </span>
                  );
                }

                return <span key={segment.id} className="font-medium">{segment.text}</span>;
              })}
            </div>
          </div>

          {/* Audio Reference Block */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#F1F2F6] rounded-2xl border-3 border-[#2D3436] gap-3 shadow-[4px_4px_0px_#2D3436]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#FFEAA7] text-[#2D3436] border-2 border-[#2D3436] rounded-xl">
                <BookOpen className="w-5 h-5 stroke-[2.5px]" />
              </div>
              <div>
                <p className="text-sm font-black text-[#2D3436] uppercase tracking-wide">Nghe toàn bộ câu chuyện</p>
                <p className="text-xs text-[#747D8C] font-semibold">Luyện nghe phát âm chuẩn Anh ngữ của người Chef</p>
              </div>
            </div>
            <button
              id="read-entire-story-btn"
              onClick={readEntireStory}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-sm font-black bg-[#FF7675] text-white border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
            >
              <Volume2 className="w-4 h-4 stroke-[2.5px]" />
              Nghe audio Anh ngữ
            </button>
          </div>

          {/* English Translation View */}
          <div className="p-5 border-3 border-[#2D3436] rounded-2xl bg-[#FFEAA7]/20 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#747D8C]">Bản dịch đối chiếu (English Version):</h4>
            <p className="text-sm text-[#2D3436] font-bold leading-relaxed whitespace-pre-line font-mono italic">
              {story.englishStory}
            </p>
          </div>

        </div>
      </div>

      {/* Right Column: Detailed Word Card & Pronunciation dictionary lookup */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {selectedWord ? (
            <motion.div
              key={selectedWord.word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-6 space-y-6 sticky top-6"
            >
              {/* Word Title and IPA */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#DFF9FB] text-[#2D3436] border-2 border-[#2D3436] rounded-lg text-xs font-black mb-2 uppercase">
                    <Sparkles className="w-3 h-3 stroke-[2.5px]" /> Từ vựng
                  </div>
                  <h3 id="panel-word-title" className="text-3xl font-black font-mono tracking-tighter text-[#2D3436] capitalize">
                    {selectedWord.word}
                  </h3>
                  <span className="text-xs font-black font-mono text-[#2D3436] block mt-1.5 bg-[#FFEAA7] px-2 py-1 rounded-lg border-2 border-[#2D3436] inline-block">
                    {selectedWord.phonetic}
                  </span>
                </div>
                
                {/* Audio Button */}
                <button
                  id="panel-speak-btn"
                  onClick={() => speak(selectedWord.word)}
                  className="p-3 bg-[#55E6C1] hover:bg-[#26DE81] text-[#2D3436] rounded-2xl border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436]"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-5 h-5 stroke-[2.5px]" />
                </button>
              </div>

              {/* Translation */}
              <div className="p-4 bg-[#F1F2F6] rounded-2xl border-3 border-[#2D3436] space-y-1">
                <span className="text-xs font-black text-[#747D8C] uppercase tracking-wider">Nghĩa tiếng Việt</span>
                <p id="panel-word-vietnamese" className="text-lg font-black text-[#FF7675]">
                  {selectedWord.vietnamese}
                </p>
              </div>

              {/* English Definition */}
              <div className="space-y-1.5">
                <span className="text-xs font-black text-[#747D8C] uppercase tracking-wider">Định nghĩa tiếng Anh</span>
                <p id="panel-word-definition" className="text-sm text-[#2D3436] font-bold leading-relaxed font-sans">
                  {selectedWord.definition}
                </p>
              </div>

              {/* Example sentence */}
              <div className="space-y-2 pt-3 border-t-2 border-[#DFE4EA]">
                <span className="text-xs font-black text-[#747D8C] uppercase tracking-wider">Ví dụ minh họa</span>
                <div className="bg-[#FFEAA7]/20 p-4 rounded-2xl border-3 border-[#2D3436] space-y-2">
                  <p id="panel-word-example-en" className="text-sm text-[#2D3436] font-bold font-mono italic">
                    "{selectedWord.example}"
                  </p>
                  <button
                    id="panel-speak-example-btn"
                    onClick={() => speak(selectedWord.example)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#FF7675] hover:text-[#D63031] font-black uppercase"
                  >
                    <Volume2 className="w-3.5 h-3.5 stroke-[2.5px]" /> Nghe ví dụ
                  </button>
                </div>
              </div>

              {/* Learning status tracker */}
              <div className="pt-2">
                <button
                  id={`panel-toggle-learned-${selectedWord.word}`}
                  onClick={() => toggleLearnedWord(selectedWord.word)}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black border-3 border-[#2D3436] transition-all ${
                    learnedWords.includes(selectedWord.word.toLowerCase())
                      ? 'bg-[#55E6C1] text-[#2D3436] shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436]'
                      : 'bg-[#FF7675] text-white shadow-[4px_4px_0px_#2D3436] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#2D3436]'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 stroke-[2.5px] ${learnedWords.includes(selectedWord.word.toLowerCase()) ? 'fill-[#55E6C1]' : ''}`} />
                  {learnedWords.includes(selectedWord.word.toLowerCase())
                    ? 'Đã ghi nhớ thành công'
                    : 'Đánh dấu đã thuộc lòng'}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl border-4 border-dashed border-[#2D3436] p-8 text-center space-y-4 shadow-[4px_4px_0px_#2D3436]">
              <div className="inline-flex p-3 bg-[#FFEAA7] text-[#2D3436] border-2 border-[#2D3436] rounded-2xl shadow-[2px_2px_0px_#2D3436]">
                <HelpCircle className="w-6 h-6 stroke-[2.5px]" />
              </div>
              <h4 className="text-base font-black text-[#2D3436] uppercase tracking-wide">Chi tiết từ vựng</h4>
              <p className="text-xs text-[#747D8C] font-bold max-w-xs mx-auto leading-relaxed">
                Nhấp chuột vào bất kỳ từ vựng tiếng Anh màu sắc nào trong câu chuyện để xem định nghĩa, nghe audio, ví dụ và đánh dấu thuộc lòng.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
