import axios from "axios";

export const getList = () => {

    return axios.get("http://localhost:8000/objects");
}