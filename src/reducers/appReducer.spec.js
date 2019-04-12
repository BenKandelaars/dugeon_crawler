import { getInitialState, appReducer } from './appReducer.js';

describe('reducer test', () => {
    test('root reducer returns initial state', () => {
        expect(appReducer(undefined, {})).toEqual(getInitialState())
    })
})