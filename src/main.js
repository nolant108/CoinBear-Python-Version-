const{Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('a4c1c74ef88d54296d258f341a475003e690b80e0c1fd44490f9caa0299f0bf0');
const myWalletAddress = myKey.getPublic('hex');


let CoinBear = new Blockchain();


const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
CoinBear.addTransaction(tx1);

console.log('-----------------------------------------------------------------');
console.log('\nStarting the miner...');
CoinBear.minePendingTransactions(myWalletAddress);
console.log('Balance of Nolan is: ', CoinBear.getBalanceOfAddress(myWalletAddress));
console.log();


console.log('\nStarting the miner again...');
CoinBear.minePendingTransactions(myWalletAddress);
console.log('Balance of Nolan is: ', CoinBear.getBalanceOfAddress(myWalletAddress));
console.log();



console.log();
console.log('Blockchain valid?', CoinBear.isChainValid() ? 'Yes' : 'No');
console.log();
console.log();
console.log();
console.log('-----------------------------------------------------------------');









/*
console.log('Mining Block 1...');
CoinBear.addBlock(new Block(1, "20/07/2017", {  amount: 4}));

console.log('Mining Block 2...');
CoinBear.addBlock(new Block(2, "20/07/2017", {  amount: 8}));







CoinBear.addBlock(new Block(1, "10/07/2017", {  amount: 4}));
CoinBear.addBlock(new Block(2, "12/07/2017", {  amount: 10}));



console.log(JSON.stringify(CoinBear, null, 4));

console.log('Is BlockChain Valid? ' + CoinBear.isChainValid());

CoinBear.chain[1].data = { amount: 100 };

console.log('Is BlockChain Valid? ' + CoinBear.isChainValid());
*/