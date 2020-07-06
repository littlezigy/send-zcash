const { Transaction } = require('./transaction.model');

class Paystack extends Transaction {
    constructor() {
    }

    create() {
        const url = 'https://api.paystack.co/transaction/initialize'; 
        const headers = {authorization: `Bearer ${process.env.PAYSTACK_SK}`, 'content-type': 'application/json'}
        console.log('POSTING');
        //Create transaction record and initialize paystack transaction

        return axios.post(url, {email: this.email, amount: this.amount * 100, callback_url: this.callback_url}, {headers})
        .then(result=> {
            if(result.data.status !== true) throw {code: 'illegalpayment', title: 'Something went wrong with this transaction'};

            this.data = { access_code: result.data.data.access_code, reference: result.data.data.reference };
            console.log('CREATIN');

            return super.create(pgclient)
            .then(res => {
                console.log('RESS', res);
                return { url: result.data.data.authorization_url, transaction_id: res._id }; 
            })
        })
        .catch(err => {
            if(err.code === 'EAI_AGAIN') throw {code: 'network_err', title: 'Network Error.', detail: 'Please try again'};
            
            else if(err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                throw {code: 'payment-credentials-invalid', title: 'The payment credentials need to be updated'};
            } else {
                console.debug('ERROR', err);
                throw err;
            }
        });
    }
}
