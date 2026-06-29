# 📖 Story Vocabulary Learner

**Học và ghi nhớ từ vựng tiếng Anh qua câu chuyện song ngữ tương tác.**

Ứng dụng web giúp bạn nạp từ vựng tiếng Anh một cách tự nhiên thông qua các câu chuyện song ngữ (Anh — Việt), thẻ Flashcard 3D sinh động, bài tập trắc nghiệm, và tính năng tạo câu chuyện bằng AI cùng hội thoại thực tế.

> ⚡ Được xây dựng với **React 19 + TypeScript + Vite + Tailwind CSS 4**.
> 🤖 Tích hợp **Google Gemini API** (hỗ trợ OpenAI-compatible provider).

---

## ✨ Tính năng chính

| Tính năng | Mô tả |
|-----------|-------|
| 📖 **Đọc truyện song ngữ** | Đọc câu chuyện với từ vựng được highlight, nhấn vào từ để đánh dấu đã thuộc |
| 🃏 **Flashcard 3D** | Ôn từ vựng với thẻ lật 3D — mặt trước tiếng Anh, mặt sau nghĩa và ví dụ, kèm phát âm |
| 🏆 **Trắc nghiệm** | Kiểm tra từ vựng đã học với câu hỏi trắc nghiệm & điền từ |
| 🤖 **Tự tạo bài học (AI)** | Nhập chủ đề hoặc danh sách từ — AI tự động sinh câu chuyện song ngữ hoàn chỉnh |
| 💬 **Hội thoại thực tế (AI)** | Luyện nói tiếng Anh qua nhập vai với AI — có phản hồi ngữ pháp & gợi ý |
| 🔥 **Streak & tiến trình** | Theo dõi chuỗi ngày học liên tiếp và số từ đã thuộc |
| 🔤 **TTS (Text-to-Speech)** | Nghe phát âm giọng Mỹ chuẩn, điều chỉnh tốc độ đọc |

---

## ⚡ Khởi chạy nhanh (Global CLI)

Bạn có thể cài đặt trực tiếp và khởi chạy ứng dụng như một lệnh hệ thống từ bất kỳ thư mục nào trên máy tính của bạn:

### 1. Cài đặt toàn cục từ GitHub
```bash
npm install -g joshungpv/story-vocabulary-learner
```

### 2. Khởi chạy ứng dụng
```bash
story-vocabulary-learner
```
🎉 Ứng dụng sẽ tự động khởi động server và mở trình duyệt tại **http://localhost:3000**.

*(Để cập nhật phiên bản mới nhất, bạn chỉ cần chạy lại lệnh cài đặt trên)*

---

## 🚀 Phát triển dự án (Local Development)

### Yêu cầu

- **Node.js** >= 18

### 1. Cài đặt

```bash
npm install
```

### 2. Cấu hình API Key (tuỳ chọn)

Sao chép file `.env.example` thành `.env.local` và thêm Gemini API Key:

```bash
cp .env.example .env.local
```

Nội dung `.env.local`:

```
GEMINI_API_KEY="AIzaSy..."
APP_URL="http://localhost:3000"
```

> **Không bắt buộc:** Bạn có thể nhập API Key trực tiếp qua giao diện Settings của ứng dụng.

### 3. Chạy dev

```bash
npm run dev
```

Mở trình duyệt tại **http://localhost:3000**.

### 4. Build production

```bash
npm run build
npm start
```

---

## 🐳 Dùng Docker

```bash
docker compose up -d
```

Mở trình duyệt tại **http://localhost:3000**.

---

## 📁 Cấu trúc dự án

```
projects/story-vocabulary-learner/
├── index.html                # Entry HTML
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
├── server.ts                 # Express server + AI API routes
├── Dockerfile                # Docker build
├── docker-compose.yml        # Docker Compose
├── .env.example              # Mẫu biến môi trường
├── README.md
├── LICENSE
├── public/                   # Static assets (favicon)
│   ├── favicon.ico
│   └── favicon.svg
└── src/
    ├── main.tsx              # App entry
    ├── index.css             # Tailwind styles
    ├── App.tsx               # Component chính (state, routing, settings)
    ├── types.ts              # TypeScript types (Story, VocabularyItem, QuizQuestion...)
    ├── data/
    │   └── defaultStories.ts # 5 câu chuyện mẫu có sẵn
    └── components/
        ├── StoryViewer.tsx       # Đọc truyện song ngữ
        ├── Flashcards.tsx        # Flashcard 3D
        ├── QuizSection.tsx       # Trắc nghiệm
        ├── StoryCreator.tsx      # Tạo câu chuyện bằng AI
        └── ConversationChat.tsx  # Hội thoại với AI
```

---

## 🛠️ Tech Stack

| Công nghệ | Mục đích |
|-----------|----------|
| [React 19](https://react.dev/) | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | Ngôn ngữ |
| [Vite 6](https://vite.dev/) | Build tool |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [Motion](https://motion.dev/) (Framer Motion) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [Express](http://expressjs.com/) | Backend API server |
| [@google/genai](https://github.com/googleapis/nodejs-generative-ai) | Google Gemini SDK |
| [Docker](https://www.docker.com/) | Container hoá |
| [tsx](https://tsx.is/) | TypeScript runtime cho dev |

---

## 🤖 Hỗ trợ AI

Ứng dụng sử dụng AI cho hai tính năng chính:

1. **Tạo câu chuyện** (`/api/generate-story`) — Sinh câu chuyện song ngữ từ chủ đề hoặc danh sách từ
2. **Hội thoại** (`/api/conversation-chat` + `/api/conversation-init`) — Nhập vai và phản hồi ngữ pháp

**Hỗ trợ hai provider:**

| Provider | Ghi chú |
|----------|---------|
| **Google Gemini** (mặc định) | Dùng `@google/genai` SDK, hỗ trợ response schema |
| **OpenAI-compatible** | Hoạt động với OpenAI, DeepSeek, Groq... (cần nhập Base URL & Model name) |

Bạn có thể dùng API Key từ server (qua `.env.local`) hoặc tự nhập key trong giao diện Settings.

---

## 📄 Giấy phép

Dự án được phân phối dưới giấy phép **MIT**. Xem file [LICENSE](LICENSE).

---

*Happy learning — chinh phục từ vựng tiếng Anh mỗi ngày! 🚀*
