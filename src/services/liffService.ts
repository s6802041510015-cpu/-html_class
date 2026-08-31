import liff from '@line/liff';
import { StudentProfile } from '../types';

const STORAGE_KEY_USER = 'html_learning_student_profile';
const STORAGE_KEY_LIFF_ID = 'html_learning_liff_id';

export const DEFAULT_STUDENT: StudentProfile = {
  userId: 'LINE_USER_DEFAULT_001',
  displayName: 'นักเรียนทดสอบ (Student)',
  pictureUrl: '',
  statusMessage: 'เรียนรู้วิชาการสร้างเว็บไซต์ HTML5',
  points: 120,
  level: 1,
  completedLessons: 1,
  completedQuests: 1,
  earnedBadgeIds: ['badge-welcome'],
  lastCheckinDate: null,
  streakDays: 0,
  rank: 1
};

export function getSavedLiffId(): string {
  return localStorage.getItem(STORAGE_KEY_LIFF_ID) || '';
}

export function saveLiffId(liffId: string): void {
  localStorage.setItem(STORAGE_KEY_LIFF_ID, liffId);
}

export function getStoredUser(): StudentProfile {
  const data = localStorage.getItem(STORAGE_KEY_USER);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (parsed.pictureUrl && parsed.pictureUrl.includes('unsplash')) {
        parsed.pictureUrl = '';
      }
      return parsed;
    } catch {
      return DEFAULT_STUDENT;
    }
  }
  return DEFAULT_STUDENT;
}

export function saveStoredUser(user: StudentProfile): void {
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

export async function initLiffAndGetProfile(liffId?: string): Promise<{
  isLoggedIn: boolean;
  profile: StudentProfile | null;
  liffError?: string;
}> {
  const idToUse = liffId || getSavedLiffId();
  if (!idToUse) {
    const existing = getStoredUser();
    return { isLoggedIn: !!existing.userId, profile: existing };
  }

  try {
    await liff.init({ liffId: idToUse });
    if (!liff.isLoggedIn()) {
      liff.login();
      return { isLoggedIn: false, profile: null };
    }

    const liffProfile = await liff.getProfile();
    const stored = getStoredUser();

    const updatedProfile: StudentProfile = {
      ...stored,
      userId: liffProfile.userId,
      displayName: liffProfile.displayName,
      pictureUrl: liffProfile.pictureUrl || stored.pictureUrl || DEFAULT_STUDENT.pictureUrl,
      statusMessage: liffProfile.statusMessage || stored.statusMessage
    };

    saveStoredUser(updatedProfile);
    return { isLoggedIn: true, profile: updatedProfile };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn('LIFF init warning/fallback:', errorMessage);
    const stored = getStoredUser();
    return { isLoggedIn: true, profile: stored, liffError: errorMessage };
  }
}
