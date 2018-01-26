import 'react-rayr-demo/src/RayrDemo.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {RayrDemo} from 'react-rayr-demo';

function App() {
    return (
        <div>
            <h1>组件初始化</h1>
            <RayrDemo/>
        </div>
    )
}

const run = () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
