import * as d3 from "d3";

export default function createBarChart(dataset) {
  const width = 160;
  const height = 90;

  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const padWidth = 10;
  const padHeight = 10;

  const dataLength = dataset.length;
  const barWidth = (width - 2 * padWidth) / (1.5 * dataLength + 1);
  const barGap = 0.5 * barWidth;

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(dataset, (d) => d[1] / 2), d3.max(dataset, (d) => d[1])])
    .range([height - padHeight, padHeight]);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", `${barWidth}px`)
    .attr("height", (d) => height - yScale(d[1]) - padHeight)
    .attr("x", (d, i) => padWidth + barGap + i * (barWidth + barGap))
    .attr("y", (d) => yScale(d[1]))
    .attr("fill", "blue");
}
