import 'react-lazy-load-image-component/src/effects/blur.css';

import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Image({ src, caption }) {
    return (<LazyLoadImage src={src} alt={caption} effect='blur' />);
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
};
