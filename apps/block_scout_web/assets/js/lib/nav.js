document.addEventListener("DOMContentLoaded", () => {
    const username = window.sessionStorage.getItem("username");
    const signInTextElement = document.querySelector(".sign-in-text");
  
    if (username !== null && username !== undefined) {
      signInTextElement.textContent = "Logout";
    }
  
    signInTextElement.addEventListener("click", () => {
      if (signInTextElement.textContent === "Logout") {
        window.sessionStorage.removeItem("username");
        window.location.href = "/signin";
      }
    });
  });