 import React, { useState } from 'react';
/* import './App.css'; */
const App = () => {

    const [count, setCount] = useState(0);


    const classes = getBadgesClasses(count);
    const formattedCount = formatCount(count);
    return (

        <React.Fragment>
            <span className={classes}> {formattedCount} </span>
            <button className="btn btn-secondary btn-sm" onClick={()=>setCount(prevCount => prevCount + 1)}>Increment</button>
        </React.Fragment>
    );
    function formatCount(count) {
        return count === 0 ? "Zero" : count;
    }
    function getBadgesClasses(count) {
        let classes = "badge m-2 badge-";
        classes += count === 0 ? "primary" : "secondary";
        return classes;
    }
};
export default App;
