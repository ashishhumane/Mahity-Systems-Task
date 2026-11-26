function doPost(event) {
  const fields = event && event.parameter || {};
  const name = String(fields.name || '').trim();
  const email = String(fields.email || '').trim();
  const company = String(fields.company || '').trim();
  const message = String(fields.message || '').trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || name.length > 120 || !validEmail || email.length > 254 ||
      company.length > 160 || !message || message.length > 3000) {
    return jsonResponse({ ok: false });
  }

  try {
    const sheetId = PropertiesService.getScriptProperties().getProperty('CONTACT_SHEET_ID');
    Sheets.Spreadsheets.Values.append(
      { values: [[new Date().toISOString(), name, email, company, message]] },
      sheetId,
      'Submissions!A:E',
      { valueInputOption: 'RAW', insertDataOption: 'INSERT_ROWS' }
    );
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error('Contact sheet write failed', error);
    return jsonResponse({ ok: false });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
