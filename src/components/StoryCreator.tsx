import React, { useState } from 'react';
import { Story, VocabularyItem } from '../types';
import { Sparkles, Save, BookOpen, AlertCircle, Plus, Trash2, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface StoryCreatorProps {
  onAddStory: (story: Story) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  existingCategories: string[];
  aiProvider?: 'gemini' | 'openai-compatible';
  userApiKey?: string;
  customBaseUrl?: string;
  customModel?: string;
  hasServerKey?: boolean;
}

export default function StoryCreator({ 
  onAddStory, 
  isLoading, 
  setIsLoading, 
  existingCategories,
  aiProvider = 'gemini',
  userApiKey = '',
  customBaseUrl = '',
  customModel = '',
  hasServerKey = false
}: StoryCreatorProps) {
  const [creationMode, setCreationMode] = useState<'ai' | 'manual'>('ai');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Local API Key & Custom config states for the warning card (if any)
  const [localProvider, setLocalProvider] = useState<'gemini' | 'openai-compatible'>(() => {
    return (localStorage.getItem('story_vocab_ai_provider') as 'gemini' | 'openai-compatible') || 'gemini';
  });
  const [localApiKey, setLocalApiKey] = useState(() => {
    return localStorage.getItem('story_vocab_gemini_api_key') || '';
  });
  const [localBaseUrl, setLocalBaseUrl] = useState(() => {
    return localStorage.getItem('story_vocab_custom_base_url') || '';
  });
  const [localModel, setLocalModel] = useState(() => {
    return localStorage.getItem('story_vocab_custom_model') || '';
  });

  const handleLocalConfigChange = (key: string, val: string) => {
    if (key === 'provider') {
      setLocalProvider(val as any);
      localStorage.setItem('story_vocab_ai_provider', val);
    } else if (key === 'apiKey') {
      setLocalApiKey(val);
      localStorage.setItem('story_vocab_gemini_api_key', val);
    } else if (key === 'baseUrl') {
      setLocalBaseUrl(val);
      localStorage.setItem('story_vocab_custom_base_url', val);
    } else if (key === 'model') {
      setLocalModel(val);
      localStorage.setItem('story_vocab_custom_model', val);
    }
  };

  // AI Generator Form
  const [theme, setTheme] = useState('');
  const [customWordsPrompt, setCustomWordsPrompt] = useState('');
  const [selectedAiCategory, setSelectedAiCategory] = useState('auto');
  const [customAiCategory, setCustomAiCategory] = useState('');

  // Manual Form
  const [manualTitle, setManualTitle] = useState('');
  const [selectedManualCategory, setSelectedManualCategory] = useState(existingCategories[0] || 'My Stories');
  const [customManualCategory, setCustomManualCategory] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [manualVietnamese, setManualVietnamese] = useState('');
  const [manualEnglish, setManualEnglish] = useState('');
  const [manualVocab, setManualVocab] = useState<VocabularyItem[]>([
    { word: '', phonetic: '', vietnamese: '', definition: '', example: '' }
  ]);

  // Handle AI Story Generation
  const handleGenerateStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    const activeProvider = aiProvider || localProvider;
    const activeApiKey = userApiKey || localApiKey;
    const activeBaseUrl = customBaseUrl || localBaseUrl;
    const activeModelName = customModel || localModel;

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-gemini-api-key': activeApiKey ? activeApiKey.trim() : ''
        },
        body: JSON.stringify({
          theme: theme ? theme.trim() : undefined,
          customWords: customWordsPrompt ? customWordsPrompt.trim() : undefined,
          apiKey: activeApiKey ? activeApiKey.trim() : undefined,
          aiConfig: {
            provider: activeProvider,
            apiKey: activeApiKey ? activeApiKey.trim() : undefined,
            baseUrl: activeBaseUrl ? activeBaseUrl.trim() : undefined,
            modelName: activeModelName ? activeModelName.trim() : undefined,
          }
        }),
      });

      const rawText = await response.text();
      let data: any;
      try {
        data = JSON.parse(rawText);
      } catch {
        const snippet = rawText.length > 120
          ? rawText.substring(0, 120) + '…'
          : rawText;
        throw new Error(`Máy chủ trả về nội dung lỗi không đúng định dạng. Chi tiết: ${snippet}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story.');
      }

      const finalCategory = selectedAiCategory === 'auto'
        ? data.category
        : (selectedAiCategory === 'new' ? (customAiCategory.trim() || 'My Stories') : selectedAiCategory);

      // Add unique ID and custom flag
      const newStory: Story = {
        ...data,
        category: finalCategory,
        id: `ai-story-${Date.now()}`,
        isCustom: true,
      };

      onAddStory(newStory);
      
      // Reset form
      setTheme('');
      setCustomWordsPrompt('');
      setSelectedAiCategory('auto');
      setCustomAiCategory('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during story generation.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Manual Story submission
  const handleSaveManualStory = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate manual form
    if (!manualTitle || !manualVietnamese || !manualEnglish) {
      setErrorMsg('Vui lòng điền tiêu đề, nội dung câu chuyện tiếng Việt và tiếng Anh.');
      return;
    }

    const filteredVocab = manualVocab.filter((item) => item.word.trim() !== '');
    if (filteredVocab.length === 0) {
      setErrorMsg('Vui lòng bổ sung ít nhất một từ vựng chi tiết bên dưới.');
      return;
    }

    // Automatically ensure the story contains brackets for vocabulary terms
    // We replace the custom terms listed in the form with brackets if not already formatted
    let parsedVietnamese = manualVietnamese;
    filteredVocab.forEach((vocab) => {
      const escapedWord = vocab.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?<!\\[)${escapedWord}(?!\\(.*?\\))`, 'gi');
      parsedVietnamese = parsedVietnamese.replace(regex, `[${vocab.word.toLowerCase()}](${vocab.vietnamese})`);
    });

    const finalCategory = selectedManualCategory === 'new'
      ? (customManualCategory.trim() || 'My Stories')
      : selectedManualCategory;

    const newStory: Story = {
      id: `manual-story-${Date.now()}`,
      title: manualTitle,
      category: finalCategory,
      description: manualDescription || 'Câu chuyện tự soạn thảo thủ công.',
      vietnameseStory: parsedVietnamese,
      englishStory: manualEnglish,
      vocabulary: filteredVocab,
      isCustom: true,
    };

    onAddStory(newStory);

    // Reset Manual Form
    setManualTitle('');
    setManualDescription('');
    setManualVietnamese('');
    setManualEnglish('');
    setManualVocab([{ word: '', phonetic: '', vietnamese: '', definition: '', example: '' }]);
    setSelectedManualCategory(existingCategories[0] || 'My Stories');
    setCustomManualCategory('');
  };

  const addVocabRow = () => {
    setManualVocab([
      ...manualVocab,
      { word: '', phonetic: '', vietnamese: '', definition: '', example: '' }
    ]);
  };

  const removeVocabRow = (index: number) => {
    if (manualVocab.length > 1) {
      setManualVocab(manualVocab.filter((_, i) => i !== index));
    }
  };

  const handleVocabChange = (index: number, field: keyof VocabularyItem, value: string) => {
    const updated = [...manualVocab];
    updated[index][field] = value;
    setManualVocab(updated);
  };

  return (
    <div id="story-creator-section" className="max-w-3xl mx-auto space-y-6">
      
      {/* Selector Mode Tabs */}
      <div className="flex bg-[#F1F2F6] border-2 border-[#2D3436] rounded-2xl p-1 gap-1 max-w-sm mx-auto shadow-[3px_3px_0px_#2D3436]">
        <button
          id="btn-creator-tab-ai"
          onClick={() => {
            setCreationMode('ai');
            setErrorMsg(null);
          }}
          className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            creationMode === 'ai'
              ? 'bg-[#55E6C1] text-[#2D3436] border-2 border-[#2D3436] shadow-[1px_1px_0px_#2D3436]'
              : 'text-[#747D8C] hover:text-[#2D3436]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 stroke-[2.5px]" /> Tạo chuyện bằng AI
        </button>
        <button
          id="btn-creator-tab-manual"
          onClick={() => {
            setCreationMode('manual');
            setErrorMsg(null);
          }}
          className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            creationMode === 'manual'
              ? 'bg-[#55E6C1] text-[#2D3436] border-2 border-[#2D3436] shadow-[1px_1px_0px_#2D3436]'
              : 'text-[#747D8C] hover:text-[#2D3436]'
          }`}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5px]" /> Tự soạn câu chuyện
        </button>
      </div>

      {/* ERROR HANDLER ALERTS */}
      {errorMsg && (
        <div id="creator-error-alert" className="p-4 bg-[#FF7675] border-3 border-[#2D3436] text-white rounded-2xl text-sm flex items-start gap-2.5 shadow-[4px_4px_0px_#2D3436]">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-white stroke-[2.5px]" />
          <div className="space-y-1">
            <p className="font-black">Đã xảy ra sự cố</p>
            <p className="text-white/90 font-bold leading-relaxed">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* LOADING ANIMATED SCREEN */}
      {isLoading ? (
        <div id="ai-loading-screen" className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-12 text-center space-y-6">
          <div className="relative inline-flex">
            <div className="w-16 h-16 rounded-full border-4 border-[#FFEAA7] border-t-[#FF7675] animate-spin" />
            <Cpu className="w-6 h-6 text-[#FF7675] absolute top-5 left-5 animate-pulse" />
          </div>
          
          <div className="space-y-2 animate-pulse">
            <h3 className="text-xl font-black text-[#2D3436] uppercase tracking-wide">Gemini AI đang sáng tác câu chuyện...</h3>
            <p className="text-sm text-[#747D8C] font-bold max-w-sm mx-auto leading-relaxed">
              Hệ thống đang lên ý tưởng, lồng ghép từ vựng thông minh, biên soạn định nghĩa tiếng Anh, phiên âm chuẩn IPA và thiết lập bài tập trắc nghiệm tự động.
            </p>
          </div>

          <div className="pt-4 border-t-2 border-[#DFE4EA] text-xs text-[#747D8C] font-bold">
            Mất khoảng 10 - 20 giây để hoàn tất bài học chất lượng cao.
          </div>
        </div>
      ) : (
        <>
          {/* MODE 1: GEMINI AI GENERATOR */}
          {creationMode === 'ai' && (
            <form id="ai-creator-form" onSubmit={handleGenerateStory} className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-6 md:p-8 space-y-6">
              <div className="space-y-1.5 border-b-2 border-[#DFE4EA] pb-4">
                <h3 className="text-lg font-black text-[#2D3436] flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles className="w-5 h-5 text-[#FF7675] stroke-[2.5px]" /> Tạo bài học từ vựng bằng AI
                </h3>
                <p className="text-xs text-[#747D8C] font-bold leading-relaxed">
                  Nhập bất kỳ chủ đề hoặc danh sách các từ vựng bạn mong muốn. Gemini sẽ tự động viết một câu chuyện song ngữ hấp dẫn bám sát format chuẩn để giúp bạn ghi nhớ sâu.
                </p>
              </div>

              {/* API Key Status warning if not configured */}
              {!(hasServerKey || userApiKey || localApiKey) && (
                <div id="ai-key-required-warning" className="p-4 bg-[#FFF9E6] border-2 border-[#2D3436] rounded-2xl text-xs space-y-3 shadow-[2px_2px_0px_#2D3436]">
                  <p className="font-black text-[#2D3436] uppercase tracking-wide flex items-center gap-1">
                    <AlertCircle className="w-4 h-4 text-[#FF7675]" /> Cấu hình API để sáng tác bằng AI (Gemini hoặc OpenAI)
                  </p>
                  <p className="text-[#747D8C] font-semibold leading-relaxed">
                    Bạn cần điền thông tin API của mình hoặc của bên thứ ba (như OpenAI, DeepSeek, hoặc Groq) dưới đây để mở khóa tính năng tự động sáng tác thông minh.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">Nhà cung cấp (Provider):</span>
                      <select
                        id="local-provider-select"
                        value={localProvider}
                        onChange={(e) => handleLocalConfigChange('provider', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-bold outline-none text-[#2D3436]"
                      >
                        <option value="gemini">Google Gemini API (Official)</option>
                        <option value="openai-compatible">Bên thứ 3 / OpenAI Compatible (OpenAI, DeepSeek...)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">API Key / Token:</span>
                      <input
                        id="local-api-key-input"
                        type="password"
                        placeholder="Nhập API Key..."
                        value={localApiKey}
                        onChange={(e) => handleLocalConfigChange('apiKey', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-mono font-bold outline-none text-[#2D3436]"
                      />
                    </div>

                    {localProvider === 'openai-compatible' && (
                      <>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">API Endpoint (Base URL):</span>
                          <input
                            id="local-base-url-input"
                            type="text"
                            placeholder="Ví dụ: https://api.openai.com/v1"
                            value={localBaseUrl}
                            onChange={(e) => handleLocalConfigChange('baseUrl', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-mono font-bold outline-none text-[#2D3436]"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-[#747D8C] uppercase tracking-wide">Tên Model (Model Name):</span>
                          <input
                            id="local-model-name-input"
                            type="text"
                            placeholder="Ví dụ: gpt-4o-mini hoặc gemini-2.5-flash"
                            value={localModel}
                            onChange={(e) => handleLocalConfigChange('model', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-xl border-2 border-[#2D3436] bg-white text-xs font-mono font-bold outline-none text-[#2D3436]"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="pt-1 flex justify-end">
                    <button
                      type="button"
                      id="save-local-key-inline-btn"
                      onClick={() => alert('Cấu hình API Key và Endpoint thành công! Giờ đây bạn đã có thể sử dụng các tính năng AI sáng tác.')}
                      className="px-4 py-1.5 bg-[#55E6C1] border-2 border-[#2D3436] text-[#2D3436] font-black rounded-xl text-xs hover:bg-[#26DE81] transition-all shadow-[2px_2px_0px_#2D3436]"
                    >
                      Kích hoạt AI
                    </button>
                  </div>

                  <p className="text-[10px] text-[#747D8C]/80 font-bold leading-normal">
                    * Lưu ý: Nếu không có khóa API, bạn vẫn hoàn toàn có thể chọn tab <strong>"Tự soạn câu chuyện"</strong> ngay phía trên để tự biên bài học thủ công hoàn toàn miễn phí!
                  </p>
                </div>
              )}

              {/* Theme option */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider block">Cách 1: Sáng tác theo Chủ đề / Ngữ cảnh</label>
                <input
                  id="ai-theme-input"
                  type="text"
                  placeholder="Ví dụ: Cắm trại trong rừng, Đi phỏng vấn xin việc, Mua sắm tại siêu thị..."
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value);
                    setCustomWordsPrompt('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB]"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-2">
                <div className="h-px bg-[#2D3436] flex-1" />
                <span className="text-xs font-black text-[#2D3436] uppercase">Hoặc</span>
                <div className="h-px bg-[#2D3436] flex-1" />
              </div>

              {/* Specific words option */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider block">Cách 2: Sáng tác theo danh sách từ vựng cụ thể</label>
                <textarea
                  id="ai-words-input"
                  rows={3}
                  placeholder="Ví dụ: presentation, budget, negotiation, contract, schedule..."
                  value={customWordsPrompt}
                  onChange={(e) => {
                    setCustomWordsPrompt(e.target.value);
                    setTheme('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-mono font-bold outline-none transition-all focus:bg-[#DFF9FB] resize-none"
                />
                <span className="text-[11px] text-[#747D8C] font-bold block mt-1">Các từ vựng cách nhau bởi dấu phẩy.</span>
              </div>

              {/* Category Selection for AI Story */}
              <div className="space-y-2 border-t-2 border-[#DFE4EA] pt-4">
                <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider block">Phân loại vào Chủ đề / Lớp học</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      id="ai-category-select"
                      value={selectedAiCategory}
                      onChange={(e) => setSelectedAiCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none cursor-pointer"
                    >
                      <option value="auto">🤖 Tự động phát hiện chủ đề mới phù hợp</option>
                      {existingCategories.map((cat) => (
                        <option key={cat} value={cat}>📁 {cat}</option>
                      ))}
                      <option value="new">➕ Tạo chủ đề mới...</option>
                    </select>
                  </div>
                  {selectedAiCategory === 'new' && (
                    <input
                      id="ai-custom-category-input"
                      type="text"
                      required
                      placeholder="Nhập tên chủ đề mới..."
                      value={customAiCategory}
                      onChange={(e) => setCustomAiCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB] shadow-[2px_2px_0px_#2D3436]"
                    />
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex justify-end">
                <button
                  id="submit-ai-generator-btn"
                  type="submit"
                  disabled={!theme.trim() && !customWordsPrompt.trim()}
                  className="flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-[#FF7675] border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40"
                >
                  <Cpu className="w-4 h-4 stroke-[2.5px]" />
                  Bắt đầu sáng tác câu chuyện AI
                </button>
              </div>
            </form>
          )}

          {/* MODE 2: MANUAL CREATION */}
          {creationMode === 'manual' && (
            <form id="manual-creator-form" onSubmit={handleSaveManualStory} className="bg-white rounded-3xl border-4 border-[#2D3436] shadow-[8px_8px_0px_#2D3436] p-6 md:p-8 space-y-6">
              
              <div className="space-y-1.5 border-b-2 border-[#DFE4EA] pb-4">
                <h3 className="text-lg font-black text-[#2D3436] flex items-center gap-1.5 uppercase tracking-wide">
                  <Plus className="w-5 h-5 text-[#FF7675] stroke-[2.5px]" /> Tự soạn thảo bài học thủ công
                </h3>
                <p className="text-xs text-[#747D8C] font-bold">
                  Nhập câu chuyện của riêng bạn. Để hiển thị từ vựng dạng nổi bật nhấp chuột, hãy viết theo dạng: <code className="bg-[#FFEAA7] border-2 border-[#2D3436] px-1 py-0.5 rounded text-[#2D3436] font-mono text-xs">word (nghĩa_tiếng_việt)</code> trong câu chuyện tiếng Việt.
                </p>
              </div>

              {/* Basic Meta Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider">Tiêu đề bài học</label>
                  <input
                    id="manual-title-input"
                    type="text"
                    required
                    placeholder="Ví dụ: My Favorite Coffee Shop"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider">Chủ đề / Thể loại</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <select
                      id="manual-category-select"
                      value={selectedManualCategory}
                      onChange={(e) => setSelectedManualCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none cursor-pointer"
                    >
                      {existingCategories.map((cat) => (
                        <option key={cat} value={cat}>📁 {cat}</option>
                      ))}
                      <option value="new">➕ Tạo chủ đề mới...</option>
                    </select>
                    {selectedManualCategory === 'new' && (
                      <input
                        id="manual-custom-category-input"
                        type="text"
                        required
                        placeholder="Nhập tên chủ đề mới..."
                        value={customManualCategory}
                        onChange={(e) => setCustomManualCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB]"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Short description */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider">Mô tả ngắn gọn (tiếng Việt)</label>
                <input
                  id="manual-desc-input"
                  type="text"
                  placeholder="Ví dụ: Kể về thói quen uống cà phê sáng và gặp gỡ bạn bè."
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB]"
                />
              </div>

              {/* Vietnamese Paragraph */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider block">Nội dung câu chuyện (Tiếng Việt)</label>
                <textarea
                  id="manual-vietnamese-input"
                  rows={4}
                  required
                  placeholder="Ví dụ: Mỗi sáng tôi thường có một gathering (sự tụ họp) nhỏ với bạn bè. Chúng tôi cùng nhau prepare (chuẩn bị) các tài liệu công việc..."
                  value={manualVietnamese}
                  onChange={(e) => setManualVietnamese(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB] font-sans resize-none"
                />
              </div>

              {/* English translation Paragraph */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[#2D3436] uppercase tracking-wider block">Bản dịch đối chiếu (Tiếng Anh)</label>
                <textarea
                  id="manual-english-input"
                  rows={4}
                  required
                  placeholder="Ví dụ: Every morning I usually have a small gathering with my friends. We prepare work documents together..."
                  value={manualEnglish}
                  onChange={(e) => setManualEnglish(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#2D3436] text-sm bg-white text-[#2D3436] font-bold outline-none transition-all focus:bg-[#DFF9FB] font-serif resize-none"
                />
              </div>

              {/* Vocabulary Detail Additions */}
              <div className="space-y-4 border-t-2 border-[#DFE4EA] pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#2D3436] uppercase tracking-wide">Chi tiết từ vựng đích cần ghi nhớ</h4>
                  <button
                    id="add-vocab-row-btn"
                    type="button"
                    onClick={addVocabRow}
                    className="inline-flex items-center gap-1 text-xs text-[#2D3436] font-black bg-[#FFEAA7] border-2 border-[#2D3436] px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_#2D3436] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5px]" /> Thêm từ vựng mới
                  </button>
                </div>

                <div className="space-y-4">
                  {manualVocab.map((item, index) => (
                    <div key={index} className="p-4 bg-[#F1F2F6] rounded-2xl border-2 border-[#2D3436] space-y-3 relative shadow-[2px_2px_0px_#2D3436]">
                      {manualVocab.length > 1 && (
                        <button
                          id={`delete-vocab-row-${index}`}
                          type="button"
                          onClick={() => removeVocabRow(index)}
                          className="absolute top-3 right-3 text-[#747D8C] hover:text-[#FF7675] transition-all cursor-pointer"
                          title="Xóa từ này"
                        >
                          <Trash2 className="w-4.5 h-4.5 stroke-[2px]" />
                        </button>
                      )}

                      {/* Line 1: Word + Phonetic + Vietnamese */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#2D3436] uppercase tracking-wider">Từ tiếng Anh</label>
                          <input
                            id={`manual-vocab-word-${index}`}
                            type="text"
                            required
                            placeholder="Ví dụ: gathering"
                            value={item.word}
                            onChange={(e) => handleVocabChange(index, 'word', e.target.value)}
                            className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#2D3436] text-xs font-mono font-bold outline-none focus:bg-[#DFF9FB]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#2D3436] uppercase tracking-wider">Phiên âm IPA</label>
                          <input
                            id={`manual-vocab-phonetic-${index}`}
                            type="text"
                            placeholder="Ví dụ: /ˈɡæð.ər.ɪŋ/"
                            value={item.phonetic}
                            onChange={(e) => handleVocabChange(index, 'phonetic', e.target.value)}
                            className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#2D3436] text-xs font-mono font-bold outline-none focus:bg-[#DFF9FB]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#2D3436] uppercase tracking-wider">Nghĩa tiếng Việt</label>
                          <input
                            id={`manual-vocab-vietnamese-${index}`}
                            type="text"
                            required
                            placeholder="Ví dụ: sự tụ họp"
                            value={item.vietnamese}
                            onChange={(e) => handleVocabChange(index, 'vietnamese', e.target.value)}
                            className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#2D3436] text-xs font-bold outline-none focus:bg-[#DFF9FB]"
                          />
                        </div>
                      </div>

                      {/* Line 2: English Definition */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-[#2D3436] uppercase tracking-wider">Định nghĩa giản lược bằng tiếng Anh</label>
                        <input
                          id={`manual-vocab-definition-${index}`}
                          type="text"
                          placeholder="Ví dụ: A meeting of people, especially for social purposes."
                          value={item.definition}
                          onChange={(e) => handleVocabChange(index, 'definition', e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#2D3436] text-xs font-bold outline-none focus:bg-[#DFF9FB]"
                        />
                      </div>

                      {/* Line 3: Example Sentence */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-[#2D3436] uppercase tracking-wider">Câu ví dụ thực tế</label>
                        <input
                          id={`manual-vocab-example-${index}`}
                          type="text"
                          placeholder="Ví dụ: The family gathering was wonderful."
                          value={item.example}
                          onChange={(e) => handleVocabChange(index, 'example', e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#2D3436] text-xs font-bold outline-none focus:bg-[#DFF9FB]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions submit manual */}
              <div className="pt-4 flex justify-end">
                <button
                  id="submit-manual-story-btn"
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-black text-white bg-[#55E6C1] text-[#2D3436] border-3 border-[#2D3436] rounded-xl shadow-[3px_3px_0px_#2D3436] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#2D3436] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 stroke-[2.5px]" />
                  Lưu & Bắt đầu học bài viết tay
                </button>
              </div>

            </form>
          )}
        </>
      )}

    </div>
  );
}
