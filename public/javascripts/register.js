

function handleFormSubmission(event) {
    event.preventDefault(); 
    
    // Validate the form
    if (!validateForm()) {
        return false; // If validation fails, do not submit the form
    }

    // Get the form data
    const formData = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value
    };

   console.log(formData);
   document.getElementById("error-message").style.display = "none";
    axios.post('/signUp', formData)
        .then(response => {
            
            // alert('Registration successful!');
            window.location.href = '/home';
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.error) {
        if (error.response.data.error === 'User already exists') {
            
            document.getElementById("error-message").style.display = "block";
        } else {
            alert(error.response.data.error); 
        }
    } else {
        alert('An error occurred. Please try again later.');
    }
        });
}

//validation
function validateForm() {
    let valid = true;

    // Get the form fields
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    // Clear previous error messages
    document.getElementById("username-error").style.display = "none";
    document.getElementById("email-error").style.display = "none";
    document.getElementById("password-error").style.display = "none";
    document.getElementById("confirm-password-error").style.display = "none";

    // Validate username
    if (!username.value.trim()) {
        document.getElementById("username-error").style.display = "block";
        valid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
        document.getElementById("email-error").style.display = "block";
        valid = false;
    }

    // Validate password
    if (!password.value.trim()) {
        document.getElementById("password-error").style.display = "block";
        valid = false;
    }

    // Validate confirm password
    if (password.value.trim() !== confirmPassword.value.trim()) {
        document.getElementById("confirm-password-error").style.display = "block";
        valid = false;
    }

    return valid;
}