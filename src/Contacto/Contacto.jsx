import { useState, useRef } from 'react';
import './contacto.css'

import emailjs from "@emailjs/browser"

import ReCAPTCHA from "react-google-recaptcha";

const Contacto = () => {
    const [captchaValido, cambiarCaptchaValido] = useState(null);
    const [usuarioValido, cambiarUsuarioValido] = useState(false);
    const refForm = useRef();
    
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [motivo, setMotivo] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(refForm.current);
      // Aquí puedes realizar la lógica para enviar los datos del formulario, como una solicitud HTTP a un servidor o cualquier otra acción requerida.
      // Puedes acceder a los valores de nombre, correo, telefono y motivo utilizando las variables de estado correspondientes.
   
      if(captcha.current.getValue()){
        console.log('El usuario no es un robot');
        cambiarUsuarioValido(true);
        cambiarCaptchaValido(true)
      } else {
        console.log('Por favor acepta el captcha');
        cambiarUsuarioValido(false);
        cambiarCaptchaValido(false)
      }
   
    const serviceId = "service_157jmkn";
    const templateId = "template_4e9od6d";

    const apiKey = "oIEKB1nZ_-C3IEobH";

    emailjs.sendForm(serviceId, templateId, refForm.current, apiKey)
    .then( (result) => {
        console.log (result.text);
        setNombre('');
        setCorreo('');
        setTelefono('');
        setMotivo('');
    })
    .catch(error => console.error(error))

    };

    const captcha = useRef(null);

    const onChange = () => {
      if(captcha.current.getValue()){
        console.log('El usuario no es un robot')
        cambiarCaptchaValido(true);
    };
  }
    return (
        <div className="contacto__container">
          <div className="contacto__info">
          <div className="linea__superior">
                Formulario de Contacto
           </div>
          </div>
          {!usuarioValido && 
          <div className="formulario-contacto">
            <form ref={refForm} action='' onSubmit={handleSubmit}>
              <div className="campo">
                <label htmlFor="nombre">Nombre Completo:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
    
              <div className="campo">
                <label htmlFor="correo">Correo:</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
    
              <div className="campo">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
    
              <div className="campo">
                <label htmlFor="motivo">Motivo:</label>
                <textarea
                  id="motivo"
                  name="motivo"
                  rows="4"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="recaptcha">
              <ReCAPTCHA 
              ref={captcha}
              sitekey="6LeRZwspAAAAAFowRBpENYBi0WmY5BwIop8TB-nY" 
              onChange={onChange}
              />
              </div>
              {captchaValido === false && 
                <div className='error-captcha'>Por favor acepta el captcha</div>
}
              <button className='btn__send'>Enviar</button>
            </form>
          </div>
          }
          {!usuarioValido && 
          <div></div>
}
        </div>
  );
};
  export default Contacto;
