import axios from "axios";

interface ReportParams {
    desc: string;
    post: string;
    user: any;
};

export const sendReport = async ({ user, desc, post }: ReportParams) => {
    try {
        const { data } = await axios.post('/api/report', { user, desc, post });
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const getReport = async () => {
    try {
        const response = await axios.get('/api/report');
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}