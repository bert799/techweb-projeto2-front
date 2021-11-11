import React, { useEffect } from 'react';

const charview = ({match, location}) => {
    const { params: { charId } } = match;
    return (
        <p>{charId}</p>
    );
};

export default charview;