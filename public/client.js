async function getProofForName(name) {
  try {
    const response = await axios.post('/getProof', { name });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; 
    }
    console.error('Error fetching proof:', error);
    throw error;
  }
}

async function checkGraduationList() {
  const name = document.getElementById('nameInput').value;
  const resultDiv = document.getElementById('result');
  const confettiContainer = document.querySelector('.confetti-container');

  if (!name) {
    resultDiv.textContent = 'Please enter a name.';
    return;
  }

  try {
    const proof = await getProofForName(name);

    if (proof === null) {
      resultDiv.textContent = 'Your name not found in the graduation list';
      confettiContainer.classList.remove('active');
      return;
    }

    const response = await axios.post('/graduation', {
      leaf: name,
      proof: proof
    });

    resultDiv.textContent = response.data;

    if (response.data.includes('Congratulations')) {
      confettiContainer.classList.add('active');
      setTimeout(() => {
        confettiContainer.classList.remove('active');
      }, 8000); 
    } else {
      confettiContainer.classList.remove('active');
    }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      resultDiv.textContent = `Error: ${error.response.status} - ${error.response.data}`;
    } else if (error.request) {
      // Request was made but no response received
      resultDiv.textContent = 'Error: No response from server.';
    } else {
      // Something else happened
      resultDiv.textContent = `Error: ${error.message}`;
    }
    console.error(error);
    confettiContainer.classList.remove('active');
  }
}