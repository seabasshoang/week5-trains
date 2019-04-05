let latestInput = "Finsbury Park";

const defaultStation = () => {
  fetch("/default")
    .then(res => res.json())
    .then(json => populateDom(json));
};

const searchStation = string => {
  const endpoint = `/query=${string}`;
  fetch(endpoint)
    .then(res => res.json())
    .then(json => populateDom(json));
};

defaultStation();
setInterval(getTime, 1000);

const submitButton = document.querySelector("#submit-button");
const input = document.querySelector("#user-input");

submitButton.addEventListener("click", e => {
  e.preventDefault();
  console.log("searching...");
  const value = input.value;
  latestInput = value;
  searchStation(value);
});

const refreshButton = document.querySelector("#refresh-button");

refreshButton.addEventListener("click", () => {
  searchStation(latestInput);
});
input.addEventListener("input", e => {
  e.preventDefault();
  const value = input.value;
  const endpoint = `/autocomplete=${value}`;
  fetch(endpoint)
    .then(res => res.json())
    .then(json => fillAutocomplete(json));
});

const datalist = document.getElementById("autocomplete");

const fillAutocomplete = json => {
  datalist.innerHTML = "";
  json.forEach(item => {
    const optionElem = document.createElement("option");
    optionElem.textContent = item;
    optionElem.setAttribute("aria-label", "list option: " + item);
    datalist.appendChild(optionElem);
  });
};