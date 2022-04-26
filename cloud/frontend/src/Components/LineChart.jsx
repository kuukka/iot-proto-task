import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Device temperatures',
      },
    },
};

 const LineChart = props => {
    const myOpts = JSON.parse(JSON.stringify(options));
    myOpts.plugins.title.text = props.title;

    return (
        <Line options={myOpts} data={props.data}/>
    )
}

export default LineChart;