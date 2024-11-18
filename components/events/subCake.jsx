import React, {useEffect, useState} from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3D from 'highcharts/highcharts-3d';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@nextui-org/react';

const SubCake = ({title}) => {
    const [team2, setTeam2] = useState([])
const [events, setEvents] = useState([])
const [budget, setBudget] = useState([])
const path = usePathname()
function getStringAfterSecondSlash(path) {
    const parts = path.split('/');
    return parts[2] || null; // Returns the third part, or null if it doesn't exist
  }

const getEvents = async ()=>{
    const getAllEvents = await axios.get(`http://localhost:9020/getevent/${getStringAfterSecondSlash(path)}`)
    setEvents(getAllEvents.data.events)
    setTeam2(getAllEvents.data?.team)
    setBudget(getAllEvents.data?.events.budget)
}


useEffect(()=>{
    getEvents()

},[])
Highcharts3D(Highcharts);

const options = {
  chart: {
    type: 'pie',
    options3d: {
      enabled: true,
      alpha: 45,
      beta: 0,
    },
    backgroundColor: '#0000', // Change background here
  },
  title: {
    text: title,
    style: {
        color: '#ffff', // Change the title text color here
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
      data: budget?.users
    },
  ],
};


  return (
    budget?.map((item, index)=>{return(
        item?.users?.map((item,index)=>{
         return(
             <HighchartsReact highcharts={Highcharts} options={options} />
         )
        })
            
    )})
  )
}

export default SubCake