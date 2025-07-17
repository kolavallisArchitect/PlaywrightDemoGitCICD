const { chromium } = require('playwright');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');

async function getCredentialsFromCSV(csvPath) {
    const fileContent = fs.readFileSync(csvPath);
    const records = parse(fileContent, { columns: true });
    // Assuming CSV columns: username,password
    return records[0];
}

async function gmailLogin(page, username, password) {
    await page.goto('https://accounts.google.com/signin/v2/identifier');
    await page.fill('input[type="email"]', username);
    await page.click('button:has-text("Next")');
    await page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Next")');
}

(async () => {
    const credentials = await getCredentialsFromCSV('./testdataconfig.properties/credentials.csv');
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await gmailLogin(page, credentials.username, credentials.password);
    // Add further actions or assertions here
    // await browser.close();
})();
