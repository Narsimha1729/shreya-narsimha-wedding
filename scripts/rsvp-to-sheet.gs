const SHEET_ID = '1rgnCDLTMj54Q9X0_qIiYoFPFRTZfMKDALZvE5wyLIqs';

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted at',
      'Name',
      'Email',
      'Attending',
      'Guests',
      'Dietary notes',
      'Message',
    ]);
  }

  sheet.appendRow([
    body.submittedAt || new Date().toISOString(),
    body.name || '',
    body.email || '',
    body.attendance || '',
    body.guests || '',
    body.dietaryRestrictions || '',
    body.message || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}
