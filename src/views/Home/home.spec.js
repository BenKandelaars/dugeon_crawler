import React from 'react';
import ReactDom from 'react-dom';
import Home from './home';

test('Home view renders without issue', () => {
    const div = document.createElement('div')
    ReactDom.render(<Home />, div)
});