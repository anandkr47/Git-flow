declare global {
    interface SVGElement {
        getBBox(): { x: number; y: number; width: number; height: number };
        getCTM(): { a: number; b: number; c: number; d: number; e: number; f: number };
    }
}

// Mock Chrome API
Object.defineProperty(global, 'chrome', {
    value: {
        runtime: {
            onInstalled: {
                addListener: jest.fn()
            },
            onMessage: {
                addListener: jest.fn()
            },
            sendMessage: jest.fn()
        },
        storage: {
            sync: {
                get: jest.fn(),
                set: jest.fn()
            }
        },
        tabs: {
            query: jest.fn(),
            sendMessage: jest.fn()
        }
    }
});

// Mock SVG functions
const mockGetBBox = () => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100
});

const mockGetCTM = () => ({
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
});

// Add getBBox to SVGElement prototype if it doesn't exist
if (!SVGElement.prototype.getBBox) {
    Object.defineProperty(SVGElement.prototype, 'getBBox', {
        value: mockGetBBox
    });
}

// Add getCTM to SVGElement prototype if it doesn't exist
if (!SVGElement.prototype.getCTM) {
    Object.defineProperty(SVGElement.prototype, 'getCTM', {
        value: mockGetCTM
    });
}

export {};
