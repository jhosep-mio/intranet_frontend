import React from 'react'
import logo from '../../../assets/logos/logo.png';
import { BsGeo } from "react-icons/bs";
import {BsEnvelopeAt} from "react-icons/bs";
import {BsTelephone} from 'react-icons/bs';
import {BsFacebook} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {Link} from 'react-router-dom';

export const Header = () => {
  return (
    <>
       <header>
            <div className="contact_header">
                <div className="contact_header__ubicacion">
                    <a href=""> <BsEnvelopeAt className="icon"/> ventas@radiologiadental.pe</a>
                    <a href=""><BsTelephone className="icon"/>998 301 073</a>
                </div>
                <div className="contact_header__socialMedia">
                    <a href=""><BsFacebook/>Facebook</a>
                    <a href=""><BsInstagram/>Instagram</a>
                </div>
            </div>
            <div className="main-menu">
                <div className="main-menu__logo-header">
                    <img src={logo} alt=""/>
                </div>
                <div className="main-menu__menu">
                    <nav className='main-menu__menu__nav'>
                        <ul className="main-menu__menu__nav__list_nav">
                            <li><Link to="home">Inicio</Link></li>
                            <li><Link to="nosotros">Nosotros</Link></li>
                            <li><Link href="">Servicios</Link></li>
                            <li><Link href="">Contáctanos</Link></li>
                            <li><Link href="">Resultados</Link></li>
                            <li><Link href="">Intranet</Link></li>
                        </ul>
                    </nav>
                </div>

            </div>
            
        </header>
        
    </>
 
  )
}
