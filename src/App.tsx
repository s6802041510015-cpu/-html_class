/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { initialBadges } from './data/badgeData';
import { quizCategories } from './data/quizData';
import { QuizResult, StudentProfile } from './types';
import { getStoredUser, initLiffAndGetProfile, saveStoredUser } from './services/liffService';
import { syncUserToGas } from './services/gasService';

// Subcomponents
import { Navbar } from './components/Navbar';
import { StudentProfileCard } from './components/StudentProfileCard';
import { DailyCheckinTab } from './components/DailyCheckinTab';
import { QuizReviewTab } from './components/QuizReviewTab';
import { BadgeCollectionTab } from './components/BadgeCollectionTab';
import { LeaderboardTab } from './components/LeaderboardTab';
import { LearningAnalyticsTab } from './components/LearningAnalyticsTab';
import { LearningContentTab } from './components/LearningContentTab';
import { GasSetupGuideModal } from './components/GasSetupGuideModal';
import { LineLoginOverlay } from './components/LineLoginOverlay';

export default function App() {
  const [student, setStudent] = useState<StudentProfile>(getStoredUser());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [recentQuizResults, setRecentQuizResults] = useState<QuizResult[]>([]);

  // On initial mount: automatically trigger LIFF init / LINE login check
  useEffect(() => {
    async function initLineLogin() {
      const result = await initLiffAndGetProfile();
      if (result.profile) {
        setStudent(result.profile);
      }
    }
    initLineLogin();
  }, []);

  const handleUpdateStudent = (updated: StudentProfile) => {
    setStudent(updated);
    saveStoredUser(updated);
    syncUserToGas(updated);
  };

  const handleQuizCompleted = (result: QuizResult) => {
    setRecentQuizResults((prev) => [result, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A443F] pb-16">
      {/* Top Navbar */}
      <Navbar
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenGasModal={() => setActiveTab('gas-guide')}
      />

      {/* Main Container */}
      <main className="container-fluid max-w-7xl mx-auto px-4 pt-6">
        
        {/* Always display Student Profile Gamification Card on Dashboard */}
        <StudentProfileCard
          student={student}
          totalBadgesAvailable={initialBadges.length}
          onNavigateTab={setActiveTab}
        />

        {/* Tab Content Router */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Subject Overview & Objectives Banner */}
            <div className="stat-card p-6 bg-white">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
                <div>
                  <span className="badge bg-[#E9EDC9] text-[#344E41] px-3 py-1.5 rounded-full text-xs font-bold mb-2 border border-[#A3B18A]/30">
                    <i className="fa-solid fa-graduation-cap me-1"></i> วิชา การสร้างเว็บไซต์ (Web Development)
                  </span>
                  <h3 className="fs-4 fw-bold mb-2 text-[#344E41]">
                    ระบบทบทวนความรู้และตอบคำถาม (Gamification Learning System)
                  </h3>
                  <p className="text-xs text-[#6B705C] mb-0 leading-relaxed max-w-3xl">
                    ระบบประเมินและทบทวนผลสัมฤทธิ์ทางการเรียนเพื่อพัฒนาผู้เรียนรายบุคคล รองรับการเช็คอินประจำวัน สะสมคะแนน ปลดล็อก Badge และจัดอันดับผู้เรียน เชื่อมโยงข้อมูลผ่าน Google Sheets & Google Apps Script
                  </p>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setActiveTab('content')}
                    className="btn bg-[#588157] hover:bg-[#344E41] text-white font-bold px-4 py-3 rounded-xl shadow-md transition-all d-flex align-items-center gap-2 text-sm border-0"
                  >
                    <i className="fa-solid fa-book-open"></i>
                    <span>อ่านเนื้อหาบทเรียน</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="btn bg-[#6B9AC4] hover:bg-[#588157] text-white font-bold px-4 py-3 rounded-xl shadow-md transition-all d-flex align-items-center gap-2 text-sm border-0"
                  >
                    <i className="fa-solid fa-play"></i>
                    <span>เริ่มควิซทบทวนทันที</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Category Quick Action Cards */}
            <div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="fs-6 fw-bold text-[#344E41] mb-0 d-flex align-items-center gap-2">
                  <i className="fa-solid fa-layer-group text-[#6B9AC4]"></i>
                  หมวดหมู่ควิซทบทวนบทเรียน (2 หมวด รวม 20 ข้อ)
                </h5>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="btn btn-link text-[#344E41] font-semibold text-xs p-0 text-decoration-none hover:text-[#588157]"
                >
                  ดูทั้งหมด <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quizCategories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setActiveTab('quiz')}
                    className="stat-card p-4 hover:border-[#A3B18A] hover:shadow-md transition-all cursor-pointer bg-white group"
                  >
                    <div className="w-12 h-12 rounded-xl d-flex align-items-center justify-content-center text-xl mb-3 shadow-2xs group-hover:scale-110 transition-transform bg-[#FEFAE0] text-[#344E41]">
                      <i className={`fa-solid ${cat.icon}`}></i>
                    </div>
                    <h6 className="fw-bold text-[#344E41] mb-1 text-sm group-hover:text-[#588157] transition-colors line-clamp-1">
                      {cat.title}
                    </h6>
                    <p className="text-xs text-[#A5A58D] line-clamp-2 mb-3">
                      {cat.description}
                    </p>
                    <div className="text-[11px] font-semibold text-[#BC6C25] d-flex align-items-center justify-content-between">
                      <span>10 ข้อสอบ</span>
                      <i className="fa-solid fa-chevron-right text-xs group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quiz History */}
            {recentQuizResults.length > 0 && (
              <div className="stat-card p-5 bg-white">
                <h5 className="fs-6 fw-bold text-[#344E41] mb-3 d-flex align-items-center gap-2">
                  <i className="fa-solid fa-clock-rotate-left text-[#588157]"></i>
                  ประวัติการตอบคำถามล่าสุด
                </h5>
                <div className="space-y-2">
                  {recentQuizResults.slice(0, 5).map((res, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E1DA] text-xs d-flex align-items-center justify-content-between gap-3"
                    >
                      <div>
                        <div className="fw-bold text-[#344E41]">{res.categoryTitle}</div>
                        <div className="text-[10px] text-[#A5A58D]">
                          {new Date(res.timestamp).toLocaleDateString('th-TH')} • {res.obj1Correct}/{res.obj1Total} ความหมาย HTML | {res.obj2Correct}/{res.obj2Total} หน้าที่ HTML
                        </div>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-[#CCD5AE]/40 text-[#344E41] font-bold px-2.5 py-1 rounded-full border border-[#A3B18A]/30">
                          {res.score}/{res.totalQuestions} ({res.percentage}%)
                        </span>
                        <div className="text-[10px] text-[#BC6C25] fw-bold mt-1">+{res.pointsEarned} PTS</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'checkin' && (
          <DailyCheckinTab
            student={student}
            onUpdateStudent={handleUpdateStudent}
          />
        )}

        {activeTab === 'content' && (
          <LearningContentTab
            onStartQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizReviewTab
            student={student}
            onUpdateStudent={handleUpdateStudent}
            onQuizCompleted={handleQuizCompleted}
          />
        )}

        {activeTab === 'badges' && (
          <BadgeCollectionTab student={student} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardTab currentStudent={student} />
        )}

        {activeTab === 'analytics' && (
          <LearningAnalyticsTab student={student} />
        )}

        {activeTab === 'gas-guide' && (
          <GasSetupGuideModal onClose={() => setActiveTab('dashboard')} />
        )}

      </main>

      {/* LINE Login Overlay Modal */}
      <LineLoginOverlay
        currentStudent={student}
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(newStudent) => setStudent(newStudent)}
      />
    </div>
  );
}
