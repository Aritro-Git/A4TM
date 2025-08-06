const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: 'C:\\Users\\aritroc\\AppData\\Local\\Google\\Chrome\\User Data\\Default'
  });

  const page = await browser.newPage();
  await page.goto('https://a4gtm.netlify.app/', { waitUntil: 'networkidle0' });

  try {
    await page.waitForSelector('#downloadBtn', { timeout: 5000 });
    await page.click('#downloadBtn');
    console.log("✅ Download button clicked");

    await page.waitForSelector('#leadForm input[name="name"]', { timeout: 5000 });
    await page.type('input[name="name"]', 'Same User');
    await page.type('input[name="email"]', 'sameuser@example.com');

    await page.click('#leadForm button[type="submit"]');
    console.log("✅ Form submitted");

    await page.waitForSelector('#thankyou-section', { timeout: 5000 });
    console.log("✅ Thank you page reached");

  } catch (err) {
    console.error("❌ Simulation error:", err.message);
  }

  await new Promise(resolve => setTimeout(resolve, 3000));
  await browser.close();
})();
