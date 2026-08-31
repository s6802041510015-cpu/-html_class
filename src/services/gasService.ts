import { CheckinRecord, LeaderboardUser, QuizResult, StudentProfile } from '../types';

const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbzidxFg5Rz7q1UkdDkEDINRv0NBey3bj0n3F86tzIbPFntN-t09hFDjUXReXZuGUrvV/exec';
const STORAGE_KEY_GAS_URL = 'html_learning_gas_url';

export function getGasUrl(): string {
  const stored = localStorage.getItem(STORAGE_KEY_GAS_URL);
  if (!stored || stored.includes('AKfycbyAsL9VOOue2w9lIKBBZ') || stored.includes('AKfycbwnv6OaoMZMVzGOxYwYrD2cCVlKqphXmWbE74CFppoZki_GLFtsr1Ox5RvrYc2rHuA')) {
    return DEFAULT_GAS_URL;
  }
  return stored;
}

export function saveGasUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY_GAS_URL, url);
}

export async function pingGasServer(): Promise<{ success: boolean; message: string }> {
  const url = getGasUrl();
  try {
    const res = await fetch(`${url}?action=ping`, { method: 'GET' });
    const data = await res.json();
    if (data.status === 'success') {
      return { success: true, message: data.message || 'เชื่อมต่อกับ Google Apps Script สำเร็จ' };
    }
    return { success: false, message: 'การตอบกลับจาก GAS ไม่สมบูรณ์' };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return { success: false, message: `ไม่สามารถเชื่อมต่อได้: ${errorMessage} (หมายเหตุ: แอปยังคงบันทึกข้อมูลในบราวเซอร์ได้อย่างสมบูรณ์)` };
  }
}

export async function syncUserToGas(user: StudentProfile): Promise<boolean> {
  const url = getGasUrl();
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'syncUser', user })
    });
    return true;
  } catch (err) {
    console.warn('Sync user error:', err);
    return false;
  }
}

export async function syncCheckinToGas(userId: string, displayName: string, record: CheckinRecord): Promise<boolean> {
  const url = getGasUrl();
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'checkin',
        userId,
        displayName,
        date: record.date,
        pointsEarned: record.pointsEarned,
        streakDays: record.streakDays
      })
    });
    return true;
  } catch (err) {
    console.warn('Sync checkin error:', err);
    return false;
  }
}

export async function syncQuizResultToGas(userId: string, displayName: string, result: QuizResult): Promise<boolean> {
  const url = getGasUrl();
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'saveQuizResult',
        userId,
        displayName,
        categoryId: result.categoryId,
        categoryTitle: result.categoryTitle,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: result.percentage,
        pointsEarned: result.pointsEarned,
        obj1Correct: result.obj1Correct,
        obj2Correct: result.obj2Correct
      })
    });
    return true;
  } catch (err) {
    console.warn('Sync quiz result error:', err);
    return false;
  }
}

export async function fetchLeaderboardFromGas(): Promise<LeaderboardUser[] | null> {
  const url = getGasUrl();
  try {
    const res = await fetch(`${url}?action=getLeaderboard`, { method: 'GET' });
    const data = await res.json();
    if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
      return data.data;
    }
    return null;
  } catch (err) {
    console.warn('Fetch leaderboard error:', err);
    return null;
  }
}
