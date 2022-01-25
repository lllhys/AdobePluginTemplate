import React from 'react';

import './index.css';
import icon from './icon.png'


export const Index = () => {



    return (
        <div className='container'>
            <div className='img-container'>
                <img src={icon} className='icon'></img>
            </div>
            <h2>Adobe Plugin Template</h2>
            <p>
                See README.md for instructions
            </p>
            <footer className='footer'>
                Author: <a href='https://github.com/lllhys'>lllhy</a>/<a href='mailto:l@lllhy.com'>mail</a>
            </footer>
        </div>

    );
}
