pragma solidity ^0.5.13;

contract Lottery{
    address public manager;
    address payable[] public players;

    constructor () public{
        manager=msg.sender;
    }

    function enter () public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender); 
    }   

    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp,players)));
    }

    function pickWinner() public payable restricted{
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players= new address payable[](0);
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns(address payable[] memory){
        return players;
    }
}