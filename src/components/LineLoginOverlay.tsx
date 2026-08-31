import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { StudentProfile } from '../types';
import { getSavedLiffId, initLiffAndGetProfile, saveLiffId, saveStoredUser } from '../services/liffService';

interface LineLoginOverlayProps {
  currentStudent: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentProfile) => void;
}

export const LineLoginOverlay: React.FC<LineLoginOverlayProps> = ({
  currentStudent,
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [liffIdInput, setLiffIdInput] = useState(getSavedLiffId());
  const [displayNameInput, setDisplayNameInput] = useState(currentStudent.displayName);
  const [pictureUrlInput, setPictureUrlInput] = useState(currentStudent.pictureUrl);
  const [isInitializing, setIsInitializing] = useState(false);

  if (!isOpen) return null;

  const handleLineLiffLogin = async () => {
    setIsInitializing(true);
    if (liffIdInput.trim()) {
      saveLiffId(liffIdInput.trim());
    }

    const result = await initLiffAndGetProfile(liffIdInput.trim());
    setIsInitializing(false);

    if (result.profile) {
      onLoginSuccess(result.profile);
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบด้วย LINE เรียบร้อย!',
        html: `ยินดีต้อนรับคุณ <b>${result.profile.displayName}</b> เข้าสู่ระบบวิชาการสร้างเว็บไซต์`,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      onClose();
    } else {
      Swal.fire({
        icon: 'info',
        title: 'กำลังเชื่อมต่อไปยัง LINE Login',
        text: 'ระบบกำลังนำคุณไปยังหน้าเข้าสู่ระบบของ LINE...',
        confirmButtonColor: '#06C755'
      });
    }
  };

  const handleSaveSimulatedProfile = () => {
    if (!displayNameInput.trim()) return;

    const updated: StudentProfile = {
      ...currentStudent,
      displayName: displayNameInput.trim(),
      pictureUrl: pictureUrlInput.trim() || currentStudent.pictureUrl
    };

    saveStoredUser(updated);
    onLoginSuccess(updated);

    Swal.fire({
      icon: 'success',
      title: 'อัปเดตข้อมูลผู้เรียนเรียบร้อย',
      toast: true,
      position: 'top-end',
      timer: 2000,
      showConfirmButton: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 d-flex align-items-center justify-content-center p-4">
      <div className="card border-0 shadow-2xl rounded-3xl max-w-md w-full bg-white overflow-hidden animate-float">
        
        {/* Header */}
        <div className="bg-[#06C755] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-lg w-8 h-8 rounded-full bg-black/10 d-flex align-items-center justify-content-center"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div className="w-16 h-16 rounded-full bg-white text-[#06C755] mx-auto d-flex align-items-center justify-content-center text-3xl mb-3 shadow-md">
            <i className="fa-brands fa-line"></i>
          </div>
          <h4 className="fs-5 fw-bold mb-1 text-white">เข้าสู่ระบบด้วย LINE Account</h4>
          <p className="text-xs text-emerald-100 mb-0">
            วิชาการสร้างเว็บไซต์ (HTML) • Gamification Learning App
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Official LINE Login Button */}
          <div>
            <button
              onClick={handleLineLiffLogin}
              disabled={isInitializing}
              className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3 px-4 rounded-xl shadow-md d-flex align-items-center justify-content-center gap-2.5 transition-all text-sm"
            >
              {isInitializing ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-brands fa-line text-xl"></i>
              )}
              <span>เข้าสู่ระบบผ่าน LINE Login / LIFF</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              (หากเปิดผ่าน LINE Application ระบบจะดึงโปรไฟล์ LINE ให้อัตโนมัติ)
            </p>
          </div>

          <div className="d-flex align-items-center gap-3 my-2 text-xs text-slate-400">
            <hr className="flex-grow-1" />
            <span>หรือ ตั้งค่าข้อมูลผู้เรียนเพื่อทดสอบ</span>
            <hr className="flex-grow-1" />
          </div>

          {/* LIFF ID Config */}
          <div>
            <label className="form-label text-xs font-semibold text-slate-700 mb-1">
              LIFF ID (ถ้ามี):
            </label>
            <input
              type="text"
              value={liffIdInput}
              onChange={(e) => setLiffIdInput(e.target.value)}
              className="form-control form-control-sm rounded-lg font-mono text-xs"
              placeholder="e.g. 165...-xxxxxxx"
            />
          </div>

          {/* Student Name */}
          <div>
            <label className="form-label text-xs font-semibold text-slate-700 mb-1">
              ชื่อผู้เรียน (Student Name):
            </label>
            <input
              type="text"
              value={displayNameInput}
              onChange={(e) => setDisplayNameInput(e.target.value)}
              className="form-control form-control-sm rounded-lg text-xs"
              placeholder="กรอกชื่อผู้เรียน"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveSimulatedProfile}
              className="w-full btn btn-slate-800 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 rounded-xl text-xs"
            >
              บันทึกข้อมูลและเข้าใช้งาน
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
