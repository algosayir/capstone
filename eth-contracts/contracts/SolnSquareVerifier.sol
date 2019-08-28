pragma solidity >=0.4.21 <0.6.0;
import "./ERC721Mintable.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is GosayirERC721Token{
    Verifier private _verifier;

    constructor(address va,string memory name, string memory symbol) public GosayirERC721Token(name, symbol) {
        _verifier = Verifier(va);
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution{
        uint256 _index; //tokenId
        address _address;
        bytes32 _hash; //key
    }

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) _uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(address owner, uint256 index);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address owner, uint256 tokenId, bytes32 key) internal{
        Solution memory s = Solution(tokenId,owner,key);
        solutions.push(s);
        _uniqueSolutions[key] = s;
        emit SolutionAdded(owner,tokenId);
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address to, uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory inputs) public returns(bool)
    {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, inputs));

        require(_uniqueSolutions[key]._index == 0, "Solution is already added.");

        require(_verifier.verifyTx(a, b, c, inputs), "Verification faild!");

        bool output = mint(to,tokenId);

        addSolution(to, tokenId, key);

        return output;
    }
}