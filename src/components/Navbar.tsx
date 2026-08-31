import React from 'react';
import { StudentProfile } from '../types';

interface NavbarProps {
  student: StudentProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLoginModal: () => void;
  onOpenGasModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  activeTab,
  setActiveTab,
  onOpenLoginModal,
  onOpenGasModal
}) => {
  const getLevelTitle = (lvl: number) => {
    if (lvl >= 5) return 'HTML Master';
    if (lvl >= 4) return 'Code Builder';
    if (lvl >= 3) return 'Web Developer Novice';
    if (lvl >= 2) return 'HTML Explorer';
    return 'Junior Learner';
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-[#E5E1DA] sticky-top shadow-xs z-30">
      {/* Top Header Row */}
      <div className="container-fluid max-w-7xl mx-auto px-4 py-3">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          
          {/* Brand & Course Title */}
          <div className="d-flex align-items-center gap-3">
            <div className="w-11 h-11 rounded-xl earth-gradient d-flex align-items-center justify-content-center text-white shadow-xs flex-shrink-0">
              <i className="fa-solid fa-code text-lg"></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold fs-5 text-[#344E41] me-1">วิชา การสร้างเว็บไซต์</span>
                <span className="badge bg-[#E9EDC9] text-[#344E41] font-semibold px-2.5 py-1 rounded-md text-xs border border-[#A3B18A]/40">
                  <i className="fa-brands fa-html5 me-1 text-[#E76F51]"></i> HTML5 Course
                </span>
              </div>
              <p className="text-xs text-[#A5A58D] mb-0 d-none d-sm-block">
                วัตถุประสงค์: 1. บอกความหมาย HTML | 2. บอกหน้าที่ HTML
              </p>
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="d-flex align-items-center gap-2.5">
            {/* Points Chip */}
            <div className="d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEFAE0] border border-[#E9C46A]/50 text-[#BC6C25] text-xs font-semibold shadow-2xs">
              <i className="fa-solid fa-bolt-lightning text-[#D4A373] text-sm animate-pulse-subtle"></i>
              <span>{student.points.toLocaleString()} PTS</span>
            </div>

            {/* Level Badge Chip */}
            <div className="d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#CCD5AE]/30 border border-[#A3B18A]/40 text-[#344E41] text-xs font-semibold shadow-2xs">
              <i className="fa-solid fa-crown text-[#588157] text-sm"></i>
              <span>Lv.{student.level} {getLevelTitle(student.level)}</span>
            </div>

            {/* GAS & Sheet Config Button */}
            <button
              onClick={onOpenGasModal}
              className="btn btn-sm rounded-lg d-flex align-items-center gap-1.5 text-xs py-1.5 px-2.5 bg-white border border-[#E5E1DA] text-[#4A443F] hover:bg-[#F8F7F4] hover:border-[#A3B18A] transition-colors"
              title="ตั้งค่า Google Apps Script & Sheet ID"
            >
              <i className="fa-solid fa-database text-[#6B9AC4]"></i>
              <span className="d-none d-md-inline">GAS & Sheet</span>
            </button>

            {/* User Profile Avatar / Login Button */}
            <div 
              onClick={onOpenLoginModal}
              className="d-flex align-items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-[#F8F7F4] transition-colors"
              title="คลิกเพื่อสลับหรือจัดการข้อมูล LINE Login"
            >
              {student.pictureUrl ? (
                <img
                  src={student.pictureUrl}
                  alt={student.displayName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#A3B18A] shadow-2xs"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#E9EDC9] text-[#344E41] d-flex align-items-center justify-content-center text-sm border-2 border-[#A3B18A] shadow-2xs font-bold">
                  <i className="fa-solid fa-user"></i>
                </div>
              )}
              <div className="d-none d-lg-block text-start">
                <div className="text-xs fw-bold text-[#344E41] line-clamp-1">{student.displayName}</div>
                <div className="text-[10px] text-[#588157] fw-semibold d-flex align-items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#588157] inline-block"></span>
                  LINE Connected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#F8F7F4] border-t border-[#E5E1DA] overflow-x-auto">
        <div className="container-fluid max-w-7xl mx-auto px-4">
          <ul className="nav nav-pills flex-nowrap py-2 gap-2 text-sm font-medium">
            <li className="nav-item">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-house"></i>
                <span>หน้าหลัก</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => setActiveTab('checkin')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'checkin'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-calendar-check text-[#A3B18A]"></i>
                <span>เช็คอินรายวัน</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => setActiveTab('content')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'content'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-book-open text-[#588157]"></i>
                <span>เนื้อหาบทเรียน</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => setActiveTab('quiz')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'quiz'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-circle-question text-[#D4A373]"></i>
                <span>ควิซทบทวนบทเรียน</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => setActiveTab('badges')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'badges'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-award text-[#E9C46A]"></i>
                <span>สะสม Badge</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-ranking-star text-[#E76F51]"></i>
                <span>อันดับคะแนนสูงสุด</span>
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-[#344E41] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-chart-line text-[#6B9AC4]"></i>
                <span>วิเคราะห์พัฒนาการ</span>
              </button>
            </li>

            <li className="nav-item ms-auto">
              <button
                onClick={() => setActiveTab('gas-guide')}
                className={`nav-link rounded-xl px-3.5 py-2 d-flex align-items-center gap-2 transition-all ${
                  activeTab === 'gas-guide'
                    ? 'bg-[#6B705C] text-white shadow-xs fw-semibold'
                    : 'text-[#4A443F] hover:bg-[#EDEDE9]'
                }`}
              >
                <i className="fa-solid fa-code-commit text-[#A3B18A]"></i>
                <span>โค้ด GAS & Sheet ID</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
