import * as d3 from "d3";
import "./chart.scss";

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
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(dataset, (d) => d[1] / 2), d3.max(dataset, (d) => d[1])])
    .range([height - padHeight, padHeight]);

  const dataLength = dataset.length;
  let barGapFraction = 0.5; // barGap is a fraction of barWidth
  const barWidth =
    (width - 2 * padWidth) / ((1 + barGapFraction) * dataLength + 1);
  const barGap = barGapFraction * barWidth;

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

  svg
    .append("text")
    .attr("id", "title")
    .text("GDP (in billions) versus Time")
    .style("font-size", "3px")
    .attr("x", "50%")
    .attr("y", 5)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle");
}
