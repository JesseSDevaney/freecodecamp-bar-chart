import "./index.scss";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("chart-container").textContent = JSON.stringify(
          data
        );
      })
      .catch((error) => {
        console.log(error);
      });
  });
} else {
  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("chart-container").textContent = JSON.stringify(
        data
      );
    })
    .catch((error) => {
      console.log(error);
    });
}
