import React, {useState} from 'react';

const AnimatedBtn = (props) => {
    const [isPressed, setIsPressed] = useState(false);
    const handlePress = () => {
        setIsPressed(true);
    }
    const handleRelease = () => {
        setIsPressed(false);
    }
    return (
        <a className={"rounded-6 btn btn-lg active"} variant={'dark'} size="md"
           href={props.link}
           onMouseDown={handlePress}
           onMouseUp={handleRelease}
           onTouchStart={handlePress}
           onTouchEnd={handleRelease}
           style={{
               borderRadius: '15px',
               boxShadow: isPressed ? 'none' : '0 9px #999',
               transform: isPressed ? 'translateY(1px)' : 'none',
               backgroundColor: '#A6CC85',
               color: 'black',
               borderColor: '#A6CC85'
           }}>
            {props.value} <i className={props.icon}/>
        </a>
    );
}

export default AnimatedBtn;
