import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import Helmet from 'react-helmet';

import Sidebar from '../components/Sidebar';

const API = 'http://placernautas.com:3005/api/';

const loMasLeido = () => {
  const params = {
    filter: {
      order: 'visitas DESC',
      limit: 5
    }
  }
  return axios.get(API + 'articulos', {params})
}

const cargarNotaAutor = () => {
  const params = {
    filter: {
      where: {
        esNotaAutor: true,
      },
      order: 'fecha DESC',
      limit: 5
    }
  }
  return axios.get(API + 'articulos', {params})
}

class Categoria extends React.Component {
  // This works similarly to Next.js's `getInitialProps`
  static getInitialData({ match, req, res }) {
    const params = {
      filter: {
        where: { sidebar: true },
        order: ['posicionSidebar ASC', 'fecha DESC'],
        limit: 6
      }    
    }
    
    return new Promise((resolve, reject) => {
     axios.get('http://placernautas.com:3005/api/articulos', {params: {filter: {where: {subCategoriaId: match.params.subCategoriaId}}}} )
      .then((articulos) => {
        axios.get('http://placernautas.com:3005/api/articulos', {params})
          .then(notas => {
            const params = {
              filter: {
                order: 'visitas DESC',
                limit: 5
              }
            }
            axios.get(API + 'articulos', {params})
              .then(leidas => {
                cargarNotaAutor()
                  .then(autores => {
                    resolve({
                      articulos: articulos.data,
                      sidebar: notas.data,
                      leidas: leidas.data,
                      autores: autores.data
                    })
                  })
              })
              .catch(error => {
                console.log(error)
                reject(error)
              })
          })
      })
      .catch((error) => {
        reject({
          error: error
        })
      })
    });
  }

  render() {
    const { isLoading, articulos, sidebar, leidas, autores, error } = this.props;
    return (
        <div className="div-block-27">
        <div className="w-row">
          <div className="column-5 w-col w-col-9 w-col-tiny-tiny-stack">
            <div className="conttitsecc">
              <div className="titulosecciones">Gastronomía | Productos</div>
              <div className="div-block-23"></div>
            </div>
            <div className="_2columnas w-row">
              <div className="column-8 w-col w-col-6">
                <div className="notahome chica left">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div><a href="nota2.html" className="sobrenotahome w-inline-block"></a>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
              <div className="column-9 w-col w-col-6">
                <div className="notahome chica right movil">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
            </div>
            <div className="_2columnas w-row">
              <div className="column-8 w-col w-col-6">
                <div className="notahome chica left">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
              <div className="column-9 w-col w-col-6">
                <div className="notahome chica right movil">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
            </div>
            <div className="_2columnas w-row">
              <div className="column-8 w-col w-col-6">
                <div className="notahome chica left">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
              <div className="column-9 w-col w-col-6">
                <div className="notahome chica right movil">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
            </div>
            <div className="_2columnas w-row">
              <div className="column-8 w-col w-col-6">
                <div className="notahome chica left">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
              <div className="column-9 w-col w-col-6">
                <div className="notahome chica right movil">
                  <div className="headernotahome">
                    <div className="fechanotahome">23 de Abril de 2018</div>
                  </div>
                  <div className="sobrenotahome"></div>
                  <div className="subheadernotahome w-clearfix">
                    <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
                  <div className="wrapperfotonotahome">
                    <div className="pienotahome">
                      <div className="titulonotahome small">La pasta italiana</div>
                      <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                      <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                    </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
                </div>
              </div>
            </div>
          </div>
          <div className="column-18 w-clearfix w-col w-col-3 w-col-tiny-tiny-stack">
            <Sidebar notas={sidebar} leidas={leidas} autores={autores}/>
          </div>
        </div>
      </div>

    );
  }
}

export default withSSR(Categoria);
