const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');

contract('SolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const proof = {
        "proof": {
            "a": ["0x0c26b3b97d475e49503e4a50b0d1a407ff93d17053057ec6e23a653555ba1efc", "0x1fa01c6763638f91d01cd30b28a57f17fe5c4aafec8c3af11f5d5524348ac864"],
            "b": [
                ["0x2021f5f5d96258cd08b627993741d0157011a75feb408e9adad00b9bf31ece6e", "0x1e72685bef8fc7462c1639a894b906b82707624fab55b885e2d13d857627b7a6"], 
                ["0x18f898c1bc2160c8fbd194d218abbd411125217b6c520060e2a879457157e459", "0x04bccbeea09dde84907b381e24ead04851d6927177f55048a8e4c159e9b95dbc"]
            ],
            "c": ["0x08f5bd922f1a86ed8b59dc91c97849517d46f5deecce191af8643b3e1f079d3e", "0x0e24972453d8cd32dc54423fc888b824e223568def9bcf60d24edec5a1c82df8"]
        },
        "inputs": [9, 1]
    };

    beforeEach(async () => {
        const verifierCont = await Verifier.new({from: account_one});
        this.contract = await SolnSquareVerifier.new(verifierCont.address, "Gosayir token tracker","MMG", {from: account_one});
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
    it("Mint ERC721 token and add new solution test", async () => {
        let success = false;

        try{
            success = await this.contract.mintNFT.call(account_two, 5,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                    {from: account_one}); 
            //success = true;
        } catch(e){
            assert.equal(true,false,e.message);
            success = false;
        }

        assert.equal(success,true,"Minting is not successful.");
    });
})