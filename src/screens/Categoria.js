// import React from 'react';
// import withSSR from '../components/withSSR';
// import axios from 'axios';
// import Helmet from 'react-helmet';

// import Sidebar from '../components/Sidebar';

// const API = 'http://placernautas.com:3005/api/';

// const loMasLeido = () => {
//   const params = {
//     filter: {
//       order: 'visitas DESC',
//       limit: 5
//     }
//   }
//   return axios.get(API + 'articulos', {params})
// }

// const cargarNotaAutor = () => {
//   const params = {
//     filter: {
//       where: {
//         esNotaAutor: true,
//       },
//       order: 'fecha DESC',
//       limit: 5
//     }
//   }
//   return axios.get(API + 'articulos', {params})
// }

// class Categoria extends React.Component {
//   // This works similarly to Next.js's `getInitialProps`
//   static getInitialData({ match, req, res }) {
//     const params = {
//       filter: {
//         where: { sidebar: true },
//         order: ['posicionSidebar ASC', 'fecha DESC'],
//         limit: 6
//       }    
//     }
//     return new Promise((resolve, reject) => {
//      axios.get('http://placernautas.com:3005/api/articulos/' + match.params.articuloId)
//       .then((articulo) => {
//         axios.get('http://placernautas.com:3005/api/articulos', {params})
//           .then(notas => {
//             const params = {
//               filter: {
//                 order: 'visitas DESC',
//                 limit: 5
//               }
//             }
//             axios.get(API + 'articulos', {params})
//               .then(leidas => {
//                 cargarNotaAutor()
//                   .then(autores => {
//                     resolve({
//                       articulo: articulo.data,
//                       sidebar: notas.data,
//                       leidas: leidas.data,
//                       autores: autores.data
//                     })
//                   })
//               })
//               .catch(error => {
//                 console.log(error)
//                 reject(error)
//               })
//           })
//       })
//       .catch((error) => {
//         reject({
//           error: error
//         })
//       })
//     });
//   }

