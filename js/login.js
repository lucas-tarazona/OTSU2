window.onload = function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegisterBtn = document.getElementById("showRegister");
    const showLoginBtn = document.getElementById("showLogin");

    const loginMessage = document.getElementById("loginMessage");
    const registerMessage = document.getElementById("registerMessage");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        fetch("api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "contactos.html";
            } else {
                loginMessage.textContent = data.error;
            }
        })
        .catch(error => console.error("Error:", error));
    });

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let regEmail = document.getElementById("regEmail").value;
        let regPassword = document.getElementById("regPassword").value;

        fetch("api/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: regEmail, password: regPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                registerMessage.textContent = data.message;
                setTimeout(() => {
                    document.getElementById("registerSection").style.display = "none";
                    document.getElementById("loginSection").style.display = "block";
                }, 2000);
            } else {
                registerMessage.textContent = data.error;
            }
        })
        .catch(error => console.error("Error:", error));
    });

    showRegisterBtn.addEventListener("click", function() {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("registerSection").style.display = "block";
    });

    showLoginBtn.addEventListener("click", function() {
        document.getElementById("registerSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
    });
};
