import { useState, useEffect} from 'react'
import Mensaje from './Mensaje'
import cerrarBtn from '../img/cerrar.svg'


const Modal = ({
             setModal,
             animarModal, 
             setAnimarModal, 
             guardarGasto,
             gastoEditar,
             setGastoEditar
}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')


    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }


    const handleSubmit = e => {
        e.preventDefault();

        if ( [nombre, cantidad, categoria].includes('') ) {
              setMensaje('All fields are mandatory')

              setTimeout(() => {
                setMensaje('')
            }, 1500);
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
      
    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img    
                    src={cerrarBtn}
                    alt="close modal"
                    onClick={ocultarModal}
                />
            </div>
            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : 'cerrar' }`}>
                 <legend>{gastoEditar.nombre ? "Edit Expense" : "New expense"}</legend>
                 {mensaje && <Mensaje tipo='error'>{Mensaje}</Mensaje>}


                 <div className='campo'>
                    <label htmlFor="nombre">Expense name</label>
                    <input 
                        type="text" 
                        id="nombre"
                        placeholder='Add expense name'
                        value = {nombre}
                        onChange={ e =>setNombre(e.target.value)}
                    />
                 </div>

                 <div className='campo'>
                    <label htmlFor="cantidad">Quantity</label>
                    <input 
                        type="number" 
                        id="cantidad"
                        placeholder='Add expensive quantity'
                        value={cantidad}
                        onChange={ e => setCantidad(Number( e.target.value ))}
                    />
                 </div>

                 <div className='campo'>
                    <label htmlFor="categoria">Expense name</label>
                    <select 
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                        id="categoria">
                        <option value="">-- Select --</option>
                        <option value="ahorro">Savings</option>
                        <option value="comida">Food</option>
                        <option value="casa">Housing</option>
                        <option value="ocio">Leisure</option>
                        <option value="salud">Health</option>
                        <option value="suscripciones">Subscriptions</option>
                    </select>
                 </div>

                 <input 
                    type="submit"
                    value={gastoEditar.nombre ? "Save changes" : "Add expense"}
                />

            </form>

        </div>
    )
}

export default Modal
