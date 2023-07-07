import Highcharts from 'highcharts';
import axios from 'axios';

const chartOptions = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Gas Used Chart',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Gas used per Day',
      },
    },
    series: [
      {
        name: 'Gas Used',
        data: [],
      },
    ],
  };


  export const fetchApi = async () => {
    try {
      const response = await axios.get('https://wyzthscan.org/node-api/transactions');
      const data = response.data.data; // Assuming the response contains the desired data
      const categories = [];
      const values = [];
  
      
      data?.forEach((item) => {
        categories.push(new Date(item?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
        values.push(Number(item?.gas_used));
      });
  
   


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
  
    const chartContainer = document.getElementById('chartContainer4');
    Highcharts.chart(chartContainer, chartOptions);


  })()


