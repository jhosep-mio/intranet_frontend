import {React,  useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Global } from '../../../../helper/Global';
import Swal from 'sweetalert2';

const ModalSeperado = (props) => {
  const { show, handleClose, id_servicio ,id_item, id_orden} = props;

  const[arrayArchivos, setArrayArchivos] = useState([]);
  const[imagenes, setImagenes] = useState([]);

  const changeImage = (e) => {
      const files = e.target.files;
      const fileNames = Array.from(files).map(file => file.name);
      setArrayArchivos([...arrayArchivos,  fileNames]); 
      setImagenes({
          archivo: files,
      });
  };
  const handleSubirImagenes = async (event) => {
      event.preventDefault();
      let token = localStorage.getItem("token");

      const data = new FormData();
      const files = event.target.files;

      data.append('id_orden', id_orden);
      data.append('id_servicio', id_servicio);
      data.append('id_item_servicio', id_item);

      for (let i = 0; i < files.length; i++) {
        data.append('archivo[]', files[i]);
      }

      try {
        let respuesta = await axios.post(`${Global.url}/saveArchivos`, data,{
          headers:{
              'Authorization': `Bearer ${token}`
          }
      });
        if(respuesta.data.status === "success"){
            console.log("succes")
            // Swal.fire('Agreado correctamente', '', 'success');
            // navigate('/admin/categoria');
        }else{
            // Swal.fire('Error al agregar el registro', '', 'error');
            console.log("error")
        }
    } catch (error) {
        console.log(error.request.response)
        // Swal.fire('Complete todos los campos', '', 'warning');
    }
  }

  const handleDeleteImages = () => {
    // Llamada a la API para eliminar las imágenes
    try {
      let respuesta = await axios.post(`${Global.url}/saveArchivos`, data,{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
      if(respuesta.data.status === "success"){
          console.log("succes")
          // Swal.fire('Agreado correctamente', '', 'success');
          // navigate('/admin/categoria');
      }else{
          // Swal.fire('Error al agregar el registro', '', 'error');
          console.log("error")
      }
  } catch (error) {
      console.log(error.request.response)
      // Swal.fire('Complete todos los campos', '', 'warning');
  }
  };


  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subir Archivos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className="d-flex  justify-content-center">
                  <div className="mb-3 col-md-5">
                      <label className="form-label">Imagen: </label>
                          <br />
                          <div className="image-upload-wrap">
                              <input
                                  className="file-upload-input"
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  onChange={handleSubirImagenes}
                              />
                              <div className="text-information">
                                  <h3>Drag and drop a file or select add Image</h3>
                              </div>
                              {/* {
                                  arrayArchivos.map(function(comida) {
                                      return (`${comida}`).replace(/,/g, "-----");
                                  })
                              } */}
                          </div>
                  </div>  
                </div>
                <div className="d-flex gap-2 contentBtnRegistrar">
                    <input type="hidden" name="oculto" value="1" />
                    <input type="submit" className="btn btn-primary btnRegistrar" value="Registrar" />
                </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
export default ModalSeperado;