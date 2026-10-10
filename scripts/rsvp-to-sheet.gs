const SHEET_ID = '1rgnCDLTMj54Q9X0_qIiYoFPFRTZfMKDALZvE5wyLIqs';

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Submitted at',
      'Name',
      'Attending',
      'People coming with them',
      'Arrival date',
      'Arrival time',
      'Departure date',
      'Departure time',
    ]);
  }

  sheet.appendRow([
    body.submittedAt || new Date().toISOString(),
    body.name || '',
    body.attendance || '',
    body.extraGuests || '',
    body.arrivalDate || '',
    body.arrivalTime || '',
    body.departureDate || '',
    body.departureTime || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON
  );
}
