import './App.css';

import NavLink from 'react-router-dom/NavLink';
import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

const App = ({ routes, initialData}) => {
  return routes
    ? <div className="App">
      <div data-w-id="bb5b9569-8261-d4b7-1920-0714fa22ac08" className="headerall">
        <div className="header">
          <div id="audio" data-w-id="bb5b9569-8261-d4b7-1920-0714fa22ac0a" className="divaudio">
            <img src="/images/audioOn.png" data-w-id="bb5b9569-8261-d4b7-1920-0714fa22ac0b" className="audioon"></img>
            <img src="/images/audioOff.png" data-w-id="bb5b9569-8261-d4b7-1920-0714fa22ac0c" className="audiooff"></img>
            <div className="text-block-3">AUDIO</div>
          </div><a href="#" className="brand w-nav-brand"><img src="/images/logo3_1.png" width="293" className="image-6"></img></a>
          <div className="busqueda">
            <div className="div-block-11">Buscar...</div><img src="/images/cheffBuscar.png" width="56" className="image-9"></img></div>
          <div className="div-block">
            <h1 className="heading-2">Donde de juntan los placeres></h1>
          </div>
        </div>
        <div data-collapse="medium" data-animation="default" data-duration="400" className="navbar w-nav"><a href="#" className="brand2 w-inline-block"><img src="/images/logo3_1.png" data-w-id="bb5b9569-8261-d4b7-1920-0714fa22ac1c"></img></a><a href="#" className="brand2 movil w-inline-block"><img src="/images/logo3_1.png"></img></a>
          <nav role="navigation" className="nav-menu w-nav-menu"><a href="index.html" className="navlink w-nav-link w--current">inicio</a>
            {
              initialData.categories.map(categoria => {
                return (
                  <div data-hover="1" data-delay="0" className="navlink w-dropdown">
                    <div className="dropdown-toggle w-dropdown-toggle">
                      <div className="text-block">{categoria.nombre}</div>
                    </div>
                    <nav className="dropdownlist w-dropdown-list">
                      {categoria.subCategoria.map(sub => {
                        return (
                          <a href="#" className="dropdownlink w-dropdown-link">{sub.nombre}</a>
                        )
                      })}
                    </nav>  
                  </div>
                )
              })
            }
            <a href="#" className="navlink w-nav-link">multimedia</a>
            <a href="#" className="navlink w-nav-link">COFRADÍAS</a>
            <a href="#" className="navlink w-nav-link">BLOG</a>
            <a href="contacto.html" className="navlink w-nav-link">Contacto</a></nav>
          <div className="social"><a href="https://www.facebook.com/Placernautas-194635633972323/?view_public_for=194635633972323" target="_blank" className="linksocial w-inline-block"><img src="/images/face.png"></img></a><a href="#" className="linksocial w-inline-block"><img src="/images/whatt.png"></img></a><a href="#" className="linksocial w-inline-block"><img src="/images/youtube.png"></img></a></div>
          <div className="menu-button w-nav-button"><img src="/images/menuIcon.png" className="image-15"></img></div>
        </div>
      </div>
      {/* <nav>
          {routes.map((route, index) =>
            <NavLink
              style={{ marginRight: '1rem', color: '#0af' }}
              activeStyle={{ fontWeight: 800, color: '#000' }}
              key={`nav-${index}`}
              exact={index === 0}
              to={route.path}
            >
              {route.name} hy
            </NavLink>
          )}
        </nav> */}
        <Switch>
          {routes.map((route, index) => {
            // pass in the initialData from the server or window.DATA for this
            // specific route
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props =>
                  React.createElement(route.component, {
                    ...props,
                    initialData: initialData[index] || null,
                  })}
              />
            );
          })}
        </Switch>
        <div className="footer2">
            <div className="row-4 w-row">
              <div className="column-10 w-col w-col-4">
                <div>
                  <div className="txtfooter borravino">Placernautas</div>
                  <div className="txtfooter">La comunidad de los navegantes del placer.</div>
                  <div className="txtfooter">2018 | Todos los derechos reservados.</div>
                  <p className="parrderechos">Prohibida la reproducción total y/o parcial de esta publicación por cualquier medio o procedimiento sin para ello contar con la autorización previa, expresa y por escrito del editor. Toda forma de utilización no autorizada será perseguida con lo establecido en la Ley Federal del Derecho de Autor. El contenido de los avisos publicitarios y de las notas no es responsabilidad del editor ni expresa sus opiniones.</p>
                </div>
              </div>
              <div className="column-12 w-col w-col-4"><img src="/images/donna.png" srcSet="/images/donna-p-500.png 500w, /images/donna.png 600w" sizes="(max-width: 479px) 96vw, (max-width: 767px) 200px, (max-width: 991px) 29vw, 279px" className="image-13"></img></div>
              <div className="w-col w-col-4">
                <div className="div-block-25">
                  <div className="txtfooter">CONTACTO</div><a href="mailto:info@placernautas.com" className="linkfooter">info@placernautas.com</a></div>
              </div>
            </div>
            <div className="row-6 w-row">
              <div className="column-13 w-col w-col-5">
                <div className="nosotros">
                  <div data-w-id="7a0d0e24-979c-a30a-c5e1-ec9ea5500018" className="cadauno">
                    <div className="wrappfoto"><img src="/images/moreno1.jpg" className="foto1 el"></img></div>
                    <div className="div-block-28"><a href="#" className="nombre">César Moreno</a>
                      <p className="parrnos">Apasionado por el vino y las bebidas espirituosas. Es docente en la escuela de gastronomía Gato Dumas.</p>
                    </div>
                  </div>
                  <div data-w-id="7a0d0e24-979c-a30a-c5e1-ec9ea5500020" className="cadauno">
                    <div className="wrappfoto"><img src="/images/gus.jpg" className="foto1 yo"></img></div>
                    <div className="div-block-28"><a href="#" className="nombre">Gustavo Trovant</a>
                      <p className="parrnos">Diseñador de sitios web. La cocina y una buena bebida son sus hobbies.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column-17 w-col w-col-3"></div>
              <div className="column-14 w-col w-col-4">
                <div className="div-block-11 foot">Buscar...</div>
              </div>
            </div>
          </div> 
    </div>
    : null;
};

export default App;


