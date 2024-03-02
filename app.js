const express = require("express");
const mongoose = require("mongoose");
const Login = require("./models/login");
const bodyParser = require("body-parser");
const { Web3 } = require("web3");

const app = express();

app.use(bodyParser.json());
console.log("Listening at port 3000");
app.listen(3000);

const contractABI = require("./SSI.json").abi;
const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0x100ee96Ce4Eb8094C0884eA19BA472f0f6d16fB7";
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

//Function to add credentials into the blockchain
async function addqq(user, did, name, father, email, phone, address) {
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0]; // Assuming sender is the first account
  await contractInstance.methods
    .addDocument(user, did, name, father, email, phone, address)
    .send({ from: sender });
  console.log("Credential stored successfully.");
}

//Function to get credentials from blockchain
async function getDocument() {
  const credentials = await contract.methods.getAllCredentials().call();
  return credentials;
}

//Issuer has to issue the credentials and store in blockchain(Issuer)
app.get("/issue", (req, res) => {
  // const { name, email, dob, phone, address } = req.body;
  let name = "aaa",
    email = "aaa@gmail.com",
    father = "bbb",
    phone = "999",
    address = "aaa";
  user = "111";
  did = "222";
  addqq(user, did, name, father, email, phone, address);
});

//Holder can look at all their credentials(Holder)
app.get("/credential", (req, res) => {
  res.send("Display of all credentials");
});

//Holder can look at all their pending credentials(Holder)
app.get("/pending", (req, res) => {
  res.send("Display of all pending credentials");
});

//Holder can look at all their approved credentials(Holder)
app.get("/approve", (req, res) => {
  res.send("Display of all approved credentials");
});

//Holder can approve pending credentials by marking its status valid(Holder)
app.post("/approve", (req, res) => {
  const credentials = getDocument(); //Call document that is to be verified with their did
  //Mark status as true if verified document
});

//Verifier can request for credentials from holder by providing public address(Holder)
app.post("/request", (req, res) => {
  const { publicId } = req.body;
});

//Holder can look at requests from verifier(Holder)
app.get("/requests", (req, res) => {
  res.send("All requests from verifier");
});

//Holder can send relevant approved credential to verifier(Holder)
app.post("/send", (req, res) => {
  const { did } = req.body;
  res.send("Send relevant information to verifier");
});
