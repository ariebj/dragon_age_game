const DragonAgeGame = artifacts.require("DragonAgeGame");

module.exports = function (deployer) {
  deployer.deploy(DragonAgeGame, "DragonAgeGame", "DAG");
};
