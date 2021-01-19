const axios = require("axios");
axios.defaults.withCredentials = true;
require('dotenv').config()

export const isLoggedIn = async () => {
    return await axios
        .get(process.env.API_URL + "/login", { withCredentials: true })
        .then((res) => {
            return res.data.isLoggedIn;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
};

export const login = async (email, password) => {
    return await axios
        .post(
            process.env.API_URL + "/user/login",
            {
                email: email,
                password: password,
            },
            { withCredentials: true }
        )
        .then((res) => {
            return { success: res.data.success };
        })
        .catch(function (err) {
            return { success: false, errors: err.response.data };
        });
};

export const logout = async () => {
    return await axios
        .post(process.env.API_URL + "/user/logout", { withCredentials: true })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
