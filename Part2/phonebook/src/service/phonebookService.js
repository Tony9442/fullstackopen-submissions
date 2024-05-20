import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newPerson) => {
  return axios.get(`${baseUrl}?name=${newPerson.name}`).then((response) => {
    const existingPerson = response.data[0];
    if (existingPerson) {
      // If person already exists, update the number
      return axios
        .put(`${baseUrl}/${existingPerson.id}`, newPerson)
        .then((response) => response.data);
    } else {
      // If person doesn't exist, create a new entry
      return axios.post(baseUrl, newPerson).then((response) => response.data);
    }
  });
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const phoneService = {
  getAll,
  create,
  remove,
};

export default phoneService;
