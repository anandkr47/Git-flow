import { FlowchartNode } from '../types/index';
import * as d3 from 'd3';

export class FlowchartRenderer {
    private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    private width: number;
    private height: number;
    private nodes: FlowchartNode[];
    private container: HTMLElement;

    constructor(container: HTMLElement, width: number = 800, height: number = 600) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.nodes = [];

        this.svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'flowchart-svg');
    }

    public render(nodes: FlowchartNode[]): void {
        this.nodes = nodes;
        this.clear();
        this.drawNodes();
        this.drawConnections();
        this.setupInteractions();
    }

    private clear(): void {
        this.svg.selectAll('*').remove();
    }

    private drawNodes(): void {
        const nodeWidth = 150;
        const nodeHeight = 50;
        const verticalSpacing = 80;

        const nodeGroups = this.svg
            .selectAll<SVGGElement, FlowchartNode>('g.node')
            .data(this.nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('id', d => d.id)
            .attr('transform', (d, i) => 
                `translate(${this.width/2 - nodeWidth/2},${50 + i * verticalSpacing})`);

        // Draw node shapes based on type
        nodeGroups.each((d, i, nodes) => {
            const node = d3.select(nodes[i]);
            switch (d.type) {
                case 'function':
                    node.append('rect')
                        .attr('width', nodeWidth)
                        .attr('height', nodeHeight)
                        .attr('rx', 5);
                    break;
                case 'conditional':
                    node.append('path')
                        .attr('d', this.diamondPath(nodeWidth, nodeHeight));
                    break;
                case 'loop':
                    node.append('path')
                        .attr('d', this.hexagonPath(nodeWidth, nodeHeight));
                    break;
                default:
                    node.append('rect')
                        .attr('width', nodeWidth)
                        .attr('height', nodeHeight);
            }
        });

        // Add text labels
        nodeGroups.append('text')
            .attr('x', nodeWidth / 2)
            .attr('y', nodeHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .text(d => d.label);
    }

    private drawConnections(): void {
        const line = d3.line();

        this.nodes.forEach(node => {
            node.connections.forEach(targetId => {
                const sourceEl = this.svg.select(`#${node.id}`).node() as SVGGElement;
                const targetEl = this.svg.select(`#${targetId}`).node() as SVGGElement;

                if (sourceEl && targetEl) {
                    const sourceBBox = sourceEl.getBBox();
                    const targetBBox = targetEl.getBBox();

                    const sourceTransform = this.getTransform(sourceEl);
                    const targetTransform = this.getTransform(targetEl);

                    this.svg.append('path')
                        .attr('class', 'connection')
                        .attr('d', line([
                            [sourceTransform.x + sourceBBox.width/2, sourceTransform.y + sourceBBox.height],
                            [targetTransform.x + targetBBox.width/2, targetTransform.y]
                        ]))
                        .attr('marker-end', 'url(#arrowhead)');
                }
            });
        });
    }

    private setupInteractions(): void {
        const nodeGroups = this.svg.selectAll<SVGGElement, FlowchartNode>('g.node');

        nodeGroups
            .on('mouseover', (event, d) => {
                d3.select(event.currentTarget).classed('hover', true);
                this.highlightConnections(d.id);
            })
            .on('mouseout', (event) => {
                d3.select(event.currentTarget).classed('hover', false);
                this.clearHighlights();
            })
            .on('click', (event, d) => {
                this.handleNodeClick(d);
            });
    }

    private highlightConnections(nodeId: string): void {
        this.svg.selectAll('path.connection')
            .classed('highlighted', d => 
                (d as any).source?.id === nodeId || (d as any).target?.id === nodeId);
    }

    private clearHighlights(): void {
        this.svg.selectAll('path.connection')
            .classed('highlighted', false);
    }

    private handleNodeClick(node: FlowchartNode): void {
        // Dispatch custom event for the content script to handle
        const event = new CustomEvent('flowchart-node-click', {
            detail: { lineNumber: node.lineNumber }
        });
        this.container.dispatchEvent(event);
    }

    private getTransform(element: SVGGElement): { x: number; y: number } {
        const transform = element.getAttribute('transform');
        if (!transform) return { x: 0, y: 0 };

        const match = transform.match(/translate\(([^,]+),([^)]+)\)/);
        if (!match) return { x: 0, y: 0 };

        return {
            x: parseFloat(match[1]),
            y: parseFloat(match[2])
        };
    }

    private diamondPath(width: number, height: number): string {
        return `M${width/2},0 L${width},${height/2} L${width/2},${height} L0,${height/2} Z`;
    }

    private hexagonPath(width: number, height: number): string {
        const offset = width * 0.2;
        return `M${offset},0 L${width-offset},0 L${width},${height/2} L${width-offset},${height} L${offset},${height} L0,${height/2} Z`;
    }
}
