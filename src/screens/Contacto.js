import React from 'react';
import withSSR from '../components/withSSR';

const Contacto = () => 
      <div className="contacto">
        <div className="w-row">
          <div className="column-20 w-col w-col-6">
            <div className="div-block-31 w-clearfix">
              <div className="txtgrandecontact">Contactate con nosotros. </div>
              <div className="txtchicocontact">Envianos tu consulta y a la brevedad te responderemos.</div>
              <div className="txtchicocontact">Si disponés de algún material original sobre los temas que tratamos en Placernautas, envialo por este medio y si cumple con los requisitos será publicado mecionando a su autor.</div>
              <div className="div-block-32"></div><a className="linkctacto">info@placernautas.com</a><img src="images/cheff.png" srcset="images/cheff-p-500.png 500w, images/cheff.png 570w" sizes="(max-width: 479px) 66vw, 91.13750457763672px" className="imgctacto" /></div>
          </div>
          <div className="column-19 w-col w-col-6">
            <div className="w-form">
              <form id="email-form" name="email-form" data-name="Email Form" className="w-clearfix">
                <input type="text" className="inputcontact w-input" maxlength="256" name="name" data-name="Name" placeholder="Nombre" id="name" />
                <input type="text" className="inputcontact w-input" maxlength="256" name="email" data-name="Email" placeholder="Email" id="email" required />
                <textarea id="field" name="field" placeholder="Mensaje" maxlength="5000" required="" className="inputcontact msje w-input"></textarea>
                <input type="submit" value="Enviar" className="submitcontact w-button" />
              </form>
              <div className="w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

export default Contacto;
