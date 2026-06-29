export interface VocabularyItem {
  word: string;
  phonetic: string;
  vietnamese: string;
  definition: string;
  example: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  vietnameseStory: string; // The bilingual story with markdown or tags for highlighted words
  englishStory: string;    // Full English translation for reference
  vocabulary: VocabularyItem[];
  category: string;
  isCustom?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank';
  question: string;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  word: string; // The word this question tests
}

export interface ProgressState {
  learnedWords: string[]; // List of words marked as "learned"
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  quizHighScores: Record<string, number>; // storyId -> high score percentage
}
