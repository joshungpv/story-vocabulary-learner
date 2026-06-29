import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Volume2, 
  RefreshCw, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Story } from '../types';

interface Message {
  role: 'ai' | 'user';
  text: string;
  translation?: string;
  feedback?: string;
  hint?: string;
  timestamp: Date;
}

interface Scenario {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  bgClass: string;
  openingEn: string;
  openingVi: string;
  simulatedTurns: Array<{
    aiResponse: string;
    aiResponseTranslation: string;
    feedback: string;
    hint: string;
  }>;
}

interface ConversationChatProps {
  activeStory?: Story;
  speechRate: number;
  aiProvider?: 'gemini' | 'openai-compatible';
  userApiKey?: string;
  customBaseUrl?: string;
  customModel?: string;
  hasServerKey?: boolean;
}

// Preloaded realistic scenarios
const SCENARIOS: Scenario[] = [
  {
    id: 'coffee-shop',
    title: 'Gọi cà phê tại quán',
    titleEn: 'At a Coffee Shop',
    description: 'Tập nói chuyện với nhân viên phục vụ (barista) để chọn món, chọn cỡ ly, thanh toán tại quầy.',
    icon: '☕',
    bgClass: 'bg-[#FFF2E6]',
    openingEn: "Hello! Welcome to Sunset Cafe. What can I get started for you today?",
    openingVi: "Xin chào! Chào mừng bạn đến với Sunset Cafe. Tôi có thể lấy món gì cho bạn hôm nay?",
    simulatedTurns: [
      {
        aiResponse: "Great choice! Would you like that hot or iced, and what size would you prefer?",
        aiResponseTranslation: "Lựa chọn tuyệt vời! Bạn muốn dùng nóng hay đá, và cỡ ly nào?",
        feedback: "Câu trả lời của bạn rất tốt! Mẹo nhỏ: Bạn có thể thêm từ 'please' ở cuối (ví dụ: 'Iced latte, please') để câu nói lịch sự và giống người bản xứ hơn.",
        hint: "1. I'll take a medium iced latte. (Cho tôi một ly latte đá cỡ vừa)\n2. Hot cappuccino, small size please. (Cappuccino nóng, cỡ nhỏ nhé)"
      },
      {
        aiResponse: "Perfect. Would you like any pastries, cookies, or snacks to go with that?",
        aiResponseTranslation: "Hoàn hảo. Bạn có muốn dùng thêm bánh ngọt, bánh quy hay đồ ăn nhẹ nào đi kèm không?",
        feedback: "Nghe rất tự nhiên! Để từ chối lịch sự, bạn có thể nói 'No, thank you, just the drink is fine' (Không, cảm ơn, chỉ đồ uống là được rồi).",
        hint: "1. Yes, I'd like a chocolate muffin, please. (Có, cho tôi một bánh muffin vị sô-cô-la)\n2. No, thanks. That's all for today. (Không, cảm ơn. Thế là đủ rồi)"
      },
      {
        aiResponse: "Excellent. Your total is $6.50. Will you be paying with cash or card?",
        aiResponseTranslation: "Xuất sắc. Tổng cộng của bạn là $6.50. Bạn sẽ thanh toán bằng tiền mặt hay thẻ?",
        feedback: "Ngữ pháp rất chuẩn! Cụm từ 'pay by card' hoặc 'pay with card' đều rất phổ biến và tự nhiên.",
        hint: "1. I'll pay with credit card. (Tôi sẽ thanh toán bằng thẻ tín dụng)\n2. I will pay in cash, here is $10. (Tôi sẽ trả tiền mặt, đây là $10)"
      },
      {
        aiResponse: "Thank you! Here is your receipt. Your drink will be ready at the pick-up counter in a couple of minutes. Have a wonderful day!",
        aiResponseTranslation: "Cảm ơn bạn! Đây là hóa đơn của bạn. Đồ uống sẽ có tại quầy nhận món sau vài phút nữa. Chúc bạn một ngày tuyệt vời!",
        feedback: "Chúc mừng bạn! Bạn đã hoàn thành xuất sắc thử thách giao tiếp tiếng Anh thực tế tại quán cà phê một cách lưu loát.",
        hint: "1. Thank you! Have a great day too. (Cảm ơn! Bạn cũng có một ngày tốt lành nhé)\n2. Thanks, see you later. (Cảm ơn, hẹn gặp lại sau)"
      }
    ]
  },
  {
    id: 'job-interview',
    title: 'Phỏng vấn xin việc',
    titleEn: 'A Job Interview',
    description: 'Thực hành trả lời các câu hỏi phỏng vấn cơ bản về bản thân, kinh nghiệm và lý do ứng tuyển.',
    icon: '👔',
    bgClass: 'bg-[#E6F3FF]',
    openingEn: "Good morning! Thank you for coming in today. To start, could you please tell me a little bit about yourself and your professional background?",
    openingVi: "Chào buổi sáng! Cảm ơn bạn đã đến ngày hôm nay. Để bắt đầu, bạn có thể giới thiệu một chút về bản thân và kinh nghiệm chuyên môn của mình được không?",
    simulatedTurns: [
      {
        aiResponse: "That sounds impressive. What would you say is your greatest professional strength, and how has it helped you in your career?",
        aiResponseTranslation: "Nghe có vẻ rất ấn tượng. Điểm mạnh chuyên môn lớn nhất của bạn là gì, và nó đã giúp ích thế nào cho sự nghiệp của bạn?",
        feedback: "Cách bạn giới thiệu bản thân rất rành mạch! Gợi ý: Hãy dùng các động từ hành động mạnh mẽ như 'led', 'designed', 'managed' để làm nổi bật hồ sơ của bạn.",
        hint: "1. My greatest strength is problem-solving. (Điểm mạnh lớn nhất của tôi là giải quyết vấn đề)\n2. I am highly organized and good at teamwork. (Tôi rất có tổ chức và làm việc nhóm tốt)"
      },
      {
        aiResponse: "Very nice. Why are you interested in joining our company specifically?",
        aiResponseTranslation: "Rất tốt. Tại sao bạn lại đặc biệt quan tâm đến việc gia nhập công ty chúng tôi?",
        feedback: "Câu trả lời của bạn chứa đựng động lực lớn! Nên kết hợp nói về tầm nhìn hay sản phẩm của công ty để nhà tuyển dụng thấy bạn đã tìm hiểu kỹ lưỡng.",
        hint: "1. Because your company is leading the market in innovation. (Bởi vì công ty bạn đang dẫn đầu thị trường về đổi mới sáng tạo)\n2. I share your company's mission and goals. (Tôi chia sẻ sứ mệnh và mục tiêu chung của công ty)"
      },
      {
        aiResponse: "I appreciate your insight. Thank you for your time today. We will get back to you with our decision by next week. Do you have any questions for us?",
        aiResponseTranslation: "Tôi đánh giá cao chia sẻ của bạn. Cảm ơn bạn đã dành thời gian hôm nay. Chúng tôi sẽ phản hồi lại kết quả vào tuần tới. Bạn có câu hỏi nào cho chúng tôi không?",
        feedback: "Cách phản ứng rất chuyên nghiệp! Khi phỏng vấn kết thúc, luôn là điểm cộng lớn nếu bạn hỏi lại 1-2 câu hỏi như về văn hóa công ty hoặc quy trình tiếp theo.",
        hint: "1. Yes, what is the typical day-to-day routine here? (Vâng, một ngày làm việc điển hình ở đây diễn ra như thế nào?)\n2. No questions. Thank you so much for this opportunity! (Không có câu hỏi nào. Cảm ơn rất nhiều vì cơ hội này!)"
      },
      {
        aiResponse: "That is a great question. We have a highly collaborative environment here. Thanks again, and have a good day!",
        aiResponseTranslation: "Đó là một câu hỏi tuyệt vời. Chúng tôi có môi trường làm việc cực kỳ cởi mở hỗ trợ lẫn nhau. Cảm ơn bạn một lần nữa và chúc một ngày tốt lành!",
        feedback: "Xuất sắc! Cuộc phỏng vấn mô phỏng đã kết thúc trọn vẹn. Bạn thể hiện phong thái tự tin và kỹ năng phản xạ tiếng Anh rất hứa hẹn.",
        hint: "1. Thank you, goodbye! (Cảm ơn bạn, chào tạm biệt!)\n2. Have a nice day! (Chúc một ngày tốt lành!)"
      }
    ]
  },
  {
    id: 'hotel-checkin',
    title: 'Nhận phòng khách sạn',
    titleEn: 'Hotel Check-in',
    description: 'Thực hiện thủ tục check-in, xuất trình giấy tờ tùy thân và hỏi các tiện ích phòng ngủ.',
    icon: '🏨',
    bgClass: 'bg-[#E6FFE6]',
    openingEn: "Welcome to the Grand Plaza Hotel! How can I assist you with your booking today?",
    openingVi: "Chào mừng bạn đến với Khách sạn Grand Plaza! Tôi có thể hỗ trợ gì cho việc đặt phòng của bạn hôm nay?",
    simulatedTurns: [
      {
        aiResponse: "Certainly! Could I please have your last name and an ID or passport for verification?",
        aiResponseTranslation: "Chắc chắn rồi! Cho tôi xin họ của bạn và giấy tờ tùy thân hoặc hộ chiếu để xác minh được không?",
        feedback: "Đầy đủ thông tin! Khi đưa giấy tờ, bạn có thể nói kèm: 'Here you go' hoặc 'Here is my passport' để tạo sự lịch sự tự nhiên.",
        hint: "1. Sure, my last name is Nguyen. Here is my passport. (Chắc chắn rồi, họ của tôi là Nguyễn. Đây là hộ chiếu của tôi)\n2. Yes, under the name John Smith. Here is my ID. (Vâng, dưới tên John Smith. Đây là CMT của tôi)"
      },
      {
        aiResponse: "Thank you. I found your reservation for a Deluxe Double Room for three nights. Would you like to add buffet breakfast for an additional $15 per day?",
        aiResponseTranslation: "Cảm ơn bạn. Tôi đã tìm thấy phòng đặt đôi Deluxe cho ba đêm. Bạn có muốn thêm bữa sáng buffet với phụ phí $15 mỗi ngày không?",
        feedback: "Rất tốt! Cụm từ 'include breakfast' (bao gồm bữa sáng) hoặc 'add breakfast' là những từ khóa giao tiếp khách sạn quan trọng.",
        hint: "1. Yes, please add the breakfast option. (Vâng, vui lòng thêm lựa chọn ăn sáng)\n2. No, thank you. I'll eat outside. (Không, cảm ơn. Tôi sẽ ăn ở ngoài)"
      },
      {
        aiResponse: "All set! Here is your keycard for room 508 on the fifth floor. The elevator is just around the corner. Enjoy your stay!",
        aiResponseTranslation: "Đã xong xuôi! Đây là thẻ phòng 508 ở tầng năm của bạn. Thang máy ở ngay góc cua. Chúc bạn có một kỳ nghỉ vui vẻ!",
        feedback: "Cực kỳ hoàn hảo! Bạn đã nắm rõ quy trình check-in khách sạn bằng tiếng Anh.",
        hint: "1. Thank you. What time is checkout? (Cảm ơn. Mấy giờ thì phải trả phòng vậy?)\n2. Perfect, thank you for your help. (Hoàn hảo, cảm ơn sự giúp đỡ của bạn)"
      },
      {
        aiResponse: "Checkout is at 11:00 AM. Please let us know if you need anything else during your stay. Enjoy!",
        aiResponseTranslation: "Thời gian trả phòng là 11:00 sáng. Hãy cho chúng tôi biết nếu bạn cần bất kỳ điều gì khác trong kỳ nghỉ. Chúc bạn tận hưởng vui vẻ!",
        feedback: "Tuyệt vời! Bạn đã hoàn tất cuộc hội thoại check-in khách sạn.",
        hint: "1. Thanks, I appreciate it. (Cảm ơn, tôi rất trân trọng)\n2. Have a nice day! (Chúc một ngày tốt lành!)"
      }
    ]
  },
  {
    id: 'asking-directions',
    title: 'Hỏi và chỉ đường',
    titleEn: 'Asking for Directions',
    description: 'Thực hành các mẫu câu hỏi đường đi, định vị các địa điểm công cộng như ga tàu điện ngầm.',
    icon: '🗺️',
    bgClass: 'bg-[#FFF9E6]',
    openingEn: "Excuse me, I seem to be a bit lost. Could you please tell me how to get to the nearest subway station?",
    openingVi: "Xin lỗi, hình như tôi hơi lạc đường một chút. Bạn có thể vui lòng chỉ cho tôi đường đến ga tàu điện ngầm gần nhất được không?",
    simulatedTurns: [
      {
        aiResponse: "Oh, is it within walking distance or should I take a bus from here?",
        aiResponseTranslation: "Ồ, ga đó có thể đi bộ đến được không hay tôi nên đi xe buýt từ đây?",
        feedback: "Hướng dẫn rất chi tiết! Các cụm từ chỉ hướng như 'go straight' (đi thẳng), 'turn left' (rẽ trái), 'take the second block' đều rất hữu ích.",
        hint: "1. You can walk there. It takes only 5 minutes. (Bạn có thể đi bộ đến đó. Chỉ mất khoảng 5 phút)\n2. You should take bus number 12. (Bạn nên bắt xe buýt số 12)"
      },
      {
        aiResponse: "I see. Thank you! Once I reach the station, which train line should I take to go downtown?",
        aiResponseTranslation: "Tôi hiểu rồi. Cảm ơn bạn! Khi tôi đến ga đó thì nên đi tuyến tàu nào để vào trung tâm thành phố?",
        feedback: "Trả lời rất thiết thực và rõ ý! Giúp người nước ngoài điều hướng giao thông công cộng luôn cần sự đơn giản và trực quan.",
        hint: "1. Take the Green Line going North. (Đi tuyến màu xanh lá về hướng Bắc)\n2. You need to take Line 4. (Bạn cần đi tuyến số 4)"
      },
      {
        aiResponse: "That is incredibly helpful. Thank you so much for your kindness and clear directions! Have a wonderful day!",
        aiResponseTranslation: "Thông tin cực kỳ hữu ích. Cảm ơn bạn rất nhiều vì sự tử tế và sự chỉ dẫn rõ ràng! Chúc một ngày tuyệt vời!",
        feedback: "Lịch thiệp và chuyên nghiệp! Kết thúc cuộc hội thoại chỉ đường đầy văn minh.",
        hint: "1. You are welcome! Have a safe trip. (Không có gì! Chúc bạn có chuyến đi an toàn)\n2. No problem, take care! (Không có gì, bảo trọng nhé!)"
      }
    ]
  }
];

