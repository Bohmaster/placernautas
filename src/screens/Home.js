import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe';
import Helmet from 'react-helmet';
import Sidebar from '../components/Sidebar';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

const API = 'http://placernautas.com:3005/api/';

console.log();

const getCategories = () => {
  return axios.get(API + 'categoria')
}

const getArticles = () => {
  return axios.get(API + 'articulos')
}

const loMasLeido = () => {
  const params = {
    filter: {
      order: 'visitas DESC',
      limit: 5
    }
  }
  return axios.get(API + 'articulos', {params})
}

const cargarDestacado = () => {
  const params = {
    filter: {
      where: {
        esDestacado: true,
      },
      order: 'fecha DESC',
      limit: 1
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

const llenarHome = (where, limit) => {
  const params = {
    filter: {
      where,
      order: 'fecha DESC',
      limit: limit
    }    
  }
  console.log(params);
  return axios.get(API + 'articulos', {params})
}

const llenarSidebar = () => {
  const params = {
    filter: {
      where: { sidebar: true },
      order: ['posicionSidebar ASC', 'fecha DESC'],
      limit: 6
    }    
  }
  console.log(params);
  return axios.get(API + 'articulos', {params})
}

class Home extends React.Component {
  // This works similarly to Next.js's `getInitialProps`
  static getInitialData({ match, req, res }) {
    return new Promise((resolve, reject) => {
      axios.all([
        cargarDestacado(),
        llenarHome({esNovedad: true}, 2),
        llenarHome({esNotaAutor: true}, 2),
        llenarHome({esEvento: true}, 2),
        llenarHome({esVideoDestacado: true}, 5),
        llenarSidebar(),
        loMasLeido(),
        cargarNotaAutor()
      ])
        .then(axios.spread((destacado, novedades, notas, eventos, videos, sidebar, leidas, autores) => {
          // console.log(destacado);
          resolve({
            destacado: destacado.data[0],
            novedades: novedades.data,
            notas: notas.data,
            eventos: eventos.data,
            videos: videos.data,
            sidebar: sidebar.data,
            leidas: leidas.data,
            autores: autores.data,
            currentRoute: match.pathName
          })
        }))
    })
  }

  click = () => {
  }

  render() {
    const { isLoading, fullUrl,destacado, novedades, notas, eventos, videos, sidebar, leidas, autores, error } = this.props;
    return (
      <div>
        <Helmet
            defaultTitle="Admin"
            >
                <title>Bebidas, gastronomía y otros placeres | Placernautas</title>
        </Helmet>
        <div data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video w-background-video w-background-video-atom">
          <div styles={{position: 'relative'}}>
          <div className="div-block-12">
              <h1 className="heading-4">La comunidad de los navegantes del placer</h1>
          </div>

          <Video autoPlay loop muted
              styles={{width: '100%'}}
              poster="http://sourceposter.jpg"
              onCanPlayThrough={() => {
                  // Do stuff
              }}>
              <source src="videos/placernautasLento-transcode.webm" type="video/webm" />
          </Video>
          </div>
        <div className="div-block-3">
          <div className="busqueda celu">
            <div className="div-block-11">Buscar...</div><img src="images/cheffBuscar.png" width="56" className="image-9"></img></div>
          <div className="div-block-13">
            
           
          </div>
        </div>
      </div>
        <div className="section-4">
          <img src="images/copaWine.png" srcSet="images/copaWine-p-500.png 500w, images/copaWine.png 626w" sizes="100vw" className="image-11 der"></img>
          <img src="images/copaWine.png" srcSet="images/copaWine-p-500.png 500w, images/copaWine.png 626w" sizes="100vw" className="image-11"></img>
          <div className="div-block-18">
            <div className="div-block-17">
              <p className="paragraph-2">Bienvenidos placernautas! <br></br>Estás en la comunidad de los navegantes del placer para compartir conocimientos y experiencias para el buen vivir.</p>
            </div><a href="contacto.html" className="botonctactoinicio w-button">Contactanos</a></div>
        </div>
        <div className="div-block-19"></div>
        <div className="publis cuerpo">
          <div className="logopubli"><img src="images/bodegas.png"></img></div>
          <div className="logopubli"><img src="images/chandon2.png"></img></div>
          <div className="logopubli"><img src="images/luigi.png"></img></div>
          <div className="logopubli"><img src="images/sal.png"></img></div>
          <div className="logopubli"><img src="images/vip.png"></img></div>
        </div>
        <div className="divpagina">
          <div className="row-2 w-row">
            <div className="column-3 w-col w-col-9 w-col-small-small-stack">
              <div className="destacado">
                <div className="conttitsecc">
                  <div className="titulosecciones">Destacado</div>
                  <div className="div-block-23"></div>
                </div>
                <Link className="noStyle" to={'/articulo/' + destacado.id}>
                  <div className="notahome destaca">
                    <div className="headernotahome w-clearfix">
                      <div className="categorianotahome">{destacado.categoria.nombre} - {destacado.subCategoria.nombre}</div>
                      <div className="fechanotahome">{new Date(destacado.fecha).toLocaleDateString()}</div>
                    </div>
                    <div data-w-id="88a275c2-df0e-7697-0fc4-6c5d4497cf5c" className="sobrenotahome"></div>
                    <div className="subheadernotahome w-clearfix">
                      <div className="autornotahome">Por {destacado.autor.nombre} {destacado.autor.apellido}</div><img src={'http://placernautas.com:3005/api/containers/images/download/' + destacado.autor.portada} className="fotoautornotahome"></img></div>
                    <div className="wrapperfotonotahome"><img src={'http://placernautas.com:3005/api/containers/images/download/' + destacado.portada} className="imgnotahome destacado"></img>
                      <div className="pienotahome">
                        <div className="titulonotahome">{destacado.titulo}</div>
                        <div className="subtitulonotahome">{destacado.subtitulo}</div>
                      </div>
                    </div>
                    <p data-w-id="8f185ff1-66d3-9fe6-9b10-d7d725d7a063" className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                  </div>
                </Link>
                <div className="publis cuerpo chica">
                  <div className="logopubli pequea"><img src="images/bodegas.png"></img></div>
                  <div className="logopubli"><img src="images/chandon2.png"></img></div>
                  <div className="logopubli"><img src="images/luigi.png"></img></div>
                  <div className="logopubli"><img src="images/sal.png"></img></div>
                  <div className="logopubli"><img src="images/vip.png"></img></div>
                </div>
              </div>
              <div className="novedades" onClick={this.click}>
                <div className="conttitsecc">
                  <div className="titulosecciones">Novedades</div>
                  <div className="div-block-23"></div>
                </div>
                <div className="_2columnas w-row">
                <Link className="noStyle" to={'/articulo/' + novedades[0].id}>
                  <div className="column-8 w-col w-col-6">
                    <div className="notahome chica left">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">{novedades[0].categoria.nombre}</div>
                        <div className="fechanotahome">{new Date(novedades[0].fecha).toLocaleDateString()}</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por {novedades[0].autor.nombre} {novedades[0].autor.apellido}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">{novedades[0].titulo}</div>
                          <div className="subtitulonotahome small">{novedades[0].subtitulo}</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + novedades[0].portada} className="imgnotahome chica"></img></div>
                    </div>
                  </div>
                  </Link>
                  <Link className="noStyle" to={'/articulo/' + novedades[1].id}>
                    <div className="column-9 w-col w-col-6">
                      <div className="notahome chica right movil">
                        <div className="headernotahome w-clearfix">
                          <div className="categorianotahome phone">{novedades[1].categoria.nombre}</div>
                          <div className="fechanotahome">{new Date(novedades[1].fecha).toLocaleDateString()}</div>
                        </div>
                        <div className="sobrenotahome"></div>
                        <div className="subheadernotahome w-clearfix">
                          <div className="autornotahome">Por {novedades[1].autor.nombre} {novedades[1].autor.apellido}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                        <div className="wrapperfotonotahome">
                          <div className="pienotahome">
                          <div className="titulonotahome small">{novedades[1].titulo}</div>
                            <div className="subtitulonotahome small">{novedades[1].subtitulo}</div>
                            <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                          </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + novedades[1].portada} className="imgnotahome chica"></img></div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="publis cuerpo">
                  <div className="logopubli"><img src="images/bodegas.png"></img></div>
                  <div className="logopubli"><img src="images/chandon2.png"></img></div>
                  <div className="logopubli"><img src="images/luigi.png"></img></div>
                  <div className="logopubli"><img src="images/sal.png"></img></div>
                  <div className="logopubli"><img src="images/vip.png"></img></div>
                </div>
              </div>
              <div className="notasdeautor">
                <div className="conttitsecc">
                  <div className="titulosecciones">Notas de autor</div>
                  <div className="div-block-23"></div>
                </div>
                <div className="_2columnas w-row">
                <Link className="noStyle" to={'/articulo/' + notas[0].id}>
                  <div className="column-8 w-col w-col-6">
                    <div className="notahome chica left">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">{notas[0].categoria.nombre}</div>
                        <div className="fechanotahome">{new Date(notas[0].fecha).toLocaleDateString()}</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por {notas[0].autor.nombre}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">{notas[0].titulo}</div>
                          <div className="subtitulonotahome small">{notas[0].subtitulo}</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + notas[0].portada} className="imgnotahome chica"></img></div>
                    </div>
                  </div>
                  </Link>
                  <Link className="noStyle" to={'/articulo/' + notas[1].id}>
                    <div className="column-9 w-col w-col-6">
                      <div className="notahome chica right movil">
                        <div className="headernotahome w-clearfix">
                          <div className="categorianotahome phone">{notas[1].categoria.nombre}</div>
                          <div className="fechanotahome">{new Date(notas[0].fecha).toLocaleDateString()}</div>
                        </div>
                        <div className="sobrenotahome"></div>
                        <div className="subheadernotahome w-clearfix">
                          <div className="autornotahome">Por {notas[1].autor.nombre}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                        <div className="wrapperfotonotahome">
                          <div className="pienotahome">
                          <div className="titulonotahome small">{notas[1].titulo}</div>
                            <div className="subtitulonotahome small">{notas[1].subtitulo}</div>
                            <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                          </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + notas[1].portada} className="imgnotahome chica"></img></div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="publis cuerpo">
                  <div className="logopubli"><img src="images/bodegas.png"></img></div>
                  <div className="logopubli"><img src="images/chandon2.png"></img></div>
                  <div className="logopubli"><img src="images/luigi.png"></img></div>
                  <div className="logopubli"><img src="images/sal.png"></img></div>
                  <div className="logopubli"><img src="images/vip.png"></img></div>
                </div>
              </div>
              <div className="eventos">
                <div className="conttitsecc">
                  <div className="titulosecciones">Eventos</div>
                  <div className="div-block-23"></div>
                </div>
                <div className="_2columnas w-row">
                <Link className="noStyle" to={'/articulo/' + eventos[0].id}>
                  <div className="column-8 w-col w-col-6">
                    <div className="notahome chica left">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">{eventos[0].categoria.nombre}</div>
                        <div className="fechanotahome">{new Date(eventos[0].fecha).toLocaleDateString()}</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por {eventos[0].autor.nombre}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">{eventos[0].titulo}</div>
                          <div className="subtitulonotahome small">{eventos[0].subtitulo}</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + eventos[0].portada} className="imgnotahome chica"></img></div>
                    </div>
                  </div>
                  </Link>
                  <Link className="noStyle" to={'/articulo/' + eventos[1].id}>
                    <div className="column-9 w-col w-col-6">
                      <div className="notahome chica right movil">
                        <div className="headernotahome w-clearfix">
                          <div className="categorianotahome phone">{eventos[1].categoria.nombre}</div>
                          <div className="fechanotahome">{new Date(eventos[1].fecha).toLocaleDateString()}</div>
                        </div>
                        <div className="sobrenotahome"></div>
                        <div className="subheadernotahome w-clearfix">
                          <div className="autornotahome">Por {eventos[1].autor.nombre}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                        <div className="wrapperfotonotahome">
                          <div className="pienotahome">
                          <div className="titulonotahome small">{eventos[1].titulo}</div>
                            <div className="subtitulonotahome small">{eventos[1].subtitulo}</div>
                            <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                          </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + eventos[1].portada} className="imgnotahome chica"></img></div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="notasdeautor">
                <div className="publis cuerpo">
                  <div className="logopubli"><img src="images/bodegas.png"></img></div>
                  <div className="logopubli"><img src="images/chandon2.png"></img></div>
                  <div className="logopubli"><img src="images/luigi.png"></img></div>
                  <div className="logopubli"><img src="images/sal.png"></img></div>
                  <div className="logopubli"><img src="images/vip.png"></img></div>
                </div>
              </div>
              <div className="videodestacado">
          <div className="conttitsecc">
            <div className="titulosecciones">Multimedia</div>
            <div className="div-block-23"></div>
          </div>
          <div className="row-7 w-row">
          <Link className="noStyle" to={'/articulo/' + videos[0].id}>
            <div className="column-16 w-col w-col-6 w-col-medium-6 w-col-small-6">
              <div className="divmultiinicio">
                <div className="sobrevideo"></div>
                <div styles="padding-top:56.17021276595745%" id="w-node-206dcb90-eec5-dabb-09c1-a9a8cf7e015c" className="video-2 grande w-video w-embed">
                  <Iframe url={videos[0].videoUrl} className="embedly-embed" height="300" position="relative"></Iframe>
                </div> 
              </div>
            </div>
          </Link>
          <Link className="noStyle" to={'/articulo/' + videos[1].id}>
            <div className="column-15 w-col w-col-6 w-col-medium-6 w-col-small-6">
              <div className="divmultiinicio w-clearfix">
                <div className="sobrevideo der"></div>
                <div styles="padding-top:56.17021276595745%" id="w-node-1394ca36-23f0-b086-2c5f-92fcbe098abe" className="video-2 der grande w-video w-embed">
                <Iframe url={videos[1].videoUrl} className="embedly-embed" height="300" position="relative"></Iframe>
                </div>
              </div>
            </div>
          </Link>
          </div>
         
          <div className="row-9 w-row">
          <Link className="noStyle" to={'/articulo/' + videos[2].id}>
            <div className="w-col w-col-4 w-col-small-4">
              <div className="divmultiinicio">
                <div className="sobrevideo"></div>
                <div styles="padding-top:56.17021276595745%" id="w-node-1a515715-767b-43a8-0c02-93165506e96c" className="video-2 w-video w-embed">
                <Iframe url={videos[2].videoUrl} className="embedly-embed" height="250" position="relative"></Iframe>
                </div>
              </div>
            </div>
          </Link>
          <Link className="noStyle" to={'/articulo/' + videos[3].id}>
            <div className="w-col w-col-4 w-col-small-4">
              <div className="divmultiinicio centro">
                <div styles="padding-top:56.17021276595745%" id="w-node-2c5adb49-a8b0-ba54-c46f-c1cb14165851" className="video-2 med w-video w-embed">
                <Iframe url={videos[3].videoUrl} className="embedly-embed" height="250" position="relative"></Iframe>
                </div>
              </div>
              <div className="divmultiinicio">
                <div className="sobrevideo"></div>
              </div>
            </div>
            </Link>
            <Link className="noStyle" to={'/articulo/' + videos[4].id}>
            <div className="w-col w-col-4 w-col-small-4">
              <div className="divmultiinicio w-clearfix">
                <div className="sobrevideo der"></div>
                <div styles="padding-top:56.17021276595745%" id="w-node-ebb6287d-4f8f-16f4-c511-9749a0f6301f" className="video-2 der w-video w-embed">
                <Iframe url={videos[4].videoUrl} className="embedly-embed" height="250" position="relative"></Iframe>
                </div>
              </div>
            </div>
            </Link>
          </div>
          <div className="publis cuerpo">
            <div className="logopubli"><img src="images/bodegas.png"></img></div>
            <div className="logopubli"><img src="images/chandon2.png"></img></div>
            <div className="logopubli"><img src="images/luigi.png"></img></div>
            <div className="logopubli"><img src="images/sal.png"></img></div>
            <div className="logopubli"><img src="images/vip.png"></img></div>
          </div>
          <div className="text-block-6">Formá parte de nuestra comunidad. Publicá en Placernautas.</div>
        </div>
              <div className="div-block-33">
                <p className="paragraph-3">Si tenés algún material interesante y original, envialo a <a href="mailto:info@placernautas.com" className="link-2">info@placernautas.com</a>. Si cumple con los requisitos lo publicaremos citando a su autor.</p><img src="images/mandarMail.png"></img></div>
            </div>
            <div className="column-4 w-clearfix w-col w-col-3 w-col-small-small-stack">
              <Sidebar notas={sidebar} leidas={leidas} autores={autores}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSSR(Home);
