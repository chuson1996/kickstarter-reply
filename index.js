const puppeteer = require('puppeteer');
const fs = require('fs');
const password = fs.readFileSync('./pass').toString();
const email = fs.readFileSync('./email').toString();

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.kickstarter.com/login');
  // await page.screenshot({path: 'example.png'});

  await page.type('input[type="email"]', email);
  await page.type('input[type="password"]', password);
  await page.click('input[type="submit"]');

  // await page.click('button.js-user-menu-btn');
  await page.goto('https://www.kickstarter.com/projects/1987199519/rens-the-totally-waterproof-sneaker-made-from-coffee/backers/report/index')

  await page.click('tr.backer_row:first-child');

  await page.waitForSelector('.info_panel.panel', {
    visible: true
  })

  const content = await page.$eval('.info_panel.panel', (node) => node.innerText);
  // console.log(content);
  const country = content.match(/Shipping: .+/g)[0].split(' ')[1];
  console.log(country);



  // await browser.close();
})();