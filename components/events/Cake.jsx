import React, {useEffect, useState} from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
// import axios from 'axios';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import { Button } from '@nextui-org/react';


const PieChart3D = ({title, data, title2}) =>{

Highcharts3D(Highcharts);

const options = {
  chart: {
    type: 'pie',
    height: title,
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0,
    },
    backgroundColor: '#0000', // Change background here
  },
  title: {
    text: title2,
    style: {
        color: '#252323', // Change the title text color here
        fontSize: '26px',
      },
  },
  plotOptions: {
    pie: {
      innerSize: 0,
      depth: 75,
      showInLegend: false,
    },
  },

  series: [
    {
      name: '',
      data: data
    },
  ],
};
    
    return (
            <HighchartsReact  highcharts={Highcharts} options={options} />
);}

export default PieChart3D;
