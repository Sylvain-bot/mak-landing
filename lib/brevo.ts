const BASE = "https://api.brevo.com/v3";

function headers() {
  return {
    "api-key": process.env.BREVO_API_KEY!,
    "Content-Type": "application/json",
  };
}

export async function getBrevoStats() {
  const [contactsRes, listsRes] = await Promise.all([
    fetch(`${BASE}/contacts?limit=1`, { headers: headers() }),
    fetch(`${BASE}/contacts/lists?limit=10`, { headers: headers() }),
  ]);
  const contacts = await contactsRes.json();
  const lists = await listsRes.json();
  return { totalContacts: contacts.count ?? 0, lists: lists.lists ?? [] };
}

export async function sendBrevoEmail(payload: {
  subject: string;
  htmlContent: string;
  listIds: number[];
  senderName?: string;
  senderEmail?: string;
}) {
  const res = await fetch(`${BASE}/emailCampaigns`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      name: payload.subject,
      subject: payload.subject,
      htmlContent: payload.htmlContent,
      sender: {
        name: payload.senderName ?? "Mon Assistant Kiné",
        email: payload.senderEmail ?? "contact@monassistantkine.fr",
      },
      recipients: { listIds: payload.listIds },
      scheduledAt: new Date().toISOString(),
    }),
  });
  return res.json();
}
