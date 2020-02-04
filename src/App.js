import React, { useState } from 'react';


const API = 'http://practicatendencias-env.bmcingrtpt.us-east-1.elasticbeanstalk.com/subir-imagen'

function App() {

  const [archivo, setArchivo] = useState(null)
  const [imagen, setImagen] = useState(null)

  function onChange(event) {
    setArchivo(event.target.files[0])
  }

  async function subirImagen(event) {
    event.preventDefault()
    if (archivo) {
      setImagen(null)
      const body = new FormData();
      body.append('imagen', archivo)

      const res = await fetch(API, { method: 'POST', body })
      const json = await res.json()
      setImagen(json.url)

      /*
      const json = await fetch(API, { method: 'POST', body }).then(res => res.json())
      setImagen(json.url)
      fetch(API, {
        method: 'POST',
        body: body
      }).then(res => res.json())
        .then(json => {
          setImagen(json.url)
        })
      */
    } else {
      alert('DEBE SELECCIONAR UN ARCHIVO PRIMERO')
    }
  }


  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-12">
          <form>
            <div className="form-group">
              <label>Seleccionar Imagen:</label>
              <input type="file" className="form-control-file"
                onChange={onChange}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={subirImagen}>Subir a S3</button>
          </form>
        </div>


        <div className="col-12">

          {imagen && <img className="img-fluid" src={imagen} alt="ESTA ES LA IMAGEN DE S3" />}

        </div>


      </div>



    </div>
  );
}

export default App;
