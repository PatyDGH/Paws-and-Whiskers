const container = document.getElementById("container");

const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");

const inputFullName = document.getElementById("input-fullname");
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

const signUpMessage = document.getElementById("signUpMessage");
const loginMessage = document.getElementById("loginMessage");

const forgotPassword = document.getElementById("forgotPassword");


registerBtn.addEventListener("click", function () {

    container.classList.add("active");

    clearMessages();

});


loginBtn.addEventListener("click", function () {

    container.classList.remove("active");

    clearMessages();

});


signUpForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const fullName = inputFullName.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    if (fullName === "" || email === "" || password === "") {

        showMessage(signUpMessage, "🐾 Please fill in all fields.", "error");

        return;
    }

    if (password.length < 6) {

        showMessage(signUpMessage, "🔐 Password must be at least 6 characters.", "error");

        return;
    }

    const existingEmail = localStorage.getItem("email");

    if (existingEmail === email) {

        showMessage(signUpMessage, "🐱 This email is already registered.", "error");

        return;
    }

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    showMessage(signUpMessage, "🐶 Account created successfully!", "success");

    signUpForm.reset();

    setTimeout(function () {

        container.classList.remove("active");

        showMessage(loginMessage, "🐾 Your account is ready. Please sign in!", "success");

    }, 1200);

});


signInForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedFullName = localStorage.getItem("fullName");

    if (email === "" || password === "") {

        showMessage(loginMessage, "🐾 Please enter your email and password.", "error");

        return;
    }

    if (email === savedEmail && password === savedPassword) {

    showMessage(loginMessage, "🐶 Welcome back, " + savedFullName + "!", "success");

    localStorage.setItem("isLoggedIn", "true");

    setTimeout(function () {

        window.location.href = "index.html";

    }, 1200);
    } else {

        showMessage(loginMessage, "😿 Incorrect email or password.", "error" );

    }

});


forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    const savedEmail = localStorage.getItem("email");

    if (!savedEmail) {

        showMessage(loginMessage, "🐾 No account found. Please create an account first.", "error");

        return;
    }

    showMessage(loginMessage, "📩 Password reset instructions will be sent to " + savedEmail + ".", "success");

});


function showMessage(element, message, type) {

    element.textContent = message;

    element.className = "form-message " + type;

}


function clearMessages() {

    signUpMessage.textContent = "";

    signUpMessage.className = "form-message";

    loginMessage.textContent = "";

    loginMessage.className = "form-message";

}

const mobileSignUp = document.getElementById("switchToSignUp");
const mobileSignIn = document.getElementById("switchToSignIn");

if (mobileSignUp) {
    mobileSignUp.addEventListener("click", function (e) {
        e.preventDefault();
        container.classList.add("active");
        clearMessages();
    });
}

if (mobileSignIn) {
    mobileSignIn.addEventListener("click", function (e) {
        e.preventDefault();
        container.classList.remove("active");
        clearMessages();
    });
}
