//Login
app.post("/roles", (req, res) => {
  const { role } = req.body; //button to choose roles
  //route to /issuer or /holder or /verifier depending upon button clicked
});

//Issuer

// app.get("/issuer", (req, res) => {
//   res.send("Logged in page of issuer");
// });

// app.post("/issuer/add", (req, res) => {
//   const { name, dob, email, phone, address } = req.body;
//   //generate did
//   addDocument(did, name, dob, email, phone, address); //Store into blockchain
// });

app.post("/issuer/send", (req, res) => {
  const { publicAddress, did } = req.body;
  res.send("Request sent to public address");
});

// app.get("/issuer/all", (req, res) => {
//   res.send("Display all issued credentials");
// });

//Holder

app.get("/holder", (req, res) => {
  res.send("Logged in page of holder");
});

app.get("/holder/all", (req, res) => {
  res.send("View all credentials of holder");
});

app.get("/holder/requests", (req, res) => {
  res.send("Holder can look at all requests coming in from verifier");
});

app.post("/holder/send", (req, res) => {
  const { choice } = req.body; //Choose from all the credentials
  res.send("Chosen credential sent to verifier");
});

//Verifier

app.post("/verifier", (req, res) => {
  const { public_key } = req.body; //Verifier enters public key to request credentials from
  res.send("Logged in page of verifier");
});

app.post("verifier/pending", (res, res) => {
  res.send("Show pending requests");
});

app.get("/verifier/verified", (req, res) => {
  res.send("Show all the stored credentials");
});
