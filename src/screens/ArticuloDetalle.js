import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import Helmet from 'react-helmet';


class ArticuloDetalle extends React.Component {
  // This works similarly to Next.js's `getInitialProps`
  static getInitialData({ match, req, res }) {
    console.log('MATCH', match);
    return new Promise((resolve, reject) => {
     axios.get('http://placernautas.com:3005/api/articulos/' + match.params.articuloId)
      .then((articulo) => {
        console.log('ARTICULO', articulo)
        resolve({
          articulo: articulo.data
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
    const { isLoading, articulo, error } = this.props;
    return (
      <div className="div-block-27">
        <Helmet
            defaultTitle="Admin"
            >
                <title>{articulo.titulo}</title>
                <meta name="description" content={articulo.cuerpo}></meta>
                <meta content={articulo.titulo} property="og:title"/>
                <meta content={articulo.subtitulo} property="og:description"/>

        </Helmet>
    <div className="w-row">
      <div className="column-5 w-col w-col-9 w-col-tiny-tiny-stack">
        <div className="conttitsecc">
          <div className="titulosecciones">Gastronomía | Productos</div>
          <div className="div-block-23"></div>
        </div>
        <div className="notasrelac">Otros artìculos relacionados</div>
        <div className="w-row">
          <div className="w-col w-col-3 w-col-small-3 w-col-tiny-6">
            <div className="notarelacionada _1"><img src="/images/6a00d8341c85cd53ef01b7c94ea3a0970b.jpg"></img>
              <div className="titnotarelacionada">Espumantes patagónicos</div>
              <div className="subtnotarelacionada">Burbujas del fin del mundo.</div>
            </div>
          </div>
          <div className="w-col w-col-3 w-col-small-3 w-col-tiny-6">
            <div className="notarelacionada _1"><img src="/images/6a00d8341c85cd53ef01b7c94ea3a0970b.jpg"></img>
              <div className="titnotarelacionada">Espumantes patagónicos</div>
              <div className="subtnotarelacionada">Burbujas del fin del mundo.</div>
            </div>
          </div>
          <div className="w-col w-col-3 w-col-small-3 w-col-tiny-6">
            <div className="notarelacionada _1"><img src="/images/6a00d8341c85cd53ef01b7c94ea3a0970b.jpg"></img>
              <div className="titnotarelacionada">Espumantes patagónicos</div>
              <div className="subtnotarelacionada">Burbujas del fin del mundo.</div>
            </div>
          </div>
          <div className="w-col w-col-3 w-col-small-3 w-col-tiny-6">
            <div className="notarelacionada _1"><img src="/images/6a00d8341c85cd53ef01b7c94ea3a0970b.jpg"></img>
              <div className="titnotarelacionada">Espumantes patagónicos</div>
              <div className="subtnotarelacionada">Burbujas del fin del mundo.</div>
            </div>
          </div>
        </div>
        <div className="divencabezadonota">
          <h1 className="titnota">{articulo.titulo}</h1>
          <div className="divdatosnota"></div>
        </div>
        <h2 className="subtnota">{articulo.subtilo}</h2>
        <div className="div-block-15 w-clearfix">
          <div className="text-block-2">Por {articulo.autor.nombre}</div>
          <div className="txtdatonota">{articulo.fecha}</div>
          <img src="/images/gus.jpg" className="fotoautornotahome"></img></div>
          <img src={'http://placernautas.com:3005/api/containers/images/download/' + articulo.portada} className="fotonota1"></img>
        <p className="parrnota" dangerouslySetInnerHTML={{__html: articulo.cuerpo}}>

        </p>
        <div className="dejanostucomentario">Si te interesó la nota, compartila.</div>
        <div className="sharenota w-embed w-script">
          <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
            <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
            <a className="a2a_button_facebook"></a>
            <a className="a2a_button_twitter"></a>
            <a className="a2a_button_whatsapp"></a>
            <a className="a2a_button_google_plus"></a>
          </div>
          <script async="" src="https://static.addtoany.com/menu/page.js"></script>
        </div>
        <div className="dejanostucomentario">Dejanos tu comentario</div>
        <div className="div-block-24"><img src="/images/plugFace.png" width="731" srcset="/images/plugFace-p-500.png 500w, /images/plugFace.png 1383w" sizes="(max-width: 479px) 99vw, (max-width: 767px) 98vw, (max-width: 991px) 72vw, (max-width: 2160px) 64vw, 1383px" className="image-14"></img></div>
      </div>
      <div className="column-18 w-clearfix w-col w-col-3 w-col-tiny-tiny-stack">
        <div className="section-2">
          <div className="notasidebar">
            <div className="conttitsecc">
              <div className="titulosecciones sb">Arte</div>
              <div className="div-block-23"></div>
            </div>
            <div className="div-block-30">
              <div className="divfotosidebar"><img src="/images/flor_1.jpg" srcset="/images/flor_1-p-500.jpeg 500w, /images/flor_1.jpg 600w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"></img></div>
              <div className="pienotasidebar">
                <div className="titulosidebar">Artistas rosarinos</div>
                <div className="subtitulosidebar">Obra de Flor Balestra</div>
              </div>
            </div>
          </div>
          <div className="publisb"><img src="/images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
          <div className="notasidebar">
            <div className="conttitsecc">
              <div className="titulosecciones sb">Vino del mes</div>
              <div className="div-block-23"></div>
            </div>
            <div className="divfotosidebar"></div>
            <div className="div-block-30">
              <div className="divfotosidebar"><img src="/images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0.jpg" srcset="/images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0-p-500.jpeg 500w, /images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0.jpg 640w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"></img></div>
              <div className="pienotasidebar">
                <div className="titulosidebar">Quinde rosado</div>
                <div className="subtitulosidebar">Bodega Peñaflor</div>
              </div>
            </div>
          </div>
          <div className="publisb"><img src="/images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
          <div className="notasidebar">
            <div className="conttitsecc">
              <div className="titulosecciones sb">Restaurante del mes</div>
              <div className="div-block-23"></div>
            </div>
            <div className="divfotosidebar"></div>
            <div className="div-block-30">
              <div className="divfotosidebar"><img src="/images/t0drku550xwpwz554ynsrh45635454255177667500.jpg" className="imgnotasidebar"></img></div>
              <div className="pienotasidebar">
                <div className="titulosidebar">La buena medida</div>
                <div className="subtitulosidebar">Un clásico rosarino</div>
              </div>
            </div>
          </div>
          <div className="publisb"><img src="/images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
          <div className="notasidebar">
            <div className="conttitsecc">
              <div className="titulosecciones sb">Retro</div>
              <div className="div-block-23"></div>
            </div>
            <div className="div-block-30">
              <div className="divfotosidebar"><img src="/images/doñaPetrona.jpg" srcset="/images/doñaPetrona-p-500.jpeg 500w, /images/doñaPetrona.jpg 700w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"></img></div>
              <div className="pienotasidebar">
                <div className="titulosidebar">Doña Petrona</div>
                <div className="subtitulosidebar">Pionera de la cocina por televisión.</div>
              </div>
            </div>
          </div>
          <div className="publisb"><img src="/images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
          <div className="notasidebar">
            <div className="conttitsecc">
              <div className="titulosecciones sb">La frase</div>
              <div className="div-block-23"></div>
            </div>
            <div className="div-block-30">
              <div className="divfotosidebar"><img src="/images/humphreybogartheadshot.jpg" className="imgnotasidebar"></img>/div>
              <div className="pienotasidebar">
                <div className="titulosidebar">“El mundo entero tiene más o menos tres vasos de vino de retraso” </div>
                <div className="subtitulosidebar">Humphrey Bogart</div>
              </div>
            </div>
          </div>
          <div className="publisb"><img src="/images/Gato-Dumas-logo12.jpg" className="image-4"></img></div>
          <div>
            <div className="conttitsecc">
              <div className="titulosecciones sb">Lo más leído</div>
              <div className="div-block-23"></div>
            </div>
            <div className="divmasleido">
              <div className="masleido"><img src="/images/copaWine.png" srcset="/images/copaWine-p-500.png 500w, /images/copaWine.png 626w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"></img><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
              <div className="masleido"><img src="/images/birra.png" srcset="/images/birra-p-500.png 500w, /images/birra-p-800.png 800w, /images/birra.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"></img><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
              <div className="masleido"><img src="/images/gastroFondo.png" srcset="/images/gastroFondo-p-500.png 500w, /images/gastroFondo-p-800.png 800w, /images/gastroFondo-p-1080.png 1080w, /images/gastroFondo.png 1310w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"></img><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
              <div className="masleido"><img src="/images/cheff.png" srcset="/images/cheff-p-500.png 500w, /images/cheff.png 570w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"></img><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
              <div className="masleido"><img src="/images/champu.jpg" srcset="/images/champu-p-500.jpeg 500w, /images/champu.jpg 600w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"></img><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
            </div>
          </div>
          <div className="colaboran">
            <div className="conttitsecc">
              <div className="titulosecciones sb">Colaboran</div>
              <div className="div-block-23"></div>
            </div>
            <div className="divcolaboran w-clearfix"><img src="/images/descarga.jpg" className="imgcolaboran"></img>
              <div className="div-block-29">
                <div className="text-block-4">Facundo Lastra pedorreti de Legrand</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
            </div>
            <div className="divcolaboran w-clearfix"><img src="/images/descarga.jpg" className="imgcolaboran"></img>
              <div className="div-block-29">
                <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
            </div>
            <div className="divcolaboran w-clearfix"><img src="/images/descarga.jpg" className="imgcolaboran"></img>
              <div className="div-block-29">
                <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
            </div>
            <div className="divcolaboran w-clearfix"><img src="/images/descarga.jpg" className="imgcolaboran"></img>
              <div className="div-block-29">
                <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse? SE QUEDARÁN O NO</a></div>
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

export default withSSR(ArticuloDetalle);
