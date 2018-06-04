import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://placernautas.com:3005/api/';

console.log();

const getCategories = () => {
  return axios.get(API + 'categoria')
}

const getArticles = () => {
  return axios.get(API + 'articulos')
}

const cargarDestacado = () => {
  const params = {
    filter: {
      where: {
        esDestacado: true,
      },
      order: 'fecha DESC'
    }
  }
  return axios.get(API + 'articulos', {params})
}

class Home extends React.Component {
  // This works similarly to Next.js's `getInitialProps`
  static getInitialData({ match, req, res }) {
    return new Promise((resolve, reject) => {
      axios.all([cargarDestacado(), getArticles()])
        .then(axios.spread((destacado, articles) => {
          // console.log(destacado);
          resolve({
            articles: articles.data,
            destacado: destacado.data[0],
            currentRoute: match.pathName
          })
        }))
    })
  }

  click = () => {
    console.log('ASD');
  }

  render() {
    const { isLoading, articles, destacado, error } = this.props;
    return (
      <div>
        <div data-poster-url="videos/placernautasLento-poster-00001.jpg" data-video-urls="videos/placernautasLento-transcode.webm,videos/placernautasLento-transcode.mp4" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video w-background-video w-background-video-atom"><video autoPlay="true" loop="true" style={{backgroundImage:"url('videos/placernautasLent-poster-00001.jpg')"}} muted="" data-wf-ignore="true"><source src="videos/placernautasLento-transcode.webm" data-wf-ignore="true"></source><source src="videos/placernautasLento-transcode.mp4" data-wf-ignore="true"></source></video>
        <div className="div-block-3">
          <div className="busqueda celu">
            <div className="div-block-11">Buscar...</div><img src="images/cheffBuscar.png" width="56" className="image-9"></img></div>
          <div className="div-block-13">
            <div className="div-block-12">
              <div className="libea"></div><img src="images/logo3_1.png" width="951" className="image-10"></img>
              <div className="libea arriba"></div>
              <p className="paragraph">Si mal no recuerdo, son cinco los motivos para beber: la llegada de un amigo, la sed del momento</p>
            </div>
            <h1 className="heading-4">La comunidad de los navegantes del placer</h1>
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
                <Link to={'/articulo/' + destacado.id}>
                  <div className="notahome destaca">
                    <div className="headernotahome w-clearfix">
                      <div className="categorianotahome">{destacado.categoria.nombre} - {destacado.subCategoria.nombre}</div>
                      <div className="fechanotahome">{destacado.fecha}</div>
                    </div>
                    <div data-w-id="88a275c2-df0e-7697-0fc4-6c5d4497cf5c" className="sobrenotahome"></div>
                    <div className="subheadernotahome w-clearfix">
                      <div className="autornotahome">Por {destacado.autor.nombre} {destacado.autor.apellido}</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
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
                  <div className="column-8 w-col w-col-6">
                    <div className="notahome chica left">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">gastronomìa | productos</div>
                        <div className="fechanotahome">23 de Abril de 2018</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">La pasta italiana</div>
                          <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"></img></div>
                    </div>
                  </div>
                  <div className="column-9 w-col w-col-6">
                    <div className="notahome chica right movil">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome phone">gastronomìa | productos</div>
                        <div className="fechanotahome">23 de Abril de 2018</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">La pasta italiana</div>
                          <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"></img></div>
                    </div>
                  </div>
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
                  <div className="column-8 w-col w-col-6">
                    <div className="notahome chica left">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">gastronomìa | productos</div>
                        <div className="fechanotahome">23 de Abril de 2018</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">La pasta italiana</div>
                          <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"></img></div>
                    </div>
                  </div>
                  <div className="column-9 w-col w-col-6">
                    <div className="notahome chica right">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">gastronomìa | productos</div>
                        <div className="fechanotahome">23 de Abril de 2018</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">La pasta italiana</div>
                          <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"></img></div>
                    </div>
                  </div>
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
                  <div className="column-8 w-col w-col-6">
                    <div className="notahome chica left">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">gastronomìa | productos</div>
                        <div className="fechanotahome">23 de Abril de 2018</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">La pasta italiana</div>
                          <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"></img></div>
                    </div>
                  </div>
                  <div className="column-9 w-col w-col-6">
                    <div className="notahome chica right">
                      <div className="headernotahome w-clearfix">
                        <div className="categorianotahome">gastronomìa | productos</div>
                        <div className="fechanotahome">23 de Abril de 2018</div>
                      </div>
                      <div className="sobrenotahome"></div>
                      <div className="subheadernotahome w-clearfix">
                        <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"></img></div>
                      <div className="wrapperfotonotahome">
                        <div className="pienotahome">
                          <div className="titulonotahome small">La pasta italiana</div>
                          <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
                          <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                        </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"></img></div>
                    </div>
                  </div>
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
                  <div className="column-16 w-col w-col-6 w-col-medium-6 w-col-small-6">
                    <div className="divmultiinicio">
                      <div className="sobrevideo"></div>
                      <div style={{paddingTop:"56.17021276595745%"}} id="w-node-206dcb90-eec5-dabb-09c1-a9a8cf7e015c" className="video-2 grande w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FB6EA9pPRrv4%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DB6EA9pPRrv4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FB6EA9pPRrv4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" frameBorder="0" allowFullScreen=""></iframe></div>
                    </div>
                  </div>
                  <div className="column-15 w-col w-col-6 w-col-medium-6 w-col-small-6">
                    <div className="divmultiinicio w-clearfix">
                      <div className="sobrevideo der"></div>
                      <div style={{paddingTop:"56.17021276595745%"}} id="w-node-1394ca36-23f0-b086-2c5f-92fcbe098abe" className="video-2 der grande w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FB6EA9pPRrv4%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DB6EA9pPRrv4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FB6EA9pPRrv4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" frameBorder="0" allowFullScreen=""></iframe></div>
                    </div>
                  </div>
                </div>
                <div className="row-9 w-row">
                  <div className="w-col w-col-4 w-col-small-4">
                    <div className="divmultiinicio">
                      <div className="sobrevideo"></div>
                      <div style={{paddingTop:"56.17021276595745%"}} id="w-node-1a515715-767b-43a8-0c02-93165506e96c" className="video-2 w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FB6EA9pPRrv4%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DB6EA9pPRrv4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FB6EA9pPRrv4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" frameBorder="0" allowFullScreen=""></iframe></div>
                    </div>
                  </div>
                  <div className="w-col w-col-4 w-col-small-4">
                    <div className="divmultiinicio centro">
                      <div style={{paddingTop:"56.17021276595745%"}} id="w-node-2c5adb49-a8b0-ba54-c46f-c1cb14165851" className="video-2 med w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FvJTXEd5sSls%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DvJTXEd5sSls&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FvJTXEd5sSls%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" frameBorder="0" allowFullScreen=""></iframe></div>
                    </div>
                    <div className="divmultiinicio">
                      <div className="sobrevideo"></div>
                    </div>
                  </div>
                  <div className="w-col w-col-4 w-col-small-4">
                    <div className="divmultiinicio w-clearfix">
                      <div className="sobrevideo der"></div>
                      <div style={{paddingTop:"56.17021276595745%"}} id="w-node-ebb6287d-4f8f-16f4-c511-9749a0f6301f" className="video-2 der w-video w-embed"><iframe className="embedly-embed" src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FB6EA9pPRrv4%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DB6EA9pPRrv4&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FB6EA9pPRrv4%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube" scrolling="no" frameBorder="0" allowFullScreen=""></iframe></div>
                    </div>
                  </div>
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
              <div className="section-2">
                <div className="notasidebar">
                  <div className="conttitsecc">
                    <div className="titulosecciones sb">Arte</div>
                    <div className="div-block-23"></div>
                  </div>
                  <div className="div-block-30">
                    <div className="divfotosidebar"><img src="images/flor_1.jpg" srcSet="images/flor_1-p-500.jpeg 500w, images/flor_1.jpg 600w" sizes="(max-width: 479px) 93vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"></img></div>
                    <div className="pienotasidebar">
                      <div className="titulosidebar">Artistas rosarinos</div>
                      <div className="subtitulosidebar">Obra de Flor Balestra</div>
                    </div>
                  </div>
                </div>
                <div className="publisb"><img src="images/altaGama.jpg" className="image-4"></img></div>
                <div className="notasidebar">
                  <div className="conttitsecc">
                    <div className="titulosecciones sb">Vino del mes</div>
                    <div className="div-block-23"></div>
                  </div>
                  <div className="div-block-30">
                    <div className="divfotosidebar"><img src="images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0.jpg" srcSet="images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0-p-500.jpeg 500w, images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0.jpg 640w" sizes="(max-width: 479px) 93vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"></img></div>
                    <div className="pienotasidebar">
                      <div className="titulosidebar">Quinde rosado</div>
                      <div className="subtitulosidebar">Bodega Peñaflor</div>
                    </div>
                  </div>
                </div>
                <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
                <div className="notasidebar">
                  <div className="conttitsecc">
                    <div className="titulosecciones sb">Restaurante del mes</div>
                    <div className="div-block-23"></div>
                  </div>
                  <div className="div-block-30">
                    <div className="divfotosidebar"><img src="images/t0drku550xwpwz554ynsrh45635454255177667500.jpg" className="imgnotasidebar"></img></div>
                    <div className="pienotasidebar">
                      <div className="titulosidebar">La buena medida</div>
                      <div className="subtitulosidebar">Un clásico rosarino</div>
                    </div>
                  </div>
                </div>
                <div className="publisb"><img src="images/altaGama.jpg" className="image-4"></img></div>
                <div className="notasidebar">
                  <div className="conttitsecc">
                    <div className="titulosecciones sb">Retro</div>
                    <div className="div-block-23"></div>
                  </div>
                  <div className="div-block-30">
                    <div className="divfotosidebar"><img src="images/doñaPetrona.jpg" srcSet="images/doñaPetrona-p-500.jpeg 500w, images/doñaPetrona.jpg 700w" sizes="(max-width: 479px) 93vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"></img></div>
                    <div className="pienotasidebar">
                      <div className="titulosidebar">Doña Petrona</div>
                      <div className="subtitulosidebar">Pionera de la cocina por televisión.</div>
                    </div>
                  </div>
                </div>
                <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
                <div className="notasidebar">
                  <div className="conttitsecc">
                    <div className="titulosecciones sb">La frase</div>
                    <div className="div-block-23"></div>
                  </div>
                  <div className="div-block-30">
                    <div className="divfotosidebar"><img src="images/humphreybogartheadshot.jpg" className="imgnotasidebar"></img></div>
                    <div className="pienotasidebar">
                      <div className="titulosidebar">“El mundo entero tiene más o menos tres vasos de vino de retraso” </div>
                      <div className="subtitulosidebar">Humphrey Bogart</div>
                    </div>
                  </div>
                </div>
                <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
                <div>
                  <div className="conttitsecc">
                    <div className="titulosecciones sb">Lo más leído</div>
                    <div className="div-block-23"></div>
                  </div>
                  <div className="divmasleido">
                    <div className="masleido"><img src="images/copaWine.png" srcSet="images/copaWine-p-500.png 500w, images/copaWine.png 626w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 240px, (max-width: 991px) 23vw, 19vw" className="imgmasleido">{/*<a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a>*/}</img>/div>
                                                                                                                                      <div className="masleido"><img src="images/birra.png" srcSet="images/birra-p-500.png 500w, images/birra-p-800.png 800w, images/birra.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 240px, (max-width: 991px) 23vw, 19vw" className="imgmasleido">{/*<a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a>*/}</img></div>
                      <div className="masleido"><img src="images/gastroFondo.png" srcSet="images/gastroFondo-p-500.png 500w, images/gastroFondo-p-800.png 800w, images/gastroFondo-p-1080.png 1080w, images/gastroFondo.png 1310w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 240px, (max-width: 991px) 23vw, 19vw" className="imgmasleido">{/*<a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a>*/}</img></div>
                      <div className="masleido"><img src="images/cheff.png" srcSet="images/cheff-p-500.png 500w, images/cheff.png 570w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 240px, (max-width: 991px) 23vw, 19vw" className="imgmasleido">{/*<a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a>*/}</img></div>
                      <div className="masleido"><img src="images/champu.jpg" srcSet="images/champu-p-500.jpeg 500w, images/champu.jpg 600w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 240px, (max-width: 991px) 23vw, 19vw" className="imgmasleido">{/*<a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a>*/}</img></div>
                    </div>
                  </div>
                  <div className="colaboran">
                    <div className="conttitsecc">
                      <div className="titulosecciones sb">Colaboran</div>
                      <div className="div-block-23"></div>
                    </div>
                    <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"></img>
                      <div className="div-block-29">
                        <div className="text-block-4">Facundo Lastra pedorreti de Legrand</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
                    </div>
                    <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"></img>
                      <div className="div-block-29">
                        <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
                    </div>
                    <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"></img>
                      <div className="div-block-29">
                        <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
                    </div>
                    <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"></img>
                      <div className="div-block-29">
                        <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse? SE QUEDARÁN O NO</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withSSR(Home);
