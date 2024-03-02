//contract-address='0xD3ACB1943e0F71dF527Db683cBEB50427E79E1ab'
const express = require("express");
const { Web3 } = require("web3");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(bodyParser.json());
console.log("Listening at port 3000");
app.listen(3000);

const web3 = new Web3("http://127.0.0.1:7545");

const contractABI = require("./build/contracts/SSI.json").abi;
const contractAddress = "0x5E61F7Aa0eF6be08eAF71945d0eA1926203119ad";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const verifierABI = require("./build/contracts/VerifierSSI.json").abi;
const verifierAddress = "0x4e667368EE44C784f6e33Bb7816756971D92e4A3";
const contract2 = new web3.eth.Contract(verifierABI, verifierAddress);

async function getAllDocuments() {
  const totalDocuments = await contract.methods.totalDocuments().call();

  const documents = [];
  for (let i = 0; i < totalDocuments; i++) {
    const document = await contract.methods.getDocument(i).call();
    documents.push(document);
  }
  return documents;
}

//Issuer
app.get("/issuer", (req, res) => {
  res.send("Logged in page of issuer");
});

app.post("/issuer/add", (req, res) => {
  const { name, dob, email, phone, address } = req.body;
  let user_did = uuidv4();
  contract.methods
    .addDocument(user_did, name, dob, email, phone, address)
    .send({
      from: "0x5719E0d645269916A4061f63636efF10f2bbFfB8",
      gas: "6721975",
      gasPrice: "20000000000",
    })
    .then((receipt) => {
      console.log("Transaction receipt:", receipt);
    });
});

app.get("/issuer/all", (req, res) => {
  const allDocs = [];
  getAllDocuments()
    .then((documents) => {
      documents.forEach((doc) => {
        const each = {
          name: doc.name,
          dob: doc.dob,
          email: doc.email,
          phone: doc.phone,
          address: doc.permanentAddress,
          status: doc.status,
        };
        allDocs.push(each);
      });
      console.log(allDocs);
      res.send(allDocs); //Object containing list of all documents issued
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });
});

//Holder
app.get("/holder", (req, res) => {
  res.send("Logged in page of holder");
});

app.get("/holder/all", (req, res) => {
  const acceptedDocs = [];
  getAllDocuments()
    .then((documents) => {
      documents.forEach((doc) => {
        const each = {
          name: doc.name,
          dob: doc.dob,
          email: doc.email,
          phone: doc.phone,
          address: doc.permanentAddress,
          status: doc.status,
        };
        if (doc.status === true) {
          acceptedDocs.push(each);
        }
      });
      res.send(acceptedDocs);
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });
});

app.get("/holder/requests", (req, res) => {
  const pendingDocs = [];
  getAllDocuments()
    .then((documents) => {
      documents.forEach((doc) => {
        const each = {
          name: doc.name,
          dob: doc.dob,
          email: doc.email,
          phone: doc.phone,
          address: doc.permanentAddress,
          status: doc.status,
        };
        if (doc.status === false) {
          pendingDocs.push(each);
        }
      });
      res.send(pendingDocs); //Object containing list of all documents issued
    })
    .catch((error) => {
      console.error("Error fetching documents:", error);
    });
});

// async function verifyDocuments() {
//   const totalDocuments = await contract.methods.totalDocuments().call(); // Assuming you have a function to get total documents count
// }
