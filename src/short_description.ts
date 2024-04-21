// const puppeteer = require('puppeteer');

// const url = 'https://www.youtube.com/watch?v=jF5QiD7uxdc';

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto(url);

//   // Wait for the description to load
//   await page.waitForSelector('meta[name="description"]');

//   const descriptionMeta = await page.evaluate(() => {
//     const metaTag = document.querySelector('meta[name="description"]');
//     return metaTag ? metaTag.getAttribute('content') : null;
//   });

//   if (descriptionMeta) {
//     console.log({
//       "description": descriptionMeta
//     });
//   } else {
//     console.log("<meta> description not found");
//   }

//   await browser.close();
// })();
