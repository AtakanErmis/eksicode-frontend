import App from './App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Ekşicode</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
         <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        />
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="https://cdn.rawgit.com/konpa/devicon/df6431e323547add1b4cf45992913f15286456d3/devicon.min.css"
        />
        ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
        } 
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
