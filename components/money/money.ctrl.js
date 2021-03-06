const htmlWrapper = require('../pages/wrapper');
const senderHtml = require('../pages/sender');
const requestMoneyHtml = require('../pages/makeRequest');
const receipt = require('../pages/sent');
// const zcash = require('zcash');
const axios = require('axios');
const db = require('postgresorm');
const randomWords = require('random-words');
const { Transaction } = require('../payment/transaction.model');
const { Paystack } = require('../payment/paystack.payment');

module.exports = {
    createRequest: (req, res) => {
        if(req.method === 'GET') {
            console.log('SENDING');
            return axios.get('https://openexchangerates.org/api/currencies.json')
            .then(result => {
                let currencies = result.data;
                
                let html1 = requestMoneyHtml(currencies);
                return res.send(htmlWrapper(html1, 'Make Request'));
            });
        } else {
            console.log('REQ BODY', req.body);
            /*
            const rpc = new zcash({
                username: 'user',
                password: 'password',
                //port: 18232
            });
            */
            let generator = new randomWords();
            let amount = req.body.amount;
            let shielded_addr = req.body.shieldedAddress;
            let sender = req.body.senderName;
            let receiver = req.body.displayName;

            let tx = new Transaction();
            tx.address = process.env.SHIELDED_ADDR;
            tx.amount = '0.00002';
            tx.memo = {slug: randomWords({exactly: 4, join: '-'}), amount, shielded_addr, sender, receiver};
            return tx.create()
            .then(result => {
                console.log('RESULT', result);
                let url = req.protocol + "://" + req.host + ":" + '3007' + '/send-money/' + result.slug;
                res.send(`Receiver url: <a href = '${ url }'>${ url }</a>`);
                // return rpc.getaddressesbyaccount("");
            }).then(addrs => {
                console.log('CHECKING RPC OBJ', rpc);
                console.log('ADDRESSES', addrs);
            }).catch(err => {
                console.log('ERRORR');
                console.error(err);
                return res.send('Error');
            });
        }
    },
    sendMoney: (req, res) => {
        let slug = req.params.slug;

        if(req.method === 'GET') {
            console.log('SENDING');

            return db.findone('transactions', { slug })
            .then(result => {
                console.log('RESULT TXX', result);
                let receiver = result.receiver;
                let amount = result.amount;
                let html1 = senderHtml.template({ receiver, amount });
                return res.send(htmlWrapper(html1, 'Send'));
            });
        } else {
            let tx = new Paystack();
            return db.findone('transactions', {slug})
            .then(result => {
                let receiver = result.receiver;
                let amount = result.amount;
                let html1 = receipt.template(receiver, amount);
                return res.send(htmlWrapper(html1, 'Send'));
            });
        }
    }
}
