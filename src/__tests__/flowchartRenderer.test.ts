import { FlowchartRenderer } from '../core/flowchartRenderer';
import { FlowchartNode } from '../types/index';

describe('FlowchartRenderer', () => {
  let container: HTMLElement;
  let renderer: FlowchartRenderer;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    renderer = new FlowchartRenderer(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('should create SVG element on initialization', () => {
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('class')).toBe('flowchart-svg');
  });

  it('should render nodes correctly', () => {
    const nodes: FlowchartNode[] = [
      {
        id: 'node-1',
        type: 'function',
        label: 'Test Function',
        connections: ['node-2'],
        lineNumber: 1
      },
      {
        id: 'node-2',
        type: 'conditional',
        label: 'If Statement',
        connections: [],
        lineNumber: 2
      }
    ];

    renderer.render(nodes);

    const nodeElements = container.querySelectorAll('g.node');
    expect(nodeElements).toHaveLength(2);

    const functionNode = container.querySelector('#node-1');
    expect(functionNode).toBeTruthy();
    expect(functionNode?.querySelector('rect')).toBeTruthy();

    const conditionalNode = container.querySelector('#node-2');
    expect(conditionalNode).toBeTruthy();
    expect(conditionalNode?.querySelector('path')).toBeTruthy();
  });

  it('should handle node click events', () => {
    const nodes: FlowchartNode[] = [{
      id: 'node-1',
      type: 'function',
      label: 'Test Function',
      connections: [],
      lineNumber: 1
    }];

    const handleClick = jest.fn();
    container.addEventListener('flowchart-node-click', handleClick);

    renderer.render(nodes);
    const node = container.querySelector('#node-1');
    node?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(handleClick).toHaveBeenCalled();
    const event = handleClick.mock.calls[0][0] as CustomEvent;
    expect(event.detail.lineNumber).toBe(1);
  });
});
