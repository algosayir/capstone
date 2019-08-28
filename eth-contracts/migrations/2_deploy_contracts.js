// migrating the appropriate contracts
var GosayirERC721Token = artifacts.require("GosayirERC721Token");
var SquareVerifier = artifacts.require("./verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function(deployer) {
  await deployer.deploy(GosayirERC721Token,"Gosayir token tracker","MMG");
  await deployer.deploy(SquareVerifier);
  await deployer.deploy(SolnSquareVerifier,SquareVerifier.address,"Gosayir token tracker","MMG");
};
