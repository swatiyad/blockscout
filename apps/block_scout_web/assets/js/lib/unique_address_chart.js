import Highcharts from 'highcharts';
import axios from 'axios';

const chartOptions = {
  chart: {
    type: 'area',
  },
  title: {
    text: 'WYZ Unique Address Chart',
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      month: '%b %Y' // Display month and year (e.g., Jan 2024)
    },
    title: {
      text: 'Month'
    },
  },
  yAxis: {
    title: {
      text: 'WYZ Cumulative Address Growth',
    },
  },
  series: [
    {
      name: 'Total distinct addresses',
      data: [],
      color: "#bdc54a80"
    },
  ],
};

export const fetchApi = async () => {
  try {
    const res = await axios.get('https://wyzthscan.org/node-api/get-all-addresses');
    const addressArray = res.data; // Assuming the response contains the desired data

    // Create an object to store the count of addresses for each month
    const addressCountByMonth = {};

    // Loop through the address array and count the addresses for each month
    addressArray.forEach((item) => {
      const date = new Date(item?.inserted_at);
      const yearMonth = date.getFullYear() + '-' + (date.getMonth() + 1); // Generate year-month key
      addressCountByMonth[yearMonth] = (addressCountByMonth[yearMonth] || 0) + 1; // Increment the count for the corresponding month
    });

    // Prepare data for chart
    const data = Object.entries(addressCountByMonth).map(([yearMonth, count]) => ({
      x: Date.UTC(yearMonth.split('-')[0], yearMonth.split('-')[1] - 1), // Convert year and month to UTC timestamp
      y: count
    }));

    chartOptions.series[0].data = data;

    return addressArray;
  } catch (error) {
    console.error('Error fetching API:', error);
    throw error;
  }
};

(async () => {
  try {
    const d = await fetchApi()

    const chartContainer = document.getElementById('chartContainer7');
    Highcharts.chart(chartContainer, chartOptions);
  } catch (error) {
    console.error('Error rendering chart:', error);
  }
})();
