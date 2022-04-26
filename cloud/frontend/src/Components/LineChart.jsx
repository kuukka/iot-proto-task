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

    const myOpt = {...options}
    myOpt.plugins.title = {...myOpt.plugins.title}
    myOpt.plugins.title.text = props.title;

    return (
        <Line options={myOpt} data={props.data}/>
    )
}

export default LineChart;