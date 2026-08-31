import React, { useState } from 'react';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import { StudentProfile, CheckinRecord } from '../types';
import { syncCheckinToGas, syncUserToGas } from '../services/gasService';

interface DailyCheckinTabProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
}

export const DailyCheckinTab: React.FC<DailyCheckinTabProps> = ({
  student,
  onUpdateStudent
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const todayStr = new Date().toISOString().split('T')[0];
  const isAlreadyCheckedIn = student.lastCheckinDate === todayStr;

  const handleCheckin = async () => {
    if (isAlreadyCheckedIn) {
      Swal.fire({
        icon: 'info',
        title: 'คุณเช็คอินแล้ววันนี้!',
        text: 'กลับมาเช็คอินสะสมความรู้ใหม่ในวันพรุ่งนี้เพื่อรับโบนัสต่อเนื่องนะ',
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'รับทราบ'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newStreak = (student.streakDays || 0) + 1;
      const basePoints = 20;
      const bonusPoints = newStreak > 1 ? Math.min(newStreak * 10, 50) : 0;
      const totalEarned = basePoints + bonusPoints;

      // Update student points and badges
      const newPoints = student.points + totalEarned;
      const updatedBadgeIds = [...student.earnedBadgeIds];

      if (!updatedBadgeIds.includes('badge-first-checkin')) {
        updatedBadgeIds.push('badge-first-checkin');
      }
      if (newStreak >= 3 && !updatedBadgeIds.includes('badge-streak-3')) {
        updatedBadgeIds.push('badge-streak-3');
      }

      // Check level up
      const newLevel = Math.max(student.level, Math.floor(newPoints / 300) + 1);

      const updatedStudent: StudentProfile = {
        ...student,
        points: newPoints,
        level: newLevel,
        lastCheckinDate: todayStr,
        streakDays: newStreak,
        earnedBadgeIds: updatedBadgeIds,
        completedQuests: student.completedQuests + 1
      };

      onUpdateStudent(updatedStudent);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Sync to Google Apps Script backend
      const checkinRecord: CheckinRecord = {
        date: todayStr,
        pointsEarned: totalEarned,
        streakDays: newStreak
      };

      syncCheckinToGas(student.userId, student.displayName, checkinRecord);
      syncUserToGas(updatedStudent);

      Swal.fire({
        icon: 'success',
        title: '🎉 เช็คอินสำเร็จ!',
        html: `
          <div class="text-start p-2">
            <p class="mb-2 text-slate-700 font-medium">คุณได้รับคะแนนสะสม: <b class="text-amber-600 fs-5">+${totalEarned} PTS</b></p>
            <p class="mb-1 text-xs text-slate-500">• คะแนนเช็คอินพื้นฐาน: +${basePoints} PTS</p>
            ${bonusPoints > 0 ? `<p class="mb-1 text-xs text-emerald-600 font-semibold">• โบนัสความขยันต่อเนื่อง (${newStreak} วัน): +${bonusPoints} PTS</p>` : ''}
            <div class="mt-3 p-2 bg-indigo-50 rounded-lg text-xs text-indigo-900 border border-indigo-100">
              💡 <b>เกร็ดน่ารู้ HTML:</b> HTML ไม่ใช่ภาษาโปรแกรมมิ่ง แต่เป็น <i>HyperText Markup Language</i> ที่ใช้แท็กในการระบุโครงสร้างเว็บเพจ!
            </div>
          </div>
        `,
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'เยี่ยมเลย!'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาดในการเช็คอิน',
        text: 'กรุณาลองใหม่อีกครั้ง',
        confirmButtonColor: '#e63946'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7 Days Streak Visual Grid
  const daysOfWeek = [
    { day: 1, label: 'วันที่ 1', reward: '+20 PTS', icon: 'fa-star' },
    { day: 2, label: 'วันที่ 2', reward: '+30 PTS', icon: 'fa-fire' },
    { day: 3, label: 'วันที่ 3', reward: '+40 PTS + Badge', icon: 'fa-award' },
    { day: 4, label: 'วันที่ 4', reward: '+50 PTS', icon: 'fa-gem' },
    { day: 5, label: 'วันที่ 5', reward: '+60 PTS', icon: 'fa-bolt' },
    { day: 6, label: 'วันที่ 6', reward: '+70 PTS', icon: 'fa-trophy' },
    { day: 7, label: 'วันที่ 7', reward: '+100 PTS Mega Bonus', icon: 'fa-crown' }
  ];

  return (
    <div className="space-y-6">
      {/* Checkin Hero Header */}
      <div className="stat-card overflow-hidden bg-white">
        <div className="earth-gradient p-6 text-white relative">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
            <div>
              <span className="badge bg-[#E9C46A] text-[#4A443F] px-3 py-1 rounded-full text-xs font-bold mb-2">
                <i className="fa-solid fa-calendar-check me-1"></i> Daily Habit & Review
              </span>
              <h3 className="fs-3 fw-bold mb-1 text-white">ระบบเช็คอินทบทวนรายวัน</h3>
              <p className="text-xs text-emerald-50 mb-0">
                เข้าใช้งานประจำวันเพื่อสะสมคะแนน ปลดล็อก Badge และเตรียมความพร้อมในวิชาการสร้างเว็บไซต์
              </p>
            </div>

            <div className="text-center flex-shrink-0">
              <button
                onClick={handleCheckin}
                disabled={isSubmitting || isAlreadyCheckedIn}
                className={`btn btn-lg font-bold px-6 py-3 rounded-xl shadow-lg transition-all d-flex align-items-center gap-2 ${
                  isAlreadyCheckedIn
                    ? 'bg-[#588157] text-white cursor-not-allowed border-0'
                    : 'bg-[#E9C46A] hover:bg-[#FEFAE0] text-[#4A443F] scale-105 animate-pulse-subtle border-0'
                }`}
              >
                {isAlreadyCheckedIn ? (
                  <>
                    <i className="fa-solid fa-circle-check fs-5"></i>
                    <span>เช็คอินวันนี้เรียบร้อยแล้ว</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-hand-pointer fs-5"></i>
                    <span>กดเช็คอินวันนี้ (+20 PTS)</span>
                  </>
                )}
              </button>
              <div className="text-[11px] text-emerald-100 mt-2">
                {isAlreadyCheckedIn ? 'กลับมาเช็คอินใหม่ได้ในวันพรุ่งนี้' : 'รับโบนัสเพิ่มตามสถิติเช็คอินต่อเนื่อง'}
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Streak Road */}
        <div className="p-6 bg-[#F8F7F4] border-t border-[#E5E1DA]">
          <h5 className="fs-6 fw-bold text-[#344E41] mb-3 d-flex align-items-center gap-2">
            <i className="fa-solid fa-fire text-[#BC6C25]"></i>
            เส้นทางเช็คอินต่อเนื่อง (ปัจจุบัน: {student.streakDays} วันติด)
          </h5>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {daysOfWeek.map((item) => {
              const isPassed = student.streakDays >= item.day;
              const isCurrent = student.streakDays + 1 === item.day && !isAlreadyCheckedIn;

              return (
                <div
                  key={item.day}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isPassed
                      ? 'bg-[#E9EDC9] border-[#A3B18A] text-[#344E41] shadow-2xs'
                      : isCurrent
                      ? 'bg-[#FEFAE0] border-[#E9C46A] text-[#BC6C25] ring-2 ring-[#E9C46A] animate-float'
                      : 'bg-white border-[#E5E1DA] text-[#A5A58D]'
                  }`}
                >
                  <div className="text-[11px] font-semibold mb-1">{item.label}</div>
                  <div
                    className={`w-9 h-9 rounded-full mx-auto d-flex align-items-center justify-content-center mb-2 text-sm font-bold ${
                      isPassed
                        ? 'bg-[#588157] text-white'
                        : isCurrent
                        ? 'bg-[#E9C46A] text-[#4A443F]'
                        : 'bg-[#EDEDE9] text-[#A5A58D]'
                    }`}
                  >
                    <i className={`fa-solid ${isPassed ? 'fa-check' : item.icon}`}></i>
                  </div>
                  <div className="text-[10px] font-bold line-clamp-1">{item.reward}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* HTML Knowledge Snippet & Objectives Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stat-card p-5 bg-white border-l-4 border-l-[#588157]">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9EDC9] text-[#344E41] d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-bullseye text-lg"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-[#344E41]">วัตถุประสงค์การเรียนรู้ที่ 1</h6>
              <span className="text-xs text-[#588157] font-semibold">บอกความหมายของภาษา HTML ได้</span>
            </div>
          </div>
          <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
            HTML (HyperText Markup Language) คือภาษามาร์กอัปมาตรฐานที่ใช้สร้างและกำหนดโครงสร้างของเอกสารเว็บเพจ
            โดยเปิดแสดงผลผ่านเบราว์เซอร์ ซึ่งผู้เรียนต้องอธิบายได้ว่า HyperText คือข้อความที่เชื่อมโยงถึงกัน
            และ Markup คือการใช้แท็กกำกับส่วนประกอบ
          </p>
        </div>

        <div className="stat-card p-5 bg-white border-l-4 border-l-[#BC6C25]">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEFAE0] text-[#BC6C25] d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-layer-group text-lg"></i>
            </div>
            <div>
              <h6 className="fw-bold mb-0 text-[#344E41]">วัตถุประสงค์การเรียนรู้ที่ 2</h6>
              <span className="text-xs text-[#BC6C25] font-semibold">บอกหน้าที่ของภาษา HTML ได้</span>
            </div>
          </div>
          <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
            หน้าที่ของ HTML คือการทำโครงกระดูกจัดวางเนื้อหา เช่น ข้อความ รูปภาพ ลิงก์ ตาราง แบบฟอร์ม
            เพื่อให้เบราว์เซอร์ตีความ (Parse) และเรนเดอร์แสดงผลบนหน้าจอได้อย่างถูกต้อง มีระเบียบ และรองรับการเข้าถึง (Accessibility)
          </p>
        </div>
      </div>
    </div>
  );
};
