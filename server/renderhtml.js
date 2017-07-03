import React from 'react';
import ReactServer from 'react-dom/server';

export default function renderhtml(stringifyHTML, initialState) {
  return `<!doctype html>${ReactServer.renderToStaticMarkup(
    <html>
      <head>
        <title>server side rendering</title>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: stringifyHTML }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(initialState)};` }}></script>
        <script src="/scripts/bundle.js"></script>
      </body>
    </html>
  )}`;
}
