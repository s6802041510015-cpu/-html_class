import { Badge } from '../types';

export const initialBadges: Badge[] = [
  {
    id: 'badge-welcome',
    title: 'ผู้เริ่มต้นสร้างเว็บ',
    description: 'เข้าสู่ระบบทบทวนวิชาการสร้างเว็บไซต์สำเร็จครั้งแรก',
    icon: 'fa-user-astronaut',
    colorBg: 'bg-pastel-blue',
    colorText: 'text-blue-900',
    category: 'level'
  },
  {
    id: 'badge-first-checkin',
    title: 'เช็คอินวันแรก',
    description: 'บันทึกการเข้าเรียนและเช็คอินประจำวันสำเร็จ 1 ครั้ง',
    icon: 'fa-calendar-check',
    colorBg: 'bg-pastel-green',
    colorText: 'text-green-900',
    category: 'checkin',
    requiredCheckins: 1
  },
  {
    id: 'badge-streak-3',
    title: 'นักเรียนขยันประจำสัปดาห์',
    description: 'เช็คอินทบทวนความรู้ต่อเนื่องกัน 3 วัน',
    icon: 'fa-fire-flame-curved',
    colorBg: 'bg-pastel-orange',
    colorText: 'text-amber-900',
    category: 'checkin',
    requiredCheckins: 3
  },
  {
    id: 'badge-html-meaning-master',
    title: 'ผู้เชี่ยวชาญความหมาย HTML',
    description: 'ผ่านควิซหมวดความหมายและประวัติของ HTML (วัตถุประสงค์ที่ 1)',
    icon: 'fa-book-open-reader',
    colorBg: 'bg-pastel-purple',
    colorText: 'text-purple-900',
    category: 'objective',
    requiredCategoryCompletion: 'html-meaning-history'
  },
  {
    id: 'badge-html-function-master',
    title: 'ผู้เชี่ยวชาญหน้าที่ HTML',
    description: 'ผ่านควิซหมวดหน้าที่และโครงสร้างของ HTML (วัตถุประสงค์ที่ 2)',
    icon: 'fa-layer-group',
    colorBg: 'bg-earth-tan',
    colorText: 'text-amber-950',
    category: 'objective',
    requiredCategoryCompletion: 'html-function-structure'
  },
  {
    id: 'badge-score-100',
    title: 'คะแนนเต็มร้อย (Perfect Score)',
    description: 'ทำควิซชุดใดก็ได้ได้คะแนนเต็ม 10/10 ข้อ',
    icon: 'fa-trophy',
    colorBg: 'bg-earth-yellow',
    colorText: 'text-amber-950',
    category: 'quiz'
  },
  {
    id: 'badge-points-500',
    title: 'นักสะสมแต้ม 500 PTS',
    description: 'สะสมคะแนนในระบบรวมถึง 500 คะแนน',
    icon: 'fa-gem',
    colorBg: 'bg-pastel-blue',
    colorText: 'text-blue-900',
    category: 'level',
    requiredPoints: 500
  },
  {
    id: 'badge-web-master',
    title: 'Web Developer Master',
    description: 'ผ่านควิซทบทวนครบทั้ง 2 หมวด และบรรลุวัตถุประสงค์ครบถ้วน',
    icon: 'fa-crown',
    colorBg: 'bg-earth-orange',
    colorText: 'text-amber-950',
    category: 'level'
  }
];
