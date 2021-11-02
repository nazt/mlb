"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
exports.command = 'get <address>';
exports.desc = '';
const Conf = require('conf');
const config = new Conf();
const builder = (yargs) => yargs
    .options({
    headless: { type: 'boolean' },
})
    .positional('address', { type: 'string', demandOption: true });
exports.builder = builder;
const handler = (argv) => {
    const { address, headless } = argv;
    console.log(address, headless);
    const playwright = require('playwright');
    (async () => {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({
                headless: headless || false
            });
            const context = await browser.newContext();
            const page = await context.newPage();
            page.on('console', (msg) => console.log(msg.text()));
            await page.goto(address);
            // setInterval(async () => {
            //     await page.screenshot({ path: `gl-${browserType}.png` });
            // }, 1000)
            // await browser.close();
        }
    })();
};
exports.handler = handler;
