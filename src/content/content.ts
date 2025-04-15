import { CodeAnalyzer } from '../core/codeAnalyzer';
import { FlowchartRenderer } from '../core/flowchartRenderer';
import { Language } from '../types/index';

class ContentScript {
    private analyzer: CodeAnalyzer;
    private renderer: FlowchartRenderer | null = null;
    private flowchartContainer: HTMLElement | null = null;

    constructor() {
        this.analyzer = new CodeAnalyzer();
        this.init();
    }

    private async init(): Promise<void> {
        // Wait for GitHub to fully load
        if (document.readyState !== 'complete') {
            await new Promise(resolve => window.addEventListener('load', resolve));
        }

        this.setupMutationObserver();
        this.processCurrentPage();
    }

    private setupMutationObserver(): void {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (this.isCodeBlockMutation(mutation)) {
                    this.processCurrentPage();
                    break;
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    private isCodeBlockMutation(mutation: MutationRecord): boolean {
        return Array.from(mutation.addedNodes).some(node => 
            node instanceof HTMLElement && 
            (node.classList.contains('highlight') || node.querySelector('.highlight'))
        );
    }

    private async processCurrentPage(): Promise<void> {
        const codeBlocks = this.findCodeBlocks();
        if (codeBlocks.length === 0) return;

        // Process the first code block found
        const codeBlock = codeBlocks[0];
        const code = this.extractCode(codeBlock);
        const language = this.detectLanguage(codeBlock);

        if (!code || !language) return;

        await this.createFlowchart(code, language, codeBlock);
    }

    private findCodeBlocks(): HTMLElement[] {
        return Array.from(document.querySelectorAll('.highlight'));
    }

    private extractCode(codeBlock: HTMLElement): string {
        const codeLines = codeBlock.querySelectorAll('.blob-code-inner');
        return Array.from(codeLines)
            .map(line => line.textContent || '')
            .join('\n');
    }

    private detectLanguage(codeBlock: HTMLElement): Language | null {
        const languageClass = Array.from(codeBlock.classList)
            .find(cls => cls.startsWith('highlight-source-'));
        
        if (!languageClass) return null;

        const language = languageClass.replace('highlight-source-', '') as Language;
        return language;
    }

    private async createFlowchart(code: string, language: Language, codeBlock: HTMLElement): Promise<void> {
        // Create flowchart container if it doesn't exist
        if (!this.flowchartContainer) {
            this.flowchartContainer = document.createElement('div');
            this.flowchartContainer.className = 'code-flowchart-container';
            codeBlock.parentElement?.insertBefore(this.flowchartContainer, codeBlock.nextSibling);
        }

        // Create renderer if it doesn't exist
        if (!this.renderer) {
            this.renderer = new FlowchartRenderer(this.flowchartContainer);
        }

        try {
            const nodes = await this.analyzer.analyzeCode(code, language);
            this.renderer.render(nodes);
        } catch (error) {
            console.error('Error generating flowchart:', error);
        }
    }
}

// Initialize the content script
new ContentScript();
