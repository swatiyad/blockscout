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
        year: '%Y'
      },
      title: {
        text: 'Year'
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
    const res = await axios.get('http://localhost:3000/node-api/get-all-addresses');
    const addressArray = res.data; // Assuming the response contains the desired data
    
    // Create an object to store the count of addresses for each year
    const addressCountByYear = {};
    
    // Loop through the address array and count the addresses for each year
    addressArray.forEach((item) => {
      const year = new Date(item?.inserted_at).getFullYear(); // Extract the year from the inserted_at field
      addressCountByYear[year] = (addressCountByYear[year] || 0) + 1; // Increment the count for the corresponding year
    });

    // Prepare data for chart
    const data = Object.entries(addressCountByYear).map(([year, count]) => ({
      x: Date.UTC(year, 0), // Convert year to UTC timestamp
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
    console.log(d, "dddd", chartOptions);
  
    const chartContainer = document.getElementById('chartContainer7');
    Highcharts.chart(chartContainer, chartOptions);
  } catch (error) {
    console.error('Error rendering chart:', error);
  }
})();
