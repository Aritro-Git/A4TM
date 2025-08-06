const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    userDataDir: 'C:\\Users\\aritroc\\AppData\\Local\\Google\\Chrome\\User Data\\Default'
  });

  const page = await browser.newPage();
  await page.goto('https://a4gtm.netlify.app/', { waitUntil: 'networkidle2' });

  await page.waitForSelector('#downloadBtn', { timeout: 5000 });
  await page.click('#downloadBtn');
  console.log("🟡 Non-converted: Download button clicked");

  await new Promise(resolve => setTimeout(resolve, 5000));
  await page.evaluate(() => window.scrollBy(0, 300));
  console.log("🟡 Non-converted: Simulated scroll");

  await browser.close();
})();