//   render() {
//     const { isLoading, articulo, sidebar, leidas, autores, error } = this.props;
//     return (
//         <div className="div-block-27">
//         <div className="w-row">
//           <div className="column-5 w-col w-col-9 w-col-tiny-tiny-stack">
//             <div className="conttitsecc">
//               <div className="titulosecciones">Gastronomía | Productos</div>
//               <div className="div-block-23"></div>
//             </div>
//             <div className="_2columnas w-row">
//               <div className="column-8 w-col w-col-6">
//                 <div className="notahome chica left">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div><a href="nota2.html" className="sobrenotahome w-inline-block"></a>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//               <div className="column-9 w-col w-col-6">
//                 <div className="notahome chica right movil">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//             </div>
//             <div className="_2columnas w-row">
//               <div className="column-8 w-col w-col-6">
//                 <div className="notahome chica left">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//               <div className="column-9 w-col w-col-6">
//                 <div className="notahome chica right movil">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//             </div>
//             <div className="_2columnas w-row">
//               <div className="column-8 w-col w-col-6">
//                 <div className="notahome chica left">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//               <div className="column-9 w-col w-col-6">
//                 <div className="notahome chica right movil">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//             </div>
//             <div className="_2columnas w-row">
//               <div className="column-8 w-col w-col-6">
//                 <div className="notahome chica left">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//               <div className="column-9 w-col w-col-6">
//                 <div className="notahome chica right movil">
//                   <div className="headernotahome">
//                     <div className="fechanotahome">23 de Abril de 2018</div>
//                   </div>
//                   <div className="sobrenotahome"></div>
//                   <div className="subheadernotahome w-clearfix">
//                     <div className="autornotahome">Por Alfredo Lasagna</div><img src="images/descarga.jpg" className="fotoautornotahome"/></div>
//                   <div className="wrapperfotonotahome">
//                     <div className="pienotahome">
//                       <div className="titulonotahome small">La pasta italiana</div>
//                       <div className="subtitulonotahome small">verdades y mitos de un ìcono de la gastronomìa mundial.</div>
//                       <p className="cuerponotahome">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere...</p>
//                     </div><img src="images/pasta-fresca2.jpg" className="imgnotahome chica"/></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="column-18 w-clearfix w-col w-col-3 w-col-tiny-tiny-stack">
//             <div className="section-2">
//               <div className="notasidebar">
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">Arte</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="div-block-30">
//                   <div className="divfotosidebar"><img src="images/flor_1.jpg" srcset="images/flor_1-p-500.jpeg 500w, images/flor_1.jpg 600w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"/></div>
//                   <div className="pienotasidebar">
//                     <div className="titulosidebar">Artistas rosarinos</div>
//                     <div className="subtitulosidebar">Obra de Flor Balestra</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"/></div>
//               <div className="notasidebar">
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">Vino del mes</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="divfotosidebar"></div>
//                 <div className="div-block-30">
//                   <div className="divfotosidebar"><img src="images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0.jpg" srcset="images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0-p-500.jpeg 500w, images/77-espumante-quinde-rose-x1-011-0970e056dadbf7b87715122964508331-640-0.jpg 640w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"/></div>
//                   <div className="pienotasidebar">
//                     <div className="titulosidebar">Quinde rosado</div>
//                     <div className="subtitulosidebar">Bodega Peñaflor</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"/></div>
//               <div className="notasidebar">
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">Restaurante del mes</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="divfotosidebar"></div>
//                 <div className="div-block-30">
//                   <div className="divfotosidebar"><img src="images/t0drku550xwpwz554ynsrh45635454255177667500.jpg" className="imgnotasidebar"/></div>
//                   <div className="pienotasidebar">
//                     <div className="titulosidebar">La buena medida</div>
//                     <div className="subtitulosidebar">Un clásico rosarino</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"/></div>
//               <div className="notasidebar">
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">Retro</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="div-block-30">
//                   <div className="divfotosidebar"><img src="images/doñaPetrona.jpg" srcset="images/doñaPetrona-p-500.jpeg 500w, images/doñaPetrona.jpg 700w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 49vw, (max-width: 991px) 23vw, 20vw" className="imgnotasidebar"/></div>
//                   <div className="pienotasidebar">
//                     <div className="titulosidebar">Doña Petrona</div>
//                     <div className="subtitulosidebar">Pionera de la cocina por televisión.</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"/></div>
//               <div className="notasidebar">
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">La frase</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="div-block-30">
//                   <div className="divfotosidebar"><img src="images/humphreybogartheadshot.jpg" className="imgnotasidebar"/></div>
//                   <div className="pienotasidebar">
//                     <div className="titulosidebar">“El mundo entero tiene más o menos tres vasos de vino de retraso” </div>
//                     <div className="subtitulosidebar">Humphrey Bogart</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="publisb"><img src="images/Gato-Dumas-logo12.jpg" className="image-4"/></div>
//               <div>
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">Lo más leído</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="divmasleido">
//                   <div className="masleido"><img src="images/copaWine.png" srcset="images/copaWine-p-500.png 500w, images/copaWine.png 626w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"/><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
//                   <div className="masleido"><img src="images/birra.png" srcset="images/birra-p-500.png 500w, images/birra-p-800.png 800w, images/birra.png 1000w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"/><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
//                   <div className="masleido"><img src="images/gastroFondo.png" srcset="images/gastroFondo-p-500.png 500w, images/gastroFondo-p-800.png 800w, images/gastroFondo-p-1080.png 1080w, images/gastroFondo.png 1310w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"/><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
//                   <div className="masleido"><img src="images/cheff.png" srcset="images/cheff-p-500.png 500w, images/cheff.png 570w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"/><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
//                   <div className="masleido"><img src="images/champu.jpg" srcset="images/champu-p-500.jpeg 500w, images/champu.jpg 600w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, (max-width: 991px) 23vw, 19vw" className="imgmasleido"/><a href="#" className="txtmasleido">Saurus Rosé-Lanzamiento del nuevo espumante.</a></div>
//                 </div>
//               </div>
//               <div className="colaboran">
//                 <div className="conttitsecc">
//                   <div className="titulosecciones sb">Colaboran</div>
//                   <div className="div-block-23"></div>
//                 </div>
//                 <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"/ >
//                   <div className="div-block-29">
//                     <div className="text-block-4">Facundo Lastra pedorreti de Legrand</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
//                 </div>
//                 <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"/>
//                   <div className="div-block-29">
//                     <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
//                 </div>
//                 <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"/>
//                   <div className="div-block-29">
//                     <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse?</a></div>
//                 </div>
//                 <div className="divcolaboran w-clearfix"><img src="images/descarga.jpg" className="imgcolaboran"/>
//                   <div className="div-block-29">
//                     <div className="text-block-4">Facundo Lastra</div><a href="#" className="linkcolaboran">Cervecerías artesanales, llegaron para quedarse? SE QUEDARÁN O NO</a></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     );
//   }
// }

// export default withSSR(Categoria);
