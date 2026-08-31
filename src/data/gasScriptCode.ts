export const GAS_SCRIPT_CODE = `/**
 * Google Apps Script - Web App Backend
 * วิชา การสร้างเว็บไซต์ (Web Development HTML Review & Gamification App)
 * Sheet ID Target: 1XoBFtZMCsLBDkbZvp9_lXzC4ZG54n_fJuepdRqBrq40
 * Deployment URL: https://script.google.com/macros/s/AKfycbzidxFg5Rz7q1UkdDkEDINRv0NBey3bj0n3F86tzIbPFntN-t09hFDjUXReXZuGUrvV/exec
 */

const SHEET_ID = '1XoBFtZMCsLBDkbZvp9_lXzC4ZG54n_fJuepdRqBrq40';
const LINE_CHANNEL_ACCESS_TOKEN = 'YOUR_LINE_OA_CHANNEL_ACCESS_TOKEN'; // ใส่ Channel Access Token จาก LINE Developers (ถ้าต้องการใช้ LINE Messaging API)

function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SHEET_ID);
  } catch (err) {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
}

// ตรวจสอบและสร้างแท็บตารางอัตโนมัติหากยังไม่มี
function initSheets() {
  const ss = getSpreadsheet();
  const sheetsNeeded = [
    { name: 'Users', headers: ['userId', 'displayName', 'pictureUrl', 'points', 'level', 'completedLessons', 'completedQuests', 'badges', 'lastCheckinDate', 'streakDays', 'updatedAt'] },
    { name: 'Checkins', headers: ['userId', 'displayName', 'checkinDate', 'pointsEarned', 'streakDays', 'timestamp'] },
    { name: 'QuizResults', headers: ['userId', 'displayName', 'categoryId', 'categoryTitle', 'score', 'totalQuestions', 'percentage', 'pointsEarned', 'obj1Correct', 'obj2Correct', 'timestamp'] },
    { name: 'Badges', headers: ['userId', 'badgeId', 'badgeTitle', 'earnedAt'] }
  ];

  sheetsNeeded.forEach(function(item) {
    let sheet = ss.getSheetByName(item.name);
    if (!sheet) {
      sheet = ss.insertSheet(item.name);
      sheet.appendRow(item.headers);
      sheet.getRange(1, 1, 1, item.headers.length).setFontWeight('bold').setBackground('#6366f1').setFontColor('#ffffff');
    }
  });
}

function doGet(e) {
  initSheets();
  const action = e.parameter.action || 'ping';
  const ss = getSpreadsheet();

  if (action === 'getLeaderboard') {
    const sheet = ss.getSheetByName('Users');
    const data = sheet.getDataRange().getValues();
    if (data.length <= 1) return responseJSON({ status: 'success', data: [] });

    const headers = data[0];
    const users = [];
    for (let i = 1; i < data.length; i++) {
      let row = data[i];
      users.push({
        userId: row[0],
        displayName: row[1],
        pictureUrl: row[2],
        points: Number(row[3]) || 0,
        level: Number(row[4]) || 1,
        badgesCount: row[7] ? String(row[7]).split(',').filter(Boolean).length : 0
      });
    }

    users.sort(function(a, b) { return b.points - a.points; });
    users.forEach(function(u, idx) { u.rank = idx + 1; });

    return responseJSON({ status: 'success', data: users });
  }

  if (action === 'getUserData') {
    const userId = e.parameter.userId;
    const sheet = ss.getSheetByName('Users');
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === userId) {
        return responseJSON({
          status: 'success',
          user: {
            userId: data[i][0],
            displayName: data[i][1],
            pictureUrl: data[i][2],
            points: Number(data[i][3]),
            level: Number(data[i][4]),
            completedLessons: Number(data[i][5]),
            completedQuests: Number(data[i][6]),
            earnedBadgeIds: data[i][7] ? String(data[i][7]).split(',') : [],
            lastCheckinDate: data[i][8],
            streakDays: Number(data[i][9])
          }
        });
      }
    }
    return responseJSON({ status: 'not_found' });
  }

  return responseJSON({
    status: 'success',
    message: 'Google Apps Script Web App for HTML Learning App is ready!',
    sheetId: SHEET_ID
  });
}

function doPost(e) {
  initSheets();
  try {
    const contents = JSON.parse(e.postData.contents);
    const action = contents.action;
    const ss = getSpreadsheet();

    if (action === 'syncUser') {
      const user = contents.user;
      const sheet = ss.getSheetByName('Users');
      const data = sheet.getDataRange().getValues();
      let foundIndex = -1;

      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === user.userId) {
          foundIndex = i + 1;
          break;
        }
      }

      const rowData = [
        user.userId,
        user.displayName,
        user.pictureUrl,
        user.points,
        user.level,
        user.completedLessons,
        user.completedQuests,
        (user.earnedBadgeIds || []).join(','),
        user.lastCheckinDate || '',
        user.streakDays || 0,
        new Date().toISOString()
      ];

      if (foundIndex > 0) {
        sheet.getRange(foundIndex, 1, 1, rowData.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }

      return responseJSON({ status: 'success', message: 'User synced successfully' });
    }

    if (action === 'checkin') {
      const checkinSheet = ss.getSheetByName('Checkins');
      checkinSheet.appendRow([
        contents.userId,
        contents.displayName,
        contents.date,
        contents.pointsEarned,
        contents.streakDays,
        new Date().toISOString()
      ]);

      // ส่งข้อความแจ้งเตือนผ่าน LINE OA (ถ้าตั้งค่า Token ไว้)
      sendLineMessagingNotification(contents.userId, '🎉 เช็คอินสำเร็จ! คุณได้รับ +' + contents.pointsEarned + ' คะแนนสะสม (สถิติเช็คอินต่อเนื่อง ' + contents.streakDays + ' วัน)');

      return responseJSON({ status: 'success', message: 'Checkin recorded' });
    }

    if (action === 'saveQuizResult') {
      const quizSheet = ss.getSheetByName('QuizResults');
      quizSheet.appendRow([
        contents.userId,
        contents.displayName,
        contents.categoryId,
        contents.categoryTitle,
        contents.score,
        contents.totalQuestions,
        contents.percentage,
        contents.pointsEarned,
        contents.obj1Correct,
        contents.obj2Correct,
        new Date().toISOString()
      ]);

      // แจ้งเตือน LINE OA
      sendLineMessagingNotification(
        contents.userId,
        '📚 ทำควิซทบทวนวิชาการสร้างเว็บไซต์สำเร็จ!\\n' +
        'หมวด: ' + contents.categoryTitle + '\\n' +
        'คะแนนที่ได้: ' + contents.score + '/' + contents.totalQuestions + ' (' + contents.percentage + '%)\\n' +
        'รับคะแนนสะสม: +' + contents.pointsEarned + ' PTS'
      );

      return responseJSON({ status: 'success', message: 'Quiz result saved' });
    }

    return responseJSON({ status: 'error', message: 'Unknown action' });
  } catch (error) {
    return responseJSON({ status: 'error', message: error.toString() });
  }
}

// ฟังก์ชันส่งข้อความ LINE OA Push Message
function sendLineMessagingNotification(userId, messageText) {
  if (!LINE_CHANNEL_ACCESS_TOKEN || LINE_CHANNEL_ACCESS_TOKEN === 'YOUR_LINE_OA_CHANNEL_ACCESS_TOKEN') return;
  if (!userId || userId.indexOf('LINE_') !== 0) return; // ทำงานเฉพาะ User ID จริงจาก LINE

  const url = 'https://api.line.me/v2/bot/message/push';
  const payload = {
    to: userId,
    messages: [{ type: 'text', text: messageText }]
  };

  try {
    UrlFetchApp.fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_CHANNEL_ACCESS_TOKEN
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
  } catch (err) {
    Logger.log('LINE Push Error: ' + err.toString());
  }
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
