import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AgregarOdontologo from './AgregarOdontologo';
import { BsPlusCircleFill } from "react-icons/bs";

const EditarOrdenVirtual = () => {
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const[impresionCheck, setImpresionCheck] = useState([]);
    let token = localStorage.getItem("token");
    const[varon, setVaron] = useState(false);
    const[mujer, setMujer] = useState(false);
    const[idServicio, setIdServicio] = useState(0);
    const[odontologos, setOdontologos] = useState([]);
    const[servicios, setServicios] = useState([]);
    const[items, setItems] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [search, setSearch] = useState('');
    const[nombres, setNombres] = useState("");
    const[edad, setEdad] = useState(0);
    const[celular, setCelular] = useState(0);
    const[genero, setGenero] = useState(0);
    const[fecha, setFecha] = useState(0);
    const[odontologo, setOdontologo] = useState("");
    const[cop, setCop] = useState("");
    const[emailOdon, setEmailOdon] = useState("");
    const[botonDoctor, setBotonDoctor] = useState(false)
    //ORDEN VIRTUAL
    const[idPaciente,setIdPaciente] = useState(0);
    const[idOdontologo, setIdOdontologo] = useState(0);
    const[consulta, setConsulta] = useState("");
    const[estadoG, setEstadoG] = useState(0);

    const[box18, setBox18] = useState(false);
    const[box17, setBox17] = useState(false);
    const[box16, setBox16] = useState(false);
    const[box15, setBox15] = useState(false);
    const[box14, setBox14] = useState(false);
    const[box13, setBox13] = useState(false);
    const[box12, setBox12] = useState(false);
    const[box11, setBox11] = useState(false);

    const[box21, setBox21] = useState(false);
    const[box22, setBox22] = useState(false);
    const[box23, setBox23] = useState(false);
    const[box24, setBox24] = useState(false);
    const[box25, setBox25] = useState(false);
    const[box26, setBox26] = useState(false);
    const[box27, setBox27] = useState(false);
    const[box28, setBox28] = useState(false);

    const[box48, setBox48] = useState(false);
    const[box47, setBox47] = useState(false);
    const[box46, setBox46] = useState(false);
    const[box45, setBox45] = useState(false);
    const[box44, setBox44] = useState(false);
    const[box43, setBox43] = useState(false);
    const[box42, setBox42] = useState(false);
    const[box41, setBox41] = useState(false);

    const[box31, setBox31] = useState(false);
    const[box32, setBox32] = useState(false);
    const[box33, setBox33] = useState(false);
    const[box34, setBox34] = useState(false);
    const[box35, setBox35] = useState(false);
    const[box36, setBox36] = useState(false);
    const[box37, setBox37] = useState(false);
    const[box38, setBox38] = useState(false);

    const[siConGuias, setSiConGuias] = useState(true);
    const[noConGuias, setNoConGuias] = useState(false);

    const[otrosAnalisis, setOtrosAnalisis] = useState("");
    const[totalPrecio, setTotalPrecio] = useState(0);
    const[metodoPago, setMetodoPago] = useState("");
    const[agregarComisiones, setAgregarComisiones] = useState(false);
    const[fechaCreacion, setFechaCreacion] = useState("");

    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const onSeachChange = ({target}) =>{
        setSearch(target.value);
    }

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 

    const getAllOdontologos= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allOdontologos`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setOdontologos(request.data);
    };

    const getAllServicios= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allServicios`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setServicios(request.data)
        setIdServicio(request.data[0].id);
    };

    const getAllItems= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allItemServices`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setItems(request.data);
    };

    const llenarArray = (orden) => {
        const ordenExisente = elementos.findIndex(
            (ordenExisente) => ordenExisente.id_item === orden.id_item
            );

          if (ordenExisente === -1) {
            setElementos([...elementos, orden]);
          } else {
            const nuevaOrden = [...elementos];
            nuevaOrden[ordenExisente] = orden;
            setElementos(nuevaOrden);
          }
    };

    const llenarImpresion = (orden) => {
        setAgregarComisiones(false);
        const ordenExisente = impresionCheck.findIndex((ordenExisente) => (
                ordenExisente.id === orden.id
            )
        );
            
          if (ordenExisente === -1) {
            setImpresionCheck([...impresionCheck, orden]);
          } else {
            const nuevaOrden = [...impresionCheck];
            nuevaOrden[ordenExisente] = orden;
            setImpresionCheck(nuevaOrden);
          }
    };

    const AGREGARPRECIO = () =>{
        let count=0;
        if(agregarComisiones === false){
            for (let i = 0; i < elementos.length; i++) {
                for (let j = 0; j <impresionCheck.length; j++) {
                    if(elementos[i].estado === true && elementos[i].precio === (elementos[i].precio_impresion)-(elementos[i].comision_impreso)){
                        elementos[i].precio = (elementos[i].precio_impresion);
                    }else if(elementos[i].estado === true && elementos[i].precio === (elementos[i].precio_digital)-(elementos[i].comision_digital)){
                        elementos[i].precio = (elementos[i].precio_digital);
                    }
                    if(elementos[i].id_servicio == impresionCheck[j].id && impresionCheck[j].estado === true && elementos[i].estado === true){
                        elementos[i].precio = elementos[i].precio_impresion;
                    }else  if(elementos[i].id_servicio == impresionCheck[j].id && impresionCheck[j].estado === false && elementos[i].estado === true){
                        elementos[i].precio = elementos[i].precio_digital;
                    }
                    count++;
                }
            }
            if(count === 0){
                for (let i = 0; i < elementos.length; i++) {
                    count=0;
                    elementos[i].precio = elementos[i].precio_digital;
                }
            }    
        }else{
            for (let i = 0; i < elementos.length; i++) {
                for (let j = 0; j <impresionCheck.length; j++) {
                    if(elementos[i].estado === true && elementos[i].precio === elementos[i].precio_impresion){
                        elementos[i].precio = (elementos[i].precio_impresion)-(elementos[i].comision_impreso);
                    }else if(elementos[i].estado === true && elementos[i].precio === elementos[i].precio_digital){
                        elementos[i].precio = (elementos[i].precio_digital)-(elementos[i].comision_digital);
                    }
                    count++;
                }
            }

            if(count === 0){
                for (let i = 0; i < elementos.length; i++) {
                    count=0;
                    elementos[i].precio = (elementos[i].precio_digital)-(elementos[i].comision_digital);
                }
            }   

        }  
        setTotalPrecio(elementos.reduce((acumulador, producto) => {
            return acumulador = acumulador + (
                producto.estado === true ? 
                (parseFloat(producto.precio)) 
                : 0
                );
        }, 0))
    }

    useEffect(()=>{
        AGREGARPRECIO();
    },[agregarComisiones])
    
    useEffect(()=>{
        AGREGARPRECIO();
    }, [impresionCheck])

    useEffect(()=>{
        AGREGARPRECIO();
    }, [elementos])

    useEffect(()=>{
        filterDate()
    }, [search])


    useEffect(()=>{
        search.length === 0 ? setBotonDoctor(false) : setBotonDoctor(true);
    }, [search])

    useEffect(() =>{
        getAllOdontologos();
        getAllServicios();
        getAllItems();
        getOneOrden();
    },[])

    const filterDate = async() =>{
        
        if(search.length > 4){
            const filter = odontologos.filter(
            odon => odon.cop.toString() === (search)
            );

            if(filter.length === 1) {
                if(filter[0].cop.toString().length === search.length){
                    setOdontologo(`${filter[0].nombres} ${filter[0].apellido_p} ${filter[0].apellido_m}`);
                    setCop(filter[0].cop);
                    setIdOdontologo(filter[0].id);
                    setEmailOdon(filter[0].correo);
                    setBotonDoctor(false);
                    return filter[0];
                }
            }else{
                const filter = [];
                setOdontologo("");
                setCop("");
                setEmailOdon("");
                return filter[0];
            }

        }else if(search.length === 0){
            const oneOdontologo = await axios.get(`${Global.url}/oneOdontologo/${idOdontologo}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            setOdontologo(`${oneOdontologo.data.nombres} ${oneOdontologo.data.apellido_p} ${oneOdontologo.data.apellido_m}`);
            setCop(oneOdontologo.data.cop);
            setIdOdontologo(oneOdontologo.data.id);
            setEmailOdon(oneOdontologo.data.correo);
        }else{
            const filter = [];
            setOdontologo("");
            setCop("");
            setEmailOdon("");
            return filter[0];
        }
    }

    const UpdateOrdenVirtual = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");

        const data = new FormData();
        data.append('id_paciente', idPaciente);
        data.append('id_odontologo', idOdontologo);
        data.append('consulta', consulta);

        data.append('box18', box18 === true ? 1 : 0);
        data.append('box17', box17 === true ? 1 : 0);
        data.append('box16', box16 === true ? 1 : 0);
        data.append('box15', box15 === true ? 1 : 0);
        data.append('box14', box14 === true ? 1 : 0);
        data.append('box13', box13 === true ? 1 : 0);
        data.append('box12', box12 === true ? 1 : 0);
        data.append('box11', box11 === true ? 1 : 0);

        data.append('box21', box21 === true ? 1 : 0);
        data.append('box22', box22 === true ? 1 : 0);
        data.append('box23', box23 === true ? 1 : 0);
        data.append('box24', box24 === true ? 1 : 0);
        data.append('box25', box25 === true ? 1 : 0);
        data.append('box26', box26 === true ? 1 : 0);
        data.append('box27', box27 === true ? 1 : 0);
        data.append('box28', box28 === true ? 1 : 0);

        data.append('box48', box48 === true ? 1 : 0);
        data.append('box47', box47 === true ? 1 : 0);
        data.append('box46', box46 === true ? 1 : 0);
        data.append('box45', box45 === true ? 1 : 0);
        data.append('box44', box44 === true ? 1 : 0);
        data.append('box43', box43 === true ? 1 : 0);
        data.append('box42', box42 === true ? 1 : 0);
        data.append('box41', box41 === true ? 1 : 0);

        data.append('box31', box31 === true ? 1 : 0);
        data.append('box32', box32 === true ? 1 : 0);
        data.append('box33', box33 === true ? 1 : 0);
        data.append('box34', box34 === true ? 1 : 0);
        data.append('box35', box35 === true ? 1 : 0);
        data.append('box36', box36 === true ? 1 : 0);
        data.append('box37', box37 === true ? 1 : 0);
        data.append('box38', box38 === true ? 1 : 0);

        data.append('siConGuias', siConGuias == true ? 1 : 0);
        data.append('noConGuias', noConGuias == true ? 1 : 0);

        data.append('listaServicios', JSON.stringify(impresionCheck));
        data.append('listaItems', JSON.stringify(elementos));
        data.append('precio_final', totalPrecio);
        data.append('metodoPago', metodoPago === null ? "" : metodoPago);

        data.append('otrosAnalisis', otrosAnalisis);
        data.append('estado', estadoG);
        data.append('activeComision', agregarComisiones === true ? 1 : 0);

        data.append('_method', 'PUT');

        try {
            let respuesta= await axios.post(`${Global.url}/updateOrdenVirtual/${id}`, data,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(respuesta.data.status === "success"){
                Swal.fire('Agreado correctamente', '', 'success');
                navigate('/admin/ordenVirtual');
            }else{
                Swal.fire('Error al agregar el registro', '', 'error');
            }
        } catch (error) {
            console.log(error.request.response);
        }

    }

    const getOneOrden = async() =>{
        setLoading(true);
        const oneOrden = await axios.get(`${Global.url}/oneOrdenVirtual/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setIdPaciente(oneOrden.data.verOrden.id_paciente);
        setIdOdontologo (oneOrden.data.verOrden.id_odontologo);
        setConsulta(oneOrden.data.verOrden.consulta);

        setBox18(oneOrden.data.verOrden.box18 === 1 ? true : false)
        setBox17(oneOrden.data.verOrden.box17 === 1 ? true : false)
        setBox16(oneOrden.data.verOrden.box16 === 1 ? true : false)
        setBox15(oneOrden.data.verOrden.box15 === 1 ? true : false)
        setBox14(oneOrden.data.verOrden.box14 === 1 ? true : false)
        setBox13(oneOrden.data.verOrden.box13 === 1 ? true : false)
        setBox12(oneOrden.data.verOrden.box12 === 1 ? true : false)
        setBox11(oneOrden.data.verOrden.box11 === 1 ? true : false)

        setBox21(oneOrden.data.verOrden.box21 === 1 ? true : false)
        setBox22(oneOrden.data.verOrden.box22 === 1 ? true : false)
        setBox23(oneOrden.data.verOrden.box23 === 1 ? true : false)
        setBox24(oneOrden.data.verOrden.box24 === 1 ? true : false)
        setBox25(oneOrden.data.verOrden.box25 === 1 ? true : false)
        setBox26(oneOrden.data.verOrden.box26 === 1 ? true : false)
        setBox27(oneOrden.data.verOrden.box27 === 1 ? true : false)
        setBox28(oneOrden.data.verOrden.box28 === 1 ? true : false)

        setBox48(oneOrden.data.verOrden.box48 === 1 ? true : false)
        setBox47(oneOrden.data.verOrden.box47 === 1 ? true : false)
        setBox46(oneOrden.data.verOrden.box46 === 1 ? true : false)
        setBox45(oneOrden.data.verOrden.box45 === 1 ? true : false)
        setBox44(oneOrden.data.verOrden.box44 === 1 ? true : false)
        setBox43(oneOrden.data.verOrden.box43 === 1 ? true : false)
        setBox42(oneOrden.data.verOrden.box42 === 1 ? true : false)
        setBox41(oneOrden.data.verOrden.box41 === 1 ? true : false)

        setBox31(oneOrden.data.verOrden.box31 === 1 ? true : false)
        setBox32(oneOrden.data.verOrden.box32 === 1 ? true : false)
        setBox33(oneOrden.data.verOrden.box33 === 1 ? true : false)
        setBox34(oneOrden.data.verOrden.box34 === 1 ? true : false)
        setBox35(oneOrden.data.verOrden.box35 === 1 ? true : false)
        setBox36(oneOrden.data.verOrden.box36 === 1 ? true : false)
        setBox37(oneOrden.data.verOrden.box37 === 1 ? true : false)
        setBox38(oneOrden.data.verOrden.box38 === 1 ? true : false)

        setSiConGuias(oneOrden.data.verOrden.siConGuias)
        setNoConGuias(oneOrden.data.verOrden.noConGuias)

        setOtrosAnalisis(oneOrden.data.verOrden.otrosAnalisis)
        setTotalPrecio(oneOrden.data.verOrden.precio_final)
        setMetodoPago(oneOrden.data.verOrden.metodoPago === null ? 0 : oneOrden.data.verOrden.metodoPago    )
        setEstadoG(oneOrden.data.verOrden.estado)
        const fecha_at = new Date(oneOrden.data.verOrden.created_at)
        setFechaCreacion(`${fecha_at.toLocaleTimeString()} - ${fecha_at.toLocaleDateString()}`)
        setImpresionCheck(JSON.parse(oneOrden.data.verOrden.listaServicios))
        setElementos(JSON.parse(oneOrden.data.verOrden.listaItems))
        setAgregarComisiones(oneOrden.data.verOrden.activeComision === 1 ? true : false);

        const onePaciente = await axios.get(`${Global.url}/onePaciente/${oneOrden.data.verOrden.id_paciente}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setNombres(`${onePaciente.data.nombres} ${onePaciente.data.apellido_p} ${onePaciente.data.apellido_m}`);
        setEdad(calcularEdad(onePaciente.data.f_nacimiento));
        setFecha(onePaciente.data.f_nacimiento);
        setCelular(onePaciente.data.celular);
        setGenero(onePaciente.data.genero);

        if(onePaciente.data.genero == 0 ){
            setVaron(true);
        }else if (onePaciente.data.genero == 1){
            setMujer(true);
        }

        const oneOdontologo = await axios.get(`${Global.url}/oneOdontologo/${oneOrden.data.verOrden.id_odontologo}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setOdontologo(`${oneOdontologo.data.nombres} ${oneOdontologo.data.apellido_p} ${oneOdontologo.data.apellido_m}`);
        setCop(oneOdontologo.data.cop);
        setIdOdontologo(oneOdontologo.data.id);
        setEmailOdon(oneOdontologo.data.correo);
        setLoading(false);
    }

    return (
        <div className="container col-md-9 mt-6">
            {loading === false ?
            <div className="card">
                <div className="card-header fw-bold">
                    Editar orden Virtual:
                </div>
                <form className="p-4 needs-validation" onSubmit={UpdateOrdenVirtual}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img">
                           <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="mb-3 col-md-11" style={{margin: '0 auto'}}>
                            <label className="form-label titulos_labels">GENERAL </label>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-4 div_conten2">
                                    <label className="label_title col-md-5">Total a pagar: </label>
                                    <input className="form-control form-control3 form-control2" disabled required
                                        value={(totalPrecio).toFixed(2)}
                                        type="text"
                                        onChange={(e) => setTotalPrecio(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-3 div_conten2">
                                    <label className="label_title col-md-5">Restar comisiones: </label>
                                    <input type="checkbox" className='on_active'
                                        value={agregarComisiones}
                                        checked={agregarComisiones}
                                        onChange={(e) => setAgregarComisiones(e.target.checked)}
                                    />
                                </div>
                                <div className="mb-3 col-md-5 div_conten">
                                    <label className="label_title col-md-5">Metodo de pago: </label>
                                    <select value={metodoPago} type="text" className=" form-select2" autoFocus required onChange={(e)=> {setMetodoPago(e.target.value)}}>
                                        <option value="0" >POS</option>
                                        <option value="1" >Efectivo</option>
                                        <option value="2" >Transferencia</option>
                                    </select>
                                </div>
                            </div>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title">ESTADO: </label>
                                    {
                                        estadoG === 0 ?
                                        <input style={{background: 'green'}} className="button_estado" type="button" value={"Creado"} onClick={()=> {setEstadoG(1)}}/>
                                        : estadoG === 1 ?
                                        <input style={{background: 'rgb(191, 191, 31)'}} className="button_estado" type="button" value="Pendiente" onClick={()=> {setEstadoG(2)}}/>
                                        : estadoG === 2 ?
                                        <input style={{background: '#D23741'}} className="button_estado" type="button" value="Realizado" onClick={()=> {setEstadoG(0)}}/>
                                        : ""
                                    }
                                </div>
                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">Fecha de creacion:</label>
                                    <input className="form-control form-control3 form-control2" disabled
                                        value={fechaCreacion}
                                        type="text"
                                        onChange={(e) => setFechaCreacion(e.target.value)}
                                    />
                                </div>
                            </div>
                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>DATOS DEL PACIENTE </label>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-10 div_conten2">
                                    <label className="label_title col-md-5">Nombres: </label>
                                    <input className="form-control form-control3" disabled  required
                                        value={nombres}
                                        type="text"
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-2 div_conten">
                                    <label className="label_title col-md-5">Edad: </label>
                                    <input className="form-control form-control3 form-control2" disabled  required
                                        value={edad}
                                        type="text"
                                        onChange={(e) => setEdad(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-5 div_conten2">
                                    <label className="label_title col-md-5">Fecha de Nacimiento: </label>
                                    <input className="form-control form-control3 form-control2" disabled  required
                                        value={fecha}
                                        type="text"
                                        onChange={(e) => setFecha(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-3 div_conten2" style={{justifyContent: 'center'}}>
                                    <label className="label_title col-md-5">Sexo:</label>
                                    <span className=''>M</span>
                                    <input value={varon} type="checkbox" className='on_active' disabled onChange={(e) => setVaron(e.target.checked)} checked={varon} />
                                    <span className="">F</span>
                                    <input value={mujer} type="checkbox" className='on_active' disabled onChange={(e) => setMujer(e.target.checked)} checked={mujer}/>
                                </div>

                                <div className="mb-3 col-md-4 div_conten">
                                    <label className="label_title col-md-5">Telefono: </label>
                                    <input className="form-control form-control3 form-control2"  disabled  required
                                        value={celular}
                                        type="text"
                                        onChange={(e) => setCelular(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title col-md-5" >Motivo de consulta: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={consulta}
                                        type="text"
                                        onChange={(e) => setConsulta(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='div_busqueda'>
                                <div>
                                    <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>DATOS DEL DOCTOR(A) </label>
                                    {botonDoctor === true ?
                                        <BsPlusCircleFill style={{marginLeft: '20px', fontSize: '30px', color: '#906B9F', cursor: 'ponter'}} onClick={handleShow}/>
                                    :""
                                    }
                                </div>
                                <label>Buscar:<input 
                                    value={search}
                                    maxLength={10}
                                    onChange={onSeachChange}
                                    type="text"  className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                </label>
                            </div>
                            
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten">
                                    <label className="label_title col-md-5">Doctor(a): </label>
                                    <input className="form-control form-control3" required disabled
                                        value={odontologo}
                                        type="text"
                                        onChange={(e) => setOdontologo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title col-md-5">C.O.P: </label>
                                    <input className="form-control form-control3" required disabled
                                        value={cop}
                                        type="text"
                                        onChange={(e) => setCop(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title col-md-5">EMAIL: </label>
                                    <input className="form-control form-control3 form-control2" required disabled
                                        value={emailOdon}
                                        type="text"
                                        onChange={(e) => setEmailOdon(e.target.value)}
                                    />
                                </div>
                            </div>

                            {idServicio != 0 ?
                            <Accordion defaultActiveKey={idServicio} style={{marginTop: '20px'}}>
                                {servicios.map((servicio) => (
                                <Accordion.Item eventKey={servicio.id} key={servicio.id}>
                                    <Accordion.Header> 
                                        <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>{servicio.nombre}</label>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            servicio.impreso === 1 ?
                                            <div className='item_impresion'>
                                                <span className=''>¿Impresion?</span>
                                                <input type="checkbox" 
                                                    checked={impresionCheck.find(estado => estado.id === servicio.id)?.estado || false}
                                                    id={"checkboxi"+servicio.id} className='on_active'  
                                                    onChange={(e)=>{llenarImpresion({
                                                        id: servicio.id, 
                                                        estado: e.target.checked, 
                                                    })}}
                                                />
                                            </div>
                                            : ""
                                        }
                                        <div  className='mb-3 col-md-12 div_general_box'>
                                            <ul className="mb-3 col-md-12 div_secundario">
                                                {items.map((item) => (
                                                item.id_servicio === servicio.id ?   
                                                <li key={item.id} className='content_checkBox'>
                                                    <input type="checkbox" 
                                                    checked={elementos.find(estado => estado.id_item === item.id)?.estado || false}
                                                    id={"checkboxi"+item.id} className='on_active'  
                                                    onChange={
                                                        (e)=>{llenarArray({
                                                        id_item: item.id, 
                                                        id_servicio: servicio.id, 
                                                        estado: e.target.checked, 
                                                        estadoServicio: impresionCheck.find(estado => estado.id === servicio.id)?.estado === true ? true : false, 
                                                        precio: item.precio_digital,
                                                        precio_impresion: item.precio_impresion,
                                                        precio_digital: item.precio_digital,
                                                        comision_impreso: item.comision_impreso,
                                                        comision_digital: item.comision_digital,
                                                        })}
                                                    }
                                                    />
                                                    <span className=''>{item.nombre}</span>
                                                </li>
                                                : ""
                                                ))}
                                            </ul>
                                        </div>

                                        {servicio.id === 1 ?
                                        <>
                                        <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>IMPLANTES / ENDODONCIA</label>
                                        <div className='mb-3 col-md-12 div_box_generl_bot'>
                                            <div className="mb-3 col-md-12 div_tercero">
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box18} onChange={(e) => setBox18(e.target.checked)} checked={box18}/>
                                                    <span className=''>18</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box17} onChange={(e) => setBox17(e.target.checked)} checked={box17}/>
                                                    <span className="">17</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box16} onChange={(e) => setBox16(e.target.checked)} checked={box16}/>
                                                    <span className="">16</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box15} onChange={(e) => setBox15(e.target.checked)} checked={box15}/>
                                                    <span className="">15</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box14} onChange={(e) => setBox14(e.target.checked)} checked={box14}/>
                                                    <span className="">14</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box13} onChange={(e) => setBox13(e.target.checked)} checked={box13}/>
                                                    <span className="">13</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box12} onChange={(e) => setBox12(e.target.checked)} checked={box12}/>
                                                    <span className="">12</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box11} onChange={(e) => setBox11(e.target.checked)} checked={box11}/>
                                                    <span className="">11</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box21} onChange={(e) => setBox21(e.target.checked)} checked={box21}/>
                                                    <span className="">21</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box22} onChange={(e) => setBox22(e.target.checked)} checked={box22}/>
                                                    <span className="">22</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box23} onChange={(e) => setBox23(e.target.checked)} checked={box23}/>
                                                    <span className="">23</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box24} onChange={(e) => setBox24(e.target.checked)} checked={box24}/>
                                                    <span className="">24</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box25} onChange={(e) => setBox25(e.target.checked)} checked={box25}/>
                                                    <span className="">25</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box26} onChange={(e) => setBox26(e.target.checked)} checked={box26}/>
                                                    <span className="">26</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box27} onChange={(e) => setBox27(e.target.checked)} checked={box27}/>
                                                    <span className="">27</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box28} onChange={(e) => setBox28(e.target.checked)} checked={box28}/>
                                                    <span className="">28</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-3 col-md-12 '>
                                            <div className="mb-3 col-md-12 div_tercero">
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box48} onChange={(e) => setBox48(e.target.checked)} checked={box48} />
                                                    <span className=''>48</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box47} onChange={(e) => setBox47(e.target.checked)} checked={box47}/>
                                                    <span className="">47</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box46} onChange={(e) => setBox46(e.target.checked)} checked={box46}/>
                                                    <span className="">46</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box45} onChange={(e) => setBox45(e.target.checked)} checked={box45}/>
                                                    <span className="">45</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box44} onChange={(e) => setBox44(e.target.checked)} checked={box44}/>
                                                    <span className="">44</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box43} onChange={(e) => setBox43(e.target.checked)} checked={box43}/>
                                                    <span className="">43</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box42} onChange={(e) => setBox42(e.target.checked)} checked={box42}/>
                                                    <span className="">42</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box41} onChange={(e) => setBox41(e.target.checked)} checked={box41}/>
                                                    <span className="">41</span>
                                                </div>

                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box31} onChange={(e) => setBox31(e.target.checked)} checked={box31}/>
                                                    <span className="">31</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box32} onChange={(e) => setBox32(e.target.checked)} checked={box32}/>
                                                    <span className="">32</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box33} onChange={(e) => setBox33(e.target.checked)} checked={box33}/>
                                                    <span className="">33</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box34} onChange={(e) => setBox34(e.target.checked)} checked={box34}/>
                                                    <span className="">34</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box35} onChange={(e) => setBox35(e.target.checked)} checked={box35}/>
                                                    <span className="">35</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box36} onChange={(e) => setBox36(e.target.checked)} checked={box36}/>
                                                    <span className="">36</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box37} onChange={(e) => setBox37(e.target.checked)} checked={box37}/>
                                                    <span className="">37</span>
                                                </div>
                                                <div className='content_cuadrados'>
                                                    <input type="checkbox" className='' value={box38} onChange={(e) => setBox38(e.target.checked)} checked={box38}/>
                                                    <span className="">38</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mb-3 col-md-12 div_bot_box2'>
                                            <span className='label_title2'>MUY IMPORTANTE: ¿El paciente es enviado con guias?</span> 
                                            <div className='content_checkBox2'>
                                                <span className="">Si</span>
                                                <input type="checkbox" className='on_active' checked={siConGuias}  value={siConGuias} onChange={(e) =>{
                                                    setSiConGuias(e.target.checked)
                                                    setNoConGuias(false)
                                                }
                                                } />
                                            </div>
                                            <div className='content_checkBox2'>
                                                <span className="">No</span>
                                                <input type="checkbox" className='on_active'  value={noConGuias} onChange={(e) => {setNoConGuias(e.target.checked) , setSiConGuias(false)}} checked={noConGuias} />
                                            </div>
                                        </div>
                                        </>
                                        : ""}
                                    </Accordion.Body>
                                </Accordion.Item>
                                ))}
                            </Accordion>
                            : ""}
                            <label className="form-label titulos_labels" style={{margin: '20px 0 10px 0'}}>OTROS: </label>

                            <div className='mb-3 col-md-12 div_general_box div_general_box2'>
                                <div className="mb-3 col-md-12">
                                    <textarea type="text" className="form-control areas_textos colorarea" cols="70"  required  value={otrosAnalisis} onChange={(e) => setOtrosAnalisis(e.target.value)}></textarea>
                                </div>
                            </div>
                       </div>

                       <Modal show={show} onHide={handleClose} animation={false} >
                        <Modal.Body>
                            <AgregarOdontologo cerrar={handleClose}/>
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

                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/ordenVirtual" className="btn btn-danger btnCancelar">Cancelar</Link>
                        <input type="submit" className="btn btn-primary btnRegistrar" value="Continuar" />
                    </div>
                </form>
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

export default EditarOrdenVirtual