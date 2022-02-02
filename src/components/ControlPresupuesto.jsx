import { number } from "prop-types"
import { useState,useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
            gastos, 
            setGastos, 
            presupuesto, 
            setPresupuesto,
            setIsValidPresupuesto
        }) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponble] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
            const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0);
            const totalDisponible = presupuesto - totalGastado;
            
            // Calcular porcentaje gastado
            const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2)

            setGastado(totalGastado)
            setDisponble(totalDisponible)
            
            setTimeout(() => {
                setPorcentaje(nuevoPorcentaje)
            }, 1500);

    }, [gastos])


    const formatearCantidad = (cantidad) =>{
       return cantidad.toLocaleString ('en-US', {
           style: "currency",
           currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Are you sure do you want to reset the budget and expenses?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'> 
            <div>
                <CircularProgressbar
                    styles = {buildStyles({
                        pathColor : porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor : '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje} 
                    text={`${porcentaje}% Spent`}              
                />               
            </div>
            <div className='contenido-presupuesto'>
                <button 
                    className="reset-app"
                    type="buton"
                    onClick={handleResetApp}
                    >
                    Reset App
                </button>
                 <p>
                     <span>Budget: </span> {formatearCantidad(Number(presupuesto))}
                 </p>
                 <p className={`${disponible < 0 ?  "negativo" : "" } `}>
                     <span>Available: </span> {formatearCantidad(disponible)}
                 </p>
                 <p>
                     <span>Spent: </span> {formatearCantidad(gastado)}
                 </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
