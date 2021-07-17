const fetchParamsMock = require("./fetchParamsMock");

const loader = document.querySelector("#loading");
const content = document.querySelector("#content");

function displayLoading() {
  loader.classList.add("display");
  content.classList.add("hide");
}

function hideLoading() {
  loader.classList.remove("display");
  content.classList.remove("hide");
}
function addOptionsToSelect(items) {
  const pathsSelect = document.getElementById("paths-select");
  items.forEach(({ path, id }) => {
    const opt = document.createElement("option");
    opt.appendChild(document.createTextNode(path));
    opt.value = path;
    opt.key = id;
    pathsSelect.appendChild(opt);
  });
}
function fetchParams() {
  displayLoading();
  const response = fetchParamsMock;
  setTimeout(() => {
    hideLoading();
    addOptionsToSelect(response);
  }, 500);
  /* fetch("/params")
    .then((response) => response.json())
    .then((json) => {
      hideLoading();
      console.log(JSON.stringify(json));
      addOptionsToSelect(json);
    }); */
}
function handleSelect(id) {
  const encodedPath = encodeURIComponent(id.value);
  console.log(encodedPath);
  fetch(`/params/${encodedPath}`)
    .then((response) => response.json())
    .then((json) => {
      hideLoading();
      console.log(JSON.stringify(json));
      showParameters(json);
    });
}

function showParameters(params) {
  const parameterList = document.getElementById("parameter-list");
  parameterList.querySelectorAll("*").forEach((n) => n.remove());
  params.forEach(({ name, value, type }) => {
    const list = document.createElement("li");
    const paramName = document.createElement("div");
    paramName.classList.add("parameter-list__name");
    paramName.appendChild(document.createTextNode(name));

    const paramType = document.createElement("div");
    paramType.appendChild(document.createTextNode(type));
    paramType.classList.add("parameter-list__type");
    const paramValue = document.createElement("div");
    paramValue.appendChild(document.createTextNode(value));
    paramValue.classList.add("parameter-list__value");
    list.appendChild(paramName);
    list.appendChild(paramType);
    list.appendChild(paramValue);

    parameterList.appendChild(list);
  });
}

(function () {
  fetchParams();
})();
