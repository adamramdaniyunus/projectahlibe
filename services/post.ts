import axios from "axios";

interface CreatePostParams {
    desc: string;
    tags: string[];
    video: string;
    useremail: string | null | undefined;
};

export const createPost = async ({ useremail, desc, video, tags }: CreatePostParams) => {
    try {
        const { data } = await axios.post('/api/post', { useremail, desc, video, tags });
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getAllPost = async (search = "", nameTags = "") => {
    try {
        const response = await axios.get(`/api/post?search=${search}&tags=${nameTags}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getAllPostsNoSearch = async (nameTags = "") => {
    try {
        const response = await axios.get('/api/post?tags=' + nameTags);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllPosts = async () => {
    try {
        const response = await axios.get('/api/post');
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getPostUser = async (email = "") => {
    try {
        const response = await axios.get('/api/post?email=' + email);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