export default function ConversationChat({
  activeStory,
  speechRate,
  aiProvider = 'gemini',
  userApiKey = '',
  customBaseUrl = '',
  customModel = '',
  hasServerKey = false
}: ConversationChatProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializingStory, setIsInitializingStory] = useState(false);
  const [simulatedTurnIndex, setSimulatedTurnIndex] = useState(0);
  const [showTranslations, setShowTranslations] = useState<Record<number, boolean>>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Helper to generate a simulated Scenario structure from activeStory
  const getStoryScenario = (story: Story): Scenario => {
    const vocab = story.vocabulary || [];
    const firstWord = vocab[0]?.word || 'practice';
    const firstWordVi = vocab[0]?.vietnamese || 'luyện tập';
    const secondWord = vocab[1]?.word || 'language';
    const secondWordVi = vocab[1]?.vietnamese || 'ngôn ngữ';
    const thirdWord = vocab[2]?.word || 'communication';
    const thirdWordVi = vocab[2]?.vietnamese || 'giao tiếp';

    return {
      id: `story-${story.id}`,
      title: `Chủ đề: ${story.title}`,
      titleEn: `Topic: ${story.title}`,
      description: `Luyện tập giao tiếp thực tế xoay quanh chủ đề "${story.title}". Sử dụng các từ vựng học được: ${vocab.slice(0, 5).map((v) => v.word).join(', ')}.`,
      icon: '📖',
      bgClass: 'bg-[#EBF7FF] border-[#0984E3]',
      openingEn: `Hi! Let's chat about "${story.title}". How are you doing today? Can you tell me your thoughts on this topic, maybe using the word "${firstWord}" (${firstWordVi})?`,
      openingVi: `Chào bạn! Chúng ta cùng trò chuyện về chủ đề "${story.title}" nhé. Hôm nay bạn thế nào? Bạn có thể chia sẻ suy nghĩ về chủ đề này, và thử dùng từ "${firstWord}" (${firstWordVi}) được không?`,
      simulatedTurns: [
        {
          aiResponse: `That's very interesting! How do you think "${secondWord}" (${secondWordVi}) plays a part in this?`,
          aiResponseTranslation: `Thật là thú vị! Bạn nghĩ "${secondWord}" (${secondWordVi}) đóng vai trò gì trong việc này?`,
          feedback: `Lựa chọn từ rất hay và hợp ngữ cảnh! Hãy tiếp tục phát huy nhé.`,
          hint: `1. It helps us with "${secondWord}". (Nó giúp chúng ta về "${secondWord}")\n2. I think "${secondWord}" is essential. (Tôi nghĩ "${secondWord}" là thiết yếu)`
        },
        {
          aiResponse: `Indeed! Let's try to also use "${thirdWord}" (${thirdWordVi}) to summarize our discussion. What is your final take?`,
          aiResponseTranslation: `Chắc chắn rồi! Hãy thử dùng thêm từ "${thirdWord}" (${thirdWordVi}) để tóm tắt cuộc thảo luận của chúng ta nhé. Ý kiến cuối cùng của bạn là gì?`,
          feedback: `Sử dụng từ vựng rất thành thạo và tự nhiên! Đoạn hội thoại của bạn đã đạt chất lượng rất tốt.`,
          hint: `1. We can communicate with "${thirdWord}". (Chúng ta có thể giao tiếp với "${thirdWord}")\n2. It makes "${thirdWord}" better. (Nó làm cho "${thirdWord}" tốt hơn)`
        }
      ]
    };
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const selectScenario = async (sc: Scenario) => {
    setSelectedScenario(sc);
    setSimulatedTurnIndex(0);
    
    // Set up default static opening message
    const openingMsg: Message = {
      role: 'ai',
      text: sc.openingEn,
      translation: sc.openingVi,
      hint: sc.simulatedTurns[0]?.hint || "Try replying in English!",
      timestamp: new Date()
    };
    
    setMessages([openingMsg]);
    setShowTranslations({ 0: false });

    // Check if the user is online with API key and this is a story scenario, then fetch personalized dynamic opening!
    const hasApiKey = hasServerKey || userApiKey || localStorage.getItem('story_vocab_gemini_api_key');
    if (sc.id.startsWith('story-') && hasApiKey && activeStory) {
      setIsLoading(true);
      setIsInitializingStory(true);
      try {
        const localSavedKey = localStorage.getItem('story_vocab_gemini_api_key') || '';
        const activeApiKey = userApiKey || localSavedKey;
        const localSavedProvider = localStorage.getItem('story_vocab_ai_provider') as any || aiProvider;
        const localSavedBaseUrl = localStorage.getItem('story_vocab_custom_base_url') || customBaseUrl;
        const localSavedModel = localStorage.getItem('story_vocab_custom_model') || customModel;

        const response = await fetch('/api/conversation-init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-gemini-api-key': activeApiKey ? activeApiKey.trim() : ''
          },
          body: JSON.stringify({
            storyTitle: activeStory.title,
            storyDescription: activeStory.description,
            vocabulary: activeStory.vocabulary,
            apiKey: activeApiKey ? activeApiKey.trim() : undefined,
            aiConfig: {
              provider: localSavedProvider,
              apiKey: activeApiKey ? activeApiKey.trim() : undefined,
              baseUrl: localSavedBaseUrl ? localSavedBaseUrl.trim() : undefined,
              modelName: localSavedModel ? localSavedModel.trim() : undefined,
            }
          })
        });

        if (response.ok) {
          const rawText = await response.text();
          let data: any;
          try { data = JSON.parse(rawText); } catch { data = {}; }

          const dynamicScenario: Scenario = {
            ...sc,
            title: data.scenarioTitle || sc.title,
            description: data.scenarioDescription || sc.description,
            openingEn: data.openingEn || sc.openingEn,
            openingVi: data.openingVi || sc.openingVi,
          };
          
          setSelectedScenario(dynamicScenario);
          
          const dynamicOpeningMsg: Message = {
            role: 'ai',
            text: data.openingEn || sc.openingEn,
            translation: data.openingVi || sc.openingVi,
            hint: data.initialHint || sc.simulatedTurns[0]?.hint || "Try replying in English!",
            timestamp: new Date()
          };
          
          setMessages([dynamicOpeningMsg]);
        }
      } catch (err) {
        console.error('Error fetching dynamic conversation start:', err);
      } finally {
        setIsLoading(false);
        setIsInitializingStory(false);
      }
    }
  };

  // Trigger auto-selection when activeStory is changed
  useEffect(() => {
    if (activeStory) {
      const storySc = getStoryScenario(activeStory);
      // Auto-select if nothing is selected or if the selected one is a story scenario that belongs to a different story
      if (!selectedScenario || (selectedScenario.id.startsWith('story-') && selectedScenario.id !== `story-${activeStory.id}`)) {
        selectScenario(storySc);
      }
    }
  }, [activeStory]);

  const handleRestart = () => {
    if (selectedScenario) {
      selectScenario(selectedScenario);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speechRate;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleTranslation = (index: number) => {
    setShowTranslations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentInput.trim() || isLoading || !selectedScenario) return;

    const userText = currentInput.trim();
    setCurrentInput('');

    // Append user message
    const userMsg: Message = {
      role: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const hasApiKey = hasServerKey || userApiKey || localStorage.getItem('story_vocab_gemini_api_key');

    if (hasApiKey) {
      // DYNAMIC MODE: call backend express endpoint /api/conversation-chat
      try {
        const localSavedKey = localStorage.getItem('story_vocab_gemini_api_key') || '';
        const activeApiKey = userApiKey || localSavedKey;
        const localSavedProvider = localStorage.getItem('story_vocab_ai_provider') as any || aiProvider;
        const localSavedBaseUrl = localStorage.getItem('story_vocab_custom_base_url') || customBaseUrl;
        const localSavedModel = localStorage.getItem('story_vocab_custom_model') || customModel;

        const chatHistoryForAPI = messages.map(m => ({
          role: m.role,
          text: m.text
        }));

        const response = await fetch('/api/conversation-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-gemini-api-key': activeApiKey ? activeApiKey.trim() : ''
          },
          body: JSON.stringify({
            scenario: `${selectedScenario.titleEn} (${selectedScenario.title})`,
            history: chatHistoryForAPI,
            userMessage: userText,
            apiKey: activeApiKey ? activeApiKey.trim() : undefined,
            aiConfig: {
              provider: localSavedProvider,
              apiKey: activeApiKey ? activeApiKey.trim() : undefined,
              baseUrl: localSavedBaseUrl ? localSavedBaseUrl.trim() : undefined,
              modelName: localSavedModel ? localSavedModel.trim() : undefined,
            }
          })
        });

        if (!response.ok) {
          const rawErrorText = await response.text();
          let errorData: any;
          try { errorData = JSON.parse(rawErrorText); } catch { errorData = {}; }
          throw new Error(errorData?.error || errorData?.message || `Server returned error ${response.status}`);
        }

        const chatRawText = await response.text();
        let data: any;
        try { data = JSON.parse(chatRawText); } catch { data = {}; }

        const aiMsg: Message = {
          role: 'ai',
          text: data.aiResponse || '<empty response>',
          translation: data.aiResponseTranslation,
          feedback: data.feedback,
          hint: data.hint,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMsg]);

      } catch (err: any) {
        console.error('Chat API Error:', err);
        // Fallback to simulated offline flow if API errors out
        useSimulatedResponse(userText);
      } finally {
        setIsLoading(false);
      }
    } else {
      // OFFLINE SIMULATION MODE
      // Simulate a small delay for natural pacing
      setTimeout(() => {
        useSimulatedResponse(userText);
        setIsLoading(false);
      }, 1000);
    }
  };

  const useSimulatedResponse = (userText: string) => {
    if (!selectedScenario) return;
    
    const turn = selectedScenario.simulatedTurns[simulatedTurnIndex];
    if (turn) {
      const nextTurnIndex = simulatedTurnIndex + 1;
      const nextTurn = selectedScenario.simulatedTurns[nextTurnIndex];

      const aiMsg: Message = {
        role: 'ai',
        text: turn.aiResponse,
        translation: turn.aiResponseTranslation,
        feedback: turn.feedback,
        hint: nextTurn ? nextTurn.hint : "Chúc mừng bạn đã hoàn thành đoạn hội thoại này!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setSimulatedTurnIndex(nextTurnIndex);
    } else {
      // End of simulated turns
      const aiMsg: Message = {
        role: 'ai',
        text: "That was great! We have finished this practice scenario. Feel free to restart or choose another situation!",
        translation: "Thật tuyệt vời! Chúng ta đã hoàn thành kịch bản luyện tập này. Hãy thoải mái khởi động lại hoặc lựa chọn một tình huống khác!",
        feedback: "Tuyệt vời! Bạn có phản xạ giao tiếp tiếng Anh tự nhiên và hiểu tình huống rất nhanh.",
        hint: "Click 'Khởi động lại' để luyện tập lại từ đầu nhé!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  const handleHintClick = (hintText: string) => {
    // Strip bullet numbers if any, e.g., "1. I'll take a medium iced latte." -> "I'll take a medium iced latte."
    let cleanHint = hintText.trim();
    if (/^\d+\.\s*/.test(cleanHint)) {
      cleanHint = cleanHint.replace(/^\d+\.\s*/, '');
    }
    // Also remove any parenthetical Vietnamese explanation if present, e.g., "I'll pay with credit card. (Tôi sẽ thanh toán...)"
    if (cleanHint.includes('(')) {
      cleanHint = cleanHint.split('(')[0].trim();
    }
    setCurrentInput(cleanHint);
  };

  // Check if any API keys are configured to show status label
  const isAiFullyOnline = !!(hasServerKey || userApiKey || localStorage.getItem('story_vocab_gemini_api_key'));

  return (
    <div id="conversation-chat-container" className="max-w-4xl mx-auto space-y-6">
      
      {/* Visual Header card */}
      <div className="p-6 bg-white rounded-3xl border-4 border-[#2D3436] shadow-[4px_4px_0px_#2D3436]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-[#2D3436] tracking-tight flex items-center gap-2">
              <span className="p-1.5 bg-[#55E6C1] border-2 border-[#2D3436] rounded-xl">
                <MessageSquare className="w-5 h-5 text-[#2D3436]" />
              </span>
              Hội thoại thực tế (AI)
            </h2>
            <p className="text-xs md:text-sm text-[#747D8C] font-extrabold leading-relaxed">
              Trò chuyện tiếng Anh tự nhiên trong tình huống thực tế. Có dịch nghĩa tức thì, sửa lỗi ngữ pháp & gợi ý câu trả lời.
            </p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {isAiFullyOnline ? (
              <span className="px-3 py-1 bg-[#55E6C1] text-[#2D3436] text-[11px] font-black uppercase tracking-wider rounded-lg border-2 border-[#2D3436] flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#2D3436]">
                <Sparkles className="w-3.5 h-3.5 text-[#2D3436]" /> Trí tuệ AI Dynamic Live
              </span>
            ) : (
              <span className="px-3 py-1 bg-[#FFF9E6] text-[#2D3436] text-[11px] font-black uppercase tracking-wider rounded-lg border-2 border-[#2D3436] flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#2D3436]">
                <AlertCircle className="w-3.5 h-3.5 text-[#FF7675]" /> Chế độ mô phỏng thông minh
              </span>
            )}
          </div>
        </div>
      </div>

      {!selectedScenario ? (
        /* Scenario Selection Grid */
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border-3 border-[#2D3436] shadow-[3px_3px_0px_#2D3436]">
            <p className="text-xs md:text-sm text-[#2D3436] font-black uppercase tracking-wider">
              👉 Hãy chọn một kịch bản giao tiếp dưới đây để bắt đầu thực hành:
            </p>
          </div>

          {activeStory && (
            <div className="p-1.5 bg-gradient-to-r from-[#FF7675] via-[#FFEAA7] to-[#55E6C1] rounded-[28px] border-4 border-[#2D3436] shadow-[4px_4px_0px_#2D3436]">
              <button
                id="scenario-btn-active-story"
                onClick={() => selectScenario(getStoryScenario(activeStory))}
                className="w-full text-left p-6 rounded-[22px] bg-white hover:bg-[#F8F9FA] transition-all flex flex-col md:flex-row items-start md:items-center gap-5"
              >
                <span className="text-4xl p-3 bg-[#EBF7FF] border-3 border-[#2D3436] rounded-2xl shrink-0 shadow-[2px_2px_0px_#2D3436]">
                  📖
                </span>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#FF7675] text-white text-[9px] font-black uppercase tracking-wider rounded border border-[#2D3436]">
                      Bài học đang chọn
                    </span>
                    {isInitializingStory ? (
                      <span className="px-2 py-0.5 bg-[#FFEAA7] text-[#2D3436] text-[9px] font-black uppercase tracking-wider rounded border border-[#2D3436] animate-pulse">
                        Đang tạo kịch bản...
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#55E6C1] text-[#2D3436] text-[9px] font-black uppercase tracking-wider rounded border border-[#2D3436]">
                        Tự động tạo kịch bản
                      </span>
                    )}
                  </div>
                  <h3 className="font-black text-[#2D3436] text-lg md:text-xl">
                    Hội thoại bài học: {activeStory.title}
                  </h3>
                  <p className="text-xs text-[#2D3436]/80 font-bold leading-relaxed">
                    Trải nghiệm thực hành giao tiếp dựa trên các từ vựng đã học trong bài: <strong>{activeStory.vocabulary.map(v => v.word).slice(0, 5).join(', ')}</strong>...
                  </p>
                  <p className="text-[10px] text-[#747D8C] font-black uppercase tracking-wide">
                    {isAiFullyOnline ? '✨ Đang kết nối trực tuyến qua AI Gemini để cá nhân hóa kịch bản đối thoại' : '⚡ Sẵn sàng luyện tập theo kịch bản bài học được tạo nhanh'}
                  </p>
                </div>
                <ChevronRight className="w-8 h-8 text-[#2D3436] shrink-0 self-center hidden md:block" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                id={`scenario-btn-${sc.id}`}
                onClick={() => selectScenario(sc)}
                className={`text-left p-5 rounded-3xl border-4 border-[#2D3436] ${sc.bgClass} shadow-[4px_4px_0px_#2D3436] hover:shadow-[6px_6px_0px_#2D3436] hover:-translate-y-1 transition-all flex items-start gap-4`}
              >
                <span className="text-4xl p-2 bg-white rounded-2xl border-3 border-[#2D3436] shrink-0 shadow-[2px_2px_0px_#2D3436]">
                  {sc.icon}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-[#2D3436] text-base md:text-lg">{sc.title}</h3>
                  </div>
                  <p className="text-xs font-black text-[#747D8C] uppercase tracking-wide">{sc.titleEn}</p>
                  <p className="text-xs text-[#2D3436]/80 font-bold leading-relaxed pt-1">{sc.description}</p>
                </div>
              </button>
            ))}
          </div>

          {!isAiFullyOnline && (
            <div className="p-5 bg-[#FFF9E6] rounded-2xl border-3 border-[#2D3436] text-xs font-semibold leading-relaxed text-[#747D8C] space-y-2 shadow-[2px_2px_0px_#2D3436]">
              <p className="font-black text-[#2D3436] flex items-center gap-1 uppercase">
                💡 Cấu hình phỏng vấn/trò chuyện AI thời gian thực
              </p>
              <p>
                Bạn hiện đang sử dụng <strong>Chế độ mô phỏng thông minh</strong> (hoàn toàn miễn phí, không yêu cầu thiết lập). Để trò chuyện hoàn toàn ngẫu nhiên và tự do với Trí tuệ Nhân tạo thực tế (mọi câu hỏi, mọi câu trả lời đều được AI phản hồi riêng cho bạn), bạn hãy điền khóa API của Google Gemini hoặc OpenAI ở mục <strong>Cấu hình AI (Gemini / OpenAI)</strong> trong tab <strong>"Tự tạo bài học (AI)"</strong> hoặc ở phần Cài đặt phía trên tiêu đề chính nhé!
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Active Chat Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Chat Interface (Left 2 columns on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Back to Scenarios & Scenario info */}
            <div className="flex items-center justify-between gap-2 p-3 bg-white rounded-2xl border-3 border-[#2D3436] shadow-[2px_2px_0px_#2D3436]">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedScenario.icon}</span>
                <div>
                  <h4 className="text-xs font-black text-[#2D3436] uppercase">{selectedScenario.title}</h4>
                  <p className="text-[10px] text-[#747D8C] font-bold">{selectedScenario.titleEn}</p>
                </div>
              </div>
              <button
                id="back-to-scenarios-btn"
                onClick={() => setSelectedScenario(null)}
                className="px-3 py-1.5 bg-[#FF7675] border-2 border-[#2D3436] text-white text-[11px] font-black rounded-xl hover:bg-[#D63031] transition-all shadow-[1px_1px_0px_#2D3436]"
              >
                Đổi kịch bản
              </button>
            </div>

            {/* Chat Messages Frame */}
            <div className="bg-white rounded-3xl border-4 border-[#2D3436] h-[450px] overflow-y-auto p-4 md:p-6 space-y-5 shadow-[4px_4px_0px_#2D3436]">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {/* AI Avatar */}
                    {msg.role === 'ai' && (
                      <span className="text-2xl p-1.5 bg-[#FFF2E6] border-2 border-[#2D3436] rounded-xl shrink-0 shadow-[1px_1px_0px_#2D3436]">
                        🤖
                      </span>
                    )}

                    <div className="max-w-[82%] space-y-1.5">
                      {/* Message Bubble */}
                      <div className={`p-4 rounded-2xl border-2.5 border-[#2D3436] relative shadow-[2px_2px_0px_#2D3436] ${
                        msg.role === 'user' 
                          ? 'bg-[#E6F3FF] text-[#2D3436] font-bold text-sm rounded-tr-none' 
                          : 'bg-[#F1F2F6] text-[#2D3436] font-extrabold text-sm rounded-tl-none'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                        
                        {/* Audio & Translation triggers for AI */}
                        {msg.role === 'ai' && (
                          <div className="flex items-center gap-2 mt-2 pt-1 border-t border-[#2D3436]/10">
                            <button
                              id={`speak-msg-${index}`}
                              onClick={() => speak(msg.text)}
                              title="Nghe phát âm bản xứ"
                              className="p-1 bg-white hover:bg-[#55E6C1] border border-[#2D3436] rounded text-[#2D3436] transition-all flex items-center justify-center"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {msg.translation && (
                              <button
                                id={`translate-msg-${index}`}
                                onClick={() => toggleTranslation(index)}
                                className="px-2 py-0.5 bg-white hover:bg-[#FFF9E6] border border-[#2D3436] text-[10px] font-black rounded text-[#747D8C] hover:text-[#2D3436] transition-all"
                              >
                                {showTranslations[index] ? 'Ẩn dịch' : 'Dịch nghĩa'}
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Display inline translation if toggled */}
                      {msg.role === 'ai' && msg.translation && showTranslations[index] && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-2.5 bg-[#FFF9E6] border-2 border-[#2D3436] rounded-xl text-xs text-[#2D3436] font-bold shadow-[1px_1px_0px_#2D3436]"
                        >
                          <p className="italic leading-relaxed">🇻🇳 {msg.translation}</p>
                        </motion.div>
                      )}
                    </div>

                    {/* User Avatar */}
                    {msg.role === 'user' && (
                      <span className="text-2xl p-1.5 bg-[#E6F3FF] border-2 border-[#2D3436] rounded-xl shrink-0 shadow-[1px_1px_0px_#2D3436]">
                        👤
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl p-1.5 bg-[#FFF2E6] border-2 border-[#2D3436] rounded-xl shrink-0 shadow-[1px_1px_0px_#2D3436] animate-pulse">
                    🤖
                  </span>
                  <div className="p-3.5 bg-[#F1F2F6] border-2.5 border-[#2D3436] rounded-2xl rounded-tl-none shadow-[2px_2px_0px_#2D3436]">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 bg-[#2D3436] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#2D3436] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#2D3436] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input & Action controls */}
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                id="conversation-text-input"
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Hãy gõ câu trả lời của bạn bằng tiếng Anh..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-2xl border-3 border-[#2D3436] bg-white text-sm font-bold text-[#2D3436] placeholder:text-[#747D8C]/60 outline-none shadow-[2px_2px_0px_#2D3436]"
              />
              <button
                id="conversation-send-btn"
                type="submit"
                disabled={isLoading || !currentInput.trim()}
                className="px-5 bg-[#55E6C1] border-3 border-[#2D3436] text-[#2D3436] rounded-2xl hover:bg-[#26DE81] disabled:bg-[#DFE4EA] disabled:text-[#747D8C] transition-all flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#2D3436] disabled:shadow-none"
              >
                <Send className="w-5 h-5 stroke-[2.5px]" />
              </button>
            </form>

          </div>

          {/* AI Teacher Side Panel (Right 1 column on large screen) */}
          <div className="space-y-4">
            
            {/* AI Advisor Panel (Grammar check & Suggestions) */}
            <div className="p-5 bg-[#FFF2E6] rounded-3xl border-4 border-[#2D3436] shadow-[4px_4px_0px_#2D3436] space-y-4">
              <h3 className="text-sm font-black text-[#2D3436] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF7675]" /> Nhận xét giáo viên AI
              </h3>

              {/* Feedback content box */}
              {(() => {
                // Find latest AI message with feedback
                const lastAiMsg = [...messages].reverse().find(m => m.role === 'ai' && m.feedback);
                if (lastAiMsg && lastAiMsg.feedback) {
                  return (
                    <div className="space-y-2.5">
                      <div className="p-3.5 bg-white rounded-2xl border-2 border-[#2D3436] text-xs font-bold text-[#2D3436] leading-relaxed shadow-[1.5px_1.5px_0px_#2D3436]">
                        <p className="whitespace-pre-line">{lastAiMsg.feedback}</p>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="p-4 bg-white/60 rounded-2xl border-2 border-dashed border-[#2D3436]/20 text-center text-xs text-[#747D8C] font-semibold py-8">
                    Hãy gửi câu trả lời đầu tiên của bạn. Giáo viên AI sẽ phân tích lỗi ngữ pháp và nhận xét ngay tại đây!
                  </div>
                );
              })()}
            </div>

            {/* Smart Hints Box */}
            <div className="p-5 bg-[#E6F3FF] rounded-3xl border-4 border-[#2D3436] shadow-[4px_4px_0px_#2D3436] space-y-4">
              <h3 className="text-sm font-black text-[#2D3436] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#0984E3]" /> Gợi ý cách trả lời (Hints)
              </h3>

              {(() => {
                const lastAiMsg = [...messages].reverse().find(m => m.role === 'ai' && m.hint);
                if (lastAiMsg && lastAiMsg.hint) {
                  const hintsList = lastAiMsg.hint.split('\n').filter(h => h.trim() !== '');
                  return (
                    <div className="space-y-2">
                      <p className="text-[10px] text-[#747D8C] font-black uppercase tracking-wide">💡 CLICK ĐỂ CHỌN MẪU CÂU:</p>
                      <div className="space-y-2">
                        {hintsList.map((hint, idx) => (
                          <button
                            key={idx}
                            id={`hint-option-btn-${idx}`}
                            onClick={() => handleHintClick(hint)}
                            className="w-full text-left p-3 bg-white hover:bg-[#55E6C1] border-2 border-[#2D3436] rounded-xl text-xs font-bold text-[#2D3436] transition-all flex items-start gap-1 shadow-[2px_2px_0px_#2D3436]"
                          >
                            <ChevronRight className="w-4 h-4 shrink-0 text-[#2D3436] mt-0.5" />
                            <span>{hint}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="p-4 bg-white/60 rounded-2xl border-2 border-dashed border-[#2D3436]/20 text-center text-xs text-[#747D8C] font-semibold py-6">
                    Không có gợi ý khả dụng cho lượt này.
                  </div>
                );
              })()}
            </div>

            {/* Reset current conversation */}
            <button
              id="restart-chat-btn"
              onClick={handleRestart}
              className="w-full py-3 bg-white border-3 border-[#2D3436] text-[#2D3436] hover:bg-[#FFF9E6] font-black rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-[2.5px_2.5px_0px_#2D3436] active:translate-y-0.5 active:shadow-[1px_1px_0px_#2D3436] transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Khởi động lại hội thoại
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
