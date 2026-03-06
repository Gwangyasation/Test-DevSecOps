const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Capipara</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0f;
      --surface: #13131a;
      --accent: #c8f55a;
      --accent2: #7b5cf0;
      --text: #f0ede8;
      --muted: #6b6878;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* ── Noise overlay ── */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 999;
      opacity: 0.35;
    }

    /* ── Gradient blob ── */
    .blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.18;
      pointer-events: none;
      animation: drift 12s ease-in-out infinite alternate;
    }
    .blob-1 { width: 600px; height: 600px; background: var(--accent2); top: -200px; right: -100px; animation-delay: 0s; }
    .blob-2 { width: 400px; height: 400px; background: var(--accent); bottom: -100px; left: -100px; animation-delay: -5s; }

    @keyframes drift {
      from { transform: translate(0, 0) scale(1); }
      to   { transform: translate(40px, 30px) scale(1.08); }
    }

    /* ── Nav ── */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.4rem 3rem;
      z-index: 100;
      background: linear-gradient(to bottom, rgba(10,10,15,0.9) 0%, transparent 100%);
      backdrop-filter: blur(2px);
    }
    .nav-logo {
      font-family: 'DM Serif Display', serif;
      font-size: 1.5rem;
      letter-spacing: -0.02em;
      color: var(--accent);
    }
    .nav-pill {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 100px;
      padding: 0.45rem 1.2rem;
      font-size: 0.78rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    /* ── Hero ── */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      position: relative;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(200,245,90,0.08);
      border: 1px solid rgba(200,245,90,0.2);
      border-radius: 100px;
      padding: 0.35rem 1rem;
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 2.5rem;
      animation: fadeUp 0.8s ease both;
    }
    .eyebrow::before {
      content: '';
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--accent);
      animation: pulse 2s ease infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.7); }
    }

    h1 {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(3.5rem, 10vw, 8rem);
      line-height: 0.95;
      letter-spacing: -0.03em;
      margin-bottom: 1.5rem;
      animation: fadeUp 0.8s 0.15s ease both;
    }
    h1 em {
      font-style: italic;
      color: var(--accent);
      position: relative;
    }

    .subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--muted);
      max-width: 480px;
      line-height: 1.7;
      margin-bottom: 3rem;
      animation: fadeUp 0.8s 0.3s ease both;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      animation: fadeUp 0.8s 0.45s ease both;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.9rem 2rem;
      border-radius: 100px;
      font-family: 'Syne', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border: none;
      text-decoration: none;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary {
      background: var(--accent);
      color: #0a0a0f;
      box-shadow: 0 0 40px rgba(200,245,90,0.25);
    }
    .btn-primary:hover { box-shadow: 0 0 60px rgba(200,245,90,0.45); }
    .btn-ghost {
      background: rgba(255,255,255,0.06);
      color: var(--text);
      border: 1px solid rgba(255,255,255,0.12);
    }

    /* ── Stats strip ── */
    .stats {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 3rem;
      animation: fadeUp 0.8s 0.6s ease both;
    }
    .stat { text-align: center; }
    .stat-num {
      font-family: 'DM Serif Display', serif;
      font-size: 2rem;
      color: var(--text);
    }
    .stat-label {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--muted);
      margin-top: 0.2rem;
    }
    .stat-divider {
      width: 1px;
      background: rgba(255,255,255,0.1);
      align-self: stretch;
    }

    /* ── Cards ── */
    .cards-section {
      padding: 8rem 3rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .section-label {
      font-size: 0.75rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 1rem;
    }
    .section-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.1;
      margin-bottom: 3.5rem;
      max-width: 500px;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: var(--surface);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px;
      padding: 2rem;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
      cursor: default;
    }
    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(200,245,90,0.2);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .card-icon {
      width: 48px; height: 48px;
      border-radius: 12px;
      background: rgba(200,245,90,0.1);
      border: 1px solid rgba(200,245,90,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem;
      margin-bottom: 1.5rem;
    }
    .card h3 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.6rem;
    }
    .card p {
      font-size: 0.9rem;
      color: var(--muted);
      line-height: 1.6;
    }

    /* ── Footer ── */
    footer {
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 2rem 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--muted);
      font-size: 0.8rem;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 600px) {
      nav { padding: 1rem 1.5rem; }
      .stats { gap: 1.5rem; }
      .cards-section { padding: 5rem 1.5rem; }
      footer { flex-direction: column; gap: 0.5rem; text-align: center; }
    }
  </style>
</head>
<body>

  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>

  <nav>
    <div class="nav-logo">Capipara</div>
    <div class="nav-pill">Port 3000</div>
  </nav>

  <section class="hero">
    <div class="eyebrow">Server is live</div>
    <h1>Hello<br/><em>Capipara!</em></h1>
    <p class="subtitle">Your Express server is running smoothly. Ready to build something extraordinary.</p>
    <div class="cta-group">
      <a href="#features" class="btn btn-primary">Explore →</a>
      <a href="#" class="btn btn-ghost">View Docs</a>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-num">3000</div>
        <div class="stat-label">Port</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <div class="stat-num">99.9%</div>
        <div class="stat-label">Uptime</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <div class="stat-num">&lt;1ms</div>
        <div class="stat-label">Latency</div>
      </div>
    </div>
  </section>

  <section class="cards-section" id="features">
    <p class="section-label">Features</p>
    <h2 class="section-title">Built to move fast.</h2>
    <div class="cards-grid">
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>Lightning Fast</h3>
        <p>Express.js delivers blazing performance with minimal overhead for every request.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>Secure by Default</h3>
        <p>Built with security best practices so you can focus on shipping features.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔌</div>
        <h3>Extensible</h3>
        <p>Thousands of npm packages ready to plug in and extend your server instantly.</p>
      </div>
    </div>
  </section>

  <footer>
    <span>© 2026 Capipara</span>
    <span>Running on Express · Node.js</span>
  </footer>

</body>
</html>`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
