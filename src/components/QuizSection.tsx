import React, { useState, useEffect } from 'react';
import { Story, VocabularyItem, QuizQuestion } from '../types';
import { Check, X, RotateCcw, Award, CheckCircle, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizSectionProps {
  story: Story;
  onSaveScore: (percentage: number) => void;
}

export default function QuizSection({ story, onSaveScore }: QuizSectionProps) {
  const [quizMode, setQuizMode] = useState<'selection' | 'reconstruct'>('selection');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Story Reconstruction state
  const [reconstructAnswers, setReconstructAnswers] = useState<Record<string, string>>({});
  const [reconstructChecked, setReconstructChecked] = useState(false);
  const [reconstructScore, setReconstructScore] = useState<number | null>(null);

  // Generate Multiple Choice questions based on the vocabulary
  useEffect(() => {
    generateMultipleChoiceQuestions();
  }, [story]);

  const generateMultipleChoiceQuestions = () => {
    const vocab = story.vocabulary;
    const questionsList: QuizQuestion[] = [];

    vocab.forEach((item, index) => {
      // Question type A: English word -> Vietnamese meaning
      const optionsA = [item.vietnamese];
      while (optionsA.length < Math.min(4, vocab.length)) {
        const randomItem = vocab[Math.floor(Math.random() * vocab.length)];
        if (!optionsA.includes(randomItem.vietnamese)) {
          optionsA.push(randomItem.vietnamese);
        }
      }
      // Shuffle optionsA
      optionsA.sort(() => Math.random() - 0.5);

      questionsList.push({
        id: `mc-a-${index}`,
        type: 'multiple-choice',
        question: `Từ vựng "${item.word.toUpperCase()}" có nghĩa tiếng Việt là gì?`,
        options: optionsA,
        correctAnswer: item.vietnamese,
        word: item.word,
      });

      // Question type B: Sentence context -> English word
      const cleanedSentence = item.example.replace(
        new RegExp(`\\b${item.word}\\b`, 'gi'),
        '_______'
      );
      const optionsB = [item.word];
      while (optionsB.length < Math.min(4, vocab.length)) {
        const randomItem = vocab[Math.floor(Math.random() * vocab.length)];
        if (!optionsB.includes(randomItem.word)) {
          optionsB.push(randomItem.word);
        }
      }
      optionsB.sort(() => Math.random() - 0.5);

      questionsList.push({
        id: `mc-b-${index}`,
        type: 'multiple-choice',
        question: `Điền vào chỗ trống ví dụ: "${cleanedSentence}"`,
        options: optionsB,
        correctAnswer: item.word,
        word: item.word,
      });
    });

    // Shuffle and pick 8 random questions so the quiz is dynamic and compact
    const shuffledList = questionsList.sort(() => Math.random() - 0.5).slice(0, 8);
    setQuestions(shuffledList);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizCompleted(false);
    
    // Reset Reconstruction state too
    const initialRecAnswers: Record<string, string> = {};
    setReconstructAnswers(initialRecAnswers);
    setReconstructChecked(false);
    setReconstructScore(null);
  };

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const currentQ = questions[currentQuestionIndex];
    const correct = selectedAnswer.toLowerCase() === currentQ.correctAnswer.toLowerCase();
    
    if (correct) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
      const percentage = Math.round((score / questions.length) * 100);
      onSaveScore(percentage);
    }
  };

  // RECONSTRUCTION MODE: Check answers for the embedded story blank fills
  const checkReconstructionAnswers = () => {
    const vocab = story.vocabulary;
    let correctCount = 0;
    
    vocab.forEach((v) => {
      const userAnswer = (reconstructAnswers[v.word] || '').trim().toLowerCase();
      const correctAnswer = v.word.trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / vocab.length) * 100);
    setReconstructScore(correctCount);
    setReconstructChecked(true);
    onSaveScore(percentage);
  };

  const handleReconstructWordSelect = (blankWord: string, optionWord: string) => {
    setReconstructAnswers({
      ...reconstructAnswers,
      [blankWord]: optionWord,
    });
  };

  // Parse the story for reconstruct layout
  const renderReconstructStory = () => {
    const parts = story.vietnameseStory.split(/(\[[^\]]+\]\([^)]+\))/g);
    
    return parts.map((part, index) => {
      const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        const word = match[1].trim();
        const translation = match[2].trim();
        const filled = reconstructAnswers[word] || '';
        const isCorrect = filled.toLowerCase() === word.toLowerCase();

        return (
          <span key={index} className="inline-block mx-1.5 my-1.5">
            <span className="inline-flex flex-col items-center">
              <span className="text-[10px] text-[#747D8C] font-black italic">({translation})</span>
              <div className="relative inline-flex items-center">
                <select
                  id={`reconstruct-select-${word}`}
                  value={filled}
                  disabled={reconstructChecked}
                  onChange={(e) => handleReconstructWordSelect(word, e.target.value)}
                  className={`px-3 py-1.5 text-sm font-mono font-black rounded-xl border-2 border-[#2D3436] transition-all cursor-pointer ${
                    reconstructChecked
                      ? isCorrect
                        ? 'bg-[#55E6C1] text-[#2D3436]'
                        : 'bg-[#FF7675] text-white'
                      : filled
                      ? 'bg-[#DFF9FB] text-[#2D3436] shadow-[2px_2px_0px_#2D3436]'
                      : 'bg-white text-[#747D8C] hover:bg-[#F1F2F6]'
                  }`}
                >
                  <option value="">-- Điền từ --</option>
                  {story.vocabulary.map((vocab) => (
                    <option key={vocab.word} value={vocab.word}>
                      {vocab.word}
                    </option>
                  ))}
                </select>
                {reconstructChecked && (
                  <span className="absolute -right-5 top-1.5">
                    {isCorrect ? (
                      <Check className="w-4 h-4 text-[#26DE81] font-black" />
                    ) : (
                      <X className="w-4 h-4 text-[#FF7675] font-black" />
                    )}
                  </span>
                )}
              </div>
            </span>
          </span>
        );
      }
      return <span key={index} className="text-[#2D3436] leading-relaxed text-base font-medium">{part}</span>;
    });
  };

  return (
    <div id="quiz-container" className="max-w-2xl mx-auto space-y-6">
      
      {/* Tab Switcher for Quiz Mode */}
      <div className="flex bg-[#F1F2F6] border-2 border-[#2D3436] rounded-2xl p-1 gap-1 max-w-sm mx-auto shadow-[3px_3px_0px_#2D3436]">
        <button
          id="quiz-tab-mc"
          onClick={() => {
            setQuizMode('selection');
            generateMultipleChoiceQuestions();
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
            quizMode === 'selection'
              ? 'bg-[#55E6C1] text-[#2D3436] border-2 border-[#2D3436] shadow-[1px_1px_0px_#2D3436]'
              : 'text-[#747D8C] hover:text-[#2D3436]'
          }`}
        >
          Trắc nghiệm Đa lựa chọn
        </button>
        <button
          id="quiz-tab-reconstruct"
          onClick={() => {
            setQuizMode('reconstruct');
            setReconstructAnswers({});
            setReconstructChecked(false);
            setReconstructScore(null);
          }}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
            quizMode === 'reconstruct'
              ? 'bg-[#55E6C1] text-[#2D3436] border-2 border-[#2D3436] shadow-[1px_1px_0px_#2D3436]'
              : 'text-[#747D8C] hover:text-[#2D3436]'
          }`}
        >
          Tái cấu trúc câu chuyện
        </button>
      </div>

      {/* MODE 1: MULTIPLE CHOICE */}
      {quizMode === 'selection' && (
        <div id="mc-quiz-pane">
          {!quizCompleted && questions.length > 0 ? (
            <div className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-6 md:p-8 space-y-6">
              {/* Question progress */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#747D8C] uppercase tracking-widest">
                  Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                </span>
                <span className="text-xs bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] px-3 py-1 rounded-full font-black">
                  Đúng: {score} câu
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3.5 bg-[#F1F2F6] border-2 border-[#2D3436] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF7675] rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="py-4 text-center">
                <h3 id="quiz-question-text" className="text-lg md:text-xl font-black text-[#2D3436] leading-relaxed max-w-lg mx-auto">
                  {questions[currentQuestionIndex].question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {questions[currentQuestionIndex].options?.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer =
                    option.toLowerCase() === questions[currentQuestionIndex].correctAnswer.toLowerCase();

                  let buttonStyle = 'bg-white border-2 border-[#2D3436] text-[#2D3436] shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none';
                  if (isSelected && !isAnswered) {
                    buttonStyle = 'bg-[#FFEAA7] border-2 border-[#2D3436] text-[#2D3436] shadow-[1px_1px_0px_#2D3436] translate-y-0.5';
                  } else if (isAnswered) {
                    if (isCorrectAnswer) {
                      buttonStyle = 'bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] font-black shadow-none';
                    } else if (isSelected) {
                      buttonStyle = 'bg-[#FF7675] border-2 border-[#2D3436] text-white font-black shadow-none';
                    } else {
                      buttonStyle = 'bg-white border-2 border-[#DFE4EA] text-[#747D8C] opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      id={`quiz-option-${idx}`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl border text-left text-sm font-black transition-all flex items-center justify-between cursor-pointer ${buttonStyle}`}
                    >
                      <span className="font-sans leading-relaxed">{option}</span>
                      
                      {/* Icons for check status */}
                      {isAnswered && isCorrectAnswer && (
                        <Check className="w-5 h-5 text-[#2D3436] bg-[#55E6C1] border-2 border-[#2D3436] p-0.5 rounded-full" />
                      )}
                      {isAnswered && isSelected && !isCorrectAnswer && (
                        <X className="w-5 h-5 text-white bg-[#FF7675] border-2 border-[#2D3436] p-0.5 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Submit / Next buttons */}
              <div className="flex items-center justify-end pt-4 border-t-2 border-[#DFE4EA]">
                {!isAnswered ? (
                  <button
                    id="submit-answer-btn"
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer}
                    className="flex items-center gap-2 px-6 py-3 bg-[#FF7675] hover:bg-[#D63031] disabled:opacity-40 text-white font-black border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all text-sm cursor-pointer"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    id="next-question-btn"
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 px-6 py-3 bg-[#55E6C1] hover:bg-[#26DE81] text-[#2D3436] font-black border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all text-sm cursor-pointer"
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Hoàn tất kết quả' : 'Câu tiếp theo'}
                    <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* COMPLETION VIEW */
            <div id="quiz-result-certificate" className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-8 text-center space-y-6">
              <div className="inline-flex p-4 bg-[#FFEAA7] border-2 border-[#2D3436] text-[#2D3436] rounded-full shadow-[3px_3px_0px_#2D3436] animate-bounce">
                <Award className="w-12 h-12 stroke-[2.5px]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#2D3436] uppercase tracking-tight">Hoàn thành thử thách Trắc nghiệm!</h3>
                <p className="text-[#747D8C] font-bold max-w-sm mx-auto">
                  Bạn đã xuất sắc trả lời các câu hỏi trắc nghiệm của chủ đề <b>{story.title}</b>.
                </p>
              </div>

              <div className="bg-[#F1F2F6] p-6 rounded-2xl border-3 border-[#2D3436] inline-block shadow-[4px_4px_0px_#2D3436]">
                <p className="text-xs font-black uppercase tracking-wider text-[#747D8C] mb-1">Điểm số của bạn</p>
                <p className="text-4xl font-black text-[#FF7675] font-mono">
                  {Math.round((score / questions.length) * 100)}%
                </p>
                <p className="text-xs text-[#747D8C] font-bold mt-1">Đúng {score} trên tổng số {questions.length} câu hỏi</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  id="restart-quiz-btn"
                  onClick={generateMultipleChoiceQuestions}
                  className="flex items-center justify-center gap-1.5 px-5 py-3 bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] rounded-xl font-black shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5px]" /> Làm lại bộ câu hỏi khác
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: STORY RECONSTRUCTION (Fill in blanks in natural story) */}
      {quizMode === 'reconstruct' && (
        <div id="reconstruct-quiz-pane" className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#DFE4EA] pb-4">
            <div>
              <h3 className="text-base font-black text-[#2D3436] flex items-center gap-2 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-[#FF7675] stroke-[2.5px]" /> Tái cấu trúc câu chuyện
              </h3>
              <p className="text-xs text-[#747D8C] font-bold">Chọn đúng từ vựng tiếng Anh tương ứng với nghĩa trong ngoặc đơn.</p>
            </div>
            
            {reconstructScore !== null && (
              <span className="text-xs bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] px-3 py-1 rounded-full font-black font-mono shadow-[1px_1px_0px_#2D3436]">
                Kết quả: {reconstructScore}/{story.vocabulary.length} đúng
              </span>
            )}
          </div>

          {/* Interactive Reconstructed Story block */}
          <div className="p-5 md:p-7 border-3 border-[#2D3436] bg-[#FFEAA7]/10 rounded-2xl shadow-inner">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-4 whitespace-pre-line leading-loose text-left">
              {renderReconstructStory()}
            </div>
          </div>

          {/* Bottom actions & state check */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-[#DFE4EA]">
            <div className="flex items-center gap-1.5 text-xs text-[#2D3436] bg-[#FFEAA7] px-3 py-2 rounded-xl border-2 border-[#2D3436] font-bold">
              <AlertCircle className="w-3.5 h-3.5 stroke-[2.5px]" />
              <span>Gợi ý: Học trong mục Story hoặc Flashcards trước nhé!</span>
            </div>

            <div className="flex gap-3">
              <button
                id="reconstruct-reset-btn"
                onClick={() => {
                  setReconstructAnswers({});
                  setReconstructChecked(false);
                  setReconstructScore(null);
                }}
                className="px-4 py-2 text-sm font-black border-2 border-[#2D3436] bg-white hover:bg-[#F1F2F6] text-[#2D3436] rounded-xl transition-all cursor-pointer"
              >
                Đặt lại
              </button>

              {!reconstructChecked ? (
                <button
                  id="reconstruct-check-btn"
                  onClick={checkReconstructionAnswers}
                  className="px-5 py-2.5 text-sm font-black bg-[#FF7675] text-white border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  Nộp bài & Chấm điểm
                </button>
              ) : (
                <button
                  id="reconstruct-retry-btn"
                  onClick={() => {
                    setReconstructAnswers({});
                    setReconstructChecked(false);
                    setReconstructScore(null);
                  }}
                  className="px-5 py-2.5 text-sm font-black bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5px]" /> Thử lại lần nữa
                </button>
              )}
            </div>
          </div>

          {/* SHOW RESULT MODAL CARD */}
          {reconstructChecked && reconstructScore !== null && (
            <div className="p-5 rounded-2xl bg-[#DFF9FB] border-3 border-[#2D3436] text-center space-y-3 shadow-[4px_4px_0px_#2D3436]">
              <p className="text-sm font-black text-[#2D3436]">
                {reconstructScore === story.vocabulary.length 
                  ? 'Tuyệt đỉnh! Bạn đã hoàn thành chính xác 100% câu chuyện này!' 
                  : 'Cố lên! Bạn đang học rất tốt. Hãy làm lại để đạt điểm tối đa!'}
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-[#2D3436] fill-[#55E6C1]" />
                <span className="text-sm font-black text-[#2D3436]">
                  Độ chính xác: {Math.round((reconstructScore / story.vocabulary.length) * 100)}% ({reconstructScore}/{story.vocabulary.length})
                </span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
