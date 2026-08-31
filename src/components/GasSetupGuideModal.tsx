import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { GAS_SCRIPT_CODE } from '../data/gasScriptCode';
import { getGasUrl, pingGasServer, saveGasUrl } from '../services/gasService';

interface GasSetupGuideModalProps {
  onClose?: () => void;
}

export const GasSetupGuideModal: React.FC<GasSetupGuideModalProps> = ({ onClose }) => {
  const [gasUrlInput, setGasUrlInput] = useState(getGasUrl());
  const [isTesting, setIsTesting] = useState(false);
  const [copied, setCopied] = useState(false);

  const defaultSheetId = '1XoBFtZMCsLBDkbZvp9_lXzC4ZG54n_fJuepdRqBrq40';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GAS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    Swal.fire({
      icon: 'success',
      title: 'คัดลอกโค้ด Google Apps Script แล้ว!',
      text: 'คุณสามารถนำโค้ดไปวางใน editor ของ script.google.com แล้วบันทึก Deploy ได้ทันที',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  };

  const handleSaveUrl = () => {
    saveGasUrl(gasUrlInput.trim());
    Swal.fire({
      icon: 'success',
      title: 'บันทึก URL Google Apps Script เรียบร้อย',
      confirmButtonColor: '#6366f1'
    });
  };

  const handleTestPing = async () => {
    setIsTesting(true);
    const result = await pingGasServer();
    setIsTesting(false);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'การเชื่อมต่อสำเร็จ! (Connected)',
        text: result.message,
        confirmButtonColor: '#6366f1'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'ผลการทดสอบการเชื่อมต่อ',
        text: result.message,
        confirmButtonColor: '#f59e0b'
      });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Info */}
      <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <span className="badge bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <i className="fa-solid fa-database me-1"></i> Google Sheets & Apps Script Backend
            </span>
            <h3 className="fs-4 fw-bold mb-1 text-slate-800">คู่มือและการเชื่อมต่อฐานข้อมูล Google Sheets</h3>
            <p className="text-xs text-slate-500 mb-0">
              วิชาการสร้างเว็บไซต์ - จัดเก็บข้อมูลผู้เรียน สถิติเช็คอิน ผลควิซ และ Badge ผ่าน Google Sheet ID
            </p>
          </div>
          {onClose && (
            <button onClick={onClose} className="btn btn-sm btn-outline-secondary rounded-lg">
              <i className="fa-solid fa-xmark"></i> ปิด
            </button>
          )}
        </div>

        {/* Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 font-semibold mb-1">Target Google Sheet ID:</div>
            <div className="d-flex align-items-center justify-content-between bg-white p-2.5 rounded-lg border border-slate-200">
              <code className="text-xs font-mono text-indigo-700 font-bold select-all truncate me-2">
                {defaultSheetId}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(defaultSheetId);
                  Swal.fire({ icon: 'success', title: 'คัดลอก Sheet ID แล้ว', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
                }}
                className="btn btn-xs btn-light text-slate-600 border rounded"
              >
                คัดลอก ID
              </button>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 font-semibold mb-1">Target Web App Exec URL:</div>
            <div className="d-flex align-items-center justify-content-between bg-white p-2.5 rounded-lg border border-slate-200">
              <code className="text-xs font-mono text-emerald-700 font-bold select-all truncate me-2">
                {getGasUrl()}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getGasUrl());
                  Swal.fire({ icon: 'success', title: 'คัดลอก GAS URL แล้ว', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
                }}
                className="btn btn-xs btn-light text-slate-600 border rounded"
              >
                คัดลอก URL
              </button>
            </div>
          </div>
        </div>

        {/* GAS Connection URL Config Box */}
        <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-200">
          <h6 className="fw-bold text-indigo-950 mb-2 text-sm">ทดสอบและเปลี่ยน Web App URL (Google Apps Script)</h6>
          <div className="d-flex flex-column flex-sm-row gap-2">
            <input
              type="text"
              value={gasUrlInput}
              onChange={(e) => setGasUrlInput(e.target.value)}
              className="form-control form-control-sm rounded-lg font-mono text-xs flex-grow-1"
              placeholder="https://script.google.com/macros/s/.../exec"
            />
            <button
              onClick={handleSaveUrl}
              className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs px-3"
            >
              บันทึก URL
            </button>
            <button
              onClick={handleTestPing}
              disabled={isTesting}
              className="btn btn-sm btn-outline-indigo font-semibold rounded-lg text-xs px-3 d-flex align-items-center gap-1.5"
            >
              {isTesting ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-plug"></i>}
              <span>ทดสอบเชื่อมต่อ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Script Viewer */}
      <div className="card border-0 shadow-sm rounded-2xl p-6 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h5 className="fs-6 fw-bold text-slate-800 mb-0 d-flex align-items-center gap-2">
              <i className="fa-solid fa-code text-indigo-600"></i>
              โค้ด Google Apps Script (Code.gs) พร้อมระบบสร้างแท็บ Sheets อัตโนมัติ
            </h5>
            <p className="text-xs text-slate-500 mb-0 mt-1">
              สร้างแท็บ Users, Checkins, QuizResults, และ Badges พร้อมส่ง Push Notification แจ้งเตือนผ่าน LINE OA
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            className={`btn btn-sm font-bold px-4 py-2 rounded-xl text-xs d-flex align-items-center gap-1.5 transition-all ${
              copied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-900 text-white'
            }`}
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            <span>{copied ? 'คัดลอกเรียบร้อย!' : 'คัดลอกโค้ดทั้งหมด'}</span>
          </button>
        </div>

        <div className="relative">
          <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-96 leading-relaxed border border-slate-800">
            {GAS_SCRIPT_CODE}
          </pre>
        </div>
      </div>
    </div>
  );
};
