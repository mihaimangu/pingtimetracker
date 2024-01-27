'use client'

import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect } from 'react';
import { getList } from '../api/general';
import Chart from './Chart';
import { describe } from 'node:test';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {Tracker} from '../types';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  
  function Dashboard (){
    const router = useRouter();
    const [trackers, setTrackers] = useState<Tracker[]>([]);

    const getListData = async () => {
        const response = await getList();
        console.log('response is', response);
        setTrackers(response.data.entities);
    }

    useEffect(() => {
        console.log('mounting component')
        getListData();
    }, [])

    const onNavigate = (id) => {
        router.push(`/${id}`);
    }

    return (
        <div>
            <Typography variant="h4" mb={1}>All the trackers</Typography>
            {trackers.map((tracker, index) => {
                return (
                    
                        <Card key={index} sx={{mb:2}} onClick={() => onNavigate(tracker._id)}>
                        <CardContent>
                                <Typography variant="h5">{tracker.name}</Typography>
                                <Typography >{tracker.description}</Typography>

                        </CardContent>
                        </Card>
                   
                )
            })}
        </div>
    )
  }

  export default Dashboard