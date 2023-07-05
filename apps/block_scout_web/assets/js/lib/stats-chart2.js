import Highcharts from 'highcharts';
import axios from 'axios';

const chartOptions = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Average Block-size Chart',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Average Block-size per Day',
      },
    },
    series: [
      {
        name: 'History',
        data: [],
      },
    ],
  };


  export const fetchApi = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/average-block-size');
      const data = response.data.data; // Assuming the response contains the desired data
      const categories = [];
      const values = [];
  
      
      data?.forEach((item) => {
        categories.push(new Date(item?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
        values.push(parseInt(item?.average_block_size));
      });
  
   

      console.log(categories,values,"valuesvalues");

      chartOptions.xAxis.categories = categories;
      chartOptions.series[0].data = values;
  
      return data; 
    } catch (error) {
      console.error('Error fetching API:', error);
      throw error; 
    }
  };
  



  (async()=>{

    const d = await fetchApi()
    console.log(d,"dddd",chartOptions);
  
    const chartContainer = document.getElementById('chartContainer2');
    Highcharts.chart(chartContainer, chartOptions);


  })()


