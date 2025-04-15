import { CodeNode, FlowchartNode, Language } from '../types/index';

export class CodeAnalyzer {
    private static readonly supportedLanguages: Language[] = ['javascript', 'typescript', 'python', 'java'];

    public static detectLanguage(fileName: string): Language | null {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'js': return 'javascript';
            case 'ts': return 'typescript';
            case 'py': return 'python';
            case 'java': return 'java';
            default: return null;
        }
    }

    public async analyzeCode(code: string, language: Language): Promise<FlowchartNode[]> {
        const ast = await this.parseCode(code, language);
        return this.generateFlowchartNodes(ast);
    }

    private async parseCode(code: string, language: Language): Promise<CodeNode[]> {
        const nodes: CodeNode[] = [];
        const lines = code.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (this.isFunction(line)) {
                nodes.push({
                    type: 'function',
                    content: line,
                    lineNumber: i + 1
                });
            } else if (this.isConditional(line)) {
                nodes.push({
                    type: 'conditional',
                    content: line,
                    lineNumber: i + 1
                });
            } else if (this.isLoop(line)) {
                nodes.push({
                    type: 'loop',
                    content: line,
                    lineNumber: i + 1
                });
            }
        }

        return nodes;
    }

    private generateFlowchartNodes(codeNodes: CodeNode[]): FlowchartNode[] {
        return codeNodes.map((node, index) => ({
            id: `node-${index}`,
            type: node.type,
            label: this.sanitizeLabel(node.content),
            connections: index < codeNodes.length - 1 ? [`node-${index + 1}`] : [],
            lineNumber: node.lineNumber
        }));
    }

    private isFunction(line: string): boolean {
        return /^(function|def|\w+\s*=>\s*{|\w+\s+\w+\s*\(.*\)\s*{)/.test(line);
    }

    private isConditional(line: string): boolean {
        return /^(if|else|else if|switch)/.test(line);
    }

    private isLoop(line: string): boolean {
        return /^(for|while|do)/.test(line);
    }

    private sanitizeLabel(content: string): string {
        return content
            .replace(/[<>]/g, '')
            .substring(0, 30) + (content.length > 30 ? '...' : '');
    }
}
