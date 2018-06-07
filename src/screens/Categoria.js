import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import Helmet from 'react-helmet';

import Sidebar from '../components/Sidebar';

import {Link} from 'react-router-dom'

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

 formatCols = (array) => {
    let newArray = [];

    for (let i = 0; i < array.length; i += 2) {
        let innerArray = [];
        innerArray.push(array[i], array[i+1])
        newArray.push(innerArray);
    }

    console.log(newArray.length, 'MAMI');
    return newArray;
 }

  render() {
    const { isLoading, articulos, sidebar, leidas, autores, error } = this.props;
    return (
        <div className="div-block-27">
        {
            articulos[0] ? <div className="w-row">
            <div className="column-5 w-col w-col-9 w-col-tiny-tiny-stack">
              <div className="conttitsecc">
                    {
                        articulos[0].subCategoria.nombre     == 'Ninguna' ? 
                        <div className="titulosecciones">{articulos[0].categoria.nombre}</div>
                        : <div className="titulosecciones">{articulos[0].categoria.nombre} - {articulos[0].subCategoria.nombre}</div>
                    }
                <div className="div-block-23"></div>
              </div>
              {
                  this.formatCols(articulos).map(articulo => (
                      <div className="_2columnas w-row">
                  <Link className="noStyle" to={'/articulo/' + articulo[0].id}>
                    <div className="column-8 w-col w-col-6">
                      <div className="notahome chica left">
                        <div className="headernotahome w-clearfix">
                          <div className="categorianotahome">{articulo[0].categoria.nombre}</div>
                          <div className="fechanotahome">{new Date(articulo[0].fecha).toLocaleDateString()}</div>
                        </div>
                        <div className="sobrenotahome"></div>
                        <div className="subheadernotahome w-clearfix">
                          <div className="autornotahome">Por {articulo[0].autor.nombre} {articulo[0].autor.apellido}</div><img src={'http://placernautas.com:3005/api/containers/images/download/' + articulo[0].autor.portada} className="fotoautornotahome"></img></div>
                        <div className="wrapperfotonotahome">
                          <div className="pienotahome">
                            <div className="titulonotahome small">{articulo[0].titulo}</div>
                            <div className="subtitulonotahome small">{articulo[0].subtitulo}</div>
                            <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                          </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + articulo[0].portada} className="imgnotahome chica"></img></div>
                      </div>
                    </div>
                    </Link>
                    {articulo[1] && <Link className="noStyle" to={'/articulo/' + articulo[1].id}>
                      <div className="column-9 w-col w-col-6">
                        <div className="notahome chica right movil">
                          <div className="headernotahome w-clearfix">
                            <div className="categorianotahome phone">{articulo[1].categoria.nombre}</div>
                            <div className="fechanotahome">{new Date(articulo[1].fecha).toLocaleDateString()}</div>
                          </div>
                          <div className="sobrenotahome"></div>
                          <div className="subheadernotahome w-clearfix">
                            <div className="autornotahome">Por {articulo[1].autor.nombre}</div><img src={'http://placernautas.com:3005/api/containers/images/' + articulo[0].autor.portada} className="fotoautornotahome"></img></div>
                          <div className="wrapperfotonotahome">
                            <div className="pienotahome">
                            <div className="titulonotahome small">{articulo[1].titulo}</div>
                              <div className="subtitulonotahome small">{articulo[1].subtitulo}</div>
                              <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
                            </div><img src={'http://placernautas.com:3005/api/containers/images/download/' + articulo[1].portada} className="imgnotahome chica"></img></div>
                        </div>
                      </div>
                    </Link>}
                  </div>
                  ))
              }
            </div>
            <div className="column-18 w-clearfix w-col w-col-3 w-col-tiny-tiny-stack">
              <Sidebar notas={sidebar} leidas={leidas} autores={autores}/>
            </div>
          </div> : <span> No se han encontrado artìculos </span>
        }
      </div>

    );
  }
}

export default withSSR(Categoria);
