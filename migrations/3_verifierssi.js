const VerifierSSI = artifacts.require("VerifierSSI");

module.exports = function (deployer) {
  deployer.deploy(VerifierSSI);
};
