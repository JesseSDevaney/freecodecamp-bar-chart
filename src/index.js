import "./index.scss";
import createBarChart from "./app/create-bar-chart";

function ready() {
  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then((response) => response.json())
    .then((json) => {
      const dataset = json.data;
      createBarChart(dataset);
    })
    .catch((error) => {
      alert("Error fetching data");
      console.log(error);
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
