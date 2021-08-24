import React from 'react'

function SpinnerCargando() {
    return (
        <div className="spinner-mini">
            <p>Cargando</p>
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden"></span> 
            </div>
        </div>
    )
}

export default SpinnerCargando
