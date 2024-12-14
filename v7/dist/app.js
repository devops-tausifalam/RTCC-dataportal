// handling ui
let forwardtoModal = document.getElementById("forwardtoModal");
let iConsent = document.getElementById("consent");
forwardtoModal.addEventListener("click", (e) => {
    e.preventDefault();
    // perform form validation before consent modal
    
    iConsent.style.display = "block";
});