//for editing personal info and saving 

function enableEditing() {
  document.querySelectorAll('.input-field').forEach(input => {
    input.disabled = false; 
  });
  document.querySelectorAll('.section input[type="radio"]').forEach(radio => {
    radio.disabled = false; 
  });
  document.getElementById('save-button').disabled = false;
}

function saveInformation() {
    // Update the user name in the sidebar
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = `${firstName} ${lastName}`;
    alert('Your Personal information is saved now!');

    //Disabling after saving
    document.querySelectorAll('.input-field').forEach(input => {
        input.disabled = true;
    });
    document.querySelectorAll('.section input[type="radio"]').forEach(radio => {
        radio.disabled = true; 
    });
    document.getElementById('save-button').disabled = true; 
}
//end