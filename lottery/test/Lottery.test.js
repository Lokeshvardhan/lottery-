const assert = require('assert');
const ganache = require('ganache-cli');
const Web3= require('web3');  // capital W is bcoz of it is a constructor from web3
const web3= new Web3(ganache.provider()); // ganache.provider() this is to connect with the network
const {abi, bytecode} = require('../compile');
// console.log(abi);
// console.log(bytecode);
// let accounts,inbox;
// beforeEach(async ()=>{
//     // Get a list of all acounts

//     accounts = await web3.eth.getAccounts();
//     //use one of  the account to deploy the contract
//     inbox = await new web3.eth.Contract(abi)
//         .deploy({data: bytecode, arguments: ['Hi There!']})
//         .send({from: accounts[0], gas:'1000000'});
// });

// describe('Inbox',()=>{
//     it('deployes a contract ',()=>{
//         assert.ok(inbox.options.address);
//     });

//     it('check message', async()=>{
//         const message = await inbox.methods.message().call();
//         assert.equal(message, 'Hi There!');
//     })
// });

let accounts, lottery;
beforeEach( async()=>{
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi)
    .deploy({data: bytecode})
    .send({from: accounts[0], gas:'1000000'});
});

describe('Lottery', ()=>{
    it('IF deployes a contract',()=>{
        assert.ok(lottery.options.address);
    });
    it('allows one account to enter',async()=>{
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);
    });
});