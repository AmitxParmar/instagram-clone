import { InfinitySpin } from 'react-loader-spinner';
import React from 'react'

const ReactLoader = () => {
    return (
        <InfinitySpin type="TailSpin"
            color="#00000059"
            width={70}
            className="flex justify-center mt-12"
        />
    );
}

export default ReactLoader