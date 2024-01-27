"use client"
import React, {useEffect, useState} from 'react';
import { Typography } from '@mui/material';
import { getSingleElement } from '../api/general';
import { Tracker } from '../types';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SingleTracker = ({params}: {params: {slug: string}}) => {
    const slug = params.slug

    const [object, setObject] = useState<Tracker>({
        _id: 'asd',
        name: 'asd',
        description: 'asd',
        history: []
    });

    const [groupedData, setGroupedData] = useState({});



    function groupTimestampsByDay(history: number[]): Record<string, number> {
        const result: Record<string, number> = {};
        const today: Date = new Date();
        const oneDay: number = 24 * 60 * 60 * 1000; // milliseconds in a day
    
        // Iterate over the timestamps
        history.forEach((timestamp: number) => {
            const timestampDate: Date = new Date(timestamp * 1000); // Convert Unix timestamp to JavaScript Date object
            const diffDays: number = Math.floor((today.getTime() - timestampDate.getTime()) / oneDay);
    
            // If the timestamp is within the last 7 days
            if (diffDays < 15) {
                const formattedDate: string = timestampDate.toISOString().split('T')[0]; // Extract YYYY-MM-DD format
                result[formattedDate] = (result[formattedDate] || 0) + 1;
            }
        });
    
        return result;
    }
    


    const getElementData = async() => {
        const response = await getSingleElement(params.slug);
        const groupedData = groupTimestampsByDay(response.data.entity.history)
        console.log('single element response', {response, groupedData});
        const newObject = {...response.data.entity};
        setGroupedData(groupedData);
        setObject(response.data.entity);
    }

    useEffect(() => {
        getElementData();
    }, [])

    return (
        <div>
            <Typography variant="h3">Single Tracker - {slug}</Typography>
            <div>
                <Typography variant="h5">Name: {object.name}</Typography>
                <Typography variant="h5">Description: {object.description}</Typography>
                <Typography variant="h5">Total pings: {object.history.length}</Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(groupedData).map(([date, count]) => (
                                <TableRow key={date}>
                                    <TableCell component="th" scope="row">
                                        {date}
                                    </TableCell>
                                    <TableCell align="right">{count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default SingleTracker