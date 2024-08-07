// Este arquivo possui funções para realizar as operações do CRUD de clientes
import axios from "axios";

export async function getClientes() {
    const response = await axios.get("http://localhost:3000/clientes");
    // Dentro de 'data' esta o JSON de resposta do back-end (faz a conversão do json)
    return response.data;
}

export async function addCliente(data) {
    // O 2 parametro do post é o corpo da requisição (data)
    const response = await axios.post("http://localhost:3000/clientes", data);
    return response.data;
}

export async function deleteCliente(id) {
    const response = await axios.delete(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

export async function getCliente(id) {
    const response = await axios.get(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

export async function updateCliente(id, data) {
    const response = await axios.put(`http://localhost:3000/clientes/${id}`, data);
    return response.data;
}