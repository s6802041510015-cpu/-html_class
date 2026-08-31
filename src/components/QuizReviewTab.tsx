import React, { useState } from 'react';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';
import { quizCategories } from '../data/quizData';
import { QuizCategory, QuizQuestion, QuizResult, StudentProfile } from '../types';
import { syncQuizResultToGas, syncUserToGas } from '../services/gasService';

interface QuizReviewTabProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
  onQuizCompleted?: (result: QuizResult) => void;
}

export const QuizReviewTab: React.FC<QuizReviewTabProps> = ({
  student,
  onUpdateStudent,
  onQuizCompleted
}) => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selected: number; isCorrect: boolean }[]>([]);
  const [obj1Correct, setObj1Correct] = useState(0);
  const [obj1Total, setObj1Total] = useState(0);
  const [obj2Correct, setObj2Correct] = useState(0);
  const [obj2Total, setObj2Total] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Start quiz session
  const startQuiz = (cat: QuizCategory) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setObj1Correct(0);
    setObj2Correct(0);
    setIsFinished(false);

    let o1Count = 0;
    let o2Count = 0;
    cat.questions.forEach((q) => {
      if (q.objective === 1) o1Count++;
      if (q.objective === 2) o2Count++;
    });
    setObj1Total(o1Count);
    setObj2Total(o2Count);
  };

  // Select an option
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  // Submit answer for current question
  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || !selectedCategory) return;
    setIsAnswered(true);

    const currentQuestion = selectedCategory.questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      if (currentQuestion.objective === 1) setObj1Correct((prev) => prev + 1);
      if (currentQuestion.objective === 2) setObj2Correct((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selected: selectedAnswer,
        isCorrect
      }
    ]);
  };

  // Next question or Finish Quiz
  const handleNextQuestion = () => {
    if (!selectedCategory) return;
    if (currentIndex + 1 < selectedCategory.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  // Complete Quiz Session
  const finishQuiz = () => {
    if (!selectedCategory) return;
    setIsFinished(true);

    const totalQ = selectedCategory.questions.length;
    const pointsEarned = score * 10;
    const percentage = Math.round((score / totalQ) * 100);

    // Update badges
    const updatedBadgeIds = [...student.earnedBadgeIds];
    if (selectedCategory.badgeId && !updatedBadgeIds.includes(selectedCategory.badgeId)) {
      updatedBadgeIds.push(selectedCategory.badgeId);
    }
    if (score === totalQ && !updatedBadgeIds.includes('badge-score-100')) {
      updatedBadgeIds.push('badge-score-100');
    }

    const newPoints = student.points + pointsEarned;
    const newLevel = Math.max(student.level, Math.floor(newPoints / 300) + 1);

    const updatedStudent: StudentProfile = {
      ...student,
      points: newPoints,
      level: newLevel,
      completedLessons: student.completedLessons + 1,
      completedQuests: student.completedQuests + 1,
      earnedBadgeIds: updatedBadgeIds
    };

    onUpdateStudent(updatedStudent);

    // Fire Confetti
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    // Sync to GAS
    const quizResultRecord: QuizResult = {
      categoryId: selectedCategory.id,
      categoryTitle: selectedCategory.title,
      score,
      totalQuestions: totalQ,
      percentage,
      pointsEarned,
      timestamp: new Date().toISOString(),
      obj1Correct,
      obj1Total,
      obj2Correct,
      obj2Total
    };

    if (onQuizCompleted) {
      onQuizCompleted(quizResultRecord);
    }

    syncQuizResultToGas(student.userId, student.displayName, quizResultRecord);
    syncUserToGas(updatedStudent);

    Swal.fire({
      icon: percentage >= 80 ? 'success' : 'info',
      title: `🎉 ทำควิซสำเร็จ! ได้คะแนน ${score}/${totalQ}`,
      html: `
        <div class="text-start p-2">
          <p class="mb-1 text-slate-700 font-semibold">หมวด: ${selectedCategory.title}</p>
          <p class="mb-2 text-indigo-700 font-bold fs-5">รับคะแนนสะสม: +${pointsEarned} PTS (${percentage}%)</p>
          <hr class="my-2" />
          <p class="mb-1 text-xs text-slate-600"><b>วัตถุประสงค์ที่ 1 (ความหมาย HTML):</b> ตอบถูก ${obj1Correct}/${obj1Total} ข้อ</p>
          <p class="mb-1 text-xs text-slate-600"><b>วัตถุประสงค์ที่ 2 (หน้าที่ HTML):</b> ตอบถูก ${obj2Correct}/${obj2Total} ข้อ</p>
        </div>
      `,
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'สรุปผลและเฉลย'
    });
  };

  // Exit Quiz
  const handleExitQuiz = () => {
    setSelectedCategory(null);
    setIsFinished(false);
  };

  // 1. Category Selection Screen
  if (!selectedCategory) {
    return (
      <div className="space-y-6">
        <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <span className="badge bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-1">
                <i className="fa-solid fa-gamepad me-1"></i> Interactive HTML Quiz
              </span>
              <h3 className="fs-4 fw-bold mb-1 text-slate-800">ควิซทบทวนบทเรียน วิชาการสร้างเว็บไซต์</h3>
              <p className="text-xs text-slate-500 mb-0">
                เลือกหมวดหมู่ที่ต้องการทดสอบความรู้ (หมวดละ 10 ข้อ พร้อมเฉลยและเหตุผลประกอบอย่างละเอียด)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizCategories.map((cat) => (
              <div
                key={cat.id}
                className="card border border-slate-200 rounded-2xl p-5 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer bg-white group"
                onClick={() => startQuiz(cat)}
              >
                <div className="d-flex align-items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl d-flex align-items-center justify-content-center text-2xl flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${cat.colorClass}`}>
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fs-6 fw-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                      {cat.title}
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      {cat.description}
                    </p>
                    <div className="d-flex align-items-center justify-content-between text-xs">
                      <span className="badge bg-slate-100 text-slate-700 border border-slate-200">
                        <i className="fa-solid fa-list-check me-1"></i> {cat.questions.length} ข้อ
                      </span>
                      <span className="font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform d-inline-flex align-items-center gap-1">
                        เริ่มทำควิซ <i className="fa-solid fa-arrow-right text-xs"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. Quiz Finished Summary View
  if (isFinished) {
    const totalQ = selectedCategory.questions.length;
    const percentage = Math.round((score / totalQ) * 100);

    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header Summary Card */}
        <div className="card border-0 shadow-md rounded-2xl p-6 bg-white text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto d-flex align-items-center justify-content-center text-3xl mb-3 shadow-xs">
            <i className="fa-solid fa-trophy"></i>
          </div>
          <h3 className="fs-4 fw-bold text-slate-800 mb-1">สรุปผลการทำควิซ: {selectedCategory.title}</h3>
          <div className="d-flex align-items-center justify-content-center gap-3 my-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-medium d-block">คะแนนที่ได้</span>
              <span className="fs-4 fw-bold text-indigo-600">{score} / {totalQ}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-medium d-block">คิดเป็นร้อยละ</span>
              <span className="fs-4 fw-bold text-emerald-600">{percentage}%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
              <span className="text-xs text-slate-500 font-medium d-block">แต้มสะสม</span>
              <span className="fs-4 fw-bold text-amber-600">+{score * 10} PTS</span>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              onClick={() => startQuiz(selectedCategory)}
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-sm d-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-rotate-right"></i>
              <span>ทำควิซหมวดนี้อีกครั้ง</span>
            </button>
            <button
              onClick={handleExitQuiz}
              className="btn btn-outline-secondary font-semibold px-4 py-2 rounded-xl text-sm d-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>กลับสู่หน้าเลือกหมวดหมู่</span>
            </button>
          </div>
        </div>

        {/* Answer Solutions & Explanations List */}
        <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
          <h4 className="fs-5 fw-bold text-slate-800 mb-4 d-flex align-items-center gap-2">
            <i className="fa-solid fa-square-check text-indigo-600"></i>
            เฉลยและเหตุผลประกอบอย่างละเอียด ({totalQ} ข้อ)
          </h4>

          <div className="space-y-4">
            {selectedCategory.questions.map((q, idx) => {
              const uAns = userAnswers.find((u) => u.questionId === q.id);
              const isCorrect = uAns ? uAns.isCorrect : false;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border ${
                    isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="d-flex align-items-start justify-content-between gap-3 mb-2">
                    <span className="fw-bold text-sm text-slate-800">
                      ข้อที่ {idx + 1}. {q.question}
                    </span>
                    <span className={`badge px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? '✓ ตอบถูกต้อง' : '✕ ตอบผิด'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = uAns?.selected === optIdx;
                      const isOptionCorrect = q.correctIndex === optIdx;

                      let itemClass = 'bg-white border-slate-200 text-slate-600';
                      if (isOptionCorrect) {
                        itemClass = 'bg-emerald-100 border-emerald-300 font-bold text-emerald-900';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        itemClass = 'bg-rose-100 border-rose-300 font-bold text-rose-900 line-through';
                      }

                      return (
                        <div key={optIdx} className={`p-2 rounded-lg border ${itemClass}`}>
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                    <p className="fw-bold text-indigo-900 mb-1">
                      <i className="fa-solid fa-lightbulb text-amber-500 me-1"></i> เฉลย: {q.explanation}
                    </p>
                    <p className="text-slate-600 mb-0">
                      <b>เหตุผล:</b> {q.reasoning}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. Active Quiz Question View
  const currentQuestion: QuizQuestion = selectedCategory.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / selectedCategory.questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Quiz Header Bar */}
      <div className="card border-0 shadow-sm rounded-2xl p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
          <button
            onClick={handleExitQuiz}
            className="btn btn-sm btn-outline-secondary rounded-lg d-flex align-items-center gap-1.5 text-xs"
          >
            <i className="fa-solid fa-xmark"></i> ออกจากควิซ
          </button>
          <div className="text-xs fw-bold text-slate-700">
            {selectedCategory.title}
          </div>
          <span className="badge bg-indigo-100 text-indigo-700 text-xs px-2.5 py-1 rounded-full">
            ข้อที่ {currentIndex + 1} / {selectedCategory.questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card border border-slate-200 shadow-md rounded-2xl p-6 bg-white">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border inline-flex align-items-center gap-1.5 ${
            currentQuestion.objective === 1 
              ? 'bg-blue-100 text-blue-900 border-blue-300' 
              : 'bg-purple-100 text-purple-900 border-purple-300'
          }`}>
            <i className="fa-solid fa-bullseye"></i>
            {currentQuestion.objective === 1 ? 'วัตถุประสงค์ 1: ความหมาย HTML' : 'วัตถุประสงค์ 2: หน้าที่ HTML'}
          </span>
        </div>

        <h4 className="fs-5 fw-bold text-slate-900 leading-snug mb-6">
          {currentIndex + 1}. {currentQuestion.question}
        </h4>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectOption = currentQuestion.correctIndex === idx;

            let btnClass = 'bg-white border-slate-200 text-slate-800 hover:border-indigo-500 hover:bg-indigo-50/40 font-medium';
            if (isAnswered) {
              if (isCorrectOption) {
                btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-xs';
              } else if (isSelected && !isCorrectOption) {
                btnClass = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
              } else {
                btnClass = 'bg-slate-50 border-slate-200 text-slate-500 opacity-70';
              }
            } else if (isSelected) {
              btnClass = 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-bold shadow-sm';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-start p-4 rounded-xl border-2 transition-all d-flex align-items-center justify-content-between gap-3 ${btnClass}`}
              >
                <div className="d-flex align-items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg d-flex align-items-center justify-content-center text-xs font-bold flex-shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm font-semibold">{opt}</span>
                </div>

                {isAnswered && (
                  <div>
                    {isCorrectOption && <i className="fa-solid fa-circle-check text-emerald-600 fs-5"></i>}
                    {isSelected && !isCorrectOption && <i className="fa-solid fa-circle-xmark text-rose-600 fs-5"></i>}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Answer Explanation Box (After Answering) */}
        {isAnswered && (
          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 mb-6 text-xs text-indigo-950 space-y-2">
            <div className="fw-bold d-flex align-items-center gap-2 text-sm text-indigo-950">
              <i className="fa-solid fa-lightbulb text-amber-500 fs-6"></i>
              เฉลย: {currentQuestion.explanation}
            </div>
            <p className="mb-0 leading-relaxed text-slate-800">
              <b>เหตุผลประกอบ:</b> {currentQuestion.reasoning}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="d-flex justify-content-end gap-3">
          {!isAnswered ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm border-0 ${
                selectedAnswer !== null
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300'
              }`}
            >
              ยืนยันคำตอบ
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all text-sm d-flex align-items-center gap-2 border-0"
            >
              <span>{currentIndex + 1 < selectedCategory.questions.length ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
