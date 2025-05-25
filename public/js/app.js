console.log("Client side javascript file is loaded!");

fetch("https://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((res) => console.log(res));
});

const errorPara = document.querySelector("#error-text");
const responseP = document.querySelector("#response-text");

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const val = document.querySelector("input").value;
  if (!val) {
    errorPara.innerHTML = "Provide a valid location!";
  } else {
    fetch(`http://localhost:3000/weather?address=${val}`).then((response) => {
      response.json().then((res) => {
        if (res.error) {
          errorPara.innerHTML = "Provide a valid location!";
        } else {
          responseP.textContent = `The temp in ${res.address} is ${res.temperature} but it feels like ${res.feelslike}`;
        }
      });
    });
  }
});
