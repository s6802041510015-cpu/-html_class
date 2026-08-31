import { QuizCategory } from '../types';

export const quizCategories: QuizCategory[] = [
  {
    id: 'html-meaning-history',
    title: 'หมวดที่ 1: ความหมายของภาษา HTML',
    description: 'ทบทวนวัตถุประสงค์ที่ 1: บอกความหมายของภาษา HTML และคำศัพท์พื้นฐานได้ถูกต้อง',
    icon: 'fa-book-bookmark',
    colorClass: 'bg-pastel-blue text-blue-900 border-blue-200',
    badgeId: 'badge-html-meaning-master',
    questions: [
      {
        id: 101,
        objective: 1,
        question: 'คำว่า "HTML" ย่อมาจากข้อใดต่อไปนี้?',
        options: [
          'HyperText Markup Language',
          'HighText Machine Language',
          'HyperTransfer Markup Language',
          'HyperText Management Language'
        ],
        correctIndex: 0,
        explanation: 'HTML ย่อมาจาก HyperText Markup Language',
        reasoning: 'HyperText หมายถึงข้อความเชื่อมโยงหลายมิติ และ Markup Language คือภาษาที่ใช้สัญลักษณ์แท็กในการกำหนดโครงสร้างเอกสารเว็บ'
      },
      {
        id: 102,
        objective: 1,
        question: 'ภาษา HTML จัดเป็นภาษาประเภทใดตามลักษณะการทำงาน?',
        options: [
          'ภาษาโปรแกรมเชิงวัตถุ (Object-Oriented Programming)',
          'ภาษาจัดรูปแบบโครงสร้างเอกสาร (Markup Language)',
          'ภาษาคิวรีข้อมูล (Query Language)',
          'ภาษาสคริปต์ประมวลผลฝั่งเซิร์ฟเวอร์ (Server-side Script)'
        ],
        correctIndex: 1,
        explanation: 'HTML เป็น Markup Language (ภาษามาร์กอัป)',
        reasoning: 'HTML ไม่ใช่ภาษาโปรแกรมมิ่ง (Programming Language) เนื่องจากไม่มีตรรกะคำนวณหรือเงื่อนไขวนซ้ำ แต่ใช้แท็กกำกับเพื่อจัดโครงสร้างเนื้อหา'
      },
      {
        id: 103,
        objective: 1,
        question: 'คำว่า "HyperText" ในความหมายของ HTML หมายถึงอะไร?',
        options: [
          'ข้อความที่มีขนาดใหญ่พิเศษบนเว็บ',
          'ข้อความที่มีการเข้ารหัสความปลอดภัยขั้นสูง',
          'ข้อความที่มีลิงก์เชื่อมโยงไปยังเอกสารหรือหน้าเว็บอื่นได้',
          'ข้อความที่เปลี่ยนสีได้ตามเวลาที่กำหนด'
        ],
        correctIndex: 2,
        explanation: 'HyperText คือข้อความเชื่อมโยงหลายมิติ',
        reasoning: 'ผู้ใช้สามารถคลิกข้อความนี้เพื่อเปิดไปยังตำแหน่งหรือไฟล์เว็บเพจอื่นผ่านการสร้าง Hyperlink'
      },
      {
        id: 104,
        objective: 1,
        question: 'ผู้ที่คิดค้นและพัฒนาภาษา HTML เป็นคนแรกคือใคร?',
        options: [
          'Bill Gates',
          'Tim Berners-Lee',
          'Steve Jobs',
          'Mark Zuckerberg'
        ],
        correctIndex: 1,
        explanation: 'Tim Berners-Lee เป็นผู้คิดค้นภาษา HTML',
        reasoning: 'Sir Tim Berners-Lee ได้คิดค้น HTML และ World Wide Web (WWW) ขึ้นที่ CERN ในช่วงปี 1991 เพื่อแบ่งปันข้อมูลวิจัย'
      },
      {
        id: 105,
        objective: 1,
        question: 'องค์กรสากลใดที่มีหน้าที่ดูแลและกำหนดมาตรฐานของภาษา HTML ในปัจจุบัน?',
        options: [
          'W3C (World Wide Web Consortium)',
          'IEEE (Institute of Electrical and Electronics Engineers)',
          'ISO (International Organization for Standardization)',
          'UNESCO'
        ],
        correctIndex: 0,
        explanation: 'W3C และ WHATWG เป็นผู้ดูแลมาตรฐาน HTML',
        reasoning: 'W3C กำหนดมาตรฐานหลักของเว็บเทคโนโลยี เพื่อให้เว็บเบราว์เซอร์ต่าง ๆ แสดงผลเอกสาร HTML ได้อย่างตรงกัน'
      },
      {
        id: 106,
        objective: 1,
        question: 'คำว่า "Markup" ในภาษา HTML มีความหมายสอดคล้องกับข้อใดมากที่สุด?',
        options: [
          'การประมวลผลสมการคณิตศาสตร์',
          'การทำเครื่องหมายหรือใช้แท็กกำกับส่วนประกอบต่าง ๆ ของเอกสาร',
          'การสแกนไวรัสในไฟล์เอกสาร',
          'การสร้างภาพเคลื่อนไหว 3 มิติ'
        ],
        correctIndex: 1,
        explanation: 'Markup หมายถึงการใช้คำสั่งแท็กกำกับเนื้อหา',
        reasoning: 'ภาษา HTML ใช้สัญลักษณ์กำกับ เช่น <p> หรือ <h1> เพื่อบอกเบราว์เซอร์ว่าเนื้อหาแต่ละส่วนคืออะไร'
      },
      {
        id: 107,
        objective: 1,
        question: 'นามสกุลไฟล์มาตรฐานของเอกสารภาษา HTML คือข้อใด?',
        options: [
          '.doc หรือ .docx',
          '.html หรือ .htm',
          '.txt หรือ .rtf',
          '.css หรือ .js'
        ],
        correctIndex: 1,
        explanation: 'นามสกุลไฟล์คือ .html หรือ .htm',
        reasoning: 'การบันทึกไฟล์ด้วยนามสกุล .html ช่วยให้เว็บเบราว์เซอร์รับรู้และนำไปประมวลผลเปิดแสดงผลเป็นหน้าเว็บได้ถูกต้อง'
      },
      {
        id: 108,
        objective: 1,
        question: 'ข้อใดกล่าวถึงความสัมพันธ์ระหว่าง HTML, CSS และ JavaScript ได้ถูกต้องตามความหมาย?',
        options: [
          'HTML คือโครงสร้าง, CSS คือการตกแต่งความสวยงาม, JavaScript คือการเพิ่มการโต้ตอบ',
          'HTML คือความสวยงาม, CSS คือโครงสร้าง, JavaScript คือการเชื่อมต่อฐานข้อมูล',
          'HTML คือภาษาการคำนวณ, CSS คือภาษาฐานข้อมูล, JavaScript คือโครงสร้างเว็บ',
          'ทั้ง 3 ภาษาทำหน้าที่เหมือนกันทุกประการ'
        ],
        correctIndex: 0,
        explanation: 'HTML=โครงสร้าง, CSS=ตกแต่ง, JS=โต้ตอบ',
        reasoning: 'HTML เปรียบเสมือนเสาและผนังบ้าน (Structure), CSS เปรียบเสมือนสีและเฟอร์นิเจอร์ (Style), JS เปรียบเหมือนระบบไฟฟ้าที่โต้ตอบได้ (Behavior)'
      },
      {
        id: 109,
        objective: 1,
        question: 'เวอร์ชันล่าสุดของภาษา HTML ที่เป็นมาตรฐานเว็บในปัจจุบันคือเวอร์ชันใด?',
        options: [
          'HTML 3.2',
          'HTML 4.01',
          'XHTML 1.0',
          'HTML5'
        ],
        correctIndex: 3,
        explanation: 'มาตรฐานปัจจุบันคือ HTML5',
        reasoning: 'HTML5 เพิ่มแท็กเชิงความหมาย (Semantic Tags) รองรับวิดีโอ เสียง และการทำงานบนมือถือได้อย่างสมบูรณ์แบบ'
      },
      {
        id: 110,
        objective: 1,
        question: 'ข้อใดไม่ใช่คุณสมบัติที่ถูกต้องของภาษา HTML?',
        options: [
          'เป็นภาษาที่แสดงผลผ่านโปรแกรม Web Browser',
          'เป็นภาษาที่มีโครงสร้างคำสั่งเป็นสัญลักษณ์ แท็ก (Tags)',
          'เป็นภาษาที่ต้องทำการคอมไพล์ (Compile) เป็นไฟล์ .exe ก่อนใช้งาน',
          'สามารถใช้งานได้ทุกระบบปฏิบัติการ'
        ],
        correctIndex: 2,
        explanation: 'HTML ไม่ต้องคอมไพล์เป็นไฟล์ .exe',
        reasoning: 'HTML เป็นภาษาสคริปต์เปิดเผยโค้ด (Plain Text) ที่ให้โปรแกรมเว็บเบราว์เซอร์ทำการตีความและแสดงผลได้ทันที (Interpreter Process)'
      }
    ]
  },
  {
    id: 'html-function-structure',
    title: 'หมวดที่ 2: หน้าที่ของภาษา HTML',
    description: 'ทบทวนวัตถุประสงค์ที่ 2: บอกหน้าที่ของภาษา HTML และระบุโครงสร้างพื้นฐานได้อย่างถูกต้อง',
    icon: 'fa-sitemap',
    colorClass: 'bg-pastel-purple text-purple-900 border-purple-200',
    badgeId: 'badge-html-function-master',
    questions: [
      {
        id: 201,
        objective: 2,
        question: 'หน้าที่หลักที่สำคัญที่สุดของภาษา HTML ในการสร้างเว็บไซต์คือข้อใด?',
        options: [
          'การจัดเก็บข้อมูลสมาชิกในระบบฐานข้อมูล',
          'การกำหนดโครงสร้างและจัดวางเนื้อหาของหน้าเว็บเพจ',
          'การคำนวณยอดเงินและแสดงผลกราฟิก 3D',
          'การปกป้องเว็บจากการถูกแฮก'
        ],
        correctIndex: 1,
        explanation: 'หน้าที่หลักคือการกำหนดโครงสร้างเนื้อหาของเว็บ',
        reasoning: 'HTML ทำหน้าที่บอกเบราว์เซอร์ว่าส่วนไหนคือข้อความ หัวเรื่อง รูปภาพ ตาราง ลิงก์ หรือฟอร์มในเอกสาร'
      },
      {
        id: 202,
        objective: 2,
        question: 'การประกาศ <!DOCTYPE html> อยู่ที่ส่วนใดและมีหน้าที่อย่างไร?',
        options: [
          'อยู่ท้ายสุดของไฟล์ เพื่อปิดการทำงานของเว็บ',
          'อยู่บรรทัดแรกสุด เพื่อบอกเบราว์เซอร์ว่าเอกสารนี้เป็นเวอร์ชัน HTML5',
          'อยู่ในแท็ก <body> เพื่อแสดงข้อความต้อนรับ',
          'อยู่ในแท็ก <script> เพื่อรันภาษา JavaScript'
        ],
        correctIndex: 1,
        explanation: '<!DOCTYPE html> บอกเวอร์ชันของเอกสาร HTML5',
        reasoning: 'เป็นการแจ้งให้เว็บเบราว์เซอร์ประมวลผลด้วย Standards Mode ตามมาตรฐาน HTML5 อย่างถูกต้อง'
      },
      {
        id: 203,
        objective: 2,
        question: 'แท็กใดทำหน้าที่เป็นแท็กครอบเนื้อหาทั้งหมดของเอกสาร HTML?',
        options: [
          '<head>',
          '<html>',
          '<body>',
          '<main>'
        ],
        correctIndex: 1,
        explanation: 'แท็ก <html> คือ Root Element',
        reasoning: 'แท็ก <html> และ </html> จะครอบคลุมแท็กส่วนประกอบทั้งหมดในหน้าเว็บเพจเป็นธาตุราก (Root element)'
      },
      {
        id: 204,
        objective: 2,
        question: 'หน้าที่ของส่วนแท็ก <head> ในโครงสร้าง HTML คือข้อใด?',
        options: [
          'จัดเก็บข้อมูลเบื้องหลัง (Metadata) เช่น ชื่อเรื่อง รูปแบบตัวอักษร และการเชื่อมโยงไฟล์ภายนอก',
          'แสดงข้อความตัวหนาขนาดใหญ่กลางหน้าจอ',
          'สร้างตารางแสดงผลข้อมูลสินค้า',
          'สร้างปุ่มกดเพื่อส่งแบบฟอร์ม'
        ],
        correctIndex: 0,
        explanation: '<head> เก็บข้อมูล Metadata และส่วนเชื่อมโยง',
        reasoning: 'เนื้อหาใน <head> เช่น <title>, <meta>, <link> จะไม่ปรากฏบนพื้นที่แสดงผลหลักของเว็บ แต่จำเป็นต่อการทำงานและ SEO'
      },
      {
        id: 205,
        objective: 2,
        question: 'ส่วนใดในโครงสร้าง HTML ที่ทำหน้าที่เก็บเนื้อหาที่ผู้ใช้จะมองเห็นบนหน้าเว็บเพจทั้งหมด?',
        options: [
          '<head>',
          '<meta>',
          '<body>',
          '<style>'
        ],
        correctIndex: 2,
        explanation: 'ส่วน <body> คือส่วนแสดงผลเนื้อหาหลัก',
        reasoning: 'ข้อความ รูปภาพ วิดีโอ ตาราง ปุ่ม และองค์ประกอบทางสายตาทั้งหมดที่ผู้ใช้เห็นจะถูกบรรจุอยู่ภายใต้แท็ก <body>'
      },
      {
        id: 206,
        objective: 2,
        question: 'แท็ก <title> มีหน้าที่ตรงกับข้อใด?',
        options: [
          'แสดงหัวข้อใหญ่สุดในหน้าเว็บเพจ',
          'แสดงชื่อเรื่องของหน้าเว็บเพจบนแถบเบราว์เซอร์ (Browser Tab Title)',
          'สร้างลิงก์เชื่อมโยงไปยังหน้า Google',
          'เปลี่ยนสีพื้นหลังของหน้าเว็บ'
        ],
        correctIndex: 1,
        explanation: '<title> แสดงชื่อหน้าเว็บบน Tab และผลการค้นหา Search Engine',
        reasoning: 'แท็ก <title> อยู่ใน <head> ทำหน้าที่กำหนดชื่อเรื่องเอกสาร ซึ่งส่งผลต่อการค้นหาผ่าน Google และชื่อแท็กเบราว์เซอร์'
      },
      {
        id: 207,
        objective: 2,
        question: 'แท็กเชิงความหมาย (Semantic HTML) เช่น <header>, <nav>, <article>, <footer> มีหน้าที่อย่างไร?',
        options: [
          'สื่อความหมายและหน้าที่ของแต่ละส่วนให้ทั้งมนุษย์และเบราว์เซอร์/Search Engine เข้าใจได้ชัดเจน',
          'ใส่สีสันสวยงามให้หน้าเว็บทันทีโดยไม่ต้องใช้ CSS',
          'ป้องกันไม่ให้เบราว์เซอร์เก่าเปิดหน้าเว็บได้',
          'ใช้สำหรับซ่อนโค้ดลับของเว็บ'
        ],
        correctIndex: 0,
        explanation: 'Semantic HTML ให้ความหมายแก่โครงสร้างเอกสาร',
        reasoning: 'ช่วยให้ Search Engine (SEO) และเครื่องอ่านหน้าจอสำหรับผู้พิการ (Screen Reader) เข้าใจโครงสร้างเว็บไซต์ได้อย่างถูกต้อง'
      },
      {
        id: 208,
        objective: 2,
        question: 'หากต้องการกำหนดให้หน้าเว็บรองรับภาษาไทยได้อย่างถูกต้อง ควรใช้แท็กหน้าที่ใดใน <head>?',
        options: [
          '<meta charset="UTF-8">',
          '<meta name="thai">',
          '<title lang="th">',
          '<link rel="language" href="thai">'
        ],
        correctIndex: 0,
        explanation: '<meta charset="UTF-8"> กำหนดการเข้ารหัสตัวอักษร',
        reasoning: 'UTF-8 เป็นมาตรฐานการรหัสตัวอักษรที่รองรับภาษาทั่วโลก รวมถึงภาษาไทย ป้องกันอักขระต่างดาว (ต่างภาษา)'
      },
      {
        id: 209,
        objective: 2,
        question: 'ข้อใดอธิบายหน้าที่ของ Web Browser กับภาษา HTML ได้ถูกต้องที่สุด?',
        options: [
          'เบราว์เซอร์เป็นผู้เขียนโค้ด HTML ให้เราอัตโนมัติ',
          'เบราว์เซอร์ทำหน้าที่อ่าน (Parse) คำสั่ง HTML และแปลงเป็นหน้าเว็บอินเทอร์เฟซให้ผู้ใช้มองเห็น',
          'เบราว์เซอร์ทำหน้าที่ส่งสัญญาณอินเทอร์เน็ตไปยังดาวเทียม',
          'เบราว์เซอร์ทำหน้าที่แก้คำผิดในไฟล์ HTML'
        ],
        correctIndex: 1,
        explanation: 'เบราว์เซอร์ทำหน้าที่ตรรกะตีความ (Render/Parse HTML)',
        reasoning: 'เบราว์เซอร์เช่น Chrome, Edge, Safari อ่านโค้ด HTML แล้วเรนเดอร์ (Render) เป็นองค์ประกอบเช่น ตัวหนังสือ รูปภาพ ปุ่มกด'
      },
      {
        id: 210,
        objective: 2,
        question: 'โปรแกรมในข้อใดต่อไปนี้ที่ทำหน้าที่เป็นเครื่องมือเขียนโค้ดภาษา HTML (Code Editor)?',
        options: [
          'Visual Studio Code, Notepad++, Sublime Text',
          'Adobe Photoshop, Illustrator, CorelDraw',
          'Microsoft Excel, Google Sheets',
          'VLC Media Player, Windows Media Player'
        ],
        correctIndex: 0,
        explanation: 'VS Code, Notepad++, Sublime Text คือโปรแกรม Text Editor',
        reasoning: 'เนื่องจากไฟล์ HTML เป็นเอกสารข้อความบริสุทธิ์ (Plain text) จึงสามารถใช้โปรแกรมแก้ไขข้อความในการเขียนคำสั่งโค้ดได้'
      }
    ]
  }
];
