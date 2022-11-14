import React from 'react';
import {Button} from 'antd';
import {PlayCircleOutlined} from '@ant-design/icons'

const ButtonTrailer = (props) => {
    return (
        <Button danger type="primary" shape="round" icon={<PlayCircleOutlined />} 
        	style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            onClick={(e) => {
            e.preventDefault();
            window.location.href=`https://www.youtube.com/results?search_query=${props.title}`
            }}
		> WATCH TRAILER </Button> 
    );
};

export default ButtonTrailer;
