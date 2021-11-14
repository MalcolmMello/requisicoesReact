import { useEffect, useState } from "react"

type Cars = {
    [tag: string]: { 
      id: number,
      brand: string,
      name: string,
      year: number,
      photo: string,
      price: number
  }
}

export default () => {
  const [cars, setCars] = useState<Cars[]>([])

  const getCars  = () => {
    fetch('https://api.b7web.com.br/carros/api/carros')
      .then(function(result) {
        return result.json();
      })
      .then(function(json) {
        if(json.error === '') {
          setCars( json.cars )
        } else {
          alert( json.error )
        }
      })
  }

  useEffect(()=>{
    getCars()
  }, [])

  return (
    <div>
      <h1>Lista de Carros</h1>
      <button onClick={getCars}>Atualizar Lista</button>

      <hr />

      {cars.map((item, index)=>(
        <div key={index}>
        <img src={`${item.photo}`}  width="200"/>
          <h3>{item.brand} - {item.name}</h3>
          <p>{item.year} - R$ {item.price}</p>
        </div>
      ))}
    </div>
  )
}
