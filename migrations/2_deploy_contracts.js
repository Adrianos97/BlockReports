const blockreports = artifacts.require("blockreports");

module.exports = function(deployer) {
  deployer.deploy(blockreports);
};
