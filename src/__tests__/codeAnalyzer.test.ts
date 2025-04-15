import { CodeAnalyzer } from '../core/codeAnalyzer';
import { Language } from '../types/index';

describe('CodeAnalyzer', () => {
  let analyzer: CodeAnalyzer;

  beforeEach(() => {
    analyzer = new CodeAnalyzer();
  });

  describe('detectLanguage', () => {
    it('should detect JavaScript files', () => {
      expect(CodeAnalyzer.detectLanguage('test.js')).toBe('javascript');
    });

    it('should detect TypeScript files', () => {
      expect(CodeAnalyzer.detectLanguage('test.ts')).toBe('typescript');
    });

    it('should detect Python files', () => {
      expect(CodeAnalyzer.detectLanguage('test.py')).toBe('python');
    });

    it('should detect Java files', () => {
      expect(CodeAnalyzer.detectLanguage('test.java')).toBe('java');
    });

    it('should return null for unsupported files', () => {
      expect(CodeAnalyzer.detectLanguage('test.cpp')).toBeNull();
    });
  });

  describe('analyzeCode', () => {
    it('should analyze JavaScript function declarations', async () => {
      const code = `
        function test() {
          if (true) {
            return 1;
          }
          return 0;
        }
      `;

      const nodes = await analyzer.analyzeCode(code, 'javascript' as Language);
      expect(nodes).toHaveLength(2);
      expect(nodes[0].type).toBe('function');
      expect(nodes[1].type).toBe('conditional');
    });

    it('should analyze Python functions', async () => {
      const code = `
        def test():
            if True:
                return 1
            return 0
      `;

      const nodes = await analyzer.analyzeCode(code, 'python' as Language);
      expect(nodes).toHaveLength(2);
      expect(nodes[0].type).toBe('function');
      expect(nodes[1].type).toBe('conditional');
    });
  });
});
