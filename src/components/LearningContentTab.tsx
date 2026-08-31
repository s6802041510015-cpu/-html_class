import React, { useState } from 'react';

interface LearningContentTabProps {
  onStartQuiz: () => void;
}

export const LearningContentTab: React.FC<LearningContentTabProps> = ({ onStartQuiz }) => {
  const [activeSection, setActiveSection] = useState<'all' | 'meaning' | 'function'>('all');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="stat-card overflow-hidden bg-white">
        <div className="earth-gradient p-6 text-white relative">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-4">
            <div>
              <span className="badge bg-[#E9C46A] text-[#4A443F] px-3 py-1 rounded-full text-xs font-bold mb-2">
                <i className="fa-solid fa-book-open me-1"></i> HTML Study Material
              </span>
              <h3 className="fs-3 fw-bold mb-1 text-white">
                บทเรียนทบทวนความรู้ภาษา HTML
              </h3>
              <p className="text-xs text-emerald-50 mb-0 max-w-2xl leading-relaxed">
                สรุปเนื้อหาสำคัญตามวัตถุประสงค์การเรียนรู้ที่ 1 (ความหมายของภาษา HTML) และวัตถุประสงค์ที่ 2 (หน้าที่ของภาษา HTML) สำหรับศึกษาและทบทวนก่อนทำแบบทดสอบ
              </p>
            </div>

            <button
              onClick={onStartQuiz}
              className="btn bg-[#E9C46A] hover:bg-[#FEFAE0] text-[#4A443F] font-bold px-5 py-3 rounded-xl shadow-md transition-all d-flex align-items-center gap-2 text-sm border-0 flex-shrink-0"
            >
              <i className="fa-solid fa-circle-question text-[#BC6C25]"></i>
              <span>ไปทำควิซทบทวนทันที</span>
            </button>
          </div>
        </div>

        {/* Section Filter Tabs */}
        <div className="p-4 bg-[#F8F7F4] border-t border-[#E5E1DA] d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-xs font-bold text-[#6B705C] me-1">เลือกหมวดเนื้อหา:</span>
            <button
              onClick={() => setActiveSection('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSection === 'all'
                  ? 'bg-[#344E41] text-white shadow-2xs'
                  : 'bg-white border border-[#E5E1DA] text-[#4A443F] hover:bg-[#EDEDE9]'
              }`}
            >
              <i className="fa-solid fa-layer-group me-1.5"></i>
              เนื้อหาทั้งหมด (2 วัตถุประสงค์)
            </button>
            <button
              onClick={() => setActiveSection('meaning')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSection === 'meaning'
                  ? 'bg-[#588157] text-white shadow-2xs'
                  : 'bg-white border border-[#E5E1DA] text-[#4A443F] hover:bg-[#EDEDE9]'
              }`}
            >
              <i className="fa-solid fa-bullseye me-1.5"></i>
              1. ความหมายของ HTML
            </button>
            <button
              onClick={() => setActiveSection('function')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSection === 'function'
                  ? 'bg-[#BC6C25] text-white shadow-2xs'
                  : 'bg-white border border-[#E5E1DA] text-[#4A443F] hover:bg-[#EDEDE9]'
              }`}
            >
              <i className="fa-solid fa-sitemap me-1.5"></i>
              2. หน้าที่ของ HTML
            </button>
          </div>

          <div className="text-xs text-[#A5A58D] font-medium">
            <i className="fa-solid fa-clock me-1"></i> เวลาอ่านโดยประมาณ 3-5 นาที
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-6">

        {/* ================= SECTION 1: MEANING OF HTML ================= */}
        {(activeSection === 'all' || activeSection === 'meaning') && (
          <div id="objective-1" className="stat-card p-6 bg-white border-l-4 border-l-[#588157] space-y-6">
            
            {/* Section Header */}
            <div className="d-flex align-items-start justify-content-between border-b border-[#E5E1DA] pb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E9EDC9] text-[#344E41] d-flex align-items-center justify-content-center text-xl font-bold">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div>
                  <span className="badge bg-[#E9EDC9] text-[#344E41] px-2.5 py-1 rounded-md text-[11px] font-bold mb-1">
                    วัตถุประสงค์การเรียนรู้ที่ 1
                  </span>
                  <h4 className="fs-5 fw-bold text-[#344E41] mb-0">
                    ความหมายของภาษา HTML (Meaning of HTML)
                  </h4>
                </div>
              </div>
              <span className="badge bg-[#F8F7F4] text-[#6B705C] border border-[#E5E1DA] px-3 py-1 rounded-full text-xs">
                คำนิยาม & ศัพท์พื้นฐาน
              </span>
            </div>

            {/* Core Definition Card */}
            <div className="p-4 rounded-xl bg-[#FEFAE0]/60 border border-[#E9C46A]/40">
              <h5 className="fw-bold text-[#344E41] text-sm mb-2 d-flex align-items-center gap-2">
                <i className="fa-solid fa-quote-left text-[#BC6C25]"></i>
                คำจำกัดความภาษา HTML
              </h5>
              <p className="text-xs text-[#4A443F] leading-relaxed mb-0">
                <strong className="text-[#344E41]">HTML</strong> ย่อมาจาก <strong className="text-[#BC6C25]">HyperText Markup Language</strong> เป็นภาษามาร์กอัปมาตรฐานที่ใช้สำหรับสร้างและกำหนดโครงสร้างเนื้อหาของเว็บเพจ (Web Page) เพื่อเปิดแสดงผลผ่านโปรแกรมค้นดูเว็บ หรือ เว็บเบราว์เซอร์ (Web Browser)
              </p>
            </div>

            {/* Meaning Breakdown (HyperText + Markup + Language) */}
            <div>
              <h5 className="fw-bold text-[#344E41] text-sm mb-3">
                <i className="fa-solid fa-magnifying-glass-chart text-[#588157] me-2"></i>
                เจาะลึกความหมายทีละคำ (Breakdown)
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* HyperText */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E1DA] space-y-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#6B9AC4]/20 text-[#6B9AC4] font-bold text-xs d-flex align-items-center justify-content-center">
                      1
                    </span>
                    <h6 className="fw-bold text-[#344E41] mb-0 text-sm">HyperText</h6>
                  </div>
                  <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
                    <strong>ข้อความหลายมิติ / ข้อความเชื่อมโยง:</strong> ข้อความปกติที่ไม่เรียงลำดับเส้นตรง ผู้ใช้สามารถคลิกจุดเชื่อมโยง (Hyperlink) เพื่อข้ามไปยังเอกสารหรือหน้าเว็บอื่น ๆ ได้ทันที
                  </p>
                </div>

                {/* Markup */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E1DA] space-y-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#588157]/20 text-[#588157] font-bold text-xs d-flex align-items-center justify-content-center">
                      2
                    </span>
                    <h6 className="fw-bold text-[#344E41] mb-0 text-sm">Markup</h6>
                  </div>
                  <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
                    <strong>การกำกับ / การทำเครื่องหมาย:</strong> การใช้สัญลักษณ์แท็ก (Tag) เช่น <code>&lt;p&gt;</code> หรือ <code>&lt;h1&gt;</code> ครอบข้อความเพื่อบอกเบราว์เซอร์ว่าข้อความนั้นเป็นส่วนประกอบใด
                  </p>
                </div>

                {/* Language */}
                <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E1DA] space-y-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#BC6C25]/20 text-[#BC6C25] font-bold text-xs d-flex align-items-center justify-content-center">
                      3
                    </span>
                    <h6 className="fw-bold text-[#344E41] mb-0 text-sm">Language</h6>
                  </div>
                  <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
                    <strong>ภาษาคอมพิวเตอร์:</strong> กฎไวยากรณ์และรูปแบบคำสั่งที่มนุษย์เขียนขึ้น เพื่อให้คอมพิวเตอร์และเว็บเบราว์เซอร์เข้าใจและประมวลผลตรงกันอย่างเป็นระเบียบ
                  </p>
                </div>

              </div>
            </div>

            {/* Key Distinction Note */}
            <div className="p-4 rounded-xl bg-[#CCD5AE]/30 border border-[#A3B18A]/40 d-flex align-items-start gap-3">
              <i className="fa-solid fa-triangle-exclamation text-[#BC6C25] text-lg mt-0.5"></i>
              <div className="text-xs leading-relaxed text-[#4A443F]">
                <strong className="text-[#344E41]">ข้อเน้นย้ำสำคัญ (ข้อสอบชอบถาม!):</strong><br />
                HTML เป็น <em>"ภาษามาร์กอัป (Markup Language)"</em> <u>ไม่ใช่</u> ภาษาโปรแกรมมิ่ง (Programming Language) เนื่องจาก HTML ไม่มีตรรกะเงื่อนไข (If-Else) ไม่มีฟังก์ชันประมวลผลคำนวณ หรือวนลูป (Loop) เหมือนภาษา C, Python หรือ JavaScript
              </div>
            </div>

            {/* Origin & Inventor Quick Fact */}
            <div className="p-4 rounded-xl bg-white border border-[#E5E1DA]">
              <h5 className="fw-bold text-[#344E41] text-sm mb-2 d-flex align-items-center gap-2">
                <i className="fa-solid fa-history text-[#6B9AC4]"></i>
                ประวัติความคุ้มค่าและผู้ให้กำเนิด
              </h5>
              <p className="text-xs text-[#6B705C] mb-0 leading-relaxed">
                ภาษา HTML ถูกคิดค้นขึ้นโดย <strong>Sir Tim Berners-Lee</strong> ในปี ค.ศ. 1991 ขณะทำงานที่องค์กรวิจัยนิวเคลียร์แห่งยุโรป (CERN) เพื่อใช้แลกเปลี่ยนเอกสารงานวิจัยระหว่างนักวิทยาศาสตร์ จนพัฒนามาเป็นมาตรฐานของ World Wide Web (WWW) ในปัจจุบัน
              </p>
            </div>

          </div>
        )}

        {/* ================= SECTION 2: FUNCTION OF HTML ================= */}
        {(activeSection === 'all' || activeSection === 'function') && (
          <div id="objective-2" className="stat-card p-6 bg-white border-l-4 border-l-[#BC6C25] space-y-6">
            
            {/* Section Header */}
            <div className="d-flex align-items-start justify-content-between border-b border-[#E5E1DA] pb-4">
              <div className="d-flex align-items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FEFAE0] text-[#BC6C25] d-flex align-items-center justify-content-center text-xl font-bold">
                  <i className="fa-solid fa-sitemap"></i>
                </div>
                <div>
                  <span className="badge bg-[#FEFAE0] text-[#BC6C25] px-2.5 py-1 rounded-md text-[11px] font-bold mb-1 border border-[#E9C46A]/40">
                    วัตถุประสงค์การเรียนรู้ที่ 2
                  </span>
                  <h4 className="fs-5 fw-bold text-[#344E41] mb-0">
                    หน้าที่ของภาษา HTML (Function of HTML)
                  </h4>
                </div>
              </div>
              <span className="badge bg-[#F8F7F4] text-[#6B705C] border border-[#E5E1DA] px-3 py-1 rounded-full text-xs">
                โครงสร้าง & องค์ประกอบหลัก
              </span>
            </div>

            {/* Core Function Overview */}
            <div className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E1DA]">
              <h5 className="fw-bold text-[#344E41] text-sm mb-2 d-flex align-items-center gap-2">
                <i className="fa-solid fa-[#588157] fa-bone me-1"></i>
                หน้าที่หลักของ HTML (The Core Function)
              </h5>
              <p className="text-xs text-[#4A443F] leading-relaxed mb-0">
                หน้าที่หลักของภาษา HTML คือการทำหน้าที่เป็น <strong className="text-[#344E41]">"โครงกระดูก (Skeleton)"</strong> หรือรากฐานโครงสร้างของหน้าเว็บเพจ ทำหน้าที่จัดวาง วางตำแหน่ง และระบุความหมายของส่วนประกอบต่าง ๆ เช่น ข้อความ รูปภาพ ลิงก์ ตาราง และแบบฟอร์ม เพื่อให้เว็บเบราว์เซอร์ตีความ (Parse) และเรนเดอร์ออกมาเป็นหน้าตาเว็บเพจที่ผู้ใช้มองเห็น
              </p>
            </div>

            {/* 5 Key Responsibilities */}
            <div>
              <h5 className="fw-bold text-[#344E41] text-sm mb-3">
                <i className="fa-solid fa-list-check text-[#BC6C25] me-2"></i>
                5 หน้าที่สำคัญของ HTML บนหน้าเว็บเพจ
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Duty 1 */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E1DA] hover:border-[#A3B18A] transition-all space-y-1.5">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold text-[#344E41] text-xs d-flex align-items-center gap-2">
                      <i className="fa-solid fa-heading text-[#588157]"></i>
                      1. กำหนดโครงสร้างข้อความและหัวข้อ
                    </span>
                    <span className="badge bg-[#E9EDC9] text-[#344E41] text-[10px]">Structure</span>
                  </div>
                  <p className="text-xs text-[#6B705C] mb-0 leading-relaxed">
                    จัดลำดับความสำคัญของเนื้อหาผ่านแท็กหัวข้อ <code>&lt;h1&gt;</code> ถึง <code>&lt;h6&gt;</code> และแท็กย่อหน้า <code>&lt;p&gt;</code> เพื่อให้ข้อความอ่านง่ายและเป็นระเบียบ
                  </p>
                </div>

                {/* Duty 2 */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E1DA] hover:border-[#A3B18A] transition-all space-y-1.5">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold text-[#344E41] text-xs d-flex align-items-center gap-2">
                      <i className="fa-solid fa-[#6B9AC4] fa-image"></i>
                      2. ฝังและแทรกสื่อมัลติมีเดีย (Media)
                    </span>
                    <span className="badge bg-[#E9EDC9] text-[#344E41] text-[10px]">Media</span>
                  </div>
                  <p className="text-xs text-[#6B705C] mb-0 leading-relaxed">
                    นำเสนอรูปภาพ สัญลักษณ์ วิดีโอ หรือเสียงดนตรี ลงในหน้าเว็บเพจด้วยแท็ก เช่น <code>&lt;img&gt;</code>, <code>&lt;video&gt;</code>, <code>&lt;audio&gt;</code>
                  </p>
                </div>

                {/* Duty 3 */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E1DA] hover:border-[#A3B18A] transition-all space-y-1.5">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold text-[#344E41] text-xs d-flex align-items-center gap-2">
                      <i className="fa-solid fa-link text-[#BC6C25]"></i>
                      3. สร้างจุดเชื่อมโยงหลายมิติ (Hyperlink)
                    </span>
                    <span className="badge bg-[#E9EDC9] text-[#344E41] text-[10px]">Navigation</span>
                  </div>
                  <p className="text-xs text-[#6B705C] mb-0 leading-relaxed">
                    เชื่อมโยงหน้าเอกสารเข้าด้วยกันผ่านแท็ก <code>&lt;a href="..."&gt;</code> ทำให้ผู้ใช้งานสามารถท่องไปยังหน้าเว็บอื่น ๆ บนโลกอินเทอร์เน็ตได้
                  </p>
                </div>

                {/* Duty 4 */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E1DA] hover:border-[#A3B18A] transition-all space-y-1.5">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-bold text-[#344E41] text-xs d-flex align-items-center gap-2">
                      <i className="fa-solid fa-rectangle-list text-[#E76F51]"></i>
                      4. สร้างส่วนรับข้อมูลและปฏิสัมพันธ์ (Forms)
                    </span>
                    <span className="badge bg-[#E9EDC9] text-[#344E41] text-[10px]">Interaction</span>
                  </div>
                  <p className="text-xs text-[#6B705C] mb-0 leading-relaxed">
                    สร้างช่องกรอกข้อมูล ปุ่มกด แบบเลือกรายการ และฟอร์มลงทะเบียนผ่านแท็ก <code>&lt;form&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;button&gt;</code>
                  </p>
                </div>

              </div>
            </div>

            {/* Human Body Analogy (HTML vs CSS vs JS) */}
            <div>
              <h5 className="fw-bold text-[#344E41] text-sm mb-3">
                <i className="fa-solid fa-people-arrows text-[#588157] me-2"></i>
                การทำงานร่วมกันกับเทคโนโลยีเว็บอื่น ๆ (Analogy)
              </h5>

              <div className="p-5 rounded-2xl bg-[#F8F7F4] border border-[#E5E1DA]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  
                  {/* HTML = Skeleton */}
                  <div className="p-4 rounded-xl bg-white border-2 border-[#588157] shadow-2xs space-y-2">
                    <div className="w-12 h-12 rounded-full bg-[#E9EDC9] text-[#344E41] mx-auto d-flex align-items-center justify-content-center text-xl font-bold">
                      <i className="fa-solid fa-bone"></i>
                    </div>
                    <h6 className="fw-bold text-[#344E41] text-sm mb-0">HTML</h6>
                    <span className="badge bg-[#588157] text-white text-[11px] px-2.5 py-0.5 rounded-full">
                      โครงกระดูก (Structure)
                    </span>
                    <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
                      สร้างโครงสร้าง ร่างกาย หัว ข้อความ ช่องทางต่าง ๆ บนหน้าเว็บ
                    </p>
                  </div>

                  {/* CSS = Appearance */}
                  <div className="p-4 rounded-xl bg-white border border-[#E5E1DA] space-y-2 opacity-90">
                    <div className="w-12 h-12 rounded-full bg-[#FEFAE0] text-[#BC6C25] mx-auto d-flex align-items-center justify-content-center text-xl font-bold">
                      <i className="fa-solid fa-[#BC6C25] fa-palette"></i>
                    </div>
                    <h6 className="fw-bold text-[#344E41] text-sm mb-0">CSS</h6>
                    <span className="badge bg-[#E9C46A] text-[#4A443F] text-[11px] px-2.5 py-0.5 rounded-full">
                      ผิวหนัง & ตกแต่ง (Style)
                    </span>
                    <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
                      กำหนดสี เสื้อผ้า ขนาดตัวอักษร การจัดตำแหน่ง และความสวยงาม
                    </p>
                  </div>

                  {/* JS = Behavior */}
                  <div className="p-4 rounded-xl bg-white border border-[#E5E1DA] space-y-2 opacity-90">
                    <div className="w-12 h-12 rounded-full bg-[#E8F0FE] text-[#6B9AC4] mx-auto d-flex align-items-center justify-content-center text-xl font-bold">
                      <i className="fa-solid fa-bolt"></i>
                    </div>
                    <h6 className="fw-bold text-[#344E41] text-sm mb-0">JavaScript</h6>
                    <span className="badge bg-[#6B9AC4] text-white text-[11px] px-2.5 py-0.5 rounded-full">
                      กล้ามเนื้อ & ประสาท (Behavior)
                    </span>
                    <p className="text-xs text-[#6B705C] leading-relaxed mb-0">
                      ทำให้เกิดการเคลื่อนไหว ตอบสนองต่อการคลิก และคำนวณข้อมูล
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#E9EDC9]/40 border border-[#A3B18A]/50">
              <h5 className="fw-bold text-[#344E41] text-sm mb-2 d-flex align-items-center gap-2">
                <i className="fa-solid fa-clipboard-check text-[#588157]"></i>
                สรุปสาระสำคัญประจำวัตถุประสงค์
              </h5>
              <ul className="text-xs text-[#4A443F] space-y-1 mb-0 ps-4 leading-relaxed">
                <li><strong>วัตถุประสงค์ที่ 1 (ความหมาย):</strong> HTML คือภาษามาร์กอัปที่ใช้เครื่องหมายแท็กกำหนดส่วนประกอบของเอกสารเว็บ ไม่ใช่ภาษาโปรแกรมมิ่ง</li>
                <li><strong>วัตถุประสงค์ที่ 2 (หน้าที่):</strong> หน้าที่หลักของ HTML คือการเป็นโครงร่างจัดวางข้อความ สื่อ ลิงก์ และฟอร์ม ให้เบราว์เซอร์แสดงผลได้อย่างถูกต้อง</li>
              </ul>
            </div>

          </div>
        )}

      </div>

      {/* Bottom Quick Action Bar */}
      <div className="stat-card p-5 bg-white d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
        <div>
          <h6 className="fw-bold text-[#344E41] mb-1 text-sm">
            <i className="fa-solid fa-circle-check text-[#588157] me-2"></i>
            อ่านทบทวนเนื้อหาครบถ้วนแล้วใช่ไหม?
          </h6>
          <p className="text-xs text-[#6B705C] mb-0">
            ทดสอบความเข้าใจผ่านแบบทดสอบทบทวนบทเรียนเพื่อสะสมคะแนน PTS และปลดล็อก Badge
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="btn bg-[#588157] hover:bg-[#344E41] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all d-flex align-items-center gap-2 text-sm flex-shrink-0 border-0"
        >
          <span>เริ่มทำควิซทบทวน (20 ข้อ)</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
