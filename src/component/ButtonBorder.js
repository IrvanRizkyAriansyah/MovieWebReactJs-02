import React from 'react';
import {Button} from 'antd';

const ButtonTrailer = (props) => {
    return (
        <Button danger shape="round" size={'large'} ghost={true}
        	style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            onClick={props.click}
		> {props.title} {props.icon}</Button> 
    );
};

export default ButtonTrailer;
