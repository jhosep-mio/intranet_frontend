import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../../../helper/Global';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';
import { BsCloudUploadFill } from "react-icons/bs";


const ListaOrdenVirtual = () => {
    const [ordenes, setOrdenes] = useState( [] );
    const [itemPagination, setItemPagination] = useState( [] );
    const [servicios, setservicios] = useState( [] );
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [paginaActual, setpaginaActual] = useState(1);
    const [cantidadRegistros] = useState(4);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(0);
    let token = localStorage.getItem("token");

    useEffect ( () =>{
        const filter2 = ordenes.filter((odo) =>{
            return (
            quitarAcentos(`${odo.paciente} ${odo.paciente_apellido_p} ${odo.paciente_apellido_m}`.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
            quitarAcentos(`${odo.odontologo} ${odo.odontologo_apellido_p} ${odo.odontologo_apellido_m}`.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
            quitarAcentos(new Date(odo.created_at).toLocaleDateString()).includes(quitarAcentos(search.toLowerCase())) ||
            quitarAcentos(odo.estado === 0 ? "creado" : odo.estado === 1 ? "pendiente" : odo.estado === 2 ? "Realizado" : "").includes(quitarAcentos(search.toLowerCase())) ||
            odo.copOdontologo.toString().includes(search)
            )
        });
        
        setCargandoBusqueda(filter2.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect ( () =>{
        getAllOrdenes();
        getAllservicios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() =>{
        let items= [];
        if(paginaActual > 1){
            items.push(<li key="previous" className="paginate_button page-item previous" id="productos_previous" onClick={()=>{setpaginaActual(paginaActual - 1)}}  >
                            <Link aria-controls="productos" className="page-link">Anterior</Link>
                         </li>);
        }else{
            items.push(<li key="previous" className="paginate_button page-item previous disabled" id="productos_previous" >
                        <Link aria-controls="productos" className="page-link">Anterior</Link>
                    </li>);
        }
        for(let i =1; i <= Math.ceil(totalPosts / cantidadRegistros); i++){
            items.push(<Pagination.Item key={i} active={i=== paginaActual} onClick={(e)=>{setpaginaActual(i)}}>{i}</Pagination.Item>);
        }

        if(paginaActual < Math.ceil(totalPosts / cantidadRegistros)){
            items.push(<li key="next" className="paginate_button page-item next" id="productos_next" onClick={()=>{setpaginaActual(paginaActual + 1)}}>
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }else{
            items.push(<li key="next" className="paginate_button page-item next disabled" id="productos_next">
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }
        setItemPagination(items);
    },[ordenes,paginaActual,search])

    
    const getAllOrdenes= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allOrdenVirtuales`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setOrdenes(request.data);
        setCargandoBusqueda(request.data.length);
        setLoading(false);
    };


    const indexOfLastPost = paginaActual * cantidadRegistros;
    const indexOfFirstPost= indexOfLastPost - cantidadRegistros;
    let totalPosts = ordenes.length;

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 

    const filterDate = () =>{
        if(search.length === 0){
            let orden = ordenes.slice(indexOfFirstPost, indexOfLastPost);
            return orden;
        }

        const filter = ordenes.filter((odo) =>{
            return (
            quitarAcentos(`${odo.paciente} ${odo.paciente_apellido_p} ${odo.paciente_apellido_m}`.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
            quitarAcentos(`${odo.odontologo} ${odo.odontologo_apellido_p} ${odo.odontologo_apellido_m}`.toLowerCase()).includes(quitarAcentos(search.toLowerCase())) ||
            quitarAcentos(new Date(odo.created_at).toLocaleDateString()).includes(quitarAcentos(search.toLowerCase())) ||
            quitarAcentos(odo.estado === 0 ? "creado" : odo.estado === 1 ? "pendiente" : odo.estado === 2 ? "realizado" : "").includes(quitarAcentos(search.toLowerCase())) ||
            odo.copOdontologo.toString().includes(search)
            )
        });
        totalPosts= filter.length;
        return filter.slice(indexOfFirstPost, indexOfLastPost);
    }

    const onSeachChange = ({target}) =>{
        setpaginaActual(1);
        setSearch(target.value);
    }

    const preguntar = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de eliminar la clinica N° ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                deleteClinica(id);
            }
          })
    }

    const deleteClinica = async (id) =>{
        try {
            const resultado= await axios.delete(`${Global.url}/deleteClinica/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if(resultado.data.status === "success"){
                Swal.fire('Registro eliminado correctamente', '', 'success');
                getAllOrdenes();
                setTimeout(()=>{
                    setpaginaActual(Math.round(totalPosts / cantidadRegistros));
                }, 1000);
            }else{
                Swal.fire('Error al eliminar el registro', '', 'error');
            }
        } catch (error) {
                Swal.fire('Error al eliminar el registro', '', 'error');
        }
    }

    const getAllservicios= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allServicios`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setservicios(request.data);
        setLoading(false);
    };

    return (
        <div className="container mt-6 ms-5-auto">
            <div className="row justify-content-center">
                {/* TAMAÑO DE LA TABLA WIDTH  */}
                <div className="col-md-11">

                    <div className="d-grid">
                        <input type="hidden" name="oculto" value="1" />
                        <Link type="submit" className="btn btn-primary mb-3" to="validar"> <FontAwesomeIcon icon={faPlus}/> Registrar</Link>
                    </div>
                    {/* <!--==== TABLA PRODUCTOS ====--> */}
                    <div className="card">
                        <div className="card-header text-center fs-5 fw-bolder">
                            Lista de Ordenes Virtuales
                        </div>
                        <div className="p-4 table-responsive">
                            <div id="productos_filter" className="dataTables_filter">
                                <label>Buscar:<input 
                                value={search}
                                onChange={onSeachChange}
                                type="search" className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                </label>
                            </div>
                           
                            <Table id="productos" className="table align-middle table-hover display">
                                <thead className="table-light">
                                    <tr>
                                        {/* <!-- 1 --> */}
                                        <th scope="col" className="text-center">ID</th>
                                        {/* <!-- 2 --> */}
                                        <th scope="col" className="text-center">Paciente</th>

                                        <th scope="col" className="text-center">Tp. Estudio</th>

                                        <th scope="col" className="text-center">F. Creacion</th>

                                        <th scope="col" className="text-center">Doctor</th>

                                        <th scope="col" className="text-center">Estado</th>
                                        {/* <!-- 3 --> */}
                                        <th scope="col" className="text-center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    { loading === false ? filterDate().map((orden)=>(
                                        <tr key={orden.id}>
                                            
                                            <td  className="text-center">
                                                {orden.id}
                                            </td>

                                            <td  className="text-center" style={{maxWidth: '100px'}}>
                                                {orden.paciente} {orden.paciente_apellido_p} {orden.paciente_apellido_m}
                                            </td>

                                            <td  className="text-center" style={{maxWidth: '200px'}}>
                                                {JSON.parse(orden.listaItems).map((lista) =>(
                                                    servicios.map((serv) => (
                                                        lista.estado === true && serv.id === lista.id_servicio?
                                                        <li style={{}}>{serv.nombre}</li>
                                                        :""
                                                    ))
                                                ))}                 
                                            </td>
                                           
                                            <td  className="text-center" style={{maxWidth: '100px'}}>
                                                {new Date(orden.created_at).toLocaleDateString()}
                                                <br/>
                                                {new Date(orden.created_at).toLocaleTimeString()}
                                            </td>

                                            <td  className="text-center" style={{maxWidth: '100px'}}>
                                                {orden.odontologo} {orden.odontologo_apellido_p} {orden.odontologo_apellido_m}
                                            </td>

                                            <td  className="text-center">
                                                {orden.estado === 0 ?
                                                    <input style={{background: 'green'}} className="button_estado" type="text" value="Creado"/>
                                                :orden.estado === 1 ?
                                                <input style={{background: 'rgb(191, 191, 31)'}} className="button_estado" type="text" value="Pendiente"/>
                                                :orden.estado === 2 ?
                                                <input style={{background: '#D23741'}} className="button_estado" type="text" value="Realizado"/>
                                                : ""
                                                }
                                            </td>

                                            {/* <!-- 9. Opciones --> */}
                                            <td className="text-center">
                                                { orden.estado === 2 ?
                                                <Link className="text-success" to={`/admin/archivosEstudio/${orden.id}`} style={{marginRight: '10px'}}>
                                                    <BsCloudUploadFill style={{fontSize: '20px'}}/>
                                                </Link>
                                                : ""}
                                                <Link className="text-success" to={`/admin/ordenVirtual/editar/${orden.id}`}>
                                                <FontAwesomeIcon icon={faPencil}/>
                                                </Link>
                                                <button className="text-danger btnEliminar" onClick={()=>{preguntar(orden.id)}}>
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : 
                                    <tr colSpan="6" align="center" rowSpan="5">
                                        <td colSpan="6">
                                            <div className="dot-spinner">
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                                <div className="dot-spinner__dot"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    }

                                </tbody>
                            </Table>

                            <div className="dataTables_info" id="productos_info" role="status" aria-live="polite">
                              {
                              cargandoBusqueda
                              } Registros</div>
                            
                             <div className="dataTables_paginate paging_simple_numbers" id="productos_paginate">
                                <Pagination>
                                    {itemPagination.map((item) =>{
                                        return item;
                                    })}
                                </Pagination>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaOrdenVirtual