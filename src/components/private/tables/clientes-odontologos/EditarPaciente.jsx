import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import './../../../../styles/_especificos.scss'
import logo from "./../../../../assets/logos/logo.png";

const EditarPaciente = () => {

    //GENERAL
    const {id} = useParams();
    let token = localStorage.getItem("token");

    const [validarEdad, setValidarEdad] = useState(true);
    const [loading, setLoading] = useState(true);


    // PACIENTES
    const[rol, setRol] = useState(0);
    const[nombres, setNombres] = useState("");
    const[apellido_p, setApellido_p] = useState("");
    const[apellido_m, setApellido_m] = useState("");
    const[fecha, setFecha] = useState(0);
    const[nombre_poderado, setNombre_poderado] = useState("");
    const[tipo_documento_apoderado, setTipo_documento_apoderado] = useState("");
    const[documento_apoderado, setDocumento_apoderado] = useState("");
    const[tipo_documento_paciente_odontologo, setTipo_documento_paciente_odontologo] = useState(0);
    const[numero_documento_paciente_odontologo, setNumero_documento_paciente_odontologo] = useState("");
    const[celular, setCelular] = useState("");
    const[correo, setCorreo] = useState("");
    const [generoPaciente, setGeneroPaciente] = useState(0);
    const [embarazada, setEmbarazada] = useState(0);
    const [enfermedades, setEnfermedades] = useState("");
    const [discapacidades, setDiscapacidades] = useState("");
    const [paciente_especial, setPaciente_especial] = useState("");
    const [genero, setGenero] = useState("");

    const navigate = useNavigate();

    function calcularEdad(fecha_nacimiento) {
        let hoy = new Date();
        let cumpleanos = new Date(fecha_nacimiento);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        let m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }

    useEffect(()=>{
        if(calcularEdad(fecha) >= 18){
            setValidarEdad(true);
        }else {
            setValidarEdad(false);
        }
    }, [fecha])

    const indentificarGenero = (event) =>{
        setGeneroPaciente(event.target.value);
        setGenero(event.target.value == 1 ? true : false);
    }


    const preguntar = (e) =>{
        e.preventDefault();
        Swal.fire({
            title: '¿Seguro que deseas editar el registro?',
            showDenyButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                updatePaciente();
            }
          })
    }

    const updatePaciente = async () => {
        const data = new FormData();
        data.append('id_rol', 0);
        data.append('nombres', nombres);
        data.append('apellido_p', apellido_p);
        data.append('apellido_m', apellido_m);
        data.append('f_nacimiento', fecha);
        data.append('nombre_apoderado', nombre_poderado);
        data.append('tipo_documento_apoderado', tipo_documento_apoderado);
        data.append('documento_apoderado', documento_apoderado);
        data.append('tipo_documento_paciente_odontologo', tipo_documento_paciente_odontologo);
        data.append('numero_documento_paciente_odontologo', numero_documento_paciente_odontologo);
        data.append('celular', celular);
        data.append('correo', correo);
        data.append('genero', generoPaciente);
        data.append('embarazada', embarazada);
        data.append('enfermedades', enfermedades);
        data.append('discapacidades', discapacidades);
        data.append('paciente_especial', paciente_especial);
        data.append('_method', 'PUT');


        try {
            let respuesta= await axios.post(`${Global.url}/updatePaciente/${id}`, data,{
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
            if(error.request.response.includes("nombre")){
                Swal.fire('Nombre invalido', '', 'error');
            }else if(error.request.response.includes("celular")){
                Swal.fire('Celular invalido', '', 'error');
            }else if(error.request.response.includes("apellido_p")){
                Swal.fire('Apellido Paterno invalido', '', 'error');
            }else if(error.request.response.includes("apellido_m")){
                Swal.fire('Apellido Materno invalido', '', 'error');
            }else{
                Swal.fire('Error no encontrado', '', 'error');
            }
        }
    }

    useEffect(()=>{
        getPacienteOne();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPacienteOne = async() =>{
        setLoading(true);
        const onePaciente = await axios.get(`${Global.url}/onePaciente/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setRol(onePaciente.data.rol);
        setNombres(onePaciente.data.nombres);
        setApellido_p(onePaciente.data.apellido_p);
        setApellido_m(onePaciente.data.apellido_m);
        setFecha(onePaciente.data.f_nacimiento);

        setNombre_poderado(onePaciente.data.nombre_apoderado);
        setTipo_documento_apoderado(onePaciente.data.tipo_documento_apoderado);
        setDocumento_apoderado(onePaciente.data.documento_apoderado);

        setTipo_documento_paciente_odontologo(onePaciente.data.tipo_documento_paciente_odontologo);
        setNumero_documento_paciente_odontologo(onePaciente.data.numero_documento_paciente_odontologo);
        setCelular(onePaciente.data.celular);

        setCorreo(onePaciente.data.correo);
        setGeneroPaciente(onePaciente.data.genero);
        setEmbarazada(onePaciente.data.embarazada);

        setGenero(onePaciente.data.genero == 1 ? true : false);

        setEnfermedades(onePaciente.data.enfermedades);
        setEnfermedades(onePaciente.data.enfermedades);

        setDiscapacidades(onePaciente.data.discapacidades);
        setPaciente_especial(onePaciente.data.paciente_especial);

        setLoading(false);
    }

    return (
        <div className="container col-md-10 mt-6">
            {loading === false ?
            <div className="card">
                <>
                    <div className="card-header fw-bold">
                        Editar - Paciente:  {nombres} {apellido_p} {apellido_m}
                    </div>
                    <form className="p-4 needs-validation d-flex flex-column gap-3" onSubmit={preguntar}>
                        <div className="d-flex justify-content-between">
                            <div className="mb-3 col-md-12 content_img">
                            <img src={logo} alt=""/>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="mb-3 col-md-11">
                                <div className='content_general mb-3 col-md-12'>
                                    <div className="mb-3 col-md-12 div_conten">
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

                                <div className='content_general mb-3 col-md-12'>
                                    <div className="mb-3 col-md-6 div_conten2 ">
                                        <label className="label_title col-md-5">Fecha de nacimiento: </label>
                                        <input className="form-control form-control3" autoFocus required
                                            value={fecha}
                                            onChange={(e) => { setFecha(e.target.value) }}
                                            type="date"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6 div_conten2">
                                        <label className="label_title col-md-5">Celular:</label>
                                        <input className="form-control form-control3" autoFocus required
                                            value={celular}
                                            onChange={(e) => { setCelular(e.target.value) }}
                                            type="number"
                                        />
                                    </div>
                                    
                                </div>
                                {validarEdad ?  ""  
                                :         
                                <div className='contenedor_apoderado_'>

                                    <label className="form-label titulos_labels">INFORMACION DEL APODERADO</label>
                                    <div className='content_general mb-3 col-md-12'>
                                        <div className="mb-3 col-md-12 div_conten2 ">
                                            <label className="label_title col-md-5">Nombres del apoderado:</label>
                                            <input className="form-control form-control3" autoFocus required
                                                value={nombre_poderado}
                                                onChange={(e) => { setNombre_poderado(e.target.value) }}
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                    <div className='content_general mb-3 col-md-12'>
                                        <div className="mb-3 col-md-6 div_conten2">
                                            <label className="label_title col-md-5">Tipo de documento: </label>
                                            <select value={tipo_documento_apoderado} type="text" className="form-select2" autoFocus required onChange={(e) => { setTipo_documento_apoderado(e.target.value)}}>
                                                <option value="0">DNI</option>
                                                <option value="1">RUC</option>
                                                <option value="2">Pasaporte</option>
                                                <option value="3">Carnet de Extranjería</option>
                                            </select>
                                        </div>

                                        <div className="mb-3 col-md-6 div_conten">
                                            <label className="label_title col-md-5">Numero de documento:</label>
                                            <input className="form-control form-control3" autoFocus required
                                            value={documento_apoderado}
                                            onChange={(e) => { setDocumento_apoderado(e.target.value) }}
                                            type="text"
                                            />
                                        </div>
                                    </div>
                                </div>}
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
                                    <div className="mb-3 col-md-4 div_conten2">
                                        <label className="label_title col-md-5">Correo:</label>
                                        <input className="form-control form-control3" autoFocus required
                                            value={correo}
                                            onChange={(e) => { setCorreo(e.target.value) }}
                                            type="email"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-4 div_conten2">
                                        <label className="label_title col-md-5">Genero:</label>
                                        <select value={generoPaciente} type="text" className="form-select2" autoFocus required onChange={indentificarGenero}>
                                            <option value="0">Hombre</option>
                                            <option value="1">Mujer</option>
                                        </select>
                                    </div>
                                    {genero ?
                                    <div className="mb-3 col-md-4 div_conten2">
                                        <label className="label_title col-md-5">¿Estas embarazada?:</label>
                                        <select value={embarazada} type="text" className="form-select2" autoFocus required onChange={(e) => { setEmbarazada(e.target.value)}}>
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                    : ""}
                                </div>

                                <label className="form-label titulos_labels">ANTECENDETES MEDICOS</label>
                                <div className='content_general mb-3 col-md-12'>
                                    <div className="mb-3 col-md-4 div_conten2 div_conten3">
                                        <label className="label_title col-md-5">Enfermedades: </label>
                                        <textarea value={enfermedades} type="text" className="form-control areas_textos" cols="50" onChange={(e) => { setEnfermedades(e.target.value)}} placeholder='Escribe aqui ...'></textarea>
                                    </div>
                                    <div className="mb-3 col-md-4 div_conten2 div_conten3">
                                        <label className="label_title col-md-5">Discapacidades: </label>
                                        <textarea value={discapacidades} type="text" className="form-control areas_textos" cols="50" onChange={(e) => { setDiscapacidades(e.target.value)}} placeholder='Escribe aqui ...'></textarea>
                                    </div>
                                    <div className="mb-3 col-md-4 div_conten2 div_conten3">
                                        <label className="label_title col-md-5">Paciente especial: </label>
                                        <textarea value={paciente_especial} type="text" className="form-control areas_textos" cols="50" onChange={(e) => { setPaciente_especial(e.target.value)}} placeholder='Escribe aqui ...'></textarea>
                                    </div>
                                </div>            
                            </div>
                        </div>   

                        <div className="d-flex gap-2 contentBtnRegistrar">
                            <input type="hidden" name="oculto" value="1" />
                            <Link to="/admin/clientes" className="btn btn-danger btnCancelar">Cancelar</Link>
                            <input  type="submit"className="btn btn-primary btnRegistrar" value="Editar" />
                        </div>
                    </form>
                </>
            </div>
            :<div className="dot-spinner dot-spinner3">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
            </div>}
        </div>
    )
}

export default EditarPaciente