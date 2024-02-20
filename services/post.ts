import axios from "axios";

interface CreatePostParams {
    desc: string;
    tags: string[];
    video: any;
    image: any;
    user: string | null | undefined;
};

export const createPost = async ({ user, desc, video, tags, image }: CreatePostParams) => {
    try {
        const { data } = await axios.post('/api/post', { user, desc, video, tags, image });
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


export const getAllPostsNoSearch = async (nameTags = "all") => {
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


export const deletePost = async (url = "", _id = "") => {
    try {
        if (url) {
            await axios.delete("/api/route?key=" + url);
        }
        const response: any = await axios.delete("/api/post?id=" + _id);
        return response.msg
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteFile = async (url = "") => {
    try {
        await axios.delete("/api/route?key=" + url);
        return
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export const getOnePost = async (id = "") => {
    try {
        const response = await axios.get('/api/post?id=' + id);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}