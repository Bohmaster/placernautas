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

class ArticuloDetalle extends React.Component {
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
     axios.get('http://placernautas.com:3005/api/articulos/' + match.params.articuloId)
      .then((articulo) => {
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
                      articulo: articulo.data,
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
    const { isLoading, fullUrl, articulo, sidebar, leidas, autores, error } = this.props;
    return (
      <div className="div-block-27">
        <Helmet
            defaultTitle="Admin"
            >
                <title>{articulo.titulo}</title>
                <meta name="description" content={articulo.cuerpo}></meta>
                <meta content={articulo.titulo} property="og:title"></meta>
                <meta content={articulo.subtitulo} property="og:description"></meta>
                <meta content={'http://placernautas.com:3005/api/containers/images/download/' + articulo.portada} property="og:description"></meta>

        </Helmet>
    <div className="w-row">
      <div className="column-5 w-col w-col-9 w-col-tiny-tiny-stack">
        <div className="conttitsecc">
        {
                        articulo.subCategoria.nombre     == 'Ninguna' ? 
                        <div className="titulosecciones">{articulo.categoria.nombre}</div>
                        : <div className="titulosecciones">{articulo.categoria.nombre} - {articulo.subCategoria.nombre}</div>
                    }
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
          <div className="text-block-2">Por {articulo.autor.nombre} {articulo.autor.apellido}</div>
          <div className="txtdatonota">{new Date(articulo.fecha).toLocaleDateString()}</div>
          <img src={'http://placernautas.com:3005/api/containers/images/download/' + articulo.autor.portada} className="fotoautornotahome"></img></div>
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
        <div className="div-block-24">
          <div class="fb-comments" data-href={fullUrl} data-numposts="5"></div>
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

export default withSSR(ArticuloDetalle);
