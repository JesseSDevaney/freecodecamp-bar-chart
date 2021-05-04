import * as d3 from "d3";

export default function createBarChart(dataset) {
  const width = 160;
  const height = 90;

  d3.select("#chart-container")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`);
}
