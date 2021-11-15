import React, { FormEventHandler, FormHTMLAttributes, SelectHTMLAttributes, useEffect, useState } from "react"

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
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userName, setUserName] = useState(localStorage.getItem('username'))

  const [cars, setCars] = useState<Cars[]>([])
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState('')
  const [register, setRegister] = useState(false)
  const [login, setLogin] = useState(true)

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPassword] = useState('')

  const [nameRegister, setName] = useState('')
  const [emailRegister, setEmailRegister] = useState('')
  const [passwordRegister, setPasswordRegister] = useState('')

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

  const handleloginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let url = 'https://api.b7web.com.br/carros/api/auth/login'


    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailField,
        password: passwordField
      })
    })
    let json = await result.json()

    if(json.error != '') {
      alert( json.error )
    } else {
      localStorage.setItem('token', json.token);
      localStorage.setItem('username', json.user.name);
      setToken(json.token);
      setUserName(json.user.name);
    }

    console.log('RESULT', json)
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let url = 'https://api.b7web.com.br/carros/api/auth/register'

    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameRegister,
        email: emailRegister,
        password: passwordRegister
      })
    })
    let json = await result.json()

    if(json.error != '') {
      alert(json.error);
    } else {
      localStorage.setItem('token', json.token);
      localStorage.setItem('username', json.user.name);
      setToken(json.token);
      setUserName(json.user.name);
    }
  }

  const handleLogin = () => {
    setRegister(false)
    setLogin(true)
  }

  const handleRegister = () => {
    setRegister(true)
    setLogin(false)
  }

  const handleLogout = () => {
    setToken('')
    setUserName('')
    localStorage.setItem('token', '')
    localStorage.setItem('username', '')
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Cadastro</button>

      {!token &&
        <div>
          {register && 
            <form onSubmit={handleRegisterSubmit}>
            <h2>Faça Cadastro</h2>
            <label>
              Nome:
              <input type="text" value={nameRegister} onChange={e=>setName(e.target.value)}/>
            </label> <br/>

            <label>
              E-mail:
              <input type="email" value={emailRegister} onChange={e=>setEmailRegister(e.target.value)}/>
            </label> <br/>

            <label>
              Senha:
              <input type="password" value={passwordRegister} onChange={e=>setPasswordRegister(e.target.value)}/>
            </label> <br/>

            <input type="submit" value="Enviar"/>
          </form>
          }


          {login &&
          <form onSubmit={handleloginSubmit}>
            <h2>Faça Login</h2>
            <label>
              E-mail:
              <input type="email" value={emailField} onChange={e=>setEmailField(e.target.value)}/>
            </label> <br/>

            <label>
              Senha:
              <input type="password" value={passwordField} onChange={e=>setPassword(e.target.value)}/>
            </label> <br/>

            <input type="submit" value="Enviar"/>
          </form>
          }
        </div>
      }

      {token &&
        <div>
          <h3>Olá, {userName}</h3>
          <button onClick={handleLogout}>Sair</button>
        </div>
      }
      <hr />

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
