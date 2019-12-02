import 'isomorphic-fetch';
export class Api{
    static getApiUrl(){
       //return "http://198.211.103.249/";
       return "http://192.168.100.208:3000/";
    }
    static get(url, callback, auth = true){
        let headers = {};
        if(auth == true){
            let token = localStorage.getItem('token');
            headers = {
                'Accept': 'application/json',
                'x-Auth': token
            }  
        }
        fetch(this.getApiUrl() + url, {
            headers}).then(r => r.json())
        .then(res => {
            callback(res);
        });
    }
    
    static delete(url, callback, auth = true){
        let headers = {};
        if(auth == true){
            let token = localStorage.getItem('token');
            headers = {
                'Accept': 'application/json',
                'x-Auth': token
            }  
        }
        fetch(this.getApiUrl() + url, {
            headers,
            method: 'DELETE',
            body: {}
        }).then(r => r.json())
        .then(res => {
            callback(res);
        });
    }

    static post(url, data, callback){
        fetch(this.getApiUrl() + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
         }).then(r => r.json())
        .then(res => {
            callback(res);
        });
    }

    static put(url, data, callback){
        fetch(this.getApiUrl() + url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(data)
         }).then(r => r.json())
        .then(res => {
            callback(res);
        });
    }    
}