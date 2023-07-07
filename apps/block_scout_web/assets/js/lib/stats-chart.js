import Highcharts from 'highcharts';
import axios from 'axios';

const chartOptions = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Daily Transaction Chart',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Transactions per Day',
      },
    },
    series: [
      {
       
        data: [],
      },
    ],
  };

  // export const fetchApi = async()=>{
  //   const data = await axios.get('https://wyzthscan.org/node-api/transactions')
  //   return data
  // }

  export const fetchApi = async () => {
    try {
      const response = await axios.get('https://wyzthscan.org/node-api/transactions');
      const data = response.data.data; // Assuming the response contains the desired data
      const categories = []; // Array to hold the categories
      const values = []; // Array to hold the data values
  
      // Extract the categories and values from the response data
      data?.forEach((item) => {
        categories.push(new Date(item?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) // Replace 'category' with the actual property name in the response data
        values.push(item?.number_of_transactions); // Replace 'value' with the actual property name in the response data
      });
  
      // Update the chart options with the fetched data

      console.log(categories,values,"valuesvalues");

      chartOptions.xAxis.categories = categories;
      chartOptions.series[0].data = values;
  
      return data; // Return the fetched data if needed
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error; // Throw the error to handle it further if needed
    }
  };
  



  (async()=>{

    const d = await fetchApi()
    console.log(d,"dddd",chartOptions);
  
    const chartContainer = document.getElementById('chartContainer');
    Highcharts.chart(chartContainer, chartOptions);

    // chart.series[0].setData([4, 2, 5]);
 

  })()

