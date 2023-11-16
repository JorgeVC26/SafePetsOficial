import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Colaboradores from './img/colaboradores.jpg'
import Paseo from './img/paseoMasc.jpg'
import Ducha from './img/duchaMasc.jpg'

const InfoPrincipal = () => {
  return (

<div className="top-section" style={{ display: 'flex', alignItems: 'center' }}>
  <div className="image-container" style={{ flex: 1, textAlign: 'center' }}>
    <Carousel showArrows={true} infiniteLoop={true}>
      <div>
        <img src={Colaboradores} alt="Descripción de la imagen" />
      </div>

      <div>
        <img src={Paseo} alt="Descripción de la imagen" />
      </div>

      <div>
        <img src={Ducha} alt="Descripción de la imagen" />
      </div>
    </Carousel>
  </div>
  <div className="text-container" style={{ flex: 1, textAlign: 'left' }}>
    <div style={{ maxWidth: '80%' }}>
      <h1>¿Qué ofrecemos?</h1>
      <p>
      En SafePets, nos dedicamos con pasión a ofrecer servicios de cuidado de mascotas que van más allá de las expectativas. Nos enorgullece proporcionar un entorno seguro y amoroso para tus compañeros peludos. Desde el cuidado integral que abarca aspectos como la alimentación y la atención médica, hasta emocionantes paseos al aire libre y servicios personalizados adaptados a las necesidades individuales de cada mascota, en SafePets nos comprometemos a brindarles una experiencia excepcional. Nuestro equipo de profesionales, apasionados por los animales, garantiza no solo la seguridad sino también el bienestar y la felicidad de tus seres queridos de cuatro patas. ¡En SafePets, tu mascota es nuestra prioridad!
      </p>

      <p>
      Nos enorgullece ofrecer servicios confiables y de calidad, permitiéndote tener tranquilidad mientras tu mascota disfruta de una atención excepcional. Descubre la diferencia de SafePets: más que un servicio, es un hogar para tus queridos animales.
      </p>
      <Link to="./Historia" className='boton-historia'
      >
        Conoce más sobre Nosotros
      </Link>
    </div>
  </div>
</div>



  )
}

export default InfoPrincipal
