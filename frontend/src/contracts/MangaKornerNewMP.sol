pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// Create a new contract that extends the SafeERC721 contract
contract NFTMarketplace is ERC721URIStorage {
    // Set up some variables to store information about the NFTs

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
   
    address public owner;
    mapping(uint256 => uint256) public _tokenIdToPrice;
    mapping(uint256 => address) public _tokenOwner;
    mapping(uint256 => uint256) public _marketPlace; //tokenId => 1 (for sale), 0 (not for sale)
    //uint [] internal result;
    
    
    // The constructor function is called when the contract is deployed to the blockchain
    constructor() ERC721("MangaMarket", "MKP") public {
        
        owner = msg.sender;
    }
    
    // This function allows the contract owner to mint new NFTs
    function mint(string memory _uri,  uint256 _price) public {
        // Only the contract owner can mint new NFTs
        //require(msg.sender == owner, "Only the contract owner can mint new NFTs");
        uint256 newItemId = _tokenIds.current();
        
        // Mint the new NFT
        _mint(msg.sender, newItemId );
        // Set the URI and metadata for the NFT
        _setTokenURI(newItemId, _uri);
        _marketPlace[newItemId] = 1;
        _tokenIdToPrice[newItemId] = _price;
        _tokenOwner[newItemId] = msg.sender;
        _tokenIds.increment();
    }
    
    // This function allows users to buy NFTs that are being sold
    function buy(uint256 _tokenId) public payable {
        // Check that the NFT is being sold
        //require(_exists(_tokenId), "The NFT is not being sold");
        
        // Get the price of the NFT
        uint256 price = _tokenIdToPrice[_tokenId];
        
        // Check that the buyer has enough ether to purchase the NFT
        require(msg.value >= price, "You do not have enough ether to purchase the NFT");
        
        // Get the address of the current owner of the NFT
        address owner = _tokenOwner[_tokenId];

        //marketplace update
        _marketPlace[_tokenId] = 0;
        
        // Transfer the NFT to the buyer
        _transfer(owner, msg.sender, _tokenId);
        
        // Transfer the ether from the buyer to the seller
        payable(owner).transfer(price);
        _tokenOwner[_tokenId] = msg.sender;
    }
    
    // This function allows the owner of an NFT to put it up for sale
    function putUpForSale(uint256 _tokenId, uint256 _price) public {
        // Only the owner of the NFT can put it up for sale
        require(_tokenOwner[_tokenId] == msg.sender, "Only the owner of the NFT can put it up for sale");

        
        // Set the price of the NFT
        _tokenIdToPrice[_tokenId] = _price;
        _marketPlace[_tokenId] = 1;
    }


    function getAll() public view returns (uint256[] memory){
        uint256[] memory ret = new uint256[](_tokenIds.current());
        for (uint i = 0; i < _tokenIds.current(); i++) {
            ret[i] = _marketPlace[i];
        }
        return ret;
    }

    function getAllTokens(address own) public view returns (uint[] memory){
        //uint[] storage result;
        uint[] memory result = new uint[](0);
        // for (uint i = 0; i < 2**256; i++) {
        //     if (_tokenOwner[i] == own && _marketPlace) {
        //         result.push(i);
        //     }
        // }
        return result;
    }
}
