import express from "express";
import bodyParser from "body-parser";

import Block from "./block/block";
import Blockchain from "./blockchain/blockchain";
import Transaction, { TransactionData } from "./transaction/transaction";

const genesisBlock = new Block()
const blockchain = new Blockchain(genesisBlock)
let transactions: TransactionData[] = []

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.json(blockchain.blocks)
})

app.post('/transaction', function(req, res) {
    const { from, to, amount } = req.body
    const newTransaction: TransactionData = new Transaction(from, to, amount)

    transactions = [...transactions, newTransaction]
    
    res.json(newTransaction)
})

app.get('/mine', function(req, res) {
    const newBlock = blockchain.getNextBlock(transactions)
    transactions = []
    blockchain.addBlock(newBlock)
    res.json(blockchain)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});








// const genesisBlock = new Block()
// const blockchain = new Blockchain(genesisBlock)

// const transaction = new Transaction('matty', 'john', 6)

// const nextBlock = blockchain.getNextBlock([transaction])
// blockchain.addBlock(nextBlock)

// console.log(blockchain)
// console.log(blockchain.blocks[1].transactions)


