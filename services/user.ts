import axios from "axios";

export const getUser = async (email: any) => {
    try {
        const { data } = await axios.get(`/api/user?id=${email}`);
        return data
    } catch (error) {
        console.log(error);
    }
}

export const getAllUser = async () => {
    try {
        const { data } = await axios.get('/api/user');
        return data;
    } catch (error) {
        console.log(error);

    }
}