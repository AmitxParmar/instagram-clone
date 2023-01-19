/* eslint-disable jsx-a11y/alt-text */
import { Puff } from 'react-loader-spinner';

export default function ReactLoader({ stroke, ...rest }) {
    return (
        <div className='container h-screen w-screen'>
            <Puff
                type="TailSpin"
                color="#00000059"
                height={70}
                width={70}
                wrapperClass='flex justify-center mt-12'
            />
        </div>

    );
}


/* <Puff
            type="TailSpin"
            color="#00000059"
            height={70}
            width={70}
            wrapperClass='flex justify-center mt-12'
        /> */
/* <div className='h-screen w-screen'>
<img
className='bg-white'
src='/public/images/fallback.png'
/>
</div> */