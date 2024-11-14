const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const graduationList = require('../utils/graduationList.json');

const app = express();
const port = 1225;

// Set up static file serving
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Initialize Merkle tree with the graduation list
const merkleTree = new MerkleTree(graduationList);
const MERKLE_ROOT = merkleTree.getRoot();

// Endpoint to verify if a name is on the graduation list
app.post('/graduation', (req, res) => {
  const { leaf, proof } = req.body;
  console.log(`Received leaf: ${leaf}`);
  console.log(`Received proof: ${JSON.stringify(proof)}`);

  // Verify the provided proof against the Merkle root
  const isInTheList = verifyProof(proof, leaf, MERKLE_ROOT);

  if (isInTheList) {
    res.send(`Congratulations, ${leaf}🎉!`);
  } else {
    res.send("You are not on the list :(");
  }
});

// Endpoint to get proof for a name
app.post('/getProof', (req, res) => {
  const { name } = req.body;
  const index = graduationList.indexOf(name);

  if (index === -1) {
    res.status(404).send('Your are not on the list :(');
    return;
  }

  const proof = merkleTree.getProof(index);
  res.json(proof);
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}! Open http://localhost:${port} in your browser.`);
});

