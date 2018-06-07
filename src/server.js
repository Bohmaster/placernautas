import { StaticRouter, matchPath } from 'react-router-dom';

import App from './App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import routes from './routes';
import Helmet from 'react-helmet';

import axios from 'axios';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

const params = {
  filter: {include: 'subCategoria'}
}

const getCategories = () => axios.get('http://200.58.96.175:3005/api/categoria', {params});

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
      console.log('ROUTE', route, index);
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
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        // Pass our routes and data array to our App component
        const markup = renderToString(
          <StaticRouter context={context} location={req.url}>
            <App routes={routes} initialData={data} fullUrl={fullUrl} />
          </StaticRouter>
        );
        const helmet = Helmet.renderStatic();

        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(context.statusCode || 200).send(
            `<!DOCTYPE html>
                <html lang="">
                <head>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta content="summary" name="twitter:card">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta content="Webflow" name="generator">
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
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
                    <style>.brand2 {display: none;}</style>
                    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=5af98a958ee14d0011069a0c&product=sticky-share-buttons" async="async"></script>
                </head>
                <body class="body">
                <div id="fb-root"></div>
                <script>(function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = 'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v3.0&appId=1825849397436654&autoLogAppEvents=1';
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));</script>
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
                  var checked = false;
                  $(window).scroll(function(event) {
                    var header = $('.headerall');
                    var logo   = $('.brand2');

                    console.log(checked, 0);
                    if ($(this).scrollTop() > 300) {
                      console.log('mayor')
                      if (!checked) {
                        console.log(checked, 1, 'PIJA')
                        checked = true;
                        header.animate({
                          top: "-=100"
                        }, 500, function(){
                          console.log(checked, 2)
                        })
                        logo.css("display", "inline-block");
                      } else {
                        console.log(checked, 3);
                      }
                    } else if ($(this).scrollTop() < 300) {
                      if (checked) {
                        checked = false;
                        logo.css("display", "none");
                        header.animate({
                          top: "+=100"
                        }, 500, function(){
                          console.log(checked, 2)
                        })
                      }
                    }
                  });
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

server.get('/admin', (req, res) =>{
	res.redirect('http://placernautas.com:3005/admin');
});

server.listen(3010);

export default server;
