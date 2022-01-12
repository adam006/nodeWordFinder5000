import axios from 'axios';
import config from 'config';

export class BookRepo {
    async getBookText(){
        const url = config.get('apiUrl');
        console.log('url', url);

        const response = await axios.get(config.get('apiUrl'));
        if(response.status === 200){
            return response.data;
        }
        return response.status;
    }
}


