import axios from "axios";

export async function getAlunos() {
    const response = await axios.get("http://localhost:3000/Alunos");
    return response.data;
}

export async function getAluno(id) {
    const response = await axios.get(`http://localhost:3000/Alunos/${id}`);
    return response.data;
}

export async function addAluno(data) {
    const response = await axios.post("http://localhost:3000/Alunos", data);
    return response.data;
}

export async function deleteAluno(id) {
    const response = await axios.delete(`http://localhost:3000/Alunos/${id}`);
    return response.data;
}

export async function updateAluno(id, data) {
    const response = await axios.put(`http://localhost:3000/Alunos/${id}`, data);
    return response.data;
}