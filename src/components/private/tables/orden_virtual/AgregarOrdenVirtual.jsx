import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';
import logo from "./../../../../assets/logos/logo.png";


const AgregarOrdenVirtual = () => {

    useEffect(() =>{
        getCliente();
        getAllOdontologos();
        getAllServicios();
        getAllItems();
    },[])


    let token = localStorage.getItem("token");

    const[varon, setVaron] = useState(false);
    const[mujer, setMujer] = useState(false);

    const[odontologos, setOdontologos] = useState([]);
    const[servicios, setServicios] = useState([]);
    const[items, setItems] = useState([]);
    const [elementos, setElementos] = useState([]);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const[nombres, setNombres] = useState("");
    const[edad, setEdad] = useState(0);
    const[celular, setCelular] = useState(0);
    const[genero, setGenero] = useState(0);
    const[fecha, setFecha] = useState(0);
    const[odontologo, setOdontologo] = useState("");
    const[cop, setCop] = useState("");
    const[emailOdon, setEmailOdon] = useState("");


    //ORDEN VIRTUAL
    const[idPaciente,setIdPaciente] = useState(0);
    const[idOdontologo, setIdOdontologo] = useState(0);
    const[consulta, setConsulta] = useState("");
    
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

    const[siConGuias, setSiConGuias] = useState(false);
    const[noConGuias, setNoConGuias] = useState(false);


    const[otrosAnalisis, setOtrosAnalisis] = useState("");
    const[totalPrecio, setTotalPrecio] = useState(0);
    const[metodoPago, setMetodoPago] = useState("");


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

    const getCliente = ()=>{
        let paciente = JSON.parse(localStorage.getItem("paciente"));
        setIdPaciente(paciente.id);
        setNombres(`${paciente.nombres} ${paciente.apellido_p} ${paciente.apellido_m}`);
        setEdad(calcularEdad(paciente.f_nacimiento));
        setFecha(paciente.f_nacimiento);
        setCelular(paciente.celular);
        setGenero(paciente.genero);

        if(paciente.genero == 0 ){
            setVaron(true);
        }else if (paciente.genero == 1){
            setMujer(true);
        }
    }

    const getAllOdontologos= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allOdontologos`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setOdontologos(request.data);
        setLoading(false);
    };

    const getAllServicios= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allServicios`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setServicios(request.data);
        setLoading(false);
    };

    const getAllItems= async () =>{
        setLoading(true);
        const request = await axios.get(`${Global.url}/allItemServices`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        setItems(request.data);
        setLoading(false);
    };

    useEffect(()=>{
        filterDate()
    }, [search])

    const filterDate = () =>{
        
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
                    return filter[0];
                }
            }else{
                const filter = [];
                setIdOdontologo(0);
                setOdontologo("");
                setCop("");
                setEmailOdon("");
                return filter[0];
            }

        }else {
            const filter = [];
            setIdOdontologo(0);
            setOdontologo("");
            setCop("");
            setEmailOdon("");
            return filter[0];
        }
    }

    const llenarArray = (orden) => {
        const ordenExisente = elementos.findIndex(
            (ordenExisente) => ordenExisente.id_item === orden.id_item
          );

        //   if (!ordenExisente) {
        //     setElementos([...elementos, orden]);
        //   }

          if (ordenExisente === -1) {
            setElementos([...elementos, orden]);
          } else {
            const nuevaOrden = [...elementos];
            nuevaOrden[ordenExisente] = orden;
            setElementos(nuevaOrden);
          }

        console.log(elementos)
    };

    useEffect(()=>{
        const total = elementos.reduce((acumulador, producto) => {
                return acumulador = acumulador + (producto.estado === true ? (parseFloat(producto.precio)) : 0);
        }, 0); // 0 es el valor inicial del acumulador
        setTotalPrecio(total);
    }, [elementos])

    const saveOrdenVirtual = async (e) => {
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

        data.append('listaItems', JSON.stringify(elementos));
        data.append('precio_final', totalPrecio);
        data.append('metodoPago', metodoPago);

        data.append('otrosAnalisis', otrosAnalisis);
        data.append('estado', 0);

        try {
            let respuesta = await axios.post(`${Global.url}/saveOrdenVirtual`, data,{
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
            let doctorcampo = document.querySelector('.disabled_item').value;
            if(doctorcampo.length <=0){
                Swal.fire('Debe registrar el doctor', '', 'error');
            }
            else if((error.request.response).includes("listaItems")){
                Swal.fire('Por lo menos debe seleccionar un servicio', '', 'error');
            }
            else if((error.request.response).includes("consulta")){
                Swal.fire('El campo consulta es obligatorio', '', 'error');
            }
        }

    }

    return (
        <div className="container col-md-9 mt-6">
            {loading === false ?
            <div className="card">
                <div className="card-header fw-bold">
                    Agregar orden Virtual:
                </div>
                <form className="p-4 needs-validation" onSubmit={saveOrdenVirtual}>
                    <div className="d-flex justify-content-between">
                        <div className="mb-3 col-md-12 content_img">
                           <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="mb-3 col-md-11">
                            <label className="form-label titulos_labels">DATOS DEL PACIENTE </label>
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-10 div_conten2">
                                    <label className="label_title">Nombres: </label>
                                    <input className="form-control form-control3" disabled  required
                                        value={nombres}
                                        type="text"
                                        onChange={(e) => setNombres(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-2 div_conten">
                                    <label className="label_title">Edad: </label>
                                    <input className="form-control form-control3" disabled  required
                                        value={edad}
                                        type="text"
                                        onChange={(e) => setEdad(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-5 div_conten2">
                                    <label className="label_title">Fecha de Nacimiento: </label>
                                    <input className="form-control form-control3" disabled  required
                                        value={fecha}
                                        type="text"
                                        onChange={(e) => setFecha(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-3 div_conten2">
                                    <label className="label_title">Sexo:</label>
                                    <span className=''>M</span>
                                    <input value={varon} type="checkbox" className='on_active' disabled onChange={(e) => setVaron(e.target.checked)} checked={varon} />
                                    <span className="">F</span>
                                    <input value={mujer} type="checkbox" className='on_active' disabled onChange={(e) => setMujer(e.target.checked)} checked={mujer}/>
                                </div>

                                <div className="mb-3 col-md-4 div_conten">
                                    <label className="label_title">Telefono: </label>
                                    <input className="form-control form-control3 form-control2"  disabled  required
                                        value={celular}
                                        type="text"
                                        onChange={(e) => setCelular(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten2">
                                    <label className="label_title " >Motivo de consulta: </label>
                                    <input className="form-control form-control3" autoFocus required
                                        value={consulta}
                                        type="text"
                                        onChange={(e) => setConsulta(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='div_busqueda'>
                                <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>DATOS DEL DOCTOR(A) </label>
                                <label>Buscar:<input 
                                    value={search}
                                    maxLength={10}
                                    onChange={onSeachChange}
                                    type="text"  className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                </label>
                            </div>
                            
                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-12 div_conten2">
                                    <label className="label_title">Doctor(a): </label>
                                    <input className="form-control form-control3 disabled_item" disabled  required  
                                        value={odontologo}
                                        type="text"
                                        onChange={(e) => setOdontologo(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='content_general mb-3 col-md-12'>
                                <div className="mb-3 col-md-6 div_conten2">
                                    <label className="label_title">C.O.P: </label>
                                    <input className="form-control form-control3 " disabled  required 
                                        value={cop}
                                        type="text"
                                        onChange={(e) => setCop(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3 col-md-6 div_conten">
                                    <label className="label_title">EMAIL: </label>
                                    <input className="form-control form-control3 form-control2 " disabled  required 
                                        value={emailOdon}
                                        type="text"
                                        onChange={(e) => setEmailOdon(e.target.value)}
                                    />
                                </div>
                            </div>


                            {servicios.map((servicio) => (
                            <div key={servicio.id}>
                            <label className="form-label titulos_labels" style={{margin: '10px 0 10px 0'}}>{servicio.nombre}</label>
                            <div  className='mb-3 col-md-12 div_general_box'>
                                <ul className="mb-3 col-md-12 div_secundario">
                                    {items.map((item) => (
                                     item.id_servicio === servicio.id ?   
                                    <li key={item.id} className='content_checkBox chsscjcon'>
                                        <input  type="checkbox" className='on_active'  onChange={(e)=>{llenarArray({id_item: item.id, estado: e.target.checked , precio: item.precio_venta})}}
                                        />
                                        <span className=''>{item.nombre}</span>
                                    </li>
                                    : ""
                                    ))}
                                </ul>
                            </div>
                            </div>
                            ))}
                            <div className='mb-3 col-md-12 div_general_box div_general_box2'>
                                <div className="mb-3 col-md-8 div_secundario">
                                    <textarea type="text" className="form-control areas_textos" cols="50"    value={otrosAnalisis} onChange={(e) => setOtrosAnalisis(e.target.value)} placeholder='Otros:'></textarea>
                                </div>
                            </div>
                       </div>
                    </div>
                    <div className="d-flex gap-2 contentBtnRegistrar">
                        <input type="hidden" name="oculto" value="1" />
                        <Link to="/admin/ordenVirtual/validar" className="btn btn-danger btnCancelar">Cancelar</Link>
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

export default AgregarOrdenVirtual