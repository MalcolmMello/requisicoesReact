import React, { SelectHTMLAttributes, useEffect, useState } from "react"

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
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState('')

  const getCars  = async () => {
    setLoading(true);

    let result = await fetch(`https://api.b7web.com.br/carros/api/carros?ano=${year}`)
    let json = await result.json()

    setLoading(false)

    if(json.error === '') {
      setCars( json.cars )
    } else {
      alert( json.error )
    }

  }

  useEffect(()=>{
    getCars()
  }, [year])

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value)
  }

  return (
    <div>


      <h1>Lista de Carros</h1>

      <select onChange={handleYearChange}>
        <option></option>
        <option>2021</option>
        <option>2020</option>
        <option>2019</option>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
        <option>2015</option>
        <option>1988</option>
      </select>

      <button onClick={getCars}>Atualizar Lista</button>

      <hr />

      { loading &&
        <h2>Carregando os carros...</h2>
      }
      {cars.length == 0 && loading === false &&
        <h2>Nenhum carro encontrado</h2>
      }

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
