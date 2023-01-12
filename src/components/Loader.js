import { Puff } from 'react-loader-spinner';

export default function ReactLoader() {
    return (
        <Puff
            type="TailSpin"
            color="#00000059"
            height={70}
            width={70}
            wrapperClass='flex justify-center mt-12'
        />
    );
}
