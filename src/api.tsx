import axios from "axios";
import { Token } from "typescript";

const api = axios.create({
    baseURL: 'https://api.b7web.com.br/carros/api'
});

export default {
    getCarList: async (year: string) => {
        let {data: json} = await api.get(`carros?ano=${year}`);
        return json;
    },
    login: async (email: string, password: string) => {
        let { data:json } = await api.post('auth/login', {
            email,
            password
        })
        return json
    },
    register: async (name: string, email: string, password: string) => {
        let {data:json} = await api.post('auth/register', {
            name,
            email,
            password
          })
          return json
    },
    addNewCar: async (brand: string, name: string, year: string, price: string, photo: string, token: any) => {
        let body = new FormData()

        body.append('brand', brand);
        body.append('name', name);
        body.append('year', year);
        body.append('price', price);

        if(photo) {
        body.append('photo', photo)
        }

        let result = await fetch('https://api.b7web.com.br/carros/api/carro', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body
        });
        let json = await result.json(); 
        return json
    }
};