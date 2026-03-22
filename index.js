const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Capipara</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #1a1208;
      --bg2:       #221a0e;
      --surface:   #2c2010;
      --border:    rgba(210,170,110,0.12);
      --gold:      #c8976a;
      --gold-lt:   #e8c49a;
      --cream:     #f5ece0;
      --muted:     #8a7360;
      --accent:    #a0673a;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--cream);
      font-family: 'Josefin Sans', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Grain texture */
    body::after {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.055'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999;
    }

    /* Warm radial vignette */
    body::before {
      content: '';
      position: fixed; inset: 0;
      background:
        radial-gradient(ellipse 70% 60% at 15% 80%, rgba(120,70,20,0.35) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 85% 10%, rgba(90,50,15,0.25) 0%, transparent 55%),
        radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(10,6,2,0.6) 100%);
      pointer-events: none; z-index: 0;
    }

    /* Nav */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.8rem 4rem;
      z-index: 100;
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-weight: 300;
      letter-spacing: 0.25em;
      color: var(--gold-lt);
      text-transform: uppercase;
    }
    .nav-status {
      display: flex; align-items: center; gap: 0.6rem;
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--muted);
    }
    .status-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #7eb87a;
      box-shadow: 0 0 8px #7eb87a;
      animation: blink 2.5s ease infinite;
    }
    @keyframes blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0.3; }
    }

    /* Hero */
    .hero {
      position: relative; z-index: 1;
      min-height: 100vh;
      display: grid;
      grid-template-rows: 1fr auto;
      padding: 0 4rem 4rem;
    }

    .hero-center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-top: 7rem;
    }

    .pre-label {
      font-size: 0.68rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--gold);
      opacity: 0.7;
      margin-bottom: 2.5rem;
      animation: riseIn 1s ease both;
    }

    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300;
      font-size: clamp(4.5rem, 12vw, 10rem);
      line-height: 0.88;
      letter-spacing: -0.01em;
      color: var(--cream);
      animation: riseIn 1s 0.15s ease both;
    }
    h1 .italic-word {
      font-style: italic;
      font-weight: 300;
      color: var(--gold-lt);
      display: block;
    }

    .ornament {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      margin: 2.5rem 0;
      animation: riseIn 1s 0.3s ease both;
    }
    .ornament-line {
      flex: 1; max-width: 80px; height: 1px;
      background: linear-gradient(to right, transparent, var(--gold));
      opacity: 0.4;
    }
    .ornament-line.rev { background: linear-gradient(to left, transparent, var(--gold)); }
    .ornament-diamond {
      width: 6px; height: 6px;
      background: var(--gold);
      transform: rotate(45deg);
      opacity: 0.6;
    }

    .subtitle {
      font-size: clamp(0.8rem, 1.5vw, 0.92rem);
      font-weight: 300;
      letter-spacing: 0.12em;
      color: var(--muted);
      max-width: 380px;
      line-height: 2;
      text-transform: uppercase;
      animation: riseIn 1s 0.45s ease both;
      margin-bottom: 3rem;
    }

    .cta-group {
      display: flex; gap: 1.2rem; flex-wrap: wrap; justify-content: center;
      animation: riseIn 1s 0.6s ease both;
    }
    .btn {
      display: inline-flex; align-items: center; gap: 0.6rem;
      padding: 0.85rem 2.2rem;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.72rem; font-weight: 600;
      letter-spacing: 0.22em; text-transform: uppercase;
      cursor: pointer; border: none; text-decoration: none;
      transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn-primary {
      background: var(--gold); color: var(--bg);
      box-shadow: 0 4px 30px rgba(200,151,106,0.3);
    }
    .btn-primary:hover { background: var(--gold-lt); box-shadow: 0 8px 40px rgba(200,151,106,0.5); }
    .btn-outline {
      background: transparent; color: var(--gold);
      border: 1px solid rgba(200,151,106,0.35);
    }
    .btn-outline:hover { border-color: var(--gold); background: rgba(200,151,106,0.06); }

    /* Bottom strip */
    .hero-footer {
      display: flex; align-items: flex-end; justify-content: space-between;
      padding-top: 3rem;
      border-top: 1px solid var(--border);
      animation: riseIn 1s 0.75s ease both;
    }
    .stats { display: flex; gap: 4rem; }
    .stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem; font-weight: 300;
      color: var(--cream); line-height: 1;
    }
    .stat-label {
      font-size: 0.62rem; letter-spacing: 0.2em;
      text-transform: uppercase; color: var(--muted); margin-top: 0.4rem;
    }
    .scroll-hint {
      display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
      font-size: 0.6rem; letter-spacing: 0.25em;
      text-transform: uppercase; color: var(--muted);
    }
    .scroll-arrow {
      width: 1px; height: 40px;
      background: linear-gradient(to bottom, var(--gold), transparent);
      animation: scrollPulse 2s ease infinite;
    }
    @keyframes scrollPulse {
      0%,100% { transform: scaleY(1); opacity: 0.5; }
      50%      { transform: scaleY(0.6); opacity: 1; }
    }

    /* Cards section */
    .section {
      position: relative; z-index: 1;
      padding: 8rem 4rem;
      max-width: 1200px; margin: 0 auto;
    }
    .section-eyebrow {
      font-size: 0.65rem; letter-spacing: 0.3em;
      text-transform: uppercase; color: var(--gold); opacity: 0.7;
      margin-bottom: 0.8rem;
    }
    .section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.2rem, 4vw, 3.5rem);
      font-weight: 300; font-style: italic;
      color: var(--cream); line-height: 1.1;
      margin-bottom: 4rem;
    }
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1px; border: 1px solid var(--border);
    }
    .card {
      background: var(--bg2); padding: 2.8rem;
      border-right: 1px solid var(--border);
      transition: background 0.3s;
      position: relative; overflow: hidden;
    }
    .card:last-child { border-right: none; }
    .card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(to right, var(--gold), transparent);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.4s ease;
    }
    .card:hover { background: var(--surface); }
    .card:hover::before { transform: scaleX(1); }
    .card-number {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic; font-size: 0.85rem;
      color: var(--gold); opacity: 0.5; margin-bottom: 1.5rem;
    }
    .card h3 {
      font-size: 0.78rem; font-weight: 600;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: var(--gold-lt); margin-bottom: 1rem;
    }
    .card p {
      font-size: 0.85rem; font-weight: 300;
      color: var(--muted); line-height: 1.9; letter-spacing: 0.03em;
    }

    /* Footer */
    footer {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      padding: 2rem 4rem;
      display: flex; align-items: center; justify-content: space-between;
      font-size: 0.65rem; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--muted);
    }

    @keyframes riseIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 640px) {
      nav, .section, footer { padding-left: 1.8rem; padding-right: 1.8rem; }
      .hero { padding: 0 1.8rem 3rem; }
      .stats { gap: 2rem; }
      .hero-footer { flex-direction: column; gap: 2rem; align-items: flex-start; }
      .cards-grid { grid-template-columns: 1fr; }
      .card { border-right: none; border-bottom: 1px solid var(--border); }
    }
  </style>
</head>
<body>

  <nav>
    <div class="nav-logo">Capipara</div>
    <div class="nav-status">
      <span class="status-dot"></span>
      Port 3000 · Live
    </div>
  </nav>

  <section class="hero">
    <div class="hero-center">
      <p class="pre-label">Express Server · Node.js</p>
      <h1>
        Hello
        <span class="italic-word">Capipara!</span>
      </h1>
      <div class="ornament">
        <div class="ornament-line"></div>
        <div class="ornament-diamond"></div>
        <div class="ornament-line rev"></div>
      </div>
      <p class="subtitle">Your server is running smoothly.<br/>Ready to build something extraordinary.</p>
      <div class="cta-group">
        <a href="#features" class="btn btn-primary">Explore</a>
        <a href="#" class="btn btn-outline">View Docs</a>
      </div>
    </div>

    <div class="hero-footer">
      <div class="stats">
        <div>
          <div class="stat-num">3000</div>
          <div class="stat-label">Port</div>
        </div>
        <div>
          <div class="stat-num">99.9%</div>
          <div class="stat-label">Uptime</div>
        </div>
        <div>
          <div class="stat-num">&lt;1ms</div>
          <div class="stat-label">Latency</div>
        </div>
      </div>
      <div class="scroll-hint">
        <div class="scroll-arrow"></div>
        Scroll
      </div>
    </div>
  </section>

  <div class="section" id="features">
    <p class="section-eyebrow">Features</p>
    <h2 class="section-title">Built to move fast.</h2>
    <div class="cards-grid">
      <div class="card">
        <div class="card-number">01.</div>
        <h3>Lightning Fast</h3>
        <p>Express.js delivers blazing performance with minimal overhead for every single request that passes through.</p>
      </div>
      <div class="card">
        <div class="card-number">02.</div>
        <h3>Secure by Default</h3>
        <p>Built with security best practices baked in, so you can focus entirely on shipping features that matter.</p>
      </div>
      <div class="card">
        <div class="card-number">03.</div>
        <h3>Infinitely Extensible</h3>
        <p>Thousands of npm packages ready to plug in and extend your server capabilities instantly.</p>
      </div>
    </div>
  </div>

  <footer>
    <span>© 2026 Capipara</span>
    <span>Express · Node.js</span>
  </footer>

</body>
</html>`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
