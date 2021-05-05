import * as d3 from "d3";
import "./chart.scss";

export default function createBarChart(dataset) {
  const width = 800;
  const height = 450;

  // Create SVG
  const svg = d3
    .select("#chart-container")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const padWidth = 0.1 * width;
  const padHeight = 0.1 * height;
  const barWidth = (width - 2 * padWidth) / dataset.length;

  // Convert dataset date strings to Date objects
  const dataDates = dataset.map((item) => new Date(item[0]));

  // Create scales and axes
  var dateMax = new Date(d3.max(dataDates));
  dateMax.setMonth(dateMax.getMonth() + 3);
  const xScale = d3
    .scaleTime()
    .domain([d3.min(dataDates), dateMax])
    .range([padWidth, width - padWidth]);

  // X-Axis
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padHeight})`);

  // X-Axis Label
  svg.append("text").text("Date").attr("x", "85%").attr("y", "97%");

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(dataset, (d) => d[1] / 2), d3.max(dataset, (d) => d[1])])
    .range([height - padHeight, padHeight]);

  // Y-Axis
  const yAxis = d3.axisLeft(yScale);
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padWidth}, 0)`)
    .call(yAxis);

  // Y-Axis Label
  svg
    .append("text")
    .text("GDP (in Billions)")
    .style("text-anchor", "end")
    .attr("x", "-3%")
    .attr("y", "5%")
    .attr("transform", "rotate(-90)");

  // Create bars
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", (d) => height - yScale(d[1]) - padHeight)
    .attr("x", (d, i) => xScale(dataDates[i]))
    .attr("y", (d) => yScale(d[1]))
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("fill", (d, i) => {
      if (i === 0) {
        return "green";
      } else {
        return d[1] >= dataset[i - 1][1] ? "green" : "red";
      }
    });

  // Chart Title
  svg
    .append("text")
    .attr("id", "title")
    .text("GDP (in billions) versus Time")
    .style("font-size", "1rem")
    .attr("x", "50%")
    .attr("y", "5%")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle");
}
