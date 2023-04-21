import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Global } from '../../../../helper/Global';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';
import { BsFillCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";


const ListaServicios = () => {
    let token = localStorage.getItem("token");

    const [itemServices, setitemServices] = useState( [] );
    const [servicios, setservicios] = useState( [] );

    const [itemPagination, setItemPagination] = useState( [] );
    const [itemPaginationOdonto, setItemPaginationOdonto] = useState( [] );


    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [paginaActual, setpaginaActual] = useState(1);
    const [paginaActualOdonto, setPaginaActualOdonto] = useState(1);

    const [cantidadRegistros] = useState(4);
    const [cargandoBusqueda, setCargandoBusqueda] = useState(0);
    const [cargandoBusqueda2, setCargandoBusqueda2] = useState(0);
    const [activo, setActivo] = useState(0);


    useEffect ( () =>{
        const filter2 = itemServices.filter((cate) => {
            return (
                quitarAcentos(cate.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });
        setCargandoBusqueda(filter2.length);


        const filter3 = servicios.filter((cate) => {
            return (
                quitarAcentos(cate.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });
        setCargandoBusqueda2(filter3.length);
    }, [search]);

    useEffect ( () =>{
        getAllitemServices();
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
    },[itemServices,paginaActual,search]);


    useEffect(() =>{
        let items= [];
        if(paginaActualOdonto > 1){
            items.push(<li key="previous" className="paginate_button page-item previous" id="productos_previous" onClick={()=>{setPaginaActualOdonto(paginaActualOdonto - 1)}}  >
                            <Link aria-controls="productos" className="page-link">Anterior</Link>
                         </li>);
        }else{
            items.push(<li key="previous" className="paginate_button page-item previous disabled" id="productos_previous" >
                        <Link aria-controls="productos" className="page-link">Anterior</Link>
                    </li>);
        }
        for(let i =1; i <= Math.ceil(totalPostsOdonto / cantidadRegistros); i++){
            items.push(<Pagination.Item key={i} active={i=== paginaActualOdonto} onClick={(e)=>{setPaginaActualOdonto(i)}}>{i}</Pagination.Item>);
        }

        if(paginaActualOdonto < Math.ceil(totalPostsOdonto / cantidadRegistros)){
            items.push(<li key="next" className="paginate_button page-item next" id="productos_next" onClick={()=>{setPaginaActualOdonto(paginaActualOdonto + 1)}}>
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }else{
            items.push(<li key="next" className="paginate_button page-item next disabled" id="productos_next">
                            <Link aria-controls="productos" className="page-link">Siguiente</Link>
                        </li>);
        }
        setItemPaginationOdonto(items);
    },[servicios,paginaActualOdonto,search]);

    const cambiarActivo = (id) =>{
        setActivo(id);
    }

    const getAllitemServices= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allItemServices`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }); 

        setitemServices(request.data);
        setCargandoBusqueda(request.data.length);
        setLoading(false);
    };

    const getAllservicios= async () =>{
        setLoading(true);

        const request = await axios.get(`${Global.url}/allServicios`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        setservicios(request.data);
        setCargandoBusqueda2(request.data.length);
        setLoading(false);
    };

    const indexOfLastPost = paginaActual * cantidadRegistros;
    const indexOfFirstPost= indexOfLastPost - cantidadRegistros;
    let totalPosts = itemServices.length;

    const indexOfLastPostOdonto = paginaActualOdonto * cantidadRegistros;
    const indexOfFirstPostOdonto= indexOfLastPostOdonto - cantidadRegistros;
    let totalPostsOdonto = servicios.length;

    function quitarAcentos(cadena){
        const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
        return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
    } 

    const filterDate = () =>{
        if(search.length === 0){
            let item = itemServices.slice(indexOfFirstPost, indexOfLastPost);
            return item;
        }

        const filter = itemServices.filter((item) => {
            return (
                quitarAcentos(item.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });

        totalPosts= filter.length;
        return filter.slice(indexOfFirstPost, indexOfLastPost);
    }

    const filterDateservicios = () =>{
        if(search.length === 0){
            let servicio = servicios.slice(indexOfFirstPostOdonto, indexOfLastPostOdonto);
            return servicio;
        }

        const filter = servicios.filter((serv) => {
            return (
                quitarAcentos(serv.nombre.toLowerCase()).includes(quitarAcentos(search.toLowerCase()))
            );
        });

        totalPosts= filter.length;
        return filter.slice(indexOfFirstPostOdonto, indexOfLastPostOdonto);
    }

    const onSeachChange = ({target}) =>{
        setpaginaActual(1);
        setPaginaActualOdonto(1);
        setSearch(target.value);
    }

    const preguntar = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de eliminar al item N° ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                deleteitem(id);
            }
          })
    }

    const preguntar2 = (id) =>{
        Swal.fire({
            title: `¿Estas seguro de eliminar al servicio N° ${id}?`,
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            if (result.isConfirmed) {
                deleteServicio(id);
            }
          })
    }

    const deleteitem = async (id) =>{
        try {
            const resultado= await axios.delete(`${Global.url}/deleteitem/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(resultado.data.status);
            
            if(resultado.data.status === "success"){
                Swal.fire('Registro eliminado correctamente', '', 'success');
                getAllservicios();
                setTimeout(()=>{
                    if(Math.round(totalPosts / cantidadRegistros) === paginaActual){

                    }else{
                        setpaginaActual(Math.round(totalPosts / cantidadRegistros));
                    }
                }, 1000);
            }else{
                Swal.fire('Error al eliminar el registro', '', 'error');
            }
        } catch (error) {
                Swal.fire('Error al eliminar el registro', '', 'error');
        }
    }

    const deleteServicio = async (id) =>{
        try {
            const resultado= await axios.delete(`${Global.url}/deleteServicio/${id}`,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(resultado.data.status);
            
            if(resultado.data.status === "success"){
                Swal.fire('Registro eliminado correctamente', '', 'success');
                getAllitemServices();
                setTimeout(()=>{
                    if(Math.round(totalPostsOdonto / cantidadRegistros) === paginaActualOdonto){

                    }else{
                        setItemPaginationOdonto(Math.round(totalPostsOdonto / cantidadRegistros));
                    }
                }, 1000);
            }else{
                Swal.fire('Error al eliminar el registro', '', 'error');
            }
        } catch (error) {
                Swal.fire('Error al eliminar el registro', '', 'error');
        }
    }

    return (
        <div className="container mt-6 ms-5-auto">
            <div className="row justify-content-center">
                {/* TAMAÑO DE LA TABLA WIDTH  */}
                <div className="col-md-11">

                    {activo === 0 ?
                    <div className="d-grid">
                        <input type="hidden" name="oculto" value="1" />
                        <Link type="submit" className="btn btn-primary mb-3" to="agregar/item" style={{width: '200px'}}> <FontAwesomeIcon icon={faPlus}/> Registrar Item</Link>
                    </div>
                    :
                    <div className="d-grid">
                        <input type="hidden" name="oculto" value="1" />
                        <Link type="submit" className="btn btn-primary mb-3" to="agregar/servicio" style={{width: '250px'}}> <FontAwesomeIcon icon={faPlus}/> Registrar Categoria</Link>
                    </div>
                    }
                    {/* <!--==== TABLA PRODUCTOS ====--> */}
                    <div className="card">
                        <div className="card-header text-center fs-5 fw-bolder" style={{transition: 'all 500ms'}}>
                            Lista de {activo === 0 ? "Items-Servicios" : "Servicos" } 
                        </div>
                        <div className='content_top_filters'>
                                <div className='content_top_filters__buttons'>
                                    <button onClick={() => cambiarActivo(0)} style={{
                                                backgroundColor: 0 === activo ? '#41326D' : 'transparent',
                                                color: 0 === activo ? 'white' : '#41326D'
                                    }}>Items</button>
                                    <button onClick={() => cambiarActivo(1)} style={{
                                                backgroundColor: 1 === activo ? '#41326D' : 'transparent',
                                                color: 1 === activo ? 'white' : '#41326D'
                                    }}>servicios</button>
                                </div>
                                <div id="productos_filter" className="dataTables_filter">
                                    <label>Buscar:<input 
                                    value={search}
                                    onChange={onSeachChange}
                                    type="search" className="form-control form-control-sm" placeholder="" aria-controls="productos"/>
                                    </label>
                                </div>
                        </div>
                        
                        {activo === 0 ?
                            <div className="p-4 table-responsive odon_itemServices">
                                <Table id="productos" className="table align-middle table-hover display">
                                    <thead className="table-light">
                                        <tr>
                                            {/* <!-- 1 --> */}
                                            <th scope="col" className="text-center">ID</th>
                                            {/* <!-- 2 --> */}
                                            <th scope="col" className="text-center">Nombre</th>

                                            <th scope="col" className="text-center">Servicio</th>

                                            <th scope="col" className="text-center">Precio Impresion</th>

                                            <th scope="col" className="text-center">Precio Digital</th>

                                            {/* <!-- 3 --> */}
                                            <th scope="col" className="text-center">Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        { loading === false ? filterDate().map( (item)=>(
                                            <tr key={item.id}>
                                                
                                                <td  className="text-center">
                                                    {item.id}
                                                </td>

                                                <td  className="text-truncate" style={{maxWidth: '200px'}}>
                                                    {item.nombre}
                                                </td>

                                                <td  className="text-center">
                                                    {item.servicio}
                                                </td>

                                                <td  className="text-center">
                                                    {item.precio_impresion}
                                                </td>

                                                <td  className="text-center">
                                                    {item.precio_digital}
                                                </td>

                                                {/* <!-- 9. Opciones --> */}
                                                <td className="text-center">
                                                    <Link className="text-success" to={`/admin/servicios/editar/item/${item.id}`}>
                                                    <FontAwesomeIcon icon={faPencil}/>
                                                    </Link>
                                                    <button className="text-danger btnEliminar" onClick={()=>{preguntar(item.id)}}>
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
                        : 
                            <div className="p-4 table-responsive odon_itemServices">
                                <Table id="productos" className="table align-middle table-hover display">
                                    <thead className="table-light">
                                        <tr>
                                            <th scope="col" className="text-center">ID</th>

                                            <th scope="col" className="text-center">Nombre</th>

                                            <th scope="col" className="text-center">Impresion</th>

                                            {/* <!-- 3 --> */}
                                            <th scope="col" className="text-center">Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableBody">
                                        { loading === false ? filterDateservicios().map( (servicio)=>(
                                            <tr key={servicio.id}>
                                                
                                                <td  className="text-center">
                                                    {servicio.id}
                                                </td>

                                                <td  className="text-center">
                                                    {servicio.nombre}
                                                </td>

                                                <td  className="text-center">
                                                    {servicio.impreso === 1 ? <BsFillCheckSquareFill className='icon_status_check'/> : <BsFillXSquareFill className='icon_status_no'/>}
                                                </td>

                                                {/* <!-- 9. Opciones --> */}
                                                <td className="text-center">
                                                    <Link className="text-success" to={`/admin/servicios/editar/${servicio.id}`}>
                                                    <FontAwesomeIcon icon={faPencil}/>
                                                    </Link>
                                                    {servicio.id === 1 ? ""
                                                    :
                                                    <button className="text-danger btnEliminar" onClick={()=>{preguntar2(servicio.id)}}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>}
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
                                cargandoBusqueda2
                                } Registros</div>
                                
                                <div className="dataTables_paginate paging_simple_numbers" id="productos_paginate">
                                    <Pagination>
                                        {itemPaginationOdonto.map((item) =>{
                                            return item;
                                        })}
                                    </Pagination>
                                </div> 
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListaServicios