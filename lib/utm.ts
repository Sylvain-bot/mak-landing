// Stockage des UTM en sessionStorage — lu par les formulaires (ex. LeadMagnetForm)

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function storeUtmFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) sessionStorage.setItem(key, value);
    }
  } catch {}
}

export function getStoredUtmSource(): string | null {
  try {
    return (
      new URLSearchParams(window.location.search).get("utm_source") ||
      sessionStorage.getItem("utm_source")
    );
  } catch {
    return null;
  }
}
