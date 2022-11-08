import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {
	const [tarea, setTarea] = useState ("")
	const [lista, setLista] = useState ([])

	const GetData = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/AgustinPungitore')
    	.then((response) => response.json()) //lo transformamos en un json
    	.then((data) => setLista(data)) //lo guardamos en un objeto
	}
	
	const UploadData = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/AgustinPungitore', {
	  method: "PUT",
	  body: JSON.stringify(listOfTodos),
	  headers: {
		"Content-Type": "application/json"
	  }
	})
	.then(resp => {
		console.log(resp.ok); // will be true if the response is successfull
		console.log(resp.status); // the status code = 200 or code = 400 etc.
		console.log(resp.text()); // will try return the exact result as string
		return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
	})
	.then(data => {
		//here is were your code should start after the fetch finishes
		console.log(data); //this will print on the console the exact object received from the server
	})
	.catch(error => {
		//error handling
		console.log(error);
	});
	}

	useEffect( () => {
		GetData()
		UploadData()
	}, [])








	function addTarea (e) {
		
		
		if (e.key === "Enter"){
			console.log(tarea)	
			setLista([...lista,tarea])
			setTarea("")
		}
	}


	const eliminarTarea = (index) => {
		console.log(index)
		const listaNueva = lista.filter((item, i) => {
			if (index !== i) {
				return item
			}
		} )
		setLista(listaNueva)

	}

	return (
	<>
		<div className="container col-8 text-center">	
		<h1> My To-Do List </h1>
			<div className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Agregar tarea" onChange={(e)=>setTarea(e.target.value)}
			 onKeyDown={addTarea} value={tarea} /> 
			{/* value para setear un valor inicial */}
			</div>
		</div>
		<div className="container col-8 text-center">
			<ul>
			{lista.map ((item, index) => {return (<li  key={index}> {item} </li>)})}
			{lista.map ((item, index) => {return (<li  key={index}> {item} <button onClick={()=>eliminarTarea(index)}>🗑️</button></li>)})} 
			</ul>
		</div>
	</>
	);
};

export default Home;
