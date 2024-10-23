import { describe, it, expect, beforeEach } from 'vitest';
import Block from "../block/block"
import Blockchain from "../blockchain/blockchain"
import Transaction, { TransactionData } from "../transaction/transaction"

describe('Blockchain', () => {
    let genesisBlock: Block;
    let blockchain: Blockchain
    let transaction: Transaction

    beforeEach(() => {
        genesisBlock = new Block()
        blockchain = new Blockchain(genesisBlock)
        
        transaction = new Transaction('matty', 'john', 6)
        
        // const nextBlock = blockchain.getNextBlock([transaction])
        // blockchain.addBlock(nextBlock)
        
        // console.log(blockchain)
        // console.log(blockchain.blocks[1].transactions)
    })

    it('check previous block\'s hash to be Equal to current block previousHash', () =>{
        let newBlock = blockchain.getNextBlock([transaction])
        
        expect(newBlock.previousHash).toEqual(genesisBlock.hash)
    })
})
