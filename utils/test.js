const MerkleTree = require('./MerkleTree');

// Leaves of the Merkle tree
const leaves = ['Dr. Olga Kassulke', 'Sidney Kertzmann', 'Chris Windler'];

// Create a Merkle tree from the leaves
const merkleTree = new MerkleTree(leaves);

// Get the Merkle root
const root = merkleTree.getRoot();
console.log('Merkle Root:', root);

// Get the proof for the leaf 'Sidney Kertzmann' at index 1
const proof = merkleTree.getProof(1);
console.log('Proof for Sidney Kertzmann:', proof);
