import axios from "axios";
import BASE_URL from "../db";

class wishlistAPI {
    static async request(endpoint,data={},method="get"){

        const url = `${BASE_URL}/${endpoint}`;
        const params = method === "get" ? {params: data} : {data};
        const token = localStorage.getItem('token')

        const headers = {
            'Content-type': 'application/json',
        }

        if(token){
            headers['Authorization'] = `Bearer ${token}`
        }
        
        try{
            const result = (await axios({
                url,
                method,
                data,
                params,
                headers
             })).data;

        return result;
        }
        catch(err){
            console.log("Error making request in wishlistAPI.js:", err);
        }
    }

    static async get(data){
        const result = await this.request('wishlist', data, "get")
        console.log("Result for getting all cart items from wishlist in frontend API call:", result)
        return result
    }
    

    static async add(data){
        const result = await this.request('wishlist/add', data, "post");
        console.log("Result for adding item to wishlist in frontend API call:", result);
        return result
    }

    static async delete(data){
        const result = await this.request('wishlist/delete', data, "post");
        console.log("Result for deleting item from wishlist in frontend:", result);
        return result;
    }

    static async sortData(filter){
        const result = await this.request('wishlist', filter, 'get');
        console.log(`Result returned from wishlist data filtered by ${filter}:`, result);
        return result;
    }
}

export default wishlistAPI;