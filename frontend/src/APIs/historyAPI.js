import axios from "axios";
import BASE_URL from "../db";

class historyAPI {
    static async request(endpoint, data={}, method='get'){
        const url = `${BASE_URL}/${endpoint}`
        const params = (method === 'get') ? data : {};
         try{
            const result = (await axios({url, data,method,params})).data;
            return result;
         }
         catch(err){
            console.log("Error making request in historyAPI:". err)
         }
    }

    static async add(data){
        const result = await this.request('history',data,'post');
        console.log("Result in adding items to history, frontend:", result);
        return result;
    }

    static async sortData(filter){
        const result = await this.request('history', filter, 'get');
        console.log(`Result fetching filtered history data using filter ${filter}:`, result);
        return result;
    }
}

export default historyAPI;
