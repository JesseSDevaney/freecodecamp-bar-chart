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

  const yearAndQuarter = dataset.map((item) => {
    let quarter;
    const temp = item[0].substring(5, 7);

    if (temp === "01") {
      quarter = "Q1";
    } else if (temp === "04") {
      quarter = "Q2";
    } else if (temp === "07") {
      quarter = "Q3";
    } else if (temp === "10") {
      quarter = "Q4";
    }

    return item[0].substring(0, 4) + " " + quarter;
  });

  // Convert dataset date strings to Date objects
  const dataDates = dataset.map((item) => new Date(item[0]));

  // Create scales and axes
  const dateMax = new Date(d3.max(dataDates));
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
  const positiveColor = "#4dad20";
  const positiveHover = "#90f461";
  const negativeColor = "#ad2222";
  const negativeHover = "#ffa5a5";

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(dataDates[i]))
    .attr("y", (d) => yScale(d[1]))
    .attr("width", barWidth)
    .attr("height", (d) => height - yScale(d[1]) - padHeight)
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-yearAndQuarter", (d, i) => yearAndQuarter[i])
    .attr("data-gdp", (d) => d[1])
    .attr("data-gdpChange", (d, i) => {
      if (i === 0) {
        return "N/A";
      } else {
        const previous = dataset[i - 1][1];
        const change = d[1] - previous;
        return change.toFixed(2);
      }
    })
    .attr("fill", (d, i) => {
      const previous = dataset[i - 1];
      if (i === 0) {
        return positiveColor;
      } else {
        return d[1] >= previous[1] ? positiveColor : negativeColor;
      }
    })
    .on("mouseover", (event) => {
      const { target, x, y } = event;

      if (target.getAttribute("fill") === positiveColor) {
        target.setAttribute("fill", positiveHover);
      } else {
        target.setAttribute("fill", negativeHover);
      }

      const { gdp, date, yearAndQuarter, gdpChange } = target.dataset;

      const tooltip = document.createElement("div");
      tooltip.setAttribute("id", "tooltip");
      tooltip.setAttribute("data-date", date);
      tooltip.style.left = `${x + 20}px`;
      tooltip.style.top = `${y + 20}px`;
      tooltip.appendChild(
        document.createTextNode(
          `Date: ${yearAndQuarter}` +
            `\nGDP: ${gdp}` +
            `\nChange in GDP: ${gdpChange}`
        )
      );
      document.body.appendChild(tooltip);
    })
    .on("mouseout", (event) => {
      const rect = event.target;
      if (rect.getAttribute("fill") === positiveHover) {
        rect.setAttribute("fill", positiveColor);
      } else {
        rect.setAttribute("fill", negativeColor);
      }
      document.getElementById("tooltip").remove();
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
