import { StaticRouter, matchPath } from 'react-router-dom';

import App from './App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import routes from './routes';

import axios from 'axios';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

const getCategories = () => axios.get('http://200.58.96.175:3005/api/categoria');

// console.log(process.env.RAZZLE_PUBLIC_DIR);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // This data fetching technique came from a gist by @ryanflorence
    // @see https://gist.github.com/ryanflorence/efbe562332d4f1cc9331202669763741

    // First we iterate through our top level routes
    // looking for matches against the current url.
    const matches = routes.map((route, index) => {
      const match = matchPath(req.url, route.path, route);
      // We then look for static getInitialData function on each top level component
      if (match) {
        // console.log('MATCH', route, match)
        const obj = {
          route,
          match,
          promise: route.component.getInitialData
            ? route.component.getInitialData({ match, req, res })
            : Promise.resolve(null),
        };
        return obj;
      }
      return null;
    });

    if (matches.length === 0) {
      res.status(404).send('Not Found');
    }

    // Now we pull out all the promises we found into an array.
    let promises = matches.map(match => (match ? match.promise : null));
    promises.push(getCategories())
    // console.log('PROMISES', promises)

    // We block rendering until all promises have resolved
    Promise.all(promises)
      .then(data => {
        const context = {};

        const categories = data.pop();
        data.categories = categories.data;
        // Pass our routes and data array to our App component
        const markup = renderToString(
          <StaticRouter context={context} location={req.url}>
            <App routes={routes} initialData={data} />
          </StaticRouter>
        );

        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(context.statusCode || 200).send(
            `<!DOCTYPE html>
                <html lang="">
                <head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta content="Bienvenidos placernautas! Nuestro fin es crear una comunidad de amigos con el fin de compartir conocimientos y experiencias sobre los placeres de la vida." name="description">
                    <meta content="Bebidas, gastronomía y otros placeres | Placernautas" property="og:title">
                    <meta content="Bienvenidos placernautas! Nuestro fin es crear una comunidad de amigos con el fin de compartir conocimientos y experiencias sobre los placeres de la vida." property="og:description">
                    <meta content="https://drive.google.com/open?id=1FYn7OGC1GXCBAckgFSo6VGaUs47b8Xfh" property="og:image">
                    <meta content="summary" name="twitter:card">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta content="Webflow" name="generator">
                    <link href="/css/normalize.css" rel="stylesheet" type="text/css">
                    <link href="/css/webflow.css" rel="stylesheet" type="text/css">
                    <link href="/css/placernautas.webflow.css" rel="stylesheet" type="text/css">
                    ${assets.client.css
                      ? `<link rel="stylesheet" href="${assets.client.css}">`
                      : ''}
                      
                    <script src="${assets.client.js}" defer></script>
                    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js" type="text/javascript"></script>
                    <script type="text/javascript">WebFont.load({  google: {    families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic","Merriweather:300,300italic,400,400italic,700,700italic,900,900italic","Bitter:400,700,400italic","Droid Serif:400,400italic,700,700italic","Alegreya:regular,500,700,800,900"]  }});</script>
                    <!-- [if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js" type="text/javascript"></script><![endif] -->
                    <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
                    <link href="/images/favicon2.png" rel="shortcut icon" type="image/x-icon">
                    <link href="https://daks2k3a4ib2z.cloudfront.net/img/webclip.png" rel="apple-touch-icon">
                    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=5af98a958ee14d0011069a0c&product=sticky-share-buttons" async="async"></script>
                </head>
                <body class="body">
                  <div class="share">
                    <div class="html-embed w-embed w-script">
                      <!--  AddToAny BEGIN  -->
                      <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                        <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                        <a class="a2a_button_facebook"></a>
                        <a class="a2a_button_twitter"></a>
                        <a class="a2a_button_whatsapp"></a>
                        <a class="a2a_button_email"></a>
                      </div>
                      <script>
                        var a2a_config = a2a_config || {};
                        a2a_config.locale = "es-AR";
                        a2a_config.num_services = 4;
                      </script>
                      <script async="" src="https://static.addtoany.com/menu/page.js"></script>
                      <!--  AddToAny END  -->
                    </div>
                  </div>    
                  <div id="root">${markup}</div>
                  <script>window._INITIAL_DATA_ = ${JSON.stringify(data)};</script>
                  <script src="/js/jquery.js" type="text/javascript"></script>
                  <script src="/js/webflow.js" type="text/javascript"></script>
                  <script>
                  </script>
                </body>
            </html>`
          )}
      })
      .catch(error => {
        // console.log(error);
        res.status(500).json({ error: error.message, stack: error.stack });
      });
  });

export default server;
