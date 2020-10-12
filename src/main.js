const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('a4c1c74ef88d54296d258f341a475003e690b80e0c1fd44490f9caa0299f0bf0');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const CoinBear = new Blockchain();

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
CoinBear.addTransaction(tx1);

// Mine block
CoinBear.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
CoinBear.addTransaction(tx2);

// Mine block
CoinBear.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of Nolan is ${CoinBear.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// CoinBear.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', CoinBear.isChainValid() ? 'Yes' : 'No');
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