"use client";

// Lien « Gestion des cookies » (footer) : réinitialise le choix et rouvre la
// bannière de consentement.
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem("atb-cookie-consent");
        } catch {
          /* ignore */
        }
        window.dispatchEvent(new Event("atb-open-cookies"));
      }}
      className="hover:text-orange"
    >
      Gestion des cookies
    </button>
  );
}
