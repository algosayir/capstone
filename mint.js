//This code is modified based on https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js
const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = fs.readFileSync("./.secret").toString().trim();
const INFURA_KEY = "6e652b67e2614e129b519657c167cbea"
const NFT_CONTRACT_ADDRESS = "0x57b43Bab0A9d09AAb2BaEDA76Eed0cec3ED55F61"
const OWNER_ADDRESS = "0x6d1657F913a3BD62212ce94C60c8DC2a460fD951"
const NETWORK = "rinkeby"
const NFT_ABI = require('./eth-contracts/build/contracts/SolnSquareVerifier').abi;
const proofs = require('./proofs');

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(provider)
    const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })
    
    console.log("Init completed.")
    // Creatures issued directly to the owner.
    for (var i = 1; i <= 1; i++) {
        let proof = proofs[i].proof;
        let inputs = proofs[i].inputs;

        console.log("Mining proof:"+proof);
        console.log("input: "+inputs);
        try{
            const result = await nftContract.methods.mintNFT(OWNER_ADDRESS, i,
                proof.a,
                proof.b,
                proof.c,
                inputs).send({ from: OWNER_ADDRESS });
            
            console.log("Minted creature. Transaction: " + result.transactionHash);
        }
        catch(e){
            console.log(e);
        }
    }
}

main()