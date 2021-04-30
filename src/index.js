let data;

const getData = () => {
  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then((response) => response.json())
    .then((json) => {
      data = json;
    })
    .catch((error) => {
      console.log(error);
    });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", getData);
} else {
  getData();
}
