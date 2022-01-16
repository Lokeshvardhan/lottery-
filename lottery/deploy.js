const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, bytecode} = require('./compile');

const provider =  new HDWalletProvider(
    'host suit visa shield inject mandate nerve tattoo scrap federal again across',
    'https://rinkeby.infura.io/v3/08860b5457b84511942f4e1ec8da6c3c'
);
const web3 = new Web3(provider);

const deploy = async()=>{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = await new web3.eth.Contract(abi)
        .deploy({data: bytecode})
        .send({from: accounts[0], gas:'1000000'});
    console.log('abi is', abi);
    console.log('result is', result.options.address);
    provider.engine.stop();
};

deploy();