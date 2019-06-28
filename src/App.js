import React, { useState, useEffect }from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'

function App() {
	// state principal
	// ciudad = state, guardarCiudad = this.state()
	const [ciudad, guardarCiudad] = useState('')
	const [pais, guardarPais] = useState('')
	const [error, guardarError] = useState(false)
	const [resultado, guardarResultado] = useState({})

	useEffect(()=>{
		// prevernir ejecucion
		if (ciudad === '') {
			return;
		}
		const consultarAPI = async () => {
			const appid = '08be0498394bb7b5d9393ea8836cc0c1'
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
	
			const respuesta = await fetch(url);
			const resultado = await respuesta.json()
			guardarResultado(resultado);			
		}

		consultarAPI();
	},[ciudad, pais]);
	
	const datosConsulta = datos => {
		
		// validar que ambos campos esten
		if (datos.ciudad === '' || datos.pais === '') {
			guardarError(true)
			return;
		}
		// ciuadad y pais existen agregarlos al state
		guardarCiudad(datos.ciudad)
		guardarPais(datos.pais)
		guardarError(false)
	}

	// Cargar un componente condicionalmente
	let componente;
	if (error) {
		componente = <Error mensaje='Ambos campos son obligatorios'/>
	} else if (resultado.cod === "404") {
		componente = <Error mensaje='La ciudad no existe en nuestro registro'/>
	} else {
		componente = <Clima
			resultado={resultado}
		/>;
	}

	return (
		<div className="App">
			<Header
			titulo="Clima React App"
			/>
			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col s12 m6">
							<Formulario
								datosConsulta={datosConsulta}
							/>
						</div>
						<div className="col s12 m6">
							{componente}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
