import axios from 'axios';
import BASE_URL from '../db';

class historyAPI {
  static async request(endpoint, data = {}, method = 'get') {
    const url = `${BASE_URL}/${endpoint}`;
    const token = localStorage.getItem('token');

    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const result = (
        await axios({
          url,
          method,
          data: method !== 'get' ? data : undefined,
          params: method === 'get' ? data : undefined,
          headers,
        })
      ).data;
      return result;
    } catch (err) {
      const message = err.response?.data?.error || err.message;
      console.error('Error in historyAPI:', message);
      throw message;
    }
  }

  static async add(data) {
    return this.request('history', data, 'post');
  }

  static async sortData(filter) {
    return this.request('history', filter, 'get');
  }
}

export default historyAPI;
