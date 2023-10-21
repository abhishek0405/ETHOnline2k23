
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract MangaKornerMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    mapping(uint256 => MangaItem) private idToMangaItem;
    mapping (uint256 => string) private _tokenURIs;

    struct MangaItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event MangaItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    constructor() ERC721("MangaKornerMarketplace", "MGK") {
      owner = payable(msg.sender);
    }

   

  
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMangaItem(newTokenId, price);
      return newTokenId;
    }

    function createMangaItem(
      uint256 tokenId,
      uint256 price
    ) private {
      require(price > 0, "Price must be at least 1 wei");
      require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMangaItem[tokenId] =  MangaItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit MangaItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        false
      );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMangaItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      require(msg.value == listingPrice, "Price must be equal to listing price");
      idToMangaItem[tokenId].sold = false;
      idToMangaItem[tokenId].price = price;
      idToMangaItem[tokenId].seller = payable(msg.sender);
      idToMangaItem[tokenId].owner = payable(address(this));
      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
      uint256 tokenId
      ) public payable {
      uint price = idToMangaItem[tokenId].price;
      address seller = idToMangaItem[tokenId].seller;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToMangaItem[tokenId].owner = payable(msg.sender);
      idToMangaItem[tokenId].sold = true;
      idToMangaItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      payable(owner).transfer(listingPrice);
      payable(seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MangaItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MangaItem[] memory items = new MangaItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMangaItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MangaItem storage currentItem = idToMangaItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MangaItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMangaItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MangaItem[] memory items = new MangaItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMangaItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MangaItem storage currentItem = idToMangaItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MangaItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMangaItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MangaItem[] memory items = new MangaItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMangaItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MangaItem storage currentItem = idToMangaItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
}