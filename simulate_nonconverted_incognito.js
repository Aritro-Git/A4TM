const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--incognito', '--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.createBrowserContext(); // fresh user
  const page = await context.newPage();

  await page.goto('https://a4gtm.netlify.app/', { waitUntil: 'networkidle2' });

  await page.waitForSelector('#downloadBtn', { timeout: 5000 });
  await page.click('#downloadBtn');
  console.log("🟡 Non-converted: Download button clicked");

  // 🟡 Wait for 5 seconds without submitting form
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(5000);

  // Simulate scroll (optional)
  await page.evaluate(() => window.scrollBy(0, 300));
  console.log("🟡 Non-converted: Simulated scroll");

  await browser.close();
})();
