const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set to true to hide browser
  const page = await browser.newPage();

  const simulationId = 'SIM-' + Date.now();

  await page.evaluateOnNewDocument((simId) => {
    const meta = document.createElement('meta');
    meta.name = "simulation-id";
    meta.content = simId;
    document.head.appendChild(meta);
    console.log("✅ Injected Simulation ID:", simId);
  }, simulationId);

  await page.goto('https://a4gtm.netlify.app/', { waitUntil: 'networkidle0' });

  try {
    await page.waitForSelector('#downloadBtn', { timeout: 5000 });
    await page.click('#downloadBtn');
    console.log("✅ Download button clicked");

    await page.waitForSelector('#leadForm input[name="name"]', { timeout: 5000 });
    await page.type('input[name="name"]', 'Test User');
    await page.type('input[name="email"]', `test+${Date.now()}@example.com`);

    await page.click('#leadForm button[type="submit"]');
    console.log("✅ Form submitted");

    await page.waitForSelector('#thankyou-section', { timeout: 5000 });
    console.log("✅ Thank you page reached");

  } catch (err) {
    console.error("❌ Simulation error:", err.message);
  }

  // Wait manually for 3s instead of using page.waitForTimeout
  await new Promise(resolve => setTimeout(resolve, 3000));

  await browser.close();
})();