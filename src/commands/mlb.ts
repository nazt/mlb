import type { Arguments, CommandBuilder } from 'yargs';


export const command: string = 'get <address>';
export const desc: string = '';

const Conf = require('conf');
const config = new Conf();

type Options = {
    address: string;
    headless: boolean | undefined;
};

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .options({
            headless: { type: 'boolean' },
        })
        .positional('address', { type: 'string', demandOption: true });

export const handler = (argv: Arguments<Options>): void => {
    const { address, headless }: Options = argv;
    console.log(address, headless)
    const playwright = require('playwright');

    (async () => {
        for (const browserType of ['chromium']) {
            const browser = await playwright[browserType].launch({
                headless: headless || false
            });

            const context = await browser.newContext();
            const page = await context.newPage();
            page.on('console', (msg: any) => console.log(msg.text()))
            await page.goto(address);

            // setInterval(async () => {
            //     await page.screenshot({ path: `gl-${browserType}.png` });
            // }, 1000)
            // await browser.close();
        }
    })();


};
