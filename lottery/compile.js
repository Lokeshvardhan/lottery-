const path = require('path'); // to get crossplatform liberty as index.sol will be read as it is not a JS file

const fs = require('fs');
const solc = require('solc');
const inboxPath = path.resolve(__dirname, 'contracts','lottery.sol');
const source = fs.readFileSync(inboxPath,'UTF-8');
var input = {
    language: 'Solidity',
    sources: {
        'lottery.sol' : {
            content: source
        }
    },
    settings: {
      outputSelection: {
          '*': {
              '*': [ '*' ]
          }
      }
  }
};


// parses solidity to English and strings 
var output = JSON.parse(solc.compile(JSON.stringify(input)));

var outputContracts = output.contracts['lottery.sol']['Lottery']

// exports ABI interface
module.exports.abi = outputContracts.abi;

// exports bytecode from smart contract
module.exports.bytecode = outputContracts.evm.bytecode.object;