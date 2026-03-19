// ─── NOTIFICATION FUNCTION ────────────────────────────────────────────────────
// Handles SMS (Textbelt) and email (SendGrid) notifications
// for weekly reset reminders and monthly check-in reminders.
// ─────────────────────────────────────────────────────────────────────────────

const TEXTBELT_API_KEY = process.env.TEXTBELT_API_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'admin@carsandcreditservices.com';
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || 'CollegeFundTracker';

const BASE_URL = process.env.SITE_URL || 'https://life-direction-assessment.netlify.app';

const CONTACTS = {
  mekhi: {
    name: 'Mekhi',
    phone: '+15106502665',
    email: 'mekhi.reynolds30@gmail.com',
    profilePath: '/mini/mekhi',
  },
  melvin: {
    name: 'Melvin',
    phone: '+15108221425',
    email: 'melvin.reynolds01@gmail.com',
    profilePath: '/mini/melvin',
  },
  mom: {
    name: 'Mom',
    phone: '+15109986112',
    email: 'moneyforcollege510@gmail.com',
    profilePath: '/dashboard',
  },
};

// ─── SEND SMS VIA TEXTBELT ───────────────────────────────────────────────────

async function sendSMS(phone, message) {
  const response = await fetch('https://textbelt.com/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone,
      message,
      key: TEXTBELT_API_KEY,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(`Textbelt SMS failed: ${data.error || JSON.stringify(data)}`);
  }

  return data;
}

// ─── SEND EMAIL VIA SENDGRID ──────────────────────────────────────────────────

async function sendEmail(to, toName, subject, bodyHtml, bodyText) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to, name: toName }],
          subject,
        },
      ],
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME,
      },
      content: [
        { type: 'text/plain', value: bodyText },
        { type: 'text/html', value: bodyHtml },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`SendGrid email failed (${response.status}): ${errText}`);
  }

  return { success: true, status: response.status };
}

// ─── MESSAGE TEMPLATES ────────────────────────────────────────────────────────

function buildWeeklyResetMessages(contact, weekNumber, month) {
  const checkInUrl = `${BASE_URL}${contact.profilePath}`;

  const smsBody =
    `Hey ${contact.name} — it's Sunday. Weekly reset time.\n` +
    `Week ${weekNumber} of ${month}. Takes less than 5 minutes.\n\n` +
    `Check in here: ${checkInUrl}`;

  const emailSubject = `${contact.name} — Week ${weekNumber} Check-In is Ready`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a1a; color: #ffffff; padding: 32px; border-radius: 12px;">
      <h2 style="color: #F4A300; margin-bottom: 8px;">Week ${weekNumber} Check-In</h2>
      <p style="color: #aaa; font-size: 13px; margin-bottom: 24px;">${month}</p>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        Hey ${contact.name} — it's Sunday.<br><br>
        Time for your weekly reset. This is the check-in that keeps everything on track —
        your growth score, your monthly goal, and your mom's dashboard.
      </p>
      <a href="${checkInUrl}" style="display: inline-block; background: #F4A300; color: #0a0a1a; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
        Open My Check-In →
      </a>
      <p style="color: #555; font-size: 12px; margin-top: 32px;">
        Built with love for a family that refuses to give up.
      </p>
    </div>
  `;

  const emailText =
    `Hey ${contact.name} — it's Sunday. Week ${weekNumber} check-in is ready.\n\n` +
    `Open it here: ${checkInUrl}\n\n` +
    `Takes less than 5 minutes. Do it now before the week gets away from you.`;

  return { smsBody, emailSubject, emailHtml, emailText };
}

function buildMonthlyCheckInMessages(contact, month) {
  const checkInUrl = `${BASE_URL}${contact.profilePath}`;

  const smsBody =
    `${contact.name} — it's the 16th. Monthly check-in is ready.\n` +
    `This one feeds your growth score and your mom's dashboard.\n\n` +
    `Open it here: ${checkInUrl}`;

  const emailSubject = `${contact.name} — Your ${month} Monthly Check-In`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a1a; color: #ffffff; padding: 32px; border-radius: 12px;">
      <h2 style="color: #F4A300; margin-bottom: 8px;">Monthly Check-In — ${month}</h2>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        Hey ${contact.name} — it's the 16th.<br><br>
        Your monthly check-in tracks real growth over time. This is the one that shows
        whether the work you're putting in is actually changing the numbers.
      </p>
      <a href="${checkInUrl}" style="display: inline-block; background: #F4A300; color: #0a0a1a; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
        Start My Check-In →
      </a>
      <p style="color: #555; font-size: 12px; margin-top: 32px;">
        Built with love for a family that refuses to give up.
      </p>
    </div>
  `;

  const emailText =
    `Hey ${contact.name} — monthly check-in is ready for ${month}.\n\n` +
    `Open it here: ${checkInUrl}\n\n` +
    `This one matters — it tracks your growth since last month.`;

  return { smsBody, emailSubject, emailHtml, emailText };
}

function buildMomDashboardAlert(month, mekhiName, melvinName) {
  const dashboardUrl = `${BASE_URL}/dashboard`;

  const smsBody =
    `Mom — new check-in data is in from ${mekhiName} and/or ${melvinName}.\n` +
    `Your dashboard has been updated for ${month}.\n\n` +
    `View it here: ${dashboardUrl}`;

  const emailSubject = `Mom's Dashboard Updated — ${month}`;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0a1a; color: #ffffff; padding: 32px; border-radius: 12px;">
      <h2 style="color: #9B59B6; margin-bottom: 8px;">Your Dashboard Is Updated</h2>
      <p style="color: #aaa; font-size: 13px; margin-bottom: 24px;">${month}</p>
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        New check-in data came in from your boys.<br><br>
        Your dashboard has been updated with their latest scores, flags, and growth tracking.
      </p>
      <a href="${dashboardUrl}" style="display: inline-block; background: #9B59B6; color: #ffffff; font-weight: bold; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
        Open My Dashboard →
      </a>
      <p style="color: #555; font-size: 12px; margin-top: 32px;">
        Built with love for a family that refuses to give up.
      </p>
    </div>
  `;

  const emailText =
    `Mom — your dashboard has been updated for ${month}.\n\n` +
    `New data is in from your boys. View it here: ${dashboardUrl}`;

  return { smsBody, emailSubject, emailHtml, emailText };
}

// ─── SEND NOTIFICATION HELPER ─────────────────────────────────────────────────

async function sendNotification(contact, { smsBody, emailSubject, emailHtml, emailText }, channels = ['sms', 'email']) {
  const results = { sms: null, email: null };
  const errors = [];

  if (channels.includes('sms') && contact.phone) {
    try {
      results.sms = await sendSMS(contact.phone, smsBody);
    } catch (err) {
      errors.push(`SMS to ${contact.name}: ${err.message}`);
      console.error(`SMS error for ${contact.name}:`, err.message);
    }
  }

  if (channels.includes('email') && contact.email) {
    try {
      results.email = await sendEmail(contact.email, contact.name, emailSubject, emailHtml, emailText);
    } catch (err) {
      errors.push(`Email to ${contact.name}: ${err.message}`);
      console.error(`Email error for ${contact.name}:`, err.message);
    }
  }

  return { contact: contact.name, results, errors };
}

// ─── MAIN HANDLER ────────────────────────────────────────────────────────────

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  if (!TEXTBELT_API_KEY || !SENDGRID_API_KEY) {
    console.error('Missing TEXTBELT_API_KEY or SENDGRID_API_KEY');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Notification service not configured' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { type, userId, weekNumber, month, channels = ['sms', 'email'] } = body;

  if (!type) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing notification type' }) };
  }

  const currentMonth = month || new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  const results = [];

  try {
    // ── Weekly Reset Reminder ──────────────────────────────────────────────
    if (type === 'weekly_reset') {
      const wk = weekNumber || getWeekOfMonth();

      // Notify Mekhi
      const mekhiContact = CONTACTS.mekhi;
      const mekhiMsgs = buildWeeklyResetMessages(mekhiContact, wk, currentMonth);
      results.push(await sendNotification(mekhiContact, mekhiMsgs, channels));

      // Notify Mom (different message: her dashboard will update when Mekhi checks in)
      const momMsgs = buildWeeklyResetMessages(
        { ...CONTACTS.mom, profilePath: '/dashboard' },
        wk,
        currentMonth
      );
      // Mom gets email only for weekly reset alerts (reduce SMS noise)
      results.push(await sendNotification(CONTACTS.mom, momMsgs, ['email']));
    }

    // ── Monthly Check-In Reminder ──────────────────────────────────────────
    else if (type === 'monthly_checkin') {
      // Notify Mekhi
      const mekhiMsgs = buildMonthlyCheckInMessages(CONTACTS.mekhi, currentMonth);
      results.push(await sendNotification(CONTACTS.mekhi, mekhiMsgs, channels));

      // Notify Mom (dashboard update alert)
      const momMsgs = buildMomDashboardAlert(currentMonth, 'Mekhi', 'Melvin');
      results.push(await sendNotification(CONTACTS.mom, momMsgs, channels));
    }

    // ── Direct notification to a specific user ─────────────────────────────
    else if (type === 'direct' && userId) {
      const contact = CONTACTS[userId];
      if (!contact) {
        return { statusCode: 400, body: JSON.stringify({ error: `Unknown userId: ${userId}` }) };
      }
      const msgs = buildMonthlyCheckInMessages(contact, currentMonth);
      results.push(await sendNotification(contact, msgs, channels));
    }

    // ── Mom dashboard alert ────────────────────────────────────────────────
    else if (type === 'dashboard_update') {
      const msgs = buildMomDashboardAlert(currentMonth, 'Mekhi', 'Melvin');
      results.push(await sendNotification(CONTACTS.mom, msgs, channels));
    }

    else {
      return { statusCode: 400, body: JSON.stringify({ error: `Unknown notification type: ${type}` }) };
    }

    const allErrors = results.flatMap(r => r.errors);
    const hasErrors = allErrors.length > 0;

    return {
      statusCode: hasErrors ? 207 : 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: !hasErrors,
        results,
        errors: allErrors.length > 0 ? allErrors : undefined,
        sentAt: new Date().toISOString(),
      }),
    };
  } catch (err) {
    console.error('Notification handler error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Notification failed', message: err.message }),
    };
  }
};

// ─── UTIL: WEEK OF MONTH ──────────────────────────────────────────────────────

function getWeekOfMonth() {
  const now = new Date();
  const dayOfMonth = now.getDate();
  return Math.ceil(dayOfMonth / 7);
}
