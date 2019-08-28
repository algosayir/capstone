# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

# Addresses
## Contract Addresses (SolnSquareVerifier)
0x57b43Bab0A9d09AAb2BaEDA76Eed0cec3ED55F61

for the rest of addresses are in rinkeby_deployment_output.txt

## Contract Abi's
in eth-contracts\build\SolnSquareVerifier.json

## OpenSea Market Place Storefront link's
https://rinkeby.opensea.io/category/gosayir-token-tracker

# How to use
Clone project
`npm install`
`cd eth-contracts`
`ganachi-cli -m "???"`
`truffle compile --all`
`truffle migrate --reset`
`truffle test`

Docker command
`docker run -v /F/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash`

Then deploy in rinkeby network
`truffle migrate --network rinkeby`

Then run minting
`node mint.js`

# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
