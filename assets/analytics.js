// Grammilla — Google Analytics 4 with consent banner.
// GA loads only after the visitor clicks "Accept" (GDPR / ePrivacy).
(function () {
  var GA_ID = "G-JYJPPW6HRX";
  var KEY = "grammilla-analytics-consent";
  var lang = (document.documentElement.lang || "en").slice(0, 2);
  var T = {
    en: ["We use Google Analytics to count visits and improve this site. Allow analytics cookies?", "Accept", "Decline"],
    it: ["Usiamo Google Analytics per contare le visite e migliorare il sito. Accetti i cookie analitici?", "Accetto", "Rifiuto"],
    ru: ["Мы используем Google Analytics, чтобы считать посещения и улучшать сайт. Разрешить аналитические cookie?", "Разрешить", "Отклонить"],
    de: ["Wir nutzen Google Analytics, um Besuche zu zählen und die Seite zu verbessern. Analyse-Cookies erlauben?", "Akzeptieren", "Ablehnen"],
    es: ["Usamos Google Analytics para contar visitas y mejorar el sitio. ¿Permites las cookies analíticas?", "Aceptar", "Rechazar"],
    fr: ["Nous utilisons Google Analytics pour compter les visites et améliorer le site. Autoriser les cookies d’analyse ?", "Accepter", "Refuser"]
  };
  var t = T[lang] || T.en;

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (window.__grammillaGA) return;
    window.__grammillaGA = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  function banner() {
    var box = document.createElement("div");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-live", "polite");
    box.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;" +
      "background:#fff8e8;color:#2b2b2b;border:1px solid #e3d6b8;border-radius:12px;box-shadow:0 6px 24px rgba(0,0,0,.15);" +
      "padding:14px 16px;font:15px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:flex;flex-wrap:wrap;gap:10px;align-items:center";
    var p = document.createElement("span");
    p.textContent = t[0];
    p.style.cssText = "flex:1 1 260px";
    var yes = document.createElement("button");
    var no = document.createElement("button");
    yes.textContent = t[1];
    no.textContent = t[2];
    var btn = "border-radius:8px;padding:8px 14px;font:inherit;cursor:pointer;border:1px solid #2f5d9e;";
    yes.style.cssText = btn + "background:#2f5d9e;color:#fff";
    no.style.cssText = btn + "background:transparent;color:#2f5d9e";
    yes.onclick = function () { set("granted"); box.remove(); loadGA(); };
    no.onclick = function () { set("denied"); box.remove(); };
    box.appendChild(p); box.appendChild(yes); box.appendChild(no);
    document.body.appendChild(box);
  }

  var c = get();
  if (c === "granted") loadGA();
  else if (c !== "denied") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", banner);
    else banner();
  }
})();
