import React, { useState } from 'react';
import { initialBadges } from '../data/badgeData';
import { StudentProfile } from '../types';

interface BadgeCollectionTabProps {
  student: StudentProfile;
}

export const BadgeCollectionTab: React.FC<BadgeCollectionTabProps> = ({ student }) => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'locked'>('all');

  const earnedIds = new Set(student.earnedBadgeIds || []);
  const earnedCount = earnedIds.size;
  const totalCount = initialBadges.length;
  const completionPercent = Math.round((earnedCount / totalCount) * 100);

  const filteredBadges = initialBadges.filter((b) => {
    const isEarned = earnedIds.has(b.id);
    if (filter === 'earned') return isEarned;
    if (filter === 'locked') return !isEarned;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Badge Header Summary */}
      <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
          <div>
            <span className="badge bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <i className="fa-solid fa-award me-1"></i> Achievement Badges
            </span>
            <h3 className="fs-4 fw-bold mb-1 text-slate-800">คลังสะสมตราสัญลักษณ์ (Badges Showcase)</h3>
            <p className="text-xs text-slate-500 mb-0">
              สะสมตราเกียรติยศจากการเช็คอินประจำวัน การทำควิซทบทวน และการบรรลุวัตถุประสงค์การเรียนรู้
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center min-w-[200px]">
            <div className="text-xs text-slate-500 font-medium mb-1">ความคืบหน้าตราสัญลักษณ์</div>
            <div className="fs-4 fw-bold text-purple-700">
              {earnedCount} / {totalCount} <span className="text-xs text-slate-500">({completionPercent}%)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="d-flex align-items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm rounded-lg px-3 py-1.5 text-xs font-semibold ${
              filter === 'all' ? 'bg-purple-600 text-white' : 'btn-light text-slate-600'
            }`}
          >
            ทั้งหมด ({totalCount})
          </button>
          <button
            onClick={() => setFilter('earned')}
            className={`btn btn-sm rounded-lg px-3 py-1.5 text-xs font-semibold ${
              filter === 'earned' ? 'bg-emerald-600 text-white' : 'btn-light text-slate-600'
            }`}
          >
            ที่ได้รับแล้ว ({earnedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`btn btn-sm rounded-lg px-3 py-1.5 text-xs font-semibold ${
              filter === 'locked' ? 'bg-amber-600 text-white' : 'btn-light text-slate-600'
            }`}
          >
            ยังไม่ได้ปลดล็อก ({totalCount - earnedCount})
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const isEarned = earnedIds.has(badge.id);

          return (
            <div
              key={badge.id}
              className={`card border rounded-2xl p-5 transition-all relative overflow-hidden ${
                isEarned
                  ? 'bg-white border-purple-200 shadow-sm hover:shadow-md'
                  : 'bg-slate-50/80 border-slate-200 opacity-60'
              }`}
            >
              <div className="d-flex align-items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl d-flex align-items-center justify-content-center text-2xl flex-shrink-0 shadow-xs relative ${
                    isEarned ? `${badge.colorBg} ${badge.colorText}` : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <i className={`fa-solid ${badge.icon}`}></i>
                  {!isEarned && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-400 text-white rounded-full text-[10px] d-flex align-items-center justify-content-center border-2 border-white">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                  )}
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex align-items-center justify-content-between gap-2 mb-1">
                    <h5 className="fs-6 fw-bold text-slate-800 mb-0 line-clamp-1">{badge.title}</h5>
                    <span
                      className={`badge text-[10px] px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                        isEarned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isEarned ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-2">
                    {badge.description}
                  </p>

                  <div className="text-[11px] text-indigo-600 font-semibold d-flex align-items-center gap-1">
                    <i className="fa-solid fa-circle-info text-[10px]"></i>
                    <span>ประเภท: {badge.category === 'checkin' ? 'เช็คอินประจำวัน' : badge.category === 'objective' ? 'บรรลุวัตถุประสงค์' : 'เล่นควิซ'}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
