import React from 'react'
import portada_gestion from "./images/portada_gestion.jpg"
import mercado_laboral from "./images/mercadolaboral.jpg"
import networking from "./images/networking.webp"
import gestion_proceso from "./images/gestion_proceso.png"
import nombrelogo from "./images/nombrelogo.png"


export default function AboutPage() {
  return (
    <div>
        <div className="intro">
            <img src={nombrelogo} alt="" /> 
        <p>
    Somos un equipo de profesionales con más de 20 años de trayectoria en empresas en las áreas de Recursos Humanos, liderando, gestionando y <br/> acompañando procesos de 
    gestión de las personas y potenciando el capital humano en las organizaciones.
    </p>
        </div>
<div className="first-part-about">
    <p>
  
   
    Somos especialistas en acompañar a empresas en procesos de reclutamiento y selección de perfiles especialistas, analistas y líderes (Jefes, Gerentes y Directores), perfiles de tecnología,
     perfiles para posiciones de base, selecciones masivas, <br/>
    evaluaciones psicotécnicas, de perfil y potencial con técnicas como el análisis del Discurso de Eliot Jaques, evaluaciones socio-ambientales y crediticias, <br/>
    procesos de evaluación para promociones internas, servicios de Outplacement y cambio de cultura organizacional <br/>
    <br />
    Intervenimos en las organizaciones brindando soporte y acompañamiento que permitan el crecimiento de las personas y las organizaciones logrando mayor satisfacción y eficiencia
    </p>
</div>
<div className="second-part-about">
    
<h1>VENTAJAS COMPETITIVAS</h1>

<div className="images-ventajas-competitivas">
<div className="ventajas-competitivas"><img src={mercado_laboral} alt="" />  <p>Conocimiento del Mercado laboral</p></div>
<div className="ventajas-competitivas"><img src={networking} alt="" /><p>Base de datos y amplia red de contactos <br />lo que permite llegar al candidato requerido</p></div> 
<div className="ventajas-competitivas"><img src={gestion_proceso} alt="" /><p>Especialistas en la gestión del proceso.</p></div>
</div>

   
</div>
<div className="third-part-about">
    <h1>NUESTRO SERVICIO DE SELECCION</h1>
    <p>
   Con el objetivo de brindar un servicio de calidad, nos focalizamos en detectar las necesidades de nuestros clientes, su cultura de y estilos de trabajo.
Para asegurar la calidad del proceso, contamos con una metodología diseñada por etapas bien definidas, la cual garantiza la excelencia y confiabilidad en los resultados.</p>
</div>
<div className="fourth-part-about-emailing">
  <h1>¿Querés recibir nuestras ofertas de trabajo?</h1>
  <form>
    <input type="email" placeholder="Tu email aquí" required />
    <button type="submit">Suscribirme</button>
  </form>
</div>
<img className='portada-gestion-about' src={portada_gestion} alt="" />

</div>

  )
}
