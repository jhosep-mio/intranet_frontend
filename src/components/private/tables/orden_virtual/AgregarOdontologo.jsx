import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import './../../../../styles/_especificos.scss'
import logo from "./../../../../assets/logos/logo.png";

const AgregarOdontologo = () => {

    //GENERAL
    let token = localStorage.getItem("token");
    const [estado, setEstado] = useState(false);
    const[clinicas, setClinicas] = useState([]);
    const [search, setSearch] = useState('');

    // PACIENTES
    const[rol, setRol] = useState(0);
    const[nombres, setNombres] = useState("");
    const[apellido_p, setApellido_p] = useState("");
    const[apellido_m, setApellido_m] = useState("");
    const[fecha, setFecha] = useState(0);

    const[tipo_documento_paciente_odontologo, setTipo_documento_paciente_odontologo] = useState(0);
    const[numero_documento_paciente_odontologo, setNumero_documento_paciente_odontologo] = useState("");
    const[celular, setCelular] = useState("");
    const[correo, setCorreo] = useState("");
    const [generoPaciente, setGeneroPaciente] = useState(0);

    // ODONTOLOGOS
    const[clinica, setClinica] = useState(0);
    const[cop, setCop] = useState("");
    const[c_bancaria, setC_bancaria] = useState("");
    const[cci, setCci] = useState("");
    const[nombre_banco, setNombre_banco] = useState("");

    const navigate = useNavigate();

    const identificarCliente = (event) =>{
        setRol(event.target.value);
        setEstado(event.target.value == 1 ? true : false);
        setGeneroPaciente(0);
        setGenero(false); 
    }

    const indentificarGenero = (event) =>{
        setGeneroPaciente(event.target.value);
        setGenero(event.target.value == 1 ? true : false);
    }

    const saveOdontologo = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        const data = new FormData();
        data.append('id_rol', 1);
        data.append('clinica', clinica);
        data.append('cop', cop);
        data.append('c_bancaria', c_bancaria);
        data.append('cci', cci);
        data.append('nombre_banco', nombre_banco);
        data.append('nombres', nombres);
        data.append('apellido_p', apellido_p);
        data.append('apellido_m', apellido_m);
        data.append('f_nacimiento', fecha);
        data.append('tipo_documento_paciente_odontologo', tipo_documento_paciente_odontologo);
        data.append('numero_documento_paciente_odontologo', numero_documento_paciente_odontologo);
        data.append('celular', celular);
        data.append('correo', correo);
        data.append('genero', generoPaciente);
        try {
            let respuesta = await axios.post(`${Global.url}/saveOdontologo`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(respuesta.data.status === "success"){
                Swal.fire('Agreado correctamente', '', 'success');
                navigate('/admin/clientes');
            }else{
                Swal.fire('Error al agregar el registro', '', 'error');
            }
        } catch (error) {
            console.log(error.response.request.response)
            if(error.request.response.includes("Duplicate ")){
                Swal.fire('COP Duplicado', '', 'error');
            }else if(error.request.response.includes("cop")){
                Swal.fire('COP invalido', '', 'error');
            }else if(error.request.response.includes("celular")){
                Swal.fire('Celular invalido', '', 'error');
            }else if(error.request.response.includes("nombre")){
                Swal.fire('Nombre invalido', '', 'error');
            }else if(error.request.response.includes("apellido_m")){
                Swal.fire('Apellido Materno invalido', '', 'error');
            }else if(error.request.response.includes("apellido_p")){
                Swal.fire('Apellido Paterno invalido', '', 'error');
            }else{
                Swal.fire('Error no encontrado', '', 'error');
            }
        }
    }

    const getClinicas= async () =>{
        const request = await axios.get(`${Global.url}/allClinicas`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setClinicas(request.data);
    };

    const onSeachChange = ({target}) =>{
        setSearch(target.value);
    }

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 


    const filterDate = () =>{

        if(search.length === 0){
            const clini = clinicas;
            return clini.slice(0 , 7);
        }

        const filter = clinicas.filter((cate) => {
            return (
                quitarAcentos(cate.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });

        return filter.slice(0,7);
    }

    useEffect ( () =>{
        getClinicas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(()=>{
        filterDate()
    }, [search])


    return (
        <div className="container col-md-12 mt-6" style={{margin: '0', padding: '0'}}>
            <div className="card">
               <div className="card-header fw-bold">
                   Agregar - Odontologo:
               </div>
               <form className="p-4 needs-validation d-flex flex-column gap-3" onSubmit={saveOdontologo}>
                    
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img">
                           <img src={logo} alt=""/>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title">Nombres: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={nombres}
                                        onChange={(e) => { setNombres(e.target.value) }}
                                        type="text"
                                    />
                                </div>
                            </div>           
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2 ">
                                    <label className="label_title col-md-5">Apellido Paterno: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={apellido_p}
                                        onChange={(e) => { setApellido_p(e.target.value) }}
                                        type="text"
                                    />
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">Apellido materno: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={apellido_m}
                                        onChange={(e) => { setApellido_m(e.target.value) }}
                                        type="text"
                                    />
                                </div>
                            </div>
                            
                            <div className='div_busqueda2 mb-3 col-md-12' style={{margin: '10px 0 5px 0'}}>
                                <label>Buscar Clinica:<input 
                                    value={search}
                                    onChange={onSeachChange}
                                    type="text" className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                </label>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2 ">
                                    <label className="label_title col-md-5">Clinica: </label>
                                    <select value={clinica} type="text" className="form-select2"  autoFocus required onChange={(e)=>{setClinica(e.target.value)}}>
                                        <option key={0} value={0}>Ninguno</option>
                                        {filterDate().map((clini) => (
                                        <option key={clini.id} value={clini.id}>{clini.nombre}</option>
                                        ))
                                        }
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">COP: </label>
                                    <input className="form-control form-control3" autoFocus required
                                       value={cop}
                                       onChange={(e) => { setCop(e.target.value) }}
                                       type="text"
                                    />
                                </div>
                          
                            </div>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title col-md-5">Cuenta de Banco: </label>
                                    <input className="form-control form-control3" autoFocus 
                                     value={c_bancaria}
                                     onChange={(e) => { setC_bancaria(e.target.value) }}
                                     type="text"
                                    />
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">CCI: </label>
                                    <input className="form-control form-control3" autoFocus 
                                     value={cci}
                                     onChange={(e) => { setCci(e.target.value) }}
                                     type="text"
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title col-md-5">Nombre del Banco: </label>
                                    <input className="form-control form-control3" autoFocus 
                                            value={nombre_banco}
                                            onChange={(e) => { setNombre_banco(e.target.value) }}
                                            type="text"
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2 ">
                                    <label className="label_title col-md-5">Fecha de nacimiento: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={fecha}
                                        onChange={(e) => { setFecha(e.target.value) }}
                                        type="date"
                                    />
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">Celular:</label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={celular}
                                        onChange={(e) => { setCelular(e.target.value) }}
                                        type="number"
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title col-md-5">Tipo de documento: </label>
                                    <select value={tipo_documento_paciente_odontologo} type="text" className="form-select2" autoFocus required onChange={(e) => { setTipo_documento_paciente_odontologo(e.target.value)}}>
                                        <option value="0">DNI</option>
                                        <option value="1">RUC</option>
                                        <option value="2">Pasaporte</option>
                                        <option value="3">Carnet de Extranjería</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">Numero de documento:</label>
                                    <input className="form-control form-control3" autoFocus required
                                          value={numero_documento_paciente_odontologo}
                                          onChange={(e) => { setNumero_documento_paciente_odontologo(e.target.value) }}
                                          type="text"
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title col-md-5">Correo:</label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={correo}
                                        onChange={(e) => { setCorreo(e.target.value) }}
                                        type="email"
                                    />
                                </div>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title col-md-5">Genero:</label>
                                    <select value={generoPaciente} type="text" className="form-select2" autoFocus required onChange={indentificarGenero}>
                                        <option value="0">Hombre</option>
                                        <option value="1">Mujer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                   <div className="d-flex gap-2 contentBtnRegistrar">
                       <input type="hidden" name="oculto" value="1" />
                        <input  type="submit"className="btn btn-primary btnRegistrar" value="Registrar" />
                   </div>
               </form>
            </div>
        </div>
    )
}

export default AgregarOdontologo