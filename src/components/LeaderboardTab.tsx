import React, { useEffect, useState } from 'react';
import { initialLeaderboard } from '../data/initialLeaderboard';
import { LeaderboardUser, StudentProfile } from '../types';
import { fetchLeaderboardFromGas } from '../services/gasService';

interface LeaderboardTabProps {
  currentStudent: StudentProfile;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ currentStudent }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      const gasData = await fetchLeaderboardFromGas();

      if (!isMounted) return;

      if (gasData && gasData.length > 0) {
        // Blend current user into leaderboard if not present
        const hasCurrent = gasData.some((u) => u.userId === currentStudent.userId);
        let list = [...gasData];

        if (!hasCurrent) {
          list.push({
            rank: 0,
            userId: currentStudent.userId,
            displayName: currentStudent.displayName,
            pictureUrl: currentStudent.pictureUrl,
            points: currentStudent.points,
            level: currentStudent.level,
            badgesCount: currentStudent.earnedBadgeIds.length
          });
        }

        list.sort((a, b) => b.points - a.points);
        list = list.map((item, index) => ({
          ...item,
          rank: index + 1,
          isCurrentUser: item.userId === currentStudent.userId
        }));

        setLeaderboard(list);
      } else {
        // Fallback to local combined list
        let list = [...initialLeaderboard];
        const existingIdx = list.findIndex((u) => u.userId === currentStudent.userId);

        if (existingIdx >= 0) {
          list[existingIdx].points = Math.max(list[existingIdx].points, currentStudent.points);
          list[existingIdx].badgesCount = currentStudent.earnedBadgeIds.length;
          list[existingIdx].pictureUrl = currentStudent.pictureUrl;
          list[existingIdx].displayName = currentStudent.displayName;
        } else {
          list.push({
            rank: 0,
            userId: currentStudent.userId,
            displayName: currentStudent.displayName,
            pictureUrl: currentStudent.pictureUrl,
            points: currentStudent.points,
            level: currentStudent.level,
            badgesCount: currentStudent.earnedBadgeIds.length
          });
        }

        list.sort((a, b) => b.points - a.points);
        list = list.map((item, index) => ({
          ...item,
          rank: index + 1,
          isCurrentUser: item.userId === currentStudent.userId
        }));

        setLeaderboard(list);
      }
      setIsLoading(false);
    }

    loadData();
    return () => { isMounted = false; };
  }, [currentStudent]);

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="space-y-6">
      {/* Header Summary Card */}
      <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <span className="badge bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <i className="fa-solid fa-ranking-star me-1"></i> Leaderboard
            </span>
            <h3 className="fs-4 fw-bold mb-1 text-slate-800">ตารางอันดับผู้เรียนยอดเยี่ยม (Top Scores)</h3>
            <p className="text-xs text-slate-500 mb-0">
              วัดระดับคะแนนจากการเช็คอินประจำวัน การทำควิซทบทวนวิชาการสร้างเว็บไซต์ และผลสัมฤทธิ์ทางการเรียน
            </p>
          </div>
          {isLoading && (
            <div className="spinner-border spinner-border-sm text-indigo-600" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Top 3 Podiums */}
      {!isLoading && leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 align-items-end">
          {/* 2nd Place */}
          {top2 && (
            <div className="card border-0 shadow-md rounded-2xl p-4 text-center rank-podium-2 order-2 order-md-1">
              <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-black mx-auto d-flex align-items-center justify-content-center text-xs mb-2">
                2nd
              </div>
              {top2.pictureUrl ? (
                <img
                  src={top2.pictureUrl}
                  alt={top2.displayName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-400 mx-auto mb-2 shadow-xs"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-700 font-bold mx-auto mb-2 d-flex align-items-center justify-content-center text-2xl border-2 border-slate-400 shadow-xs">
                  <i className="fa-solid fa-user"></i>
                </div>
              )}
              <h6 className="fw-bold text-slate-800 mb-0 text-sm line-clamp-1">{top2.displayName}</h6>
              <div className="text-xs text-slate-600 fw-bold my-1">{top2.points.toLocaleString()} PTS</div>
              <span className="badge bg-slate-200 text-slate-800 text-[10px] px-2 py-0.5 rounded-full">
                Lv.{top2.level} • {top2.badgesCount} Badges
              </span>
            </div>
          )}

          {/* 1st Place Champion */}
          {top1 && (
            <div className="card border-0 shadow-lg rounded-2xl p-5 text-center rank-podium-1 order-1 order-md-2 animate-float">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-black mx-auto d-flex align-items-center justify-content-center text-sm mb-2 shadow-md">
                <i className="fa-solid fa-crown text-amber-300 me-1"></i> 1st
              </div>
              {top1.pictureUrl ? (
                <img
                  src={top1.pictureUrl}
                  alt={top1.displayName}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-400 mx-auto mb-2 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-800 font-bold mx-auto mb-2 d-flex align-items-center justify-content-center text-3xl border-4 border-amber-400 shadow-md">
                  <i className="fa-solid fa-user"></i>
                </div>
              )}
              <h5 className="fw-bold text-amber-950 mb-0 text-base line-clamp-1">{top1.displayName}</h5>
              <div className="fs-5 fw-black text-amber-900 my-1">{top1.points.toLocaleString()} PTS</div>
              <span className="badge bg-amber-200 text-amber-950 text-xs px-3 py-1 rounded-full font-bold">
                HTML Master • Lv.{top1.level}
              </span>
            </div>
          )}

          {/* 3rd Place */}
          {top3 && (
            <div className="card border-0 shadow-md rounded-2xl p-4 text-center rank-podium-3 order-3">
              <div className="w-8 h-8 rounded-full bg-orange-700 text-white font-black mx-auto d-flex align-items-center justify-content-center text-xs mb-2">
                3rd
              </div>
              {top3.pictureUrl ? (
                <img
                  src={top3.pictureUrl}
                  alt={top3.displayName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-400 mx-auto mb-2 shadow-xs"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-800 font-bold mx-auto mb-2 d-flex align-items-center justify-content-center text-2xl border-2 border-orange-400 shadow-xs">
                  <i className="fa-solid fa-user"></i>
                </div>
              )}
              <h6 className="fw-bold text-slate-800 mb-0 text-sm line-clamp-1">{top3.displayName}</h6>
              <div className="text-xs text-slate-600 fw-bold my-1">{top3.points.toLocaleString()} PTS</div>
              <span className="badge bg-orange-200 text-orange-950 text-[10px] px-2 py-0.5 rounded-full">
                Lv.{top3.level} • {top3.badgesCount} Badges
              </span>
            </div>
          )}
        </div>
      )}

      {/* Full Rankings Table */}
      <div className="card border-0 shadow-sm rounded-2xl overflow-hidden bg-white">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h5 className="fs-6 fw-bold text-slate-800 mb-0 d-flex align-items-center gap-2">
            <i className="fa-solid fa-list-ol text-indigo-600"></i>
            อันดับผู้เรียนทั้งหมด
          </h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-sm">
            <thead className="table-light text-slate-600 text-xs">
              <tr>
                <th className="text-center py-3" style={{ width: '70px' }}>อันดับ</th>
                <th className="py-3">ผู้เรียน</th>
                <th className="text-center py-3">ระดับ (Level)</th>
                <th className="text-center py-3">Badge ที่ได้รับ</th>
                <th className="text-end py-3 pe-4">คะแนนสะสม (PTS)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => (
                <tr
                  key={user.userId}
                  className={user.isCurrentUser ? 'bg-indigo-50/80 font-semibold' : ''}
                >
                  <td className="text-center">
                    {user.rank === 1 && <span className="badge bg-amber-400 text-amber-950 rounded-full w-7 h-7 d-inline-flex align-items-center justify-content-center font-bold">1</span>}
                    {user.rank === 2 && <span className="badge bg-slate-300 text-slate-800 rounded-full w-7 h-7 d-inline-flex align-items-center justify-content-center font-bold">2</span>}
                    {user.rank === 3 && <span className="badge bg-amber-700 text-white rounded-full w-7 h-7 d-inline-flex align-items-center justify-content-center font-bold">3</span>}
                    {user.rank > 3 && <span className="text-slate-500 font-bold">{user.rank}</span>}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      {user.pictureUrl ? (
                        <img
                          src={user.pictureUrl}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 d-flex align-items-center justify-content-center border border-slate-200 flex-shrink-0 text-sm">
                          <i className="fa-solid fa-user"></i>
                        </div>
                      )}
                      <div>
                        <div className="fw-bold text-slate-800 line-clamp-1">
                          {user.displayName}
                          {user.isCurrentUser && (
                            <span className="badge bg-indigo-600 text-white text-[10px] ms-2 px-2 py-0.5 rounded-full">
                              คุณอยู่ที่นี่
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">ID: {user.userId.substring(0, 12)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full">
                      Lv.{user.level}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full">
                      <i className="fa-solid fa-award me-1"></i> {user.badgesCount}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <span className="fw-bold text-indigo-700 fs-6">
                      {user.points.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 ms-1">PTS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
