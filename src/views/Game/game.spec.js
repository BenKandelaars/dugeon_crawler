import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game.js'

test('Game view renders without issue', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Game />, div)
});
