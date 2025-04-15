# Code Flowchart Generator Chrome Extension

A Chrome extension that automatically generates interactive flowcharts from code in GitHub repositories.

## Features

- Dynamic flowchart generation from code
- Support for multiple programming languages (JavaScript, TypeScript, Python, Java)
- Interactive flowchart nodes with code navigation
- Customizable themes and detail levels
- Automatic flowchart generation on GitHub repositories

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory of this project

## Development

- `npm run watch` - Watch for changes and rebuild
- `npm test` - Run tests

## Project Structure

- `src/` - TypeScript source files
  - `content.ts` - Content script for GitHub page integration
  - `background.ts` - Extension background script
  - `popup.ts` - Extension popup UI logic
  - `codeAnalyzer.ts` - Code analysis and parsing
  - `flowchartRenderer.ts` - D3.js-based flowchart rendering
- `public/` - Static files
  - `popup.html` - Extension popup UI
- `styles/` - CSS styles
  - `flowchart.css` - Flowchart styling

## License

MIT
