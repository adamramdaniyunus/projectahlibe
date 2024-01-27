import axios from "axios";

export const getTags = async () => {
    try {
        const { data } = await axios.get(`/api/tags`);
        return data
    } catch (error) {
        console.log(error);
    }
}