//contract-address='0xD3ACB1943e0F71dF527Db683cBEB50427E79E1ab'
const express = require("express");
const { Web3 } = require("web3");
const app = express();

console.log("Listening at port 3000");
app.listen(3000);

const web3 = new Web3("http://127.0.0.1:7545");

const contractABI = require("./build/contracts/SSI.json").abi;
const contractAddress = "0xD3ACB1943e0F71dF527Db683cBEB50427E79E1ab";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const verifierABI = require("./build/contracts/VerifierSSI.json").abi;
const verifierAddress = "0x1C2f811eFBe779E8110DD3D91E4009A03631632b";
const contract2 = new web3.eth.Contract(verifierABI, verifierAddress);

contract.methods
  .addDocument("22", "222", "qq", "ww", "ee", "rr", "tt")
  .send({
    from: "0xD70c8C6cbfA0080212c59f4Ec8b4E051C6acd89B",
    gas: "6721975",
    gasPrice: "20000000000",
  })
  .then((receipt) => {
    console.log("Transaction receipt:", receipt);
  });

async function getAllDocuments() {
  const totalDocuments = await contract.methods.totalDocuments().call(); // Assuming you have a function to get total documents count

  const documents = [];
  for (let i = 0; i < totalDocuments; i++) {
    const document = await contract.methods.getDocument(i).call();
    documents.push(document);
  }
  return documents;
}

// Call the function to retrieve all documents
getAllDocuments()
  .then((documents) => {
    console.log("All documents:", documents);
  })
  .catch((error) => {
    console.error("Error fetching documents:", error);
  });
