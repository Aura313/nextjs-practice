import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function History() {
  const [policyData, setPolicyData] = useState(null);
  const [labels, setLabels] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };

  useEffect(() => {
    const fetcData = async () =>
      await fetch('/api/history')
        .then((res) => res.json())
        .then((data) => {
          console.log(data, 'dqjkhwdqwhui');
          let labels = [];
          let dataSet = [];
          Object.keys(data).map((i) => {
            console.log(i, '090909090');
            labels.push(i);
            dataSet.push(data[i]);
            setLabels(labels);
            setDataset(dataSet);
          });
          setPolicyData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fetch error: ', err.message);
          setError(err.message);
          setLoading(false);
        });

    fetcData();
  }, []);

  useEffect(() => {
    const ctx = canvasEl.current.getContext('2d');
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: 'My First Dataset',
          data: dataset,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: 'line',
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  console.log(labels, dataset, 'labelslabels');

  const state = {
    labels: labels,
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dataset,
      },
    ],
  };

  return (
    <div className='bg-gray-100'>
      <h1>History</h1>
      <div className='col-md-4'>
        {/* {policyData && (
          <Line
            data={state}
            width={400}
            height={400}
            options={{
              title: {
                display: true,
                text: 'Incident Report',
                fontSize: 20,
              },
              legend: {
                display: true,
                position: 'right',
              },
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: 19,
                      stepSize: 3,
                    },
                  },
                ],
              },
            }}
          />
        )} */}

        <canvas id='myChart' ref={canvasEl} height='100' />
      </div>
      {/* <Line data={state} width={400} height={400} /> */}
    </div>
  );
}
