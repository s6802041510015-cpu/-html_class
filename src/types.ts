export interface StudentProfile {
  userId: string;
  displayName: string;
  pictureUrl: string;
  statusMessage?: string;
  points: number;
  level: number;
  completedLessons: number;
  completedQuests: number;
  earnedBadgeIds: string[];
  lastCheckinDate: string | null;
  streakDays: number;
  rank: number;
}

export interface QuizQuestion {
  id: number;
  objective: 1 | 2; // 1 = บอกความหมายของ HTML, 2 = บอกหน้าที่ของ HTML
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reasoning: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
  badgeId: string;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorBg: string; // Pastel earth tone background
  colorText: string;
  category: 'checkin' | 'quiz' | 'objective' | 'level';
  requiredPoints?: number;
  requiredCheckins?: number;
  requiredCategoryCompletion?: string;
}

export interface QuizResult {
  categoryId: string;
  categoryTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  pointsEarned: number;
  timestamp: string;
  obj1Correct: number;
  obj1Total: number;
  obj2Correct: number;
  obj2Total: number;
}

export interface CheckinRecord {
  date: string;
  pointsEarned: number;
  streakDays: number;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  displayName: string;
  pictureUrl: string;
  points: number;
  level: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}
