import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Radar, Line } from 'react-chartjs-2';
import { StudentProfile } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LearningAnalyticsTabProps {
  student: StudentProfile;
}

export const LearningAnalyticsTab: React.FC<LearningAnalyticsTabProps> = ({ student }) => {

  // Objective Mastery Estimates based on earned badges & quiz activity
  const hasMeaningBadge = student.earnedBadgeIds.includes('badge-html-meaning-master');
  const hasFunctionBadge = student.earnedBadgeIds.includes('badge-html-function-master');

  const obj1ScorePercent = hasMeaningBadge ? 92 : student.points > 200 ? 70 : 45;
  const obj2ScorePercent = hasFunctionBadge ? 88 : student.points > 200 ? 65 : 40;

  // Objective 1 vs Objective 2 Bar Chart Data
  const objectivesBarData = {
    labels: [
      'วัตถุประสงค์ 1: บอกความหมาย HTML',
      'วัตถุประสงค์ 2: บอกหน้าที่ HTML'
    ],
    datasets: [
      {
        label: 'ระดับความเข้าใจ (%)',
        data: [obj1ScorePercent, obj2ScorePercent],
        backgroundColor: ['rgba(99, 102, 241, 0.85)', 'rgba(168, 85, 247, 0.85)'],
        borderColor: ['#4f46e5', '#9333ea'],
        borderWidth: 2,
        borderRadius: 12
      }
    ]
  };

  // Radar Skill Map Data
  const radarSkillData = {
    labels: [
      'ความหมาย HTML (วัตถุประสงค์ 1)',
      'หน้าที่ HTML (วัตถุประสงค์ 2)',
      'การวินิจฉัยข้อสอบ',
      'การเช็คอินประจำวัน',
      'สถิติ Streak การขยัน',
      'ระดับสะสม XP'
    ],
    datasets: [
      {
        label: 'ผลสัมฤทธิ์ของผู้เรียน',
        data: [
          obj1ScorePercent,
          obj2ScorePercent,
          Math.min(100, Math.round((obj1ScorePercent + obj2ScorePercent) / 2)),
          Math.min(100, student.streakDays * 20 + 30),
          Math.min(100, student.streakDays * 15 + 40),
          Math.min(100, Math.round((student.points / 1200) * 100 + 20))
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.25)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4f46e5'
      }
    ]
  };

  // Simulated Point Gain Line Chart
  const pointsLineData = {
    labels: ['สัปดาห์ที่ 1', 'สัปดาห์ที่ 2', 'สัปดาห์ที่ 3', 'สัปดาห์ที่ 4', 'ปัจจุบัน'],
    datasets: [
      {
        fill: true,
        label: 'คะแนนสะสม (PTS)',
        data: [
          Math.max(50, student.points - 400),
          Math.max(100, student.points - 300),
          Math.max(180, student.points - 200),
          Math.max(250, student.points - 100),
          student.points
        ],
        borderColor: '#2a9d8f',
        backgroundColor: 'rgba(42, 157, 143, 0.15)',
        tension: 0.35,
        pointRadius: 5
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div>
            <span className="badge bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <i className="fa-solid fa-chart-line me-1"></i> Individual Learning Analytics
            </span>
            <h3 className="fs-4 fw-bold mb-1 text-slate-800">รายงานวิเคราะห์พัฒนาการรายบุคคล</h3>
            <p className="text-xs text-slate-500 mb-0">
              วิเคราะห์ความก้าวหน้าตามวัตถุประสงค์รายวิชาการสร้างเว็บไซต์ (HTML) ของผู้เรียน: {student.displayName}
            </p>
          </div>
        </div>
      </div>

      {/* Objectives Mastery Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objective 1 */}
        <div className="card border-0 shadow-sm rounded-2xl p-5 bg-white border-t-4 border-t-indigo-500">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs px-2.5 py-1 rounded-full mb-1">
                วัตถุประสงค์ที่ 1
              </span>
              <h5 className="fs-6 fw-bold text-slate-800 mb-0">บอกความหมายของภาษา HTML ได้</h5>
            </div>
            <span className="fs-4 fw-bold text-indigo-600">{obj1ScorePercent}%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${obj1ScorePercent}%` }}
            ></div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="d-flex align-items-center gap-2">
              <i className={`fa-solid ${hasMeaningBadge ? 'fa-circle-check text-emerald-500' : 'fa-circle-notch text-amber-500'}`}></i>
              <span>สถานะ Badge ความหมาย HTML: {hasMeaningBadge ? 'ปลดล็อกเรียบร้อย' : 'กำลังสะสมความรู้'}</span>
            </div>
            <p className="text-slate-500 text-[11px] mb-0 pt-1">
              คำอธิบาย: ผู้เรียนเข้าใจความหมายของ HyperText Markup Language และประวัติความเป็นมา
            </p>
          </div>
        </div>

        {/* Objective 2 */}
        <div className="card border-0 shadow-sm rounded-2xl p-5 bg-white border-t-4 border-t-purple-500">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <span className="badge bg-purple-50 text-purple-700 border border-purple-200 text-xs px-2.5 py-1 rounded-full mb-1">
                วัตถุประสงค์ที่ 2
              </span>
              <h5 className="fs-6 fw-bold text-slate-800 mb-0">บอกหน้าที่ของภาษา HTML ได้</h5>
            </div>
            <span className="fs-4 fw-bold text-purple-600">{obj2ScorePercent}%</span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
            <div
              className="bg-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${obj2ScorePercent}%` }}
            ></div>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="d-flex align-items-center gap-2">
              <i className={`fa-solid ${hasFunctionBadge ? 'fa-circle-check text-emerald-500' : 'fa-circle-notch text-amber-500'}`}></i>
              <span>สถานะ Badge หน้าที่ HTML: {hasFunctionBadge ? 'ปลดล็อกเรียบร้อย' : 'กำลังสะสมความรู้'}</span>
            </div>
            <p className="text-slate-500 text-[11px] mb-0 pt-1">
              คำอธิบาย: ผู้เรียนสามารถอธิบายหน้าที่จัดวางโครงสร้างเนื้อหา แท็กแสดงผล และฟอร์มรับข้อมูลได้
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Objectives Bar Chart */}
        <div className="card border-0 shadow-sm rounded-2xl p-5 bg-white">
          <h5 className="fs-6 fw-bold text-slate-800 mb-3 d-flex align-items-center gap-2">
            <i className="fa-solid fa-chart-simple text-indigo-600"></i>
            เปรียบเทียบผลสัมฤทธิ์รายวัตถุประสงค์
          </h5>
          <div className="h-64">
            <Bar
              data={objectivesBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { min: 0, max: 100, ticks: { callback: (val) => `${val}%` } }
                }
              }}
            />
          </div>
        </div>

        {/* Skill Radar Chart */}
        <div className="card border-0 shadow-sm rounded-2xl p-5 bg-white">
          <h5 className="fs-6 fw-bold text-slate-800 mb-3 d-flex align-items-center gap-2">
            <i className="fa-solid fa-spider text-purple-600"></i>
            แผนภูมิแสดงทักษะการเรียนรู้รอบด้าน
          </h5>
          <div className="h-64">
            <Radar
              data={radarSkillData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  r: { min: 0, max: 100 }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Point Accumulation Trend Line */}
      <div className="card border-0 shadow-sm rounded-2xl p-5 bg-white">
        <h5 className="fs-6 fw-bold text-slate-800 mb-3 d-flex align-items-center gap-2">
          <i className="fa-solid fa-arrow-trend-up text-emerald-600"></i>
          แนวโน้มพัฒนาการคะแนนสะสม (Points Growth Trend)
        </h5>
        <div className="h-64">
          <Line
            data={pointsLineData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
