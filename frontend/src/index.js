import "./index.css";

console.log("frontend .js file loaded");

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
    button.addEventListener("click", () => {
        console.log("hello, this is event listener on button 1 being clicked");
    });
});
