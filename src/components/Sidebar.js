import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API = 'http://placernautas.com:3005/api/';

class Sidebar extends React.Component {
    render() {
        const { notas, leidas, autores } = this.props;
        return (
        <div className="section-2">
            {notas.map((nota) => (
                <Link  to={'/articulo/'+nota.id}>
                    <div className="notasidebar">
                        <div className="conttitsecc">
                            <div className="titulosecciones sb">{nota.categoria.nombre}</div>
                            <div className="div-block-23"></div>
                        </div>
                        <div className="div-block-30">
                            <div className="divfotosidebar">
                            <img src={'http://placernautas.com:3005/api/containers/images/download/' + nota.portada} className="imgnotasidebar"></img></div>
                            <div className="pienotasidebar">
                                <div className="titulosidebar">{nota.titulo}</div>
                                <div className="subtitulosidebar">{nota.subtitulo}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            <div>
                <div className="conttitsecc">
                    <div className="titulosecciones sb">Lo más leído</div>
                    <div className="div-block-23"></div>
                </div>
                <div className="divmasleido">
                        {
                            leidas.map(leida => (
                                <div className="masleido">
                                    <img src={'http://placernautas.com:3005/api/containers/images/download/' + leida.portada} className="imgmasleido"></img>
                                    <a href="#" className="txtmasleido">{leida.titulo}</a>
                                </div>
                            ))
                        }
                </div>
                <div className="colaboran">
                    <div className="conttitsecc">
                        <div className="titulosecciones sb">Colaboran</div>
                        <div className="div-block-23"></div>
                    </div>
                    {
                        autores.map(autor => (
                            <div className="divcolaboran w-clearfix">
                                <img src={"http://placernautas.com:3005/api/containers/images/download/" + autor.autor.portada} className="imgcolaboran"></img>
                                <div className="div-block-29">
                                    <div className="text-block-4">{autor.autor.nombre} {autor.autor.apellido}</div>
                                    <a href="#" className="linkcolaboran">{autor.titulo}</a>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
        )
    }
}

export default Sidebar;