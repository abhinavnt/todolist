

document
.getElementById("login-form")
.addEventListener("submit", function (event) {
  event.preventDefault();

  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";
  document.getElementById("email").classList.remove("is-invalid");
  document.getElementById("password").classList.remove("is-invalid");

  let isValid = true;

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email) {
    isValid = false;
    document.getElementById("email-error").textContent =
      "email is required";
    document.getElementById("email").classList.add("is-invalid");
  }

  if (!password) {
    isValid = false;
    document.getElementById("password-error").textContent =
      "Password is required";
    document.getElementById("password").classList.add("is-invalid");
  }

  if (isValid) {
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          window.location.href = "/home";
        } else {
          console.log("yer error showing");

          if (response.data.message === "incorrect password") {
            showError("password-error", "Incorrect password");
            document
              .getElementById("password")
              .classList.add("is-invalid");
          } else if (response.data.message === "email not found") {
            showError("email-error", "Email not found");
            document
              .getElementById("email")
              .classList.add("is-invalid");
          }
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
});

function showError(elementId, message) {
const errorElement = document.getElementById(elementId);
errorElement.textContent = message;
}