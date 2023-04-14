import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './../../../../styles/_especificos.scss'
import AgregarClinica2 from './AgregarClinica2';


const AgregarCliente = () => {

    //GENERAL
    let token = localStorage.getItem("token");
    const [estado, setEstado] = useState(false);
    const [validarEdad, setValidarEdad] = useState(true);
    const[clinicas, setClinicas] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  

    // PACIENTES
    const[rol, setRol] = useState(0);
    const[nombres, setNombres] = useState("");
    const[apellido_p, setApellido_p] = useState("");
    const[apellido_m, setApellido_m] = useState("");
    const[fecha, setFecha] = useState(0);

    const[nombre_poderado, setNombre_poderado] = useState("");
    const[tipo_documento_apoderado, setTipo_documento_apoderado] = useState(0);
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
    const [genero, setGenero] = useState(false);
   


    // ODONTOLOGOS
    const[clinica, setClinica] = useState(0);
    const[cop, setCop] = useState("");
    const[c_bancaria, setC_bancaria] = useState("");
    const[cci, setCci] = useState("");
    const[nombre_banco, setNombre_banco] = useState("");

    useEffect ( () =>{
        getClinicas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect ( () =>{
        getClinicas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

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

    const savePaciente = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('id_rol', rol);
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

        try {
            let respuesta = await axios.post(`${Global.url}/savePaciente`, data,{
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
            if(error.request.response.includes("numero_documento_paciente_odontologo")){
                Swal.fire('Documento ya registrado', '', 'error');
            }else if(error.request.response.includes("nombres")){
                Swal.fire('Nombre invalido', '', 'error');
            }else if(error.request.response.includes("apellido_p")){
                Swal.fire('Apellido paterno invalido', '', 'error');
            }else if(error.request.response.includes("apellido_m")){
                Swal.fire('Apellido materno invalido', '', 'error');
            }else{
                Swal.fire('Error no encontrado', '', 'error');
            }
        }
    }

    const saveOdontologo = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        const data = new FormData();
        data.append('id_rol', rol);
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
            if(error.request.response.includes("cop")){
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


    return (
        <div className="container col-md-10 mt-6">
            <div className="card">
               {estado === false ?
                <>
                <div className="card-header fw-bold">
                    Agregar - Paciente:
                </div>
                <form className="p-4 needs-validation d-flex flex-column gap-3" onSubmit={savePaciente}>
                    <div className="d-flex justify-content-between">

                        <div className="mb-3 col-md-2">
                            <label className="form-label">Tipo de cliente: </label>
                            <select value={rol} type="text" className="form-select" autoFocus required onChange={identificarCliente}>
                                <option value="0" >Paciente</option>
                                <option value="1" >Odontologo</option>
                            </select>
                        </div>

                        <div className="mb-3 col-md-4">
                            <label className="form-label">Nombres: </label>
                            <input className="form-control" autoFocus required
                                value={nombres}
                                onChange={(e) => { setNombres(e.target.value) }}
                                type="text"
                            />
                        </div>

                        <div className="mb-3 col-md-2">
                            <label className="form-label">Apellido Paterno: </label>
                            <input className="form-control" autoFocus required
                                value={apellido_p}
                                onChange={(e) => { setApellido_p(e.target.value) }}
                                type="text"
                            />
                        </div>

                        <div className="mb-3 col-md-2">
                            <label className="form-label">Apellido materno: </label>
                            <input className="form-control" autoFocus required
                                value={apellido_m}
                                onChange={(e) => { setApellido_m(e.target.value) }}
                                type="text"
                            />
                        </div>
                    </div>
              
                    <div className="d-flex  justify-content-between">
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Fecha de nacimiento: </label>
                            <input className="form-control" autoFocus required
                                value={fecha}
                                onChange={(e) => { setFecha(e.target.value) }}
                                type="date"/>
                        </div> 

                        <div className="mb-3 col-md-3">
                            <label className="form-label">Tipo de documento: </label>
                            <select value={tipo_documento_paciente_odontologo} type="text" className="form-select" autoFocus required onChange={(e) => { setTipo_documento_paciente_odontologo(e.target.value)}}>
                                <option value="0">DNI</option>
                                <option value="1">RUC</option>
                                <option value="2">Pasaporte</option>
                                <option value="3">Carnet de Extranjería</option>
                            </select>
                        </div> 
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Numero de documento: </label>
                            <input className="form-control" autoFocus required
                                value={numero_documento_paciente_odontologo}
                                onChange={(e) => { setNumero_documento_paciente_odontologo(e.target.value) }}
                                type="text"/>
                        </div> 
                    </div>
                    {validarEdad ?  ""  
                    :                     
                    <div className='contenedor_apoderado_'>
                        <h4 className='title_editor2'>INFORMACION DEL APODERADO</h4>
                        <div className="d-flex  justify-content-between">
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Nombre: </label>
                                <input className="form-control" autoFocus required
                                    value={nombre_poderado}
                                    onChange={(e) => { setNombre_poderado(e.target.value) }}
                                    type="text"/>
                            </div> 

                            <div className="mb-3 col-md-3">
                                <label className="form-label">Tipo de documento: </label>
                                <select value={tipo_documento_apoderado} type="text" className="form-select"  onChange={(e) => { setTipo_documento_apoderado(e.target.value)}} autoFocus required>
                                    <option value="0">DNI</option>
                                    <option value="1">RUC</option>
                                    <option value="2">Pasaporte</option>
                                    <option value="3">Carnet de Extranjería</option>
                                </select>
                            </div> 
                            <div className="mb-3 col-md-4">
                                <label className="form-label">Numero de documento: </label>
                                <input className="form-control" autoFocus required
                                    value={documento_apoderado}
                                    onChange={(e) => { setDocumento_apoderado(e.target.value) }}
                                    type="text"/>
                            </div> 
                        </div>
                    </div>}
                    <div className="d-flex  justify-content-between">
                        <div className="mb-3 col-md-3">
                            <label className="form-label">Celular: </label>
                            <input className="form-control" autoFocus required
                                value={celular}
                                onChange={(e) => { setCelular(e.target.value) }}
                                type="number"/>
                        </div> 

                        <div className="mb-3 col-md-3">
                            <label className="form-label">Correo: </label>
                            <input className="form-control" autoFocus required
                                value={correo}
                                onChange={(e) => { setCorreo(e.target.value) }}
                                type="email"/>
                        </div> 
                        <div className="mb-3 col-md-3 ">
                            <label className="form-label">Genero: </label>
                            <select value={generoPaciente} type="text" className="form-select" autoFocus required onChange={indentificarGenero}>
                                <option value="0">Hombre</option>
                                <option value="1">Mujer</option>
                            </select>
                        </div> 
                        {
                        genero ? 
                        <div className="mb-3 col-md-2">
                            <label className="form-label">¿Esta embarazada?: </label>
                            <select value={embarazada}  type="text" className="form-select" autoFocus required onChange={(e) => { setEmbarazada(e.target.value)}}>
                                <option value="0">si</option>
                                <option value="1">no</option>
                            </select>
                        </div> 
                         : ""}
                    </div>

                    <h4 className='title_editor'>ANTECENDETES MEDICOS</h4>

                    <div className="d-flex  justify-content-between">

                        <div className="mb-3 col-md-4">
                            <label className="form-label">Enfermedades: </label>
                            <textarea value={enfermedades} type="text" className="form-control areas_textos" cols="50" onChange={(e) => { setEnfermedades(e.target.value)}}></textarea>
                        </div> 

                        <div className="mb-3 col-md-3">
                            <label className="form-label">Discapacidades: </label>
                            <textarea value={discapacidades} type="text" className="form-control areas_textos" cols="50" onChange={(e) => { setDiscapacidades(e.target.value)}}></textarea>
                        </div> 
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Paciente especial: </label>
                            <textarea value={paciente_especial} type="text" className="form-control areas_textos" cols="50" onChange={(e) => { setPaciente_especial(e.target.value)}}></textarea>
                        </div> 
                    </div>

                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/clientes" className="btn btn-danger btnCancelar">Cancelar</Link>
                        {estado === false ? <input  type="submit"className="btn btn-primary btnRegistrar" value="Registrar" />: ""} 
                    </div>
                </form>
                </>
               : <>
               <div className="card-header fw-bold">
                   Agregar - Odontologo:
               </div>
               <form className="p-4 needs-validation d-flex flex-column gap-3" onSubmit={saveOdontologo}>
                   <div className="d-flex justify-content-between">

                       <div className="mb-3 col-md-2">
                           <label className="form-label">Tipo de cliente: </label>
                           <select value={rol} type="text" className="form-select" autoFocus required onChange={identificarCliente}>
                               <option value="0" >Paciente</option>
                               <option value="1" >Odontologo</option>
                           </select>
                       </div>

                       <div className="mb-3 col-md-4">
                           <label className="form-label">Nombres: </label>
                           <input className="form-control" autoFocus required
                               value={nombres}
                               onChange={(e) => { setNombres(e.target.value) }}
                               type="text"
                           />
                       </div>

                       <div className="mb-3 col-md-2">
                           <label className="form-label">Apellido Paterno: </label>
                           <input className="form-control" autoFocus required
                               value={apellido_p}
                               onChange={(e) => { setApellido_p(e.target.value) }}
                               type="text"
                           />
                       </div>

                       <div className="mb-3 col-md-2">
                           <label className="form-label">Apellido materno: </label>
                           <input className="form-control" autoFocus required
                               value={apellido_m}
                               onChange={(e) => { setApellido_m(e.target.value) }}
                               type="text"
                           />
                       </div>
                   </div>

                   <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Clinica: </label>
                            <select value={clinica} type="text" className="form-select"  autoFocus required onChange={(e)=>{setClinica(e.target.value)}}>
                                <option key={0} value={0}>Ninguno</option>
                                {clinicas.map((clini) => (
                                <option key={clini.id} value={clini.id}>{clini.nombre}</option>
                                ))
                                }
                            </select>
                        </div> 

                        <div className="mb-3 col-md-3">
                            <label className="form-label">COP: </label>
                            <input className="form-control" autoFocus 
                                value={cop}
                                onChange={(e) => { setCop(e.target.value) }}
                                type="text"
                            />
                        </div>

                        <div className="mb-3 col-md-4">
                            <label className="form-label">Cuenta de Banco: </label>
                            <input className="form-control" autoFocus 
                                value={c_bancaria}
                                onChange={(e) => { setC_bancaria(e.target.value) }}
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-3 boton_agregar_clinica">
                            <input type="button" className="btn btn-primary btnRegistrar" value="Agregar Clinica" onClick={handleShow}/>
                        </div>

                        <Modal show={show} onHide={handleClose} animation={false} >
                            <Modal.Header closeButton>
                            </Modal.Header>
                            <Modal.Body>
                                <AgregarClinica2 cerrar={handleClose}/>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                            {/* <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button> */}
                            </Modal.Footer>
                        </Modal>

                        <div className="mb-3 col-md-4">
                            <label className="form-label">CCI: </label>
                            <input className="form-control" autoFocus 
                                value={cci}
                                onChange={(e) => { setCci(e.target.value) }}
                                type="text"
                            />
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label">Nombre de Banco: </label>
                            <input className="form-control" autoFocus
                                value={nombre_banco}
                                onChange={(e) => { setNombre_banco(e.target.value) }}
                                type="text"
                            />
                        </div>
                    </div>
             
                   <div className="d-flex  justify-content-between">
                       <div className="mb-3 col-md-4">
                           <label className="form-label">Fecha de nacimiento: </label>
                           <input className="form-control" autoFocus required
                               value={fecha}
                               onChange={(e) => { setFecha(e.target.value) }}
                               type="date"/>
                       </div> 

                       <div className="mb-3 col-md-3">
                           <label className="form-label">Tipo de documento: </label>
                           <select value={tipo_documento_paciente_odontologo} type="text" className="form-select" autoFocus required onChange={(e) => { setTipo_documento_paciente_odontologo(e.target.value)}}>
                               <option value="0">DNI</option>
                               <option value="1">RUC</option>
                               <option value="2">Pasaporte</option>
                               <option value="3">Carnet de Extranjería</option>
                           </select>
                       </div> 
                       <div className="mb-3 col-md-4">
                           <label className="form-label">Numero de documento: </label>
                           <input className="form-control" autoFocus required
                               value={numero_documento_paciente_odontologo}
                               onChange={(e) => { setNumero_documento_paciente_odontologo(e.target.value) }}
                               type="text"/>
                       </div> 
                   </div>

                   <div className="d-flex  justify-content-between">
                       <div className="mb-3 col-md-4">
                           <label className="form-label">Celular: </label>
                           <input className="form-control" autoFocus required
                               value={celular}
                               onChange={(e) => { setCelular(e.target.value) }}
                               type="number"/>
                       </div> 

                       <div className="mb-3 col-md-4">
                           <label className="form-label">Correo: </label>
                           <input className="form-control" autoFocus required
                               value={correo}
                               onChange={(e) => { setCorreo(e.target.value) }}
                               type="email"/>
                       </div> 
                       <div className="mb-3 col-md-3 ">
                           <label className="form-label">Genero: </label>
                           <select value={generoPaciente} type="text" className="form-select" autoFocus required onChange={indentificarGenero}>
                               <option value="0">Hombre</option>
                               <option value="1">Mujer</option>
                           </select>
                       </div> 
                   </div>

                   <div className="d-flex gap-2 contentBtnRegistrar">
                       <input type="hidden" name="oculto" value="1" />
                       <Link to="/admin/clientes" className="btn btn-danger btnCancelar">Cancelar</Link>
                        <input  type="submit"className="btn btn-primary btnRegistrar" value="Registrar" />
                   </div>
               </form>
               </>
               }
            </div>
        </div>
    )
}

export default AgregarCliente