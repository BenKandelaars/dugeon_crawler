import { Vector, vectorPlus, initGrid } from './utils';

describe('Vector Object returns correct object', () => {
    test('Request 3, 7', () => {
        expect(new Vector(3, 7)).toMatchObject({x: 3, y: 7})
    });

    test('Request 55, 71', () => {
        expect(new Vector(55, 71)).toMatchObject({x: 55, y: 71})
    })

    test('Request 11, 33', () => {
        expect(new Vector(11, 33)).toMatchObject({x: 11, y: 33})
    })
});

describe('Vector Plus adds vectors correctly', () => {
    test('Request vector addition', () => {
        expect(vectorPlus(new Vector(3, 7), new Vector(4, 3))).toMatchObject({x: 7, y: 10})
    });

    test('Request vector addition', () => {
        expect(vectorPlus(new Vector(10, 20), new Vector(8, 3))).toMatchObject({x: 18, y: 23})
    });
    
    test('Request vector addition', () => {
        expect(vectorPlus(new Vector(55, 44), new Vector(1, 20))).toMatchObject({x: 56, y: 64})
    });
})

describe('Grid initialises correctly', () => {
    test('Grid array has correct y axis length', () => {
        expect(initGrid(2, 5)).toHaveLength(5)
    })
})