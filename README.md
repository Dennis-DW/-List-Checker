# Graduation List Checker 

## Overview

The **Graduation List Checker** is a web application that allows users to verify if their name is on a graduation list using a **Merkle Tree** for efficient proof verification. The Merkle Tree structure ensures quick and secure verification, making the application lightweight and scalable.

## Project Structure

- **`server.js`**: The server-side code handling API requests.
- **`client.js`**: The client-side code that communicates with the server.
- **`index.html`**: The HTML file providing the web interface.
- **`styles.css`**: The CSS file for styling the web interface.
- **`verifyProof.js`**: Utility for verifying Merkle proofs.
- **`MerkleTree.js`**: Utility to create and manage a Merkle Tree.
- **`graduationList.json`**: JSON file containing the list of graduates.

---

## Server (`server.js`)

### Endpoints

- **`POST /graduation`**
  - **Description**: Verifies if a name is on the graduation list.
  - **Request Body**: `{ leaf: string, proof: array }`
  - **Response**:
    - `200 OK`: If the name is on the list, responds with `Congratulations, {leaf}🎉!`
    - `200 OK`: If the name is not on the list, responds with `You are not on the list :(`

- **`POST /getProof`**
  - **Description**: Retrieves the Merkle proof for a given name.
  - **Request Body**: `{ name: string }`
  - **Response**:
    - `200 OK`: JSON array containing the proof if the name is found.
    - `404 Not Found`: `You are not on the list :(` if the name is not found.

### Initialization

- Initializes the Merkle Tree with the graduation list.
- Serves static files from the `public` directory.
- Parses JSON request bodies.

---

## Client (`client.js`)

### Functions

- **`getProofForName(name)`**
  - **Description**: Sends a `POST` request to `/getProof` to retrieve the proof for a given name.
  - **Parameters**: `name` (string)
  - **Returns**: Proof array or `null` if the name is not found.

- **`checkGraduationList()`**
  - **Description**: Retrieves the name from the input field and checks if it is on the graduation list.
  - **Result Handling**: Updates the result `div` with the server's response. If the name is on the list, a confetti animation is triggered.

---

## HTML (`index.html`)

### Structure

- **Form**: Contains an input field for entering the name and a submit button.
- **Result Display**: Shows the result of the graduation check.
- **Confetti Animation**: Includes a container for celebration effects.

### Scripts

- **Axios**: Included for making HTTP requests.
- **client.js**: Contains the client-side logic for interacting with the server.

---

## Usage

1. **Start the Server**:
   ```bash
   node server.js
   ```

2. **Open the Application**:
   Open `index.html` in a web browser.

3. **Check Graduation**:
   - Enter a name in the input field and click "Check Graduation".
   - The result will be displayed below the form.
   - If the name is on the list, a confetti animation will appear as a celebration.

---

## Dependencies

- **Express**: For handling server-side routing and middleware.
- **Axios**: For making HTTP requests from the client side.

---

## Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   node server.js
   ```

3. **Open `index.html`** in a web browser to use the application.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
