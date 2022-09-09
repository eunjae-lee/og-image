import { readFileSync } from "fs";
import { marked } from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const NotoSans = readFileSync(
  `${__dirname}/../_fonts/NotoSansKR-VF-distilled.woff2`
).toString("base64");
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  "base64"
);

function getCss(theme: string, fontSize: string) {
  let background = "white";
  let foreground = "black";
  let radial = "lightgray";

  if (theme === "dark") {
    background = "black";
    foreground = "white";
    radial = "dimgray";
  }

  return `
    @font-face {
        font-family: 'Noto Sans KR Distilled';
        src: url(data:font/woff2;charset=utf-8;base64,${NotoSans}) format('woff2');
    }


    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    ${
      theme === "test"
        ? `
    body {
    }
    `
        : ""
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
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Noto Sans KR Distilled', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

function getNormalHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize, images, widths, heights } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images
                  .map(
                    (img, i) =>
                      getPlusSign(i) + getImage(img, widths[i], heights[i])
                  )
                  .join("")}
            </div>
            <div class="spacer">
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

function getTwitChatHtml(parsedReq: ParsedRequest) {
  const bgColors = [
    "#991b1b",
    "#9a3412",
    "#92400e",
    "#854d0e",
    "#3f6212",
    "#166534",
    "#065f46",
    "#115e59",
    "#155e75",
    "#075985",
    "#1e40af",
    "#3730a3",
    "#5b21b6",
    "#6b21a8",
    "#86198f",
    "#9d174d",
    "#9f1239",
  ];
  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  const { extra } = parsedReq;
  const { lang, picture, full_name, title } = JSON.parse(extra);
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>Parcel Sandbox</title>
      <meta charset="UTF-8" />
  
      <style>
        @font-face {
          font-family: 'Noto Sans KR Distilled';
          src: url(data:font/woff2;charset=utf-8;base64,${NotoSans}) format('woff2');
        }

        @font-face {
          font-family: 'Vera';
          font-style: normal;
          font-weight: normal;
          src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
        }

        * {
          box-sizing: border-box;
          font-family: 'Noto Sans KR Distilled', sans-serif;
        }
        html,
        body {
          margin: 0;
          padding: 0;
        }
        .container {
          width: 2048px;
          height: 1170px;
          padding: 128px;
          background-color: ${bgColor};
          color: white;
          text-shadow: 2px 2px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        .profile {
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .profile img {
          width: 88px;
          height: 88px;
          border-radius: 99999px;
        }
        .profile p {
          font-size: 72px;
          margin: 0;
        }
        .title {
          margin: 64px 0 0 0;
          font-size: 128px;
          line-height: 1.8em;
          font-weight: bold;
          word-break: keep-all;
        }
        .join {
          position: absolute;
          bottom: 128px;
          display: flex;
          justify-content: center;
        }
        .join button {
          font-size: 64px;
          border-radius: 9999px;
          padding: 40px;
          width: 1792px;
          background-color: white;
          font-weight: semibold;
          border-width: 0;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="profile">
          <img
            src="${picture}"
          />
          <p>${full_name}</p>
        </div>
        <p class="title">${title}</p>
        <div class="join"><button>${
          lang === "ko" ? "실시간 대화 참여하기" : "Join Realtime Chat"
        }</button></div>
      </div>
    </body>
  </html>
  `;
}

export function getHtml(parsedReq: ParsedRequest) {
  if (parsedReq.theme === "twitchat") {
    return getTwitChatHtml(parsedReq);
  } else {
    return getNormalHtml(parsedReq);
  }
}

function getImage(src: string, width = "auto", height = "225") {
  return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`;
}

function getPlusSign(i: number) {
  return i === 0 ? "" : '<div class="plus">+</div>';
}
