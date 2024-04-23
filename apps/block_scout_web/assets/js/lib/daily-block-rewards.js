import Highcharts from 'highcharts';
import axios from 'axios';

const chartOptions = {
  chart: {
    type: 'area',
  },
  title: {
    text: 'Daily WYZ Supply',
  },
  xAxis: {
    type: 'datetime',
    labels: {
      formatter: function () {
        return Highcharts.dateFormat('%e %b', this.value); // Format date as 'Day Month'
      }
    },
    title: {
      text: 'Date',
    },
  },
  yAxis: {
    title: {
      text: 'New WYZ Supply per Day',
    },
  },
  tooltip: {
    formatter: function () {
      const date = new Date(this.x);
      return Highcharts.dateFormat('%e %b %Y', date) + '<br/>' + Highcharts.numberFormat(this.y, 2);
    }
  },
  series: [
    {
      name: 'Daily WYZ Supply',
      data: [],
      color: "#bdc54a80"
    },
  ],
};

export const fetchApi = async () => {
  try {
    const res = await axios.get('https://wyzthscan.org/node-api/get-block-rewards');
    const dataArray = res.data; // Assuming the response contains the desired data

    // Prepare data for chart
    const data = dataArray.map(item => ({
      x: new Date(item.updated_at).getTime(), // Convert date to milliseconds since Unix epoch
      y: parseFloat(item.total_reward) // Parse total_reward as float
    }));

    chartOptions.series[0].data = data;

    return dataArray;
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
};

(async () => {
  try {
    const responseData = await fetchApi();

    const chartContainer = document.getElementById('chartContainer11');
    Highcharts.chart(chartContainer, chartOptions);
  } catch (error) {
    console.error('Error rendering chart:', error);
  }
})();
