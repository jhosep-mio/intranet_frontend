import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../../../assets/logo/logazo.png';
import logowhite from './../../../assets/logo/logo_white.png';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleChevronRight, faMoon, faArrowRightFromBracket, faSun} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Global } from '../../../helper/Global';
import useAuth from '../../../hooks/useAuth';
import { FaJediOrder,FaUsers, FaHospitalAlt} from "react-icons/fa";

export const Navbar = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const slider= () =>{
        let slide = document.querySelector('.sidebar');
        slide.classList.toggle("close");
    }

    const modoOscuro= () =>{
        const body = document.querySelector('body');
        const more = document.querySelector('.more');
        const inactive = document.querySelector('.more5');
        const modeText = body.querySelector(".mode-text");

        body.classList.toggle("dark");

        if(body.classList.contains("dark")){
            modeText.innerText = "Light mode";
            more.classList.add("inactive");
            inactive.classList.remove("inactive");

        }else{
            modeText.innerText = "Dark mode";
            more.classList.remove("inactive");
            inactive.classList.add("inactive");
        }
    }

    const cerrarSession = async() =>{
        let token = localStorage.getItem("token");

        const data = new FormData();
        data.append('_method', "POST");

        await axios.post(`${Global.url}/logout`, data ,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.clear();
        setAuth({});
        navigate("/login");
        console.log("cerrarSession");
    }


    return (
        <nav className="sidebar close">
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={logo} alt="logo-ico" width="60px" className="more"/>
                        <img src={logowhite} alt="logo-ico" width="60px" className="more5 inactive"/>
                    </span>
                </div>
                <FontAwesomeIcon icon={faCircleChevronRight} className="toggle" onClick={slider}/>
            </header>

                    <div className="menu-bar">
                        <div className="menu">

                            <ul className="menu-links">
                                <li className="nav-links li">
                                    <Link className="" to="clinicas">
                                        <FaHospitalAlt className='icon'/>
                                        <span className="text nav-text">Clinicas</span>
                                    </Link>
                                </li>

                                <li className="nav-links li">
                                    <Link className="" to="clientes">
                                        <FaUsers  className="icon"/>
                                        <span className="text nav-text">Clientes</span>
                                    </Link>
                                </li>

                                <li className="nav-links li">
                                    <Link className="" to="ordenVirtual">
                                        <FaJediOrder className="icon"/>
                                        <span className="text nav-text">Oden Virtual</span>
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        <div className="bottom-content">
                            <li className="">
                                <Link onClick={cerrarSession}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="icon"/>
                                    <span className="text nav-text">Cerrar sesion</span>
                                </Link>
                            </li>

                            <li className="mode">
                                <div className="sun-moon">
                                    <FontAwesomeIcon icon={faMoon} className="icon moon"/>
                                    <FontAwesomeIcon icon={faSun} className="icon sun"/>
                                </div>
                                <span className="mode-text text">Dark mode</span>

                                <div className="toggle-switch">
                                    <span className="switch" onClick={modoOscuro}></span>
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
    )   
}
