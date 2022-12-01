import {readFileSync} from 'fs';
import {sanitizeHtml} from './sanitizer';
import {ParsedRequest} from './types';

const twemoji = require('twemoji');
const twOptions = {folder: 'svg', ext: '.svg'};
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');
const nsjpBold = readFileSync(`${__dirname}/../_fonts/Noto_Sans_JP/NotoSansJP-Bold.woff2`).toString('base64');
const nsjpMedium = readFileSync(`${__dirname}/../_fonts/Noto_Sans_JP/NotoSansJP-Medium.woff2`).toString('base64');
const nsjpLight = readFileSync(`${__dirname}/../_fonts/Noto_Sans_JP/NotoSansJP-Light.woff2`).toString('base64');

const ogBgB64 = readFileSync(`${__dirname}/../_images/og-bg.png`).toString('base64');
const logoB64 = readFileSync(`${__dirname}/../_images/logo.png`).toString('base64');

function getCss(theme: string, fontSize: string) {
    let foreground = 'black';

    if (theme === 'dark') {
        foreground = 'white';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
    }

    @font-face {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 700;
        src: url(data:font/otf;charset=utf-8;base64,${nsjpBold}) format('woff2');
    }

    @font-face {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 500;
        src: url(data:font/otf;charset=utf-8;base64,${nsjpMedium}) format('woff2');
    }

    @font-face {
        font-family: 'Noto Sans JP';
        font-style: normal;
        font-weight: 300;
        src: url(data:font/otf;charset=utf-8;base64,${nsjpLight}) format('woff2');
    }

    body {
        font-family: 'Noto Sans JP', 'Inter', sans-serif;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        letter-spacing: 2px;
    }
    
    .container {
         width: 100vw;
         height: 100vh;
         background-image: url(data:image/png;base64,${ogBgB64});
         background-repeat: no-repeat;
         position: relative;
         z-index: 0;
    }
    .container::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: inherit;
        filter: blur(8px);
        margin: -10px;
        z-index: -1;
    }
    
    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
        margin-bottom: 30px;
    }

    .logo {
        margin: 0 75px;
    }

    .spacer {
        margin-top: 100px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .title {
        font-size: ${sanitizeHtml(fontSize)};
        font-weight: 700;
        font-style: normal;
        color: ${foreground};
        text-shadow: 0 0 10px #fff;
    }
    
    .sub-title {
        font-size: 25px;
        font-weight: 500;
        font-style: normal;
        color: ${foreground};
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const {text, theme, fontSize} = parsedReq;
    return `<!DOCTYPE html>
<html lang="ja">
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div class="container">
            <div class="spacer">
                <div class="logo-wrapper">
                    <img class="logo" alt="CyberAgent ca-srg.dev" src="data:image/png;base64,${logoB64}" width="125" height="125" />
                </div>
                <div class="title">${emojify(sanitizeHtml(text))}</div>
                <p>- - -</p>
                <div class="sub-title">
                    <p>CAグループの信頼性を横断的に向上させる</p>
                    <p style="font-weight: 700">CyberAgent SRG</p>
                </div>
            </div>
        </div>
    </body>
</html>`;
}