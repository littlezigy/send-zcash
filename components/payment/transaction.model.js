const ZCash = require('zcash');
const axios = require('axios');

class Transaction {
    constructor() {
        console.log('NEW TRANSACTION');
        this.auth = {
            'username': 'user',
            'password': process.env.RPC_PASSWORD
        }
        this.url = 'http://127.0.0.1:18232/';
        this.axiosConfig = {
            auth: this.auth,
            headers: {
                "Content-Type": 'text/plain'
            }
        }
    }

    create() {
        let url = this.url;
        let config = this.axiosConfig;

        console.log('CLIENT');
        let memo = JSON.stringify(this.memo);
        memo = Buffer.from(memo, 'utf8').toString('hex');

        let amount = this.amount;
        let data = {
            jsonrpc: "1.0",
            id: 'curltest',
            method: "z_sendmany",
            params: [process.env.SHIELDED_ADDR, [
                { address: this.address, amount, memo}
            ]]
        }

        // data.params = JSON.stringify(data.params);
        console.log('DATA', data);

        return axios.post(url, data, config)
        .then(res => {
             console.log('RESl', res.data);
             return {
                 slug: res.data.result
             }
            // console.log('AXIOS CONFIG', res.config);
            // data.params = [[res.data.result ]];
            // data.method = 'z_getoperationresult';
            // delete data.memo;
            // console.log('DATA2', data);

            // return axios.post(url, data, config);
            /*
        }).then(res => {
            console.log(res.config);
            console.log('OPERATION RESULT AXIOS', res.data);
            */
        })
        .catch(err => {
            console.log('CONFIGGGY', err.config);
            if(!err.response) console.log('ERROR', err);
            console.log('ERROR DATA: ', err.response.data);
            //console.log('ERROR RESPONSE', err.response.status, err.response.statusText, err.response.headers);
            switch(err.response.data.error.code) {
                case -6:
                    throw new Error('Error');
                    break;
                default:
                    throw new Error(err.response.data.error.message);
                    break;
            }
        });
        // return zcash.z_validateaddress(this.address);
        //return zcash.sendtoaddress(this.address);

    }
}

module.exports = { Transaction };
