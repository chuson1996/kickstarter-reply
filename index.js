const puppeteer = require('puppeteer');
const fs = require('fs');
const password = fs.readFileSync('./pass');
const email = fs.readFileSync('./email');

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
  await page.waitFor(() => {
    const modalDisplay = document.querySelector('.modal_dialog.backer_info').style.display;
    console.log(modalDisplay);
    return modalDisplay !== 'none';
  });

  const shippingElement = await page.$('.info_panel.panel');
  shippingElement.$eval('*', (node) => console.log(node.innerText));

  // await browser.close();
})();