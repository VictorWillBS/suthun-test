export function prepareDataToChart(data) {
  const result = [];
  let chunkedData = {
    population: {},
    area: {},
  };

  for (let i = 0; i < data.length; i++) {
    chunkedData.population[data[i].name.common] = data[i].population;
    chunkedData.area[data[i].name.common] = data[i].area;

    if ((i > 0 && i % 10 === 0) || i === data.length - 1) {
      result.push({ ...chunkedData });
      chunkedData.population = {};
      chunkedData.area = {};
    }
  }

  return result;
}

export function config(data) {
  return {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      animation:false,
      scales: {
        y0: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            color: "#d4d4d4",
            text: "Population",
            font: {
              size: 16,
            },
            padding:10

          },
          ticks: {
            color: "white",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            color: "#d4d4d4",
            text: "Area",
            font: {
              size: 16,
            },
            padding:10
          },
          ticks: {
            color: "white",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
        x: {
          ticks: {
            color: "white",
          },
        },
      },
    },
  };
}
