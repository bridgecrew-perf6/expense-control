import { useState, useEffect } from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
        gastos, 
        setGastoEditar, 
        eliminarGasto,
        filtro,
        gastosFiltrados
    }) => {

const [totalGastado, setTotalGastado] = useState(0)

   useEffect(() => {
    if(gastos.length > 0){
        const resultado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
        setTotalGastado(resultado);}
   }, [gastos])


    return (
        <> 
            <div className="listado-gastos contenedor">            
            { filtro ? (

                    <>
                    <h2>{gastosFiltrados.length ? "Expenses list": "There no expenses on this category" } </h2>
                        { gastosFiltrados.map( gasto => (
                            <Gasto
                                key = {gasto.id}
                                gasto = {gasto}
                                setGastoEditar ={setGastoEditar}
                                eliminarGasto = {eliminarGasto}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? "Expenses list": "There no expenses yet" } </h2>
                        {gastos.map( gasto => (
                            <Gasto
                                key = {gasto.id}
                                gasto = {gasto}
                                setGastoEditar ={setGastoEditar}
                                eliminarGasto = {eliminarGasto}
                            />
                        ))}
                    </>
                )

            }
        
        
            </div>
            <div className='contenedor total'>
                {/* <h3>{gastos.length > 0 && `Total: $${totalGastado}` }</h3> */}
            </div>
        
        </>
       
    )
}

export default ListadoGastos
