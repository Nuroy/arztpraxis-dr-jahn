// Vercel Serverless Function für Terminanfragen
// DSGVO-konform: Keine Datenspeicherung, direkter E-Mail-Versand über Strato SMTP

const nodemailer = require('nodemailer');
const { z } = require('zod');

// ----- VALIDIERUNGS-SCHEMA (Zod) -----
const terminSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben').max(100),
  email: z.string().email('Ungültige E-Mail-Adresse').max(200),
  telefon: z.string().min(5, 'Telefonnummer zu kurz').max(50),
  arzt: z.enum(['hancock', 'jahn']),
  termine: z.array(
    z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      time: z.enum(['morning', 'noon', 'afternoon']) // Tageszeit statt exakte Uhrzeit
    })
  ).min(1, 'Mindestens ein Termin erforderlich').max(3, 'Maximal 3 Termine möglich'),
  nachricht: z.string().max(500).optional(),
  consent: z.boolean().refine(val => val === true, 'Datenschutz-Zustimmung erforderlich'),
  honeypot: z.string().max(0, 'Bot-Schutz aktiviert') // Muss leer sein!
});

// ----- RATE LIMITING (In-Memory Token Bucket) -----
// Für Serverless: Wird pro Instanz sein, aber für kleine Praxis ausreichend
// Bewusst großzügig gesetzt, damit echte Patienten nicht blockiert werden
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 Minuten
const MAX_REQUESTS = 20; // Erhöht von 3 auf 20 - mehrere Patienten können parallel buchen

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];

  // Alte Requests entfernen (außerhalb des Fensters)
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= MAX_REQUESTS) {
    return true;
  }

  // Request hinzufügen
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  // Cleanup: Alte IPs entfernen (älter als 1 Stunde)
  if (rateLimitMap.size > 1000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every(t => now - t > 60 * 60 * 1000)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

// ----- SMTP TRANSPORTER (Strato) -----
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.strato.de',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false, // STARTTLS auf Port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });
}

// ----- E-MAIL TEMPLATES -----
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatDayTime(dayTime) {
  const map = {
    morning: 'Vormittag (8-12 Uhr)',
    noon: 'Mittag (12-14 Uhr)',
    afternoon: 'Nachmittag (14-18 Uhr)'
  };
  return map[dayTime] || dayTime;
}

