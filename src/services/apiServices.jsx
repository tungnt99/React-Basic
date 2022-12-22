import axios from "../utils/axiosCustomize";

const postCresteNewUser = (email, password, userName, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post("api/v1/participant", data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, userName, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', userName);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put("api/v1/participant", data);
}

const deleteUser = (userId) => {
    return axios.delete("api/v1/participant", { data: { id: userId } });
}

const getAllUsersPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

// Login
const postLogin = (userEmail, userPassword) => {
    return axios.post(`api/v1/login`, { email: userEmail, password: userPassword, delay: 3000 });

}

const postRegister = (email, password, username) => {
    return axios.post(`api/v1/register`, { email, password, username });
}
export { postCresteNewUser, getAllUsers, putUpdateUser, deleteUser, getAllUsersPaginate, postLogin, postRegister }