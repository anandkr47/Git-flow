export type Language = 'javascript' | 'typescript' | 'python' | 'java';

export interface CodeNode {
  type: 'function' | 'conditional' | 'loop' | 'statement';
  content: string;
  lineNumber: number;
}

export interface FlowchartNode {
  id: string;
  type: string;
  label: string;
  connections: string[];
  lineNumber: number;
}

export interface Settings {
  theme: 'light' | 'dark' | 'github';
  detailLevel: 'low' | 'medium' | 'high';
  autoGenerate: boolean;
}

export interface FlowchartData {
  nodes: FlowchartNode[];
  edges: { from: string; to: string }[];
}

export interface ParserResult {
  flowchart: FlowchartData;
  language: Language;
}
