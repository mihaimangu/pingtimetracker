import axios from "axios";

export const getList = () => {

    return axios.get("http://localhost:8000/objects");
}

export const getSingleElement = (id: string) => {

    return axios.get(`http://localhost:8000/objects/${id}`);
}
