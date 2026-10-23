// Ochrona hasłem dla /mapa (Cloudflare Pages Functions).
// Hasło ustawia się w Cloudflare: projekt Pages > Settings > Variables and Secrets,
// jako sekret o nazwie MAPA_PASSWORD. Zmiana hasła wylogowuje wszystkie osoby.

const COOKIE = "mapa_dostep";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 dni, potem trzeba wpisać hasło ponownie

async function token(password) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("mapa-samoprowadzenia-v1"));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

function page(status, { error = "", setup = false } = {}) {
  const body = setup
    ? `<p class="msg">Mapa nie ma jeszcze ustawionego hasła.</p>`
    : `<form method="post" action="/mapa/">
        <label for="haslo">Hasło</label>
        <input id="haslo" name="haslo" type="password" autocomplete="current-password" required autofocus>
        ${error ? `<p class="err" role="alert">${error}</p>` : ""}
        <button type="submit">Wejdź</button>
      </form>`;
  const html = `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Mapa samoprowadzenia</title>
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Raleway:wght@400;600;700&display=swap">
<style>
:root{--stage:#0E192B;--fg:#E4DCD1;--muted:rgba(228,220,209,.66);--line:rgba(228,220,209,.22);--gold:#FFD65C;--err:#FFB4A8}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:var(--stage);color:var(--fg);font-family:Raleway,system-ui,-apple-system,"Segoe UI",sans-serif;display:grid;place-items:center;padding:24px 16px}
main{width:100%;max-width:380px}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin:0 0 14px}
h1{font-family:"Playfair Display",Georgia,serif;font-weight:500;font-size:2.2rem;line-height:1.2;margin:0 0 28px}
form{display:grid;gap:10px}
label{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
input{width:100%;font:inherit;font-size:1rem;color:var(--fg);background:transparent;border:1px solid var(--line);border-radius:3px;padding:14px 16px}
input:focus{outline:2px solid var(--gold);outline-offset:2px;border-color:transparent}
button{margin-top:8px;font:inherit;font-weight:600;font-size:.95rem;color:#0E192B;background:var(--gold);border:0;border-radius:3px;padding:14px 22px;cursor:pointer}
button:focus-visible{outline:2px solid var(--fg);outline-offset:3px}
.err{margin:0;color:var(--err);font-size:.92rem}
.msg{color:var(--muted)}
</style>
</head>
<body>
<main>
  <p class="eyebrow">Self-Guidance Space</p>
  <h1>Mapa samoprowadzenia</h1>
  ${body}
</main>
</body>
</html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const password = env.MAPA_PASSWORD;

  // Bez ustawionego hasła mapa pozostaje zamknięta.
  if (!password) return page(503, { setup: true });

  const expected = await token(password);

  if (request.method === "POST") {
    const form = await request.formData().catch(() => null);
    const given = form ? String(form.get("haslo") || "") : "";
    if (safeEqual(await token(given), expected)) {
      const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
      return new Response(null, {
        status: 303,
        headers: {
          Location: "/mapa/",
          "Set-Cookie": `${COOKIE}=${expected}; Path=/mapa; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax${secure}`,
          "Cache-Control": "no-store",
        },
      });
    }
    return page(401, { error: "To hasło nie pasuje. Sprawdź je i wpisz jeszcze raz." });
  }

  if (safeEqual(readCookie(request, COOKIE) || "", expected)) {
    const res = await next();
    const out = new Response(res.body, res);
    out.headers.set("Cache-Control", "private, no-store");
    out.headers.set("X-Robots-Tag", "noindex, nofollow");
    return out;
  }

  return page(401);
}
