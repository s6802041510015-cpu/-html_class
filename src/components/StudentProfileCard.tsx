import React from 'react';
import { StudentProfile } from '../types';

interface StudentProfileCardProps {
  student: StudentProfile;
  totalBadgesAvailable: number;
  onNavigateTab: (tab: string) => void;
}

export const StudentProfileCard: React.FC<StudentProfileCardProps> = ({
  student,
  totalBadgesAvailable,
  onNavigateTab
}) => {
  // Level threshold calculation
  const currentLevel = student.level;
  const xpCurrent = student.points % 300;
  const xpNextLevel = 300;
  const xpPercent = Math.min(100, Math.round((xpCurrent / xpNextLevel) * 100));

  const getLevelName = (lvl: number) => {
    switch (lvl) {
      case 1: return 'ระดับที่ 1: ผู้เริ่มต้นเรียนรู้ HTML';
      case 2: return 'ระดับที่ 2: นักสำรวจแท็กโครงสร้างเว็บ';
      case 3: return 'ระดับที่ 3: ผู้สร้างเว็บไซต์มือใหม่';
      case 4: return 'ระดับที่ 4: สถาปนิก HTML5';
      case 5: return 'ระดับที่ 5: ผู้เชี่ยวชาญการสร้างเว็บไซต์';
      default: return `ระดับที่ ${lvl}: HTML Developer Master`;
    }
  };

  return (
    <div className="stat-card overflow-hidden mb-6 bg-white">
      {/* Gamification Banner Background */}
      <div className="earth-gradient p-6 text-white relative">
        <div className="absolute top-0 right-0 p-4 opacity-15">
          <i className="fa-brands fa-html5 text-8xl text-white"></i>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-center gap-4 relative z-10">
          {/* Avatar with Level Ring */}
          <div className="relative">
            {student.pictureUrl ? (
              <img
                src={student.pictureUrl}
                alt={student.displayName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-[#E9EDC9] text-[#344E41] d-flex align-items-center justify-content-center text-4xl border-4 border-white shadow-md">
                <i className="fa-solid fa-user"></i>
              </div>
            )}
            <span className="absolute bottom-0 right-0 bg-[#E9C46A] text-[#4A443F] font-black text-xs px-2.5 py-1 rounded-full border-2 border-white shadow-md">
              Lv.{student.level}
            </span>
          </div>

          {/* Student Info */}
          <div className="text-center text-md-start flex-grow-1">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
              <h2 className="fs-4 fw-bold mb-0 text-white">{student.displayName}</h2>
              <span className="badge bg-white/20 text-white backdrop-blur-md border border-white/30 text-xs px-2.5 py-1 rounded-full">
                <i className="fa-brands fa-line me-1 text-[#E9EDC9]"></i> LINE Verified
              </span>
            </div>
            
            <p className="text-xs text-emerald-50 mb-2 font-medium">
              {getLevelName(student.level)}
            </p>

            {/* Level XP Progress Bar */}
            <div className="w-full max-w-md">
              <div className="d-flex justify-content-between text-xs text-emerald-50 mb-1 font-semibold">
                <span>XP สะสม: {student.points} PTS</span>
                <span>ระดับถัดไป: {xpCurrent} / {xpNextLevel} XP ({xpPercent}%)</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3.5 p-0.5 backdrop-blur-xs border border-white/20">
                <div
                  className="bg-[#E9C46A] h-2.5 rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${xpPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="d-flex flex-column gap-2 flex-shrink-0">
            <button
              onClick={() => onNavigateTab('quiz')}
              className="btn bg-white text-[#344E41] hover:bg-[#FEFAE0] hover:text-[#344E41] font-bold px-4 py-2.5 rounded-xl shadow-md transition-all d-flex align-items-center gap-2 text-sm border-0"
            >
              <i className="fa-solid fa-gamepad text-[#BC6C25]"></i>
              <span>เริ่มควิซทบทวน</span>
            </button>
            <button
              onClick={() => onNavigateTab('checkin')}
              className="btn btn-outline-light font-semibold px-3 py-1.5 rounded-xl text-xs d-flex align-items-center justify-content-center gap-1.5 border-white/40 hover:bg-white/10"
            >
              <i className="fa-solid fa-calendar-check text-[#E9EDC9]"></i>
              <span>เช็คอินประจำวัน</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Stats Bar (Natural Tones Stat Cards) */}
      <div className="p-4 bg-[#F8F7F4] border-t border-[#E5E1DA]">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          
          {/* Points */}
          <div className="stat-card p-3 text-center shadow-2xs hover:border-[#A3B18A] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#FEFAE0] text-[#BC6C25] mx-auto d-flex align-items-center justify-content-center mb-1.5 text-sm">
              <i className="fa-solid fa-coins"></i>
            </div>
            <div className="text-xs text-[#A5A58D] font-medium">คะแนนสะสม</div>
            <div className="fs-5 fw-bold text-[#344E41]">{student.points.toLocaleString()}</div>
          </div>

          {/* Completed Lessons */}
          <div className="stat-card p-3 text-center shadow-2xs hover:border-[#A3B18A] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#E9EDC9] text-[#588157] mx-auto d-flex align-items-center justify-content-center mb-1.5 text-sm">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="text-xs text-[#A5A58D] font-medium">บทเรียนสำเร็จ</div>
            <div className="fs-5 fw-bold text-[#344E41]">{student.completedLessons} บท</div>
          </div>

          {/* Completed Quests */}
          <div className="stat-card p-3 text-center shadow-2xs hover:border-[#A3B18A] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#F0EAD6] text-[#6B9AC4] mx-auto d-flex align-items-center justify-content-center mb-1.5 text-sm">
              <i className="fa-solid fa-bullseye"></i>
            </div>
            <div className="text-xs text-[#A5A58D] font-medium">ภารกิจสำเร็จ</div>
            <div className="fs-5 fw-bold text-[#344E41]">{student.completedQuests} ภารกิจ</div>
          </div>

          {/* Badges Count */}
          <div className="stat-card p-3 text-center shadow-2xs hover:border-[#A3B18A] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#CCD5AE]/40 text-[#6B705C] mx-auto d-flex align-items-center justify-content-center mb-1.5 text-sm">
              <i className="fa-solid fa-award"></i>
            </div>
            <div className="text-xs text-[#A5A58D] font-medium">จำนวน Badge</div>
            <div className="fs-5 fw-bold text-[#344E41]">
              {student.earnedBadgeIds.length} / {totalBadgesAvailable}
            </div>
          </div>

          {/* Streak Days */}
          <div className="stat-card p-3 text-center shadow-2xs hover:border-[#A3B18A] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#FAEDCD] text-[#D4A373] mx-auto d-flex align-items-center justify-content-center mb-1.5 text-sm">
              <i className="fa-solid fa-fire-flame-curved"></i>
            </div>
            <div className="text-xs text-[#A5A58D] font-medium">เช็คอินต่อเนื่อง</div>
            <div className="fs-5 fw-bold text-[#344E41]">{student.streakDays} วัน</div>
          </div>

          {/* Leaderboard Rank */}
          <div className="stat-card p-3 text-center shadow-2xs hover:border-[#A3B18A] transition-all">
            <div className="w-9 h-9 rounded-xl bg-[#E76F51]/15 text-[#E76F51] mx-auto d-flex align-items-center justify-content-center mb-1.5 text-sm">
              <i className="fa-solid fa-ranking-star"></i>
            </div>
            <div className="text-xs text-[#A5A58D] font-medium">อันดับของผู้เรียน</div>
            <div className="fs-5 fw-bold text-[#BC6C25]">อันดับที่ {student.rank}</div>
          </div>

        </div>
      </div>
    </div>
  );
};
