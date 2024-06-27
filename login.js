document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.querySelector(".sign-up-form");
    const signInForm = document.querySelector(".sign-in-form");
  
    // Handle sign-up form submission
    signUpForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Simulate a successful registration (you should replace this with actual registration logic)
      console.log("Registration successful");
      // Forward to sign-in form
      document.querySelector(".container").classList.remove("sign-up-mode");
    });
  
    // Handle sign-in form submission
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Simulate a successful login (you should replace this with actual login logic)
      console.log("Login successful");
      // Forward to index.html
      window.location.href = "index.html";
    });
  
    // Handle switching between forms
    const signUpBtn = document.querySelector("#sign-up-btn");
    const signInBtn = document.querySelector("#sign-in-btn");
  
    signUpBtn.addEventListener("click", () => {
      document.querySelector(".container").classList.add("sign-up-mode");
    });
  
    signInBtn.addEventListener("click", () => {
      document.querySelector(".container").classList.remove("sign-up-mode");
    });
  });
  