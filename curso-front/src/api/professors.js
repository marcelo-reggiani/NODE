import axios from "axios";

export async function getProfessors() {
    const response = await axios.get("http://localhost:3000/Professors");
    return response.data;
}

export async function getProfessor(id) {
    const response = await axios.get(`http://localhost:3000/Professors/${id}`);
    return response.data;
}

export async function addProfessor(data) {
    const response = await axios.post("http://localhost:3000/Professors", data);
    return response.data;
}

export async function deleteProfessor(id) {
    const response = await axios.delete(`http://localhost:3000/Professors/${id}`);
    return response.data;
}

export async function updateProfessor(id, data) {
    const response = await axios.put(`http://localhost:3000/Professors/${id}`, data);
    return response.data;
}