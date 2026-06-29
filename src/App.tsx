import React, { useState, useEffect } from 'react';
import { defaultStories } from './data/defaultStories';
import { Story, ProgressState } from './types';
import StoryViewer from './components/StoryViewer';
import Flashcards from './components/Flashcards';
import QuizSection from './components/QuizSection';
import StoryCreator from './components/StoryCreator';
import ConversationChat from './components/ConversationChat';
import { 
  BookOpen, 
  Layers, 
  Award, 
  PlusCircle, 
  Flame, 
  CheckCircle, 
  Settings, 
  ChevronDown, 
  Sparkles, 
  Trash2,
  VolumeX,
  Volume2,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Application stories list (combining default preloaded & custom ones from localStorage)
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('story_vocab_custom_stories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Story[];
        return [...defaultStories, ...parsed];
      } catch (e) {
        return defaultStories;
      }
    }
    return defaultStories;
  });

  const [activeStoryId, setActiveStoryId] = useState<string>(() => {
    return defaultStories[0].id; // Defaults to "Food, Cooking & Senses"
  });

  const [activeTab, setActiveTab] = useState<'read' | 'flashcards' | 'quiz' | 'create' | 'conversation'>('read');
  const [learnedWords, setLearnedWords] = useState<string[]>(() => {
    const saved = localStorage.getItem('story_vocab_learned_words');
    return saved ? JSON.parse(saved) : [];
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('story_vocab_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastActiveDate, setLastActiveDate] = useState<string>(() => {
    return localStorage.getItem('story_vocab_last_active') || '';
  });

  const [quizHighScores, setQuizHighScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('story_vocab_high_scores');
    return saved ? JSON.parse(saved) : {};
  });

  const [speechRate, setSpeechRate] = useState<number>(() => {
    const saved = localStorage.getItem('story_vocab_speech_rate');
    return saved ? parseFloat(saved) : 1.0;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const activeStory = stories.find((s) => s.id === activeStoryId) || stories[0];

  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  const existingCategories = Array.from(new Set(stories.map((s) => s.category))) as string[];

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const filtered = cat === 'Tất cả' ? stories : stories.filter((s) => s.category === cat);
    if (filtered.length > 0) {
      if (!filtered.some((s) => s.id === activeStoryId)) {
        setActiveStoryId(filtered[0].id);
      }
    }
  };

  // Sync state to localStorage on modification
  useEffect(() => {
    localStorage.setItem('story_vocab_learned_words', JSON.stringify(learnedWords));
  }, [learnedWords]);

  useEffect(() => {
    localStorage.setItem('story_vocab_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('story_vocab_last_active', lastActiveDate);
  }, [lastActiveDate]);

  useEffect(() => {
    localStorage.setItem('story_vocab_high_scores', JSON.stringify(quizHighScores));
  }, [quizHighScores]);

  useEffect(() => {
    localStorage.setItem('story_vocab_speech_rate', speechRate.toString());
  }, [speechRate]);

  const [aiProvider, setAiProvider] = useState<'gemini' | 'openai-compatible'>(() => {
    return (localStorage.getItem('story_vocab_ai_provider') as 'gemini' | 'openai-compatible') || 'gemini';
  });
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    return localStorage.getItem('story_vocab_gemini_api_key') || '';
  });
  const [customBaseUrl, setCustomBaseUrl] = useState<string>(() => {
    return localStorage.getItem('story_vocab_custom_base_url') || '';
  });
  const [customModel, setCustomModel] = useState<string>(() => {
    return localStorage.getItem('story_vocab_custom_model') || '';
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [hasServerKey, setHasServerKey] = useState(false);

  useEffect(() => {
    localStorage.setItem('story_vocab_ai_provider', aiProvider);
  }, [aiProvider]);

  useEffect(() => {
    if (geminiApiKey) {
      localStorage.setItem('story_vocab_gemini_api_key', geminiApiKey);
    } else {
      localStorage.removeItem('story_vocab_gemini_api_key');
    }
  }, [geminiApiKey]);

  useEffect(() => {
    if (customBaseUrl) {
      localStorage.setItem('story_vocab_custom_base_url', customBaseUrl);
    } else {
      localStorage.removeItem('story_vocab_custom_base_url');
    }
  }, [customBaseUrl]);

  useEffect(() => {
    if (customModel) {
      localStorage.setItem('story_vocab_custom_model', customModel);
    } else {
      localStorage.removeItem('story_vocab_custom_model');
    }
  }, [customModel]);

  useEffect(() => {
    fetch('/api/check-ai-status')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasServerKey === 'boolean') {
          setHasServerKey(data.hasServerKey);
        }
      })
      .catch((err) => console.error('Error checking AI status:', err));
  }, []);

  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus(null);
    try {
      const response = await fetch('/api/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': geminiApiKey ? geminiApiKey.trim() : ''
        },
        body: JSON.stringify({
          apiKey: geminiApiKey ? geminiApiKey.trim() : undefined,
          aiConfig: {
            provider: aiProvider,
            apiKey: geminiApiKey ? geminiApiKey.trim() : undefined,
            baseUrl: customBaseUrl ? customBaseUrl.trim() : undefined,
            modelName: customModel ? customModel.trim() : undefined,
          }
        })
      });

      const rawText = await response.text();
      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch {
        // Server returned non-JSON (e.g., HTML error page) — show raw excerpt
        const snippet = rawText.length > 120
          ? rawText.substring(0, 120) + '…'
          : rawText;
        throw new Error(`Máy chủ trả về nội dung lỗi không đúng định dạng. Chi tiết: ${snippet}`);
      }
      if (response.ok && data.success) {
        setConnectionStatus({
          success: true,
          message: data.message || 'Kết nối thành công!'
        });
      } else {
        setConnectionStatus({
          success: false,
          message: data.error || data.message || 'Kết nối thất bại. Vui lòng kiểm tra lại cấu hình hoặc API Key!'
        });
      }
    } catch (err: any) {
      console.error('Lỗi kết nối:', err);
      setConnectionStatus({
        success: false,
        message: err.message || 'Lỗi kết nối mạng hoặc máy chủ không phản hồi.'
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  // Handle active date checking & Streak calculation
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    
    if (lastActiveDate !== today) {
      if (lastActiveDate === '') {
        // First time
        setStreak(1);
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastActiveDate === yesterdayStr) {
          // Continuous active day
          setStreak((prev) => prev + 1);
        } else {
          // Streak broken
          setStreak(1);
        }
      }
      setLastActiveDate(today);
    }
  }, []);

  const toggleLearnedWord = (word: string) => {
    const lowerWord = word.toLowerCase();
    setLearnedWords((prev) => {
      if (prev.includes(lowerWord)) {
        return prev.filter((w) => w !== lowerWord);
      } else {
        return [...prev, lowerWord];
      }
    });

    // Revive streak if active today
    const today = new Date().toISOString().split('T')[0];
    if (lastActiveDate !== today) {
      setLastActiveDate(today);
    }
  };

  const handleAddStory = (newStory: Story) => {
    setStories((prev) => {
      const updated = [...prev, newStory];
      // Save only custom ones (where isCustom is true)
      const customs = updated.filter((s) => s.isCustom);
      localStorage.setItem('story_vocab_custom_stories', JSON.stringify(customs));
      return updated;
    });

    // Make new story active, select its category, and switch to story view
    setActiveStoryId(newStory.id);
    setSelectedCategory(newStory.category);
    setActiveTab('read');
  };

  const handleDeleteCustomStory = (storyId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa câu chuyện tự tạo này không?')) {
      setStories((prev) => {
        const updated = prev.filter((s) => s.id !== storyId);
        const customs = updated.filter((s) => s.isCustom);
        localStorage.setItem('story_vocab_custom_stories', JSON.stringify(customs));
        return updated;
      });
      // Switch back to default
      setActiveStoryId(defaultStories[0].id);
      setSelectedCategory('Tất cả');
    }
  };

  const handleSaveScore = (percentage: number) => {
    setQuizHighScores((prev) => ({
      ...prev,
      [activeStoryId]: Math.max(prev[activeStoryId] || 0, percentage),
    }));
  };

  // Stats calculation
  const totalStoryWords = activeStory.vocabulary.length;
  const masteredStoryWordsCount = activeStory.vocabulary.filter((v) =>
    learnedWords.includes(v.word.toLowerCase())
  ).length;

  return (
    <div className="min-h-screen bg-[#FEF9F3] text-[#2D3436] font-sans selection:bg-[#FFEAA7] selection:text-[#2D3436]">
      
      {/* Top Ambient Header Banner */}
      <header className="bg-white border-b-4 border-[#EBC9A3] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Brand / Branding area */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FF7675] text-white rounded-xl border-2 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] flex items-center justify-center">
              <BookOpen className="w-6 h-6 stroke-[3px]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-black uppercase tracking-tighter text-[#2D3436]">
                  Story <span className="text-[#FF7675]">Vocab</span>
                </h1>
                <span className="text-[10px] bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider">v2.0</span>
              </div>
              <p className="text-xs text-[#747D8C] font-extrabold">Học từ vựng tiếng Anh qua câu chuyện ngữ cảnh</p>
            </div>
          </div>

          {/* User Metrics & Controls */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Streak metrics */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEAA7] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] rounded-xl text-[#2D3436]">
              <Flame className="w-4 h-4 fill-[#F1C40F] stroke-[#2D3436] stroke-[2.5px] animate-pulse" />
              <div className="text-xs font-bold">
                <span className="font-black font-mono text-sm">{streak}</span> ngày liên tiếp
              </div>
            </div>

            {/* Total progress counts */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#55E6C1] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] rounded-xl text-[#2D3436]">
              <CheckCircle className="w-4 h-4 text-[#2D3436] fill-[#55E6C1]" />
              <div className="text-xs font-bold">
                Đã thuộc <span className="font-black font-mono text-sm">{learnedWords.length}</span> từ
              </div>
            </div>

            {/* Settings trigger */}
            <button
              id="settings-trigger-btn"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2.5 rounded-xl border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] transition-all ${
                showSettings 
                  ? 'bg-[#55E6C1] text-[#2D3436]' 
                  : 'bg-white hover:bg-[#F1F2F6] text-[#2D3436]'
              }`}
              title="Cấu hình hệ thống"
            >
              <Settings className="w-4 h-4 stroke-[2.5px]" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Container Stage */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        
        {/* Settings Drawer Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              id="settings-panel-overlay"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[6px_6px_0px_#2D3436] p-6 overflow-hidden space-y-4"
            >
              <h3 className="text-sm font-black text-[#2D3436] uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b-2 border-[#EBC9A3]">
                <Settings className="w-4 h-4 text-[#FF7675]" /> Cài đặt học tập & giọng đọc (TTS)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-black text-[#747D8C] uppercase tracking-wide">Tốc độ phát âm (Speech rate):</span>
                    <div className="flex items-center gap-3">
                      <input
                        id="speech-rate-slider"
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.1"
                        value={speechRate}
                        onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                        className="w-full accent-[#FF7675] h-2.5 bg-[#F1F2F6] rounded-lg cursor-pointer border-2 border-[#2D3436]"
                      />
                      <span className="text-xs font-mono font-black text-[#2D3436] bg-[#FFEAA7] border-2 border-[#2D3436] px-2.5 py-1 rounded-md">
                        {speechRate}x
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F1F2F6] rounded-2xl border-3 border-[#2D3436] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs font-black text-[#2D3436] uppercase tracking-wide">Kiểm tra âm thanh</p>
                      <p className="text-[10px] text-[#747D8C] font-bold">Nghe thử giọng đọc giọng Mỹ chuẩn</p>
                    </div>
                    <button
                      id="test-tts-btn"
                      onClick={() => {
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance('Hello there! Ready to master English with stories?');
                          utterance.lang = 'en-US';
                          utterance.rate = speechRate;
                          window.speechSynthesis.speak(utterance);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] hover:bg-[#26DE81] text-xs font-black rounded-xl shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#2D3436]" /> Nghe thử giọng
                    </button>
                  </div>
                </div>

                {/* API Key configuration section */}
                <div className="space-y-3 p-4 bg-[#FFF9E6] rounded-2xl border-3 border-[#2D3436]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black text-[#2D3436] uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF7675]" /> Cấu hình thông số AI (Gemini / OpenAI)
                    </p>
                    {(hasServerKey || geminiApiKey) ? (
                      <span 
                        onClick={testConnection}
                        className={`text-[9px] border-2 border-[#2D3436] text-[#2D3436] px-1.5 py-0.5 rounded font-black uppercase cursor-pointer active:translate-y-0.5 transition-all select-none ${
                          isTestingConnection 
                            ? 'bg-[#FFEAA7] animate-pulse' 
                            : 'bg-[#55E6C1] hover:bg-[#26DE81]'
                        }`}
                        title="Click để kiểm tra kết nối API"
                      >
                        {isTestingConnection ? 'Đang thử...' : 'Kiểm tra'}
                      </span>
                    ) : (
                      <span 
                        onClick={testConnection}
                        className={`text-[9px] border-2 border-[#2D3436] text-[#2D3436] px-1.5 py-0.5 rounded font-black uppercase cursor-pointer active:translate-y-0.5 transition-all select-none ${
                          isTestingConnection 
                            ? 'bg-[#FFEAA7] animate-pulse' 
                            : 'bg-[#FFEAA7] hover:bg-[#FFD32A]'
                        }`}
                        title="Click để kiểm tra kết nối API"
                      >
                        {isTestingConnection ? 'Đang thử...' : 'Kiểm tra'}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#747D8C] font-bold leading-relaxed">
                    Bạn có thể sử dụng Google Gemini hoặc dịch vụ tương thích OpenAI bên thứ ba (ví dụ <strong>OpenAI</strong>, <strong>DeepSeek</strong>, <strong>Groq</strong>) để sáng tác câu chuyện.
                  </p>

                  {connectionStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-xl border-2 text-xs font-bold leading-relaxed flex items-start gap-2 ${
                        connectionStatus.success
                          ? 'bg-[#E6FFE6] border-[#2D3436] text-[#2D3436] shadow-[2px_2px_0px_#2D3436]'
                          : 'bg-[#FFECEC] border-[#2D3436] text-[#2D3436] shadow-[2px_2px_0px_#2D3436]'
                      }`}
                    >
                      <span className="text-base shrink-0">
                        {connectionStatus.success ? '✅' : '❌'}
                      </span>
                      <div className="space-y-0.5">
                        <p className="font-black">
                          {connectionStatus.success ? 'Kết nối thành công!' : 'Kết nối thất bại'}
                        </p>
                        <p className="text-[10px] text-[#2D3436] font-semibold">{connectionStatus.message}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">Nhà cung cấp AI:</label>
                      <select
                        id="ai-provider-select"
                        value={aiProvider}
                        onChange={(e) => setAiProvider(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-bold outline-none text-[#2D3436]"
                      >
                        <option value="gemini">Google Gemini API (Official)</option>
                        <option value="openai-compatible">Bên thứ 3 / OpenAI Compatible (OpenAI, DeepSeek...)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">API Key / Token:</label>
                      <div className="relative">
                        <input
                          id="gemini-api-key-input"
                          type={showApiKey ? 'text' : 'password'}
                          placeholder={aiProvider === 'gemini' ? 'AI Studio / Gemini API Key (AIzaSy...)' : 'API Token / Authorization Key'}
                          value={geminiApiKey}
                          onChange={(e) => setGeminiApiKey(e.target.value)}
                          className="w-full pl-3 pr-10 py-2 rounded-xl border-2 border-[#2D3436] text-xs font-mono font-bold outline-none bg-white text-[#2D3436]"
                        />
                        <button
                          id="toggle-show-api-key"
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-2.5 top-2 text-[#747D8C] hover:text-[#2D3436] text-xs font-bold"
                        >
                          {showApiKey ? 'Ẩn' : 'Hiện'}
                        </button>
                      </div>
                    </div>

                    {aiProvider === 'openai-compatible' && (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">API Endpoint (Base URL):</label>
                          <input
                            id="custom-base-url-input"
                            type="text"
                            placeholder="Ví dụ: https://api.openai.com/v1"
                            value={customBaseUrl}
                            onChange={(e) => setCustomBaseUrl(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-mono font-bold outline-none text-[#2D3436]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">Tên Model (Model Name):</label>
                          <input
                            id="custom-model-input"
                            type="text"
                            placeholder="Ví dụ: gpt-4o-mini hoặc gemini-2.5-flash"
                            value={customModel}
                            onChange={(e) => setCustomModel(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-mono font-bold outline-none text-[#2D3436]"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {geminiApiKey && (
                    <button
                      id="clear-api-key-btn"
                      type="button"
                      onClick={() => {
                        setGeminiApiKey('');
                        setCustomBaseUrl('');
                        setCustomModel('');
                        localStorage.removeItem('story_vocab_gemini_api_key');
                        localStorage.removeItem('story_vocab_custom_base_url');
                        localStorage.removeItem('story_vocab_custom_model');
                      }}
                      className="text-[10px] text-[#FF7675] hover:text-[#D63031] font-black underline"
                    >
                      Xóa cấu hình khỏi trình duyệt
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Selector & Dashboard Cards */}
        <section className="bg-white rounded-3xl border-4 border-[#2D3436] p-6 md:p-8 shadow-[8px_8px_0px_#2D3436] space-y-6">
          
          {/* Category/Topic Filtering Pills */}
          <div className="space-y-2 border-b-2 border-[#DFE4EA] pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-black text-[#2D3436] uppercase tracking-wider block">Chủ đề bài học (Topics):</span>
              <button
                id="btn-goto-create-tab"
                onClick={() => setActiveTab('create')}
                className="flex items-center gap-1.5 text-xs font-black text-[#FF7675] hover:text-[#D63031] transition-colors cursor-pointer bg-[#FFEAA7] border-2 border-[#2D3436] px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none"
              >
                <PlusCircle className="w-3.5 h-3.5 stroke-[3px]" /> Thêm Chủ Đề & Câu Chuyện Mới
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Tất cả', ...existingCategories].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-3 py-1.5 text-xs font-black rounded-xl border-2 border-[#2D3436] transition-all cursor-pointer shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none ${
                      isActive
                        ? 'bg-[#FF7675] text-white'
                        : 'bg-white text-[#2D3436] hover:bg-[#F1F2F6]'
                    }`}
                  >
                    📁 {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Story Dropdown and Category details */}
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2D3436] bg-[#FFEAA7] border-2 border-[#2D3436] px-3 py-1 rounded-full inline-block">
                  {activeStory.category}
                </span>
                {activeStory.isCustom && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2D3436] bg-[#55E6C1] border-2 border-[#2D3436] px-3 py-1 rounded-full inline-block">
                    Tự tạo
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative inline-block w-full max-w-sm">
                  <select
                    id="story-selector-dropdown"
                    value={activeStoryId}
                    onChange={(e) => {
                      setActiveStoryId(e.target.value);
                      setActiveTab('read'); // Automatically switch to reading view
                    }}
                    className="w-full appearance-none pl-4 pr-10 py-2.5 font-black text-lg md:text-xl text-[#2D3436] bg-white hover:bg-[#F1F2F6] border-3 border-[#2D3436] rounded-2xl outline-none cursor-pointer transition-all shadow-[3px_3px_0px_#2D3436] focus:shadow-none"
                  >
                    {(selectedCategory === 'Tất cả'
                      ? stories
                      : stories.filter((s) => s.category === selectedCategory)
                    ).map((story) => (
                      <option key={story.id} value={story.id}>
                        📖 {story.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-[#2D3436] absolute right-3.5 top-3 pointer-events-none stroke-[2.5px]" />
                </div>
 
                {/* Trash button for deleting custom stories */}
                {activeStory.isCustom && (
                  <button
                    id="delete-custom-story-btn"
                    onClick={() => handleDeleteCustomStory(activeStory.id)}
                    className="p-3 bg-[#FF7675] border-3 border-[#2D3436] text-white hover:bg-[#D63031] rounded-2xl transition-all shadow-[3px_3px_0px_#2D3436]"
                    title="Xóa câu chuyện này"
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>
              <p className="text-sm text-[#747D8C] max-w-2xl font-bold">
                {activeStory.description}
              </p>
            </div>

            {/* Quick stats on the right of selector */}
            <div className="flex items-center gap-4 bg-[#F1F2F6] border-3 border-[#2D3436] rounded-2xl px-5 py-4 self-start md:self-auto shrink-0 shadow-[4px_4px_0px_#2D3436]">
              <div className="text-center">
                <p className="text-xs font-black text-[#747D8C] uppercase tracking-wide">Mục tiêu thuộc</p>
                <p className="text-2xl font-black text-[#2D3436] font-mono mt-0.5">{totalStoryWords}</p>
                <p className="text-[10px] text-[#747D8C] font-bold">Từ vựng</p>
              </div>
              <div className="h-8 w-px bg-[#2D3436]" />
              <div className="text-center">
                <p className="text-xs font-black text-[#747D8C] uppercase tracking-wide">Đã thuộc lòng</p>
                <p className="text-2xl font-black text-[#FF7675] font-mono mt-0.5">
                  {masteredStoryWordsCount}
                </p>
                <p className="text-[10px] text-[#747D8C] font-bold">
                  {Math.round((masteredStoryWordsCount / totalStoryWords) * 100)}% mục tiêu
                </p>
              </div>
              {quizHighScores[activeStory.id] !== undefined && (
                <>
                  <div className="h-8 w-px bg-[#2D3436]" />
                  <div className="text-center">
                    <p className="text-xs font-black text-[#747D8C] uppercase tracking-wide">Điểm thi cao nhất</p>
                    <p className="text-2xl font-black text-[#2D3436] font-mono mt-0.5">
                      {quizHighScores[activeStory.id]}%
                    </p>
                    <p className="text-[10px] text-[#747D8C] font-bold">Trắc nghiệm</p>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Interactive Navigation/Tabs Section */}
          <div className="flex overflow-x-auto border-b-4 border-[#2D3436] pb-1 gap-1.5 md:gap-2.5 no-scrollbar">
            
            {/* Tab 1: Read */}
            <button
              id="tab-btn-read"
              onClick={() => setActiveTab('read')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-black rounded-xl transition-all shrink-0 ${
                activeTab === 'read'
                  ? 'bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] -translate-y-0.5'
                  : 'bg-white text-[#747D8C] border-2 border-[#DFE4EA] hover:border-[#2D3436] hover:text-[#2D3436]'
              }`}
            >
              <BookOpen className="w-4 h-4 stroke-[2.5px]" /> 1. Đọc truyện song ngữ
            </button>

            {/* Tab 2: Flashcards */}
            <button
              id="tab-btn-flashcards"
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-black rounded-xl transition-all shrink-0 ${
                activeTab === 'flashcards'
                  ? 'bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] -translate-y-0.5'
                  : 'bg-white text-[#747D8C] border-2 border-[#DFE4EA] hover:border-[#2D3436] hover:text-[#2D3436]'
              }`}
            >
              <Layers className="w-4 h-4 stroke-[2.5px]" /> 2. Thẻ từ Flashcard
            </button>

            {/* Tab 3: Quiz */}
            <button
              id="tab-btn-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-black rounded-xl transition-all shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] -translate-y-0.5'
                  : 'bg-white text-[#747D8C] border-2 border-[#DFE4EA] hover:border-[#2D3436] hover:text-[#2D3436]'
              }`}
            >
              <Award className="w-4 h-4 stroke-[2.5px]" /> 3. Làm bài luyện tập
            </button>

            {/* Tab 4: Create */}
            <button
              id="tab-btn-create"
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-black rounded-xl transition-all shrink-0 ${
                activeTab === 'create'
                  ? 'bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] -translate-y-0.5'
                  : 'bg-white text-[#747D8C] border-2 border-[#DFE4EA] hover:border-[#2D3436] hover:text-[#2D3436]'
              }`}
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5px]" /> 4. Tự tạo bài học (AI)
            </button>

            {/* Tab 5: Conversation Chat */}
            <button
              id="tab-btn-conversation"
              onClick={() => setActiveTab('conversation')}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-black rounded-xl transition-all shrink-0 ${
                activeTab === 'conversation'
                  ? 'bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436] -translate-y-0.5'
                  : 'bg-white text-[#747D8C] border-2 border-[#DFE4EA] hover:border-[#2D3436] hover:text-[#2D3436]'
              }`}
            >
              <MessageSquare className="w-4 h-4 stroke-[2.5px]" /> 5. Hội thoại thực tế (AI)
            </button>

          </div>

          {/* Active Tab Component Render block */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + activeStoryId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {activeTab === 'read' && (
                  <StoryViewer
                    story={activeStory}
                    learnedWords={learnedWords}
                    toggleLearnedWord={toggleLearnedWord}
                    speechRate={speechRate}
                  />
                )}

                {activeTab === 'flashcards' && (
                  <Flashcards
                    story={activeStory}
                    learnedWords={learnedWords}
                    toggleLearnedWord={toggleLearnedWord}
                    speechRate={speechRate}
                  />
                )}

                {activeTab === 'quiz' && (
                  <QuizSection
                    story={activeStory}
                    onSaveScore={handleSaveScore}
                  />
                )}

                {activeTab === 'create' && (
                  <StoryCreator
                    onAddStory={handleAddStory}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    existingCategories={existingCategories}
                    aiProvider={aiProvider}
                    userApiKey={geminiApiKey}
                    customBaseUrl={customBaseUrl}
                    customModel={customModel}
                    hasServerKey={hasServerKey}
                  />
                )}

                {activeTab === 'conversation' && (
                  <ConversationChat
                    activeStory={activeStory}
                    speechRate={speechRate}
                    aiProvider={aiProvider}
                    userApiKey={geminiApiKey}
                    customBaseUrl={customBaseUrl}
                    customModel={customModel}
                    hasServerKey={hasServerKey}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </section>

      </main>

      {/* Humble Elegant footer */}
      <footer className="text-center py-10 text-xs text-[#747D8C] font-extrabold">
        <p>© 2026 Story Vocab • Giải pháp nạp từ vựng tiếng Anh theo văn cảnh song ngữ đột phá.</p>
        <p className="mt-1 text-[11px] text-[#2D3436]/60">Trợ lý học tập thông minh đồng hành cùng bạn trên con đường chinh phục ngoại ngữ.</p>
      </footer>

    </div>
  );
}
