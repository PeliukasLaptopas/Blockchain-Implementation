import Block from "../block/block";
import BlockData from "../block/block";
import { TransactionData } from "../transaction/transaction";
import { sha256 } from 'js-sha256';

interface BlockChainData {
    blocks: BlockData[]
    difficulty: number
    addBlock(block: BlockData): void
    getNextBlock(transactions: TransactionData[]): BlockData
    getPreviousBlock(): BlockData
    generateHash(block: BlockData): string
    //addTransaction(transaction: TransactionData): void
}

export default class Blockchain implements BlockChainData {
    public blocks: BlockData[]
    public difficulty: number
    
    constructor(genesisBlock: BlockData) {
        this.blocks = []
        this.difficulty = 2
        this.addBlock(genesisBlock)
    }

    public addBlock(block: BlockData): void {
        //if on genesis block
        if(this.blocks.length === 0) {
            block.previousHash = "0000000000"
            block.hash = this.generateHash(block)
        }

        this.blocks = [...this.blocks, block]
    }

    public getNextBlock(transactions: TransactionData[]): BlockData {
        const block = new Block()
        
        transactions.map(t => {
            block.addTransaction(t)
        })

        let previousBlock = this.getPreviousBlock()
        block.index = this.blocks.length
        block.previousHash = previousBlock.hash
        block.hash = this.generateHash(block)

        return block
    }

    public getPreviousBlock(): BlockData {
        return this.blocks[this.blocks.length - 1]
    }

    //mining happens here
    public generateHash(block: BlockData): string {
        let hash = sha256(block.key)

        const startsWith = Array(this.difficulty + 1).join('0')

        //mining
        while(!hash.startsWith(startsWith)) {
            block.nonce++
            hash = sha256(block.key)
            // console.log(hash)
        }
        
        return sha256(block.key)
    }
}
