const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash) {
     this.timestamp = timestamp;
     this.transactions = transactions;
     this.previousHash = previousHash;
     this.nonce = 0;
     this.hash = this.calculateHash();
    }
   
    calculateHash() {
     return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }
   
    mineBlock(difficulty) {
     while (this.hash.toString().substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
     }
     console.log("Block Successfully hashed: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2017", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);
    
        const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
    
        console.log('Block successfully mined!');

        this.chain.push(block);
    
        this.pendingTransactions = [];
      }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }


    /*
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    */

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }

        return true;
    }
}

let CoinBear = new Blockchain();
CoinBear.createTransaction(new Transaction('address1', 'address2', 100));
CoinBear.createTransaction(new Transaction('address2', 'address1', 50));


console.log('\nStarting the miner...');
CoinBear.minePendingTransactions('nolans-address');

console.log('Balance of Nolan is: ', CoinBear.getBalanceOfAddress('nolans-address'));

console.log('\nStarting the miner again...');
CoinBear.minePendingTransactions('nolans-address');

console.log('Balance of Nolan is: ', CoinBear.getBalanceOfAddress('nolans-address'));







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