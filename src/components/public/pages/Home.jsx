import React, { useRef, useState } from "react";
import slide from '../../../assets/home/slide.jpeg'
import nosotros from '../../../assets/home/slide2.jpeg'
import banner from '../../../assets/home/banner.png';
import banner2 from '../../../assets/home/banner2.png'
import banner3 from '../../../assets/home/banner3.png'

import cefalo from '../../../assets/home/cefalo.png';
import foto from '../../../assets/home/foto.png';
import paquetes from '../../../assets/home/paquetes.png';
import radio from '../../../assets/home/radio.png';
import serv1 from '../../../assets/home/serv1.jpg';
import serv2 from '../../../assets/home/serv2.jpg';
import serv3 from '../../../assets/home/serv3.jpg';
import serv4 from '../../../assets/home/serv4.jpg';
import serv5 from '../../../assets/home/serv5.jpg';
import tomo from '../../../assets/home/tomo.png';

import valor1 from "../../../assets/home/valor1.png";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs, EffectFade, Autoplay,  Pagination} from "swiper";


export const Home = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  return (
    <>
    <main>

      <section className='slide'>
        <Swiper 
        pagination={true} 
        modules={[Pagination]}
        loop={true}
        className="swp-slide"
        >
          <SwiperSlide><img src={banner3} alt=""/></SwiperSlide>
          <SwiperSlide><img src={banner2} alt=""/></SwiperSlide>
          <SwiperSlide><img src={banner} alt=""/></SwiperSlide>
        </Swiper>
        
      </section>
      
      <section className="nosotros">
        <div className="nosotros__img">
            <img src={nosotros} alt="" />
          
        </div>
        <div className="nosotros__info">
            <div className="nosotros__info__title">
              <h2>
                <span>¿</span>
                <span>Q</span>
                <span>u</span>
                <span>i</span>
                <span>è</span>
                <span>n</span>
                <span>e</span>            
                <span>s</span>

                <span>s</span>
                <span>o</span>
                <span>m</span>
                <span>o</span>
                <span>s</span>
                <span>?</span>
              </h2>
            </div>
            <div className="nosotros__info__texto">
              <p>Somos un Centro Radiológico Dental, el cual disponemos de alta tecnología y un equipo profesional altamente cualificado. Ubicados en el distrito de Los Olivos - Perú, nos comprometemos a facilitar un servicio diagnóstico oportuno a los profesionales de la salud dental y brindar una excelente atención a sus pacientes.</p>
            </div>
        </div>
      </section>

      <section className="valores">
        <div className="valores__title">
          <h2>Nuestros valores</h2>
        </div>
        <div className="valores__main">
          <div className="valores__main__val">
            <div className="valores__main__val__valor">
              <img src={valor1} alt="" />
              <h5>Respeto</h5>
            </div>
            <div className="valores__main__val__valor">
              <img src={valor1} alt="" />
              <h5>Respeto</h5>
            </div>
            <div className="valores__main__val__valor">
              <img src={valor1} alt="" />
              <h5>Respeto</h5>
            </div>
            <div className="valores__main__val__valor">
              <img src={valor1} alt="" />
              <h5>Respeto</h5>
            </div>
          </div>
        </div>
      </section>

      <section className="servicios-section">
        <div className="title-servicios">
          <h2>Nuestros servicios</h2>
        </div>
        <div class="main-servicios">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            direction={"vertical"}
            slidesPerView={5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swp-options"
          >
            <SwiperSlide>
              <div class="content-serv">
                <div class="info">
                  <h5 class="title-serv">Estudios radiográficos</h5>
                    <p class="descrip-serv">Panorámica, Cefalomètrica, Carpal, ATM y Postero Anterior.</p>
                </div>
                <div class="icon">
                  <img src={radio}/>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="content-serv">
                <div class="info">
                  <h5 class="title-serv">Tomografía Cone Beam 3D</h5>
                    <p class="descrip-serv">ATM, Localización de Diente Retenido, Senos Maxilares, etc.</p>
                </div>
                <div class="icon">
                  <img src={tomo}/>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="content-serv">
                <div class="info">
                  <h5 class="title-serv">Estudios Cefalométricos</h5>
                    <p class="descrip-serv">Ricketts, Mc Namara, Bjork, Tejidos Blandos, entre otros.</p>
                </div>
                <div class="icon">
                  <img src={cefalo}/>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="content-serv">
                <div class="info">
                  <h5 class="title-serv">Fotografía Clínica Profesional</h5>
                  <p class="descrip-serv">Intraoral y Extraoral</p>
                </div>
                <div class="icon">
                  <img src={foto}/> 
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div class="content-serv">
                <div class="info">
                  <h5 class="title-serv">Paquetes Ortodónticos</h5>
                  <p class="descrip-serv">Ofrecemes diversos parquetes ortodótnicas. <strong>Míralos aquí</strong></p>
                </div>
                <div class="icon">
                  <img src={paquetes} />
                </div>
              </div>
            </SwiperSlide>

          </Swiper>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            effect={"fade"}
            grabCursor={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs, EffectFade, Autoplay]}
            className="swp-main"
          >
            <SwiperSlide>
              <img src={serv1} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={serv2} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={serv3} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={serv4} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={serv5} />
            </SwiperSlide>

            
          </Swiper>
          
        </div>
        
      </section>

      <section className="contacto-section">
        <div className="contacto-section__bg">
            <h2>Contáctanos!</h2>
            <p>Te atenderemos en la brevedad posible! </p>
        </div>
        <div className="contacto-section__form">
            <form action="" method="post" className="contacto-section__form__formulario">
              <label htmlFor="name">
                <input type="text" placeholder="Nombre" id="name" name="name" className="inputs"/>
              </label>
              <label htmlFor="asunto">
                <input type="text" placeholder="Asunto" id="asunto" name="asunto" className="inputs"/>
              </label>
              <label htmlFor="email">
                <input type="email" placeholder="Email" id="email" name="email" className="inputs"/>
              </label>
              <label htmlFor="celular">
                <input type="text" placeholder="Celular" id="celular" name="celular" className="inputs"/>
              </label>
              <label htmlFor="mensaje">
                <textarea name="mensaje" id="mensaje" cols="30" rows="10" placeholder="Mensaje" className="inputs area"></textarea>
              </label>
              <input type="submit" value="Enviar" className="enviar"/>
            </form>
        </div>
      </section>
    </main>
    </>
    
  )
}
