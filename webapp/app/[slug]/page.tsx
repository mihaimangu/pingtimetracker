import React from 'react';
import { Typography } from '@mui/material';

const SingleTracker = ({params}: {params: {slug: string}}) => {
    const slug = params.slug

    return (
        <div>
            <Typography variant="h3">Single Tracker - {slug}</Typography>
        </div>
    )
}

export default SingleTracker