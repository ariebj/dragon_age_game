// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DragonAgeGame is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    uint256 COUNTER;

    uint256 fee = 0.01 ether;

    struct Dragon {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Dragon[] public dragons;

    event NewDragon(address indexed owner, uint256 id, uint256 dna);

    // Helpers
    function createRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randomNum % _mod;
    }

    function updateFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    //Creation
    function _createDragon(string memory _name) internal {
        uint8 randRarity = uint8(createRandomNum(100));
        uint256 randDna = createRandomNum(10**16);
        Dragon memory newDragon = Dragon(
            _name,
            COUNTER,
            randDna,
            1,
            randRarity
        );
        dragons.push(newDragon);
        _safeMint(msg.sender, COUNTER);
        emit NewDragon(msg.sender, COUNTER, randDna);
        COUNTER++;
    }

    function createRandomDragon(string memory _name) public payable {
        require(
            msg.value >= fee,
            "The fee is not correct or not enough balance"
        );
        _createDragon(_name);
    }

    //Getters
    function getDragons() public view returns (Dragon[] memory) {
        return dragons;
    }

    function getOwnerDragons(address owner)
        public
        view
        returns (Dragon[] memory)
    {
        Dragon[] memory result = new Dragon[](balanceOf(owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < dragons.length; i++) {
            if (ownerOf(i) == owner) {
                result[counter] = dragons[i];
                counter++;
            }
            return result;
        }
    }

    // Actions
    function levelUp(uint256 _dragonID) public {
        require(ownerOf(_dragonID) == msg.sender);
        Dragon storage dragon = dragons[_dragonID];
        dragon.level++;
    }
}
