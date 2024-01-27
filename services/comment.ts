import axios from "axios";

// fetching data comment
export const getAllCommentPost = async (postId = "") => {
    try {
        const { data } = await axios.get('/api/comment?postId=' + postId);
        return data
    } catch (error) {
        console.log(error);
    }
}