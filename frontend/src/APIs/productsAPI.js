import axios from "axios";
const API_URL = `https://fakestoreapi.com`;

/* This file is responsible for handling all request to  "Platzi Fake Store API" */

class productsAPi{
    static async request(endpoint,method='get',data={}){
        const url = `${API_URL}/${endpoint}`
        const params = (method === 'get') ? data : {};
        try{
            const result = await axios.get(url,method,data,params);
            console.log("Result in productsAPI:", result);
            return result;
        }

        catch(err){
            console.log("Error in frontend request:", err);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }

    };

    static async getAll(){
        const result = await this.request('products');
        return result;
    }

    static async getById(id){
        const result = await this.request(`products/${id}`);
        return result;
    }

    static async sortDsc(){
        const result = await this.request('products?sort=desc');
        return result;
    }

    static async sortAsc(){
        const result = await this.request('products?sort=asc');
        return result;
    }

    static async allCategories(){
        const result = await this.request('products/categories');
        return result;
    }

    static async getByCategory(category){
        const result = await this.request(`products/category/${category}`);
        return result;
    }
}

export default productsAPi;
