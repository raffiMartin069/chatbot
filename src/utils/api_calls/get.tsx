import axios from 'axios';

export const get = (data: string | string[] | object, url: string) => {
    
    const res = axios.get(url, {
        params: {
            query: data
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    return res;
}