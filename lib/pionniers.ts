// Places Pionnier restantes : 100 moins le nombre de contacts de la liste Brevo « Pionniers »
// (liste tenue à jour par l'app). Relu au plus toutes les 10 minutes. null si Brevo ne répond pas :
// la page affiche alors l'offre sans chiffre plutôt qu'un chiffre faux.

export const PIONNIER_TOTAL_PLACES = 100;
const PIONNIERS_LIST_ID = Number(process.env.BREVO_PIONNIERS_LIST_ID || 6);

export async function getPionnierPlacesLeft(): Promise<number | null> {
  const apiKey = process.env.BREVO_API_KEY?.replace(/[^\x21-\x7e]/g, "");
  if (!apiKey) return null;
  try {
    const res = await fetch(`https://api.brevo.com/v3/contacts/lists/${PIONNIERS_LIST_ID}`, {
      headers: { "api-key": apiKey, Accept: "application/json" },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const list = (await res.json()) as { uniqueSubscribers?: number };
    if (typeof list.uniqueSubscribers !== "number") return null;
    return Math.max(0, PIONNIER_TOTAL_PLACES - list.uniqueSubscribers);
  } catch {
    return null;
  }
}
