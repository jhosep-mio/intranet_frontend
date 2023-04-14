import {React} from 'react';
import {Link} from 'react-router-dom'
import logo_white from '../../../assets/logos/icono_white.png';
import lg from '../../../assets/logos/logos-peru.svg';
import {BsTelephone} from 'react-icons/bs';

export const Footer = () => {
  return (
    <>
        <footer className="footer">
            <div className="footer__main">      
                <div className="footer__main__logo">
                    <img src={logo_white} alt="" />
                </div>
                <div className="footer__main__servicios">
                    <ul>
                        <li><Link>Estudios radiográficos</Link></li>
                        <li><Link>Estudios Cefalométricos</Link></li>
                        <li><Link>Tomografía Cone Beam 3D</Link></li>
                        <li><Link>Paquetes Ortodónticos</Link></li>
                        <li><Link>Fotografía Clínica Profesional</Link></li>

                    </ul>
                </div>
                <div className="footer__main__contacto">
                    <Link>Contacto</Link>
                </div>
            </div>

            <div className="footer__main2">
                <div className="footer__main2__copy">
                    <p>Radiología dental © 2023 </p>
                    <p>Todos los derechos reservados</p>
                </div>

                <div className="footer__main2__info">
                    <div className="footer__main2__info__call">
                        <p>Llámanos</p><Link><BsTelephone/>998 301 073</Link>
                    </div>
                    <div className="footer__main2__info__menu">
                        <ul>
                            <li>
                                <Link>Inicio</Link>
                            </li>
                            <li>
                                <Link>Nosotros</Link>
                            </li>
                            <li>
                                <Link>Servicios</Link>
                            </li>
                            <li>
                                <Link>Contacto</Link>
                            </li>
                            <li>
                                <Link>Resultados</Link>
                            </li>
                            <li>
                                <Link>Intranet</Link>
                            </li>
                        </ul>

                        <div className="footer__main2__info__menu__design">
                            <p>Design by: <Link to="https://logosperu.com/" target="_blank"><img src={lg} alt="" /></Link></p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
