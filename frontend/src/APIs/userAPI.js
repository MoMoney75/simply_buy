import axios from "axios";
import BASE_URL from "../db";

class userAPI {
    static async request (endpoint, data ={}, method="get"){
        const url = `${BASE_URL}/${endpoint}`;
        const params = (method === 'get') ? data : {};

        try{
            const result = (await axios({url,method,data,params})).data;
            return result;
        }
        catch(err){
            console.log("Error in frontend request:", err);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async register(data){
        const result = await this.request('users/register', data, 'post');
        console.log("New user created in frontend:", result);
        return result;
    }

    static async login(data){
        const result = await this.request('users/login', data, 'post')
        console.log("User login in frontend:", result)
        return result;

    }

    static async delete(data){
        const result = await this.request('users/delete', data, 'post');
        console.log("User deleted in frontend:", result);
        return result;
    }
}

export default userAPI;