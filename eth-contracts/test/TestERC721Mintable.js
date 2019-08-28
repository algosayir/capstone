var GosayirERC721Token = artifacts.require('GosayirERC721Token');

contract('TestGosayirERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await GosayirERC721Token.new("Gosayir token tracker","MMG",{from: account_one});

            // TODO: mint multiple tokens
            await this.contract.mint(account_two, 1);
            await this.contract.mint(account_two, 2);
            await this.contract.mint(account_two, 3);
        })

        it('should return total supply', async function () { 
            let ts = await this.contract.totalSupply.call();
            assert.equal(ts, 3, "it return total supply.");            
        })

        it('should get token balance', async function () { 
            let b = await this.contract.balanceOf(account_two);
            assert.equal(b.toNumber(),3, 'Invalid balance.');
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(2);
            let baseTokenURI = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/';
            assert.equal(uri, `${baseTokenURI}2`, 'Wrong URI.');
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two,account_one,3,{from:account_two});
            assert.equal(await this.contract.ownerOf(3), account_one, "Transfer is not performed as expected.");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await GosayirERC721Token.new("Gosayir token tracker","MMG",{from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let success = false;

            try{
                await this.contract.mint(account_two,1, {from: account_two});
                success = true;
            } catch{
                success = false;
            }

            assert.equal(success, false, "Only should be able to mint..")
        })

        it('should return contract owner', async function () { 
            assert.equal(await this.contract.owner(),account_one, "Incorrect account owner.")
        })

    });
})