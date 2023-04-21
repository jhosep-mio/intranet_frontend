import {React} from 'react';
import logo from '../../../assets/logos/logo_white.png';
import bg_video from '../../../assets/login/bg_resultados.mp4';
import {Link} from 'react-router-dom';

export const Resultados = () => {

  return (
    <main>
      <section className="res">
        <div className="res__form_main">
          <div className="res__form_main__header">
            <picture>
              <img src={logo} alt=""  />
            </picture>
          </div>

          <div className="res__form_main__content">
            <h5>Resultados</h5>
          </div>
          
        </div>
        <div className="res__video">
          <video  width="640" height="360" autoPlay muted loop>
            <source src={bg_video} type="video/mp4" />
          </video>
        </div>
      </section>
    </main>
  )
}
