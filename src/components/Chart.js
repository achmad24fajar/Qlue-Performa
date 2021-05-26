import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const genData = (people) => ({
  labels: people[0],
  datasets: [
    {
      type: "bar",
      label: "Height",
      backgroundColor: `rgb(102, 102, 10)`,
      data: people[1],
    },
    {
      type: "bar",
      label: "Mass",
      backgroundColor: `rgb(55, 80, 19)`,
      data: people[2],
    },
  ],
});

const options = {
  fullSize: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Chart = ({ chart, page }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getDataFromLS = () => {
      if (localStorage.key === `page-${page}`) {
        setData(JSON.parse(localStorage.getItem(`chart-${page}`)));
      } else {
        setData(chart);
      }
    };
    getDataFromLS();
  }, [chart]);

  return (
    <>
      <div className="header">
        <h3 className="title text-dark">Graph</h3>
      </div>
      {data ? (
        <Bar data={genData(data)} options={options} />
      ) : (
        <Bar data={genData(chart)} options={options} />
      )}
    </>
  );
};

export default Chart;