function generateEmailHTML(data) {
  const arztName = data.arzt === 'hancock' ? 'Dr. Hancock-Diener' : 'Dr. Jahn';
  const termineList = data.termine.map((t, i) =>
    `<li><strong>Wunschtermin ${i + 1}:</strong> ${formatDate(t.date)}, ${formatDayTime(t.time)}</li>`
  ).join('');

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Neue Terminanfrage</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f9fafb; color: #1f2937;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                📅 Neue Terminanfrage
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                Eingegangen über die Website
              </p>
            </td>
          </tr>

          <!-- Inhalt -->
          <tr>
            <td style="padding: 32px;">

              <!-- Patient Info -->
              <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 20px; margin-bottom: 24px; border-radius: 6px;">
                <h2 style="margin: 0 0 16px; font-size: 18px; color: #0f766e;">Kontaktdaten</h2>
                <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #0f766e;">Name:</strong> ${data.name}
                </p>
                <p style="margin: 0 0 8px; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #0f766e;">E-Mail:</strong> <a href="mailto:${data.email}" style="color: #14b8a6; text-decoration: none;">${data.email}</a>
                </p>
                <p style="margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong style="color: #0f766e;">Telefon:</strong> <a href="tel:${data.telefon}" style="color: #14b8a6; text-decoration: none;">${data.telefon}</a>
                </p>
              </div>

              <!-- Ärztin -->
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; font-size: 18px; color: #0f766e;">Gewünschte Ärztin</h2>
                <p style="margin: 0; font-size: 15px; background-color: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb;">
                  ${arztName}
                </p>
              </div>

              <!-- Wunschtermine -->
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; font-size: 18px; color: #0f766e;">Wunschtermine</h2>
                <ul style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8; color: #374151;">
                  ${termineList}
                </ul>
              </div>

              ${data.nachricht ? `
              <!-- Nachricht -->
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 12px; font-size: 18px; color: #0f766e;">Nachricht</h2>
                <p style="margin: 0; font-size: 15px; background-color: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb; white-space: pre-wrap; line-height: 1.6;">
                  ${data.nachricht}
                </p>
              </div>
              ` : ''}

              <!-- Action -->
              <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 16px; border-radius: 6px; margin-top: 24px;">
                <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.6;">
                  ⚡ <strong>Bitte kontaktieren Sie den/die Patient:in telefonisch</strong>, um einen der Wunschtermine zu bestätigen.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                Praxisgemeinschaft Dr. Hancock-Diener &amp; Dr. Jahn<br>
                Friedrichstraße 33, 80801 München
              </p>
              <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af;">
                Diese E-Mail wurde automatisch generiert.<br>
                Eingegangen am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function generateEmailPlain(data) {
  const arztName = data.arzt === 'hancock' ? 'Dr. Hancock-Diener' : 'Dr. Jahn';
  const termineList = data.termine.map((t, i) =>
    `  Wunschtermin ${i + 1}: ${formatDate(t.date)}, ${formatDayTime(t.time)}`
  ).join('\n');

  return `
NEUE TERMINANFRAGE ÜBER DIE WEBSITE
====================================

KONTAKTDATEN:
Name:     ${data.name}
E-Mail:   ${data.email}
Telefon:  ${data.telefon}

GEWÜNSCHTE ÄRZTIN:
${arztName}

WUNSCHTERMINE:
${termineList}

${data.nachricht ? `NACHRICHT:\n${data.nachricht}\n\n` : ''}
WICHTIG: Bitte kontaktieren Sie den/die Patient:in telefonisch zur Terminbestätigung.

---
Praxisgemeinschaft Dr. Hancock-Diener & Dr. Jahn
Friedrichstraße 33, 80801 München

Eingegangen am ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'full', timeStyle: 'short' })}
  `.trim();
}

// ----- MAIN HANDLER -----
module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Nur POST erlaubt
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // IP für Rate Limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['x-real-ip'] ||
               req.connection?.remoteAddress ||
               'unknown';

    // Rate Limit Check
    if (isRateLimited(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip.substring(0, 8)}...`);
      return res.status(429).json({
        error: 'Entschuldigung, momentan besteht eine hohe Auslastung. Bitte versuchen Sie es in wenigen Minuten erneut oder rufen Sie uns direkt an: 089 38 80 86 87 oder 089 38 88 95 00'
      });
    }

    // Validierung mit Zod
    const data = terminSchema.parse(req.body);

    // Honeypot-Check (sollte durch Zod bereits abgefangen sein)
    if (data.honeypot && data.honeypot.length > 0) {
      console.log('Honeypot triggered - potential bot');
      return res.status(400).json({ error: 'Ungültige Anfrage' });
    }

    // Environment Variables prüfen
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.EMPFANG_EMAIL) {
      console.error('Missing required environment variables');
      return res.status(500).json({ error: 'Server-Konfigurationsfehler' });
    }

    // E-Mail senden
    const transporter = createTransporter();
    const arztName = data.arzt === 'hancock' ? 'Dr. Hancock-Diener' : 'Dr. Jahn';

    const mailOptions = {
      from: `"Terminanfrage Website" <${process.env.ABSENDER_EMAIL || process.env.SMTP_USER}>`,
      to: process.env.EMPFANG_EMAIL,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: `Neue Terminanfrage von ${data.name} bei ${arztName}`,
      text: generateEmailPlain(data),
      html: generateEmailHTML(data)
    };

    await transporter.sendMail(mailOptions);

    // Erfolg (nur Status loggen, KEINE Patientendaten!)
    console.log('Terminanfrage erfolgreich versendet');

    return res.status(200).json({
      success: true,
      message: 'Ihre Terminanfrage wurde erfolgreich versendet. Wir melden uns in Kürze bei Ihnen.'
    });

  } catch (error) {
    // Fehler-Handling (KEINE sensiblen Daten loggen!)
    if (error.name === 'ZodError') {
      console.log('Validation error');
      return res.status(400).json({
        error: 'Ungültige Eingabedaten',
        details: error.errors.map(e => e.message)
      });
    }

    console.error('Error sending email:', error.message);
    return res.status(500).json({
      error: 'Beim Versenden der Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.'
    });
  }
};
