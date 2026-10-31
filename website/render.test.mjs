import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMarkdown } from './render.mjs';

// Break caught: treating nested Markdown links as relative website URLs.
test('nested article links resolve under the GitHub project prefix', () => {
  const html = renderMarkdown('case-studies/backend-api-performance.md', '[Evidence](../evidence.md#evidence-labels)');
  assert.match(html, /href="\/engineering-portfolio\/evidence.html#evidence-labels"/);
});

// Break caught: README links point to missing README.html files.
test('root and directory READMEs become index routes', () => {
  const html = renderMarkdown('projects/flowdesk.md', '[Home](../README.md) [Architecture](../architecture/README.md)');
  assert.match(html, /href="\/engineering-portfolio\/"/);
  assert.match(html, /href="\/engineering-portfolio\/architecture\/"/);
});

// Break caught: external/email links or static downloads are rewritten as articles.
test('preserves external destinations, anchors and static download extensions', () => {
  const html = renderMarkdown('resume.md', '[Email](mailto:khaiminh0401@gmail.com) [Code](https://github.com/khaiminh0401) [PDF](assets/resume/Dao_Khai_Minh_Resume_2026.pdf) [Section](#education)');
  assert.match(html, /href="mailto:khaiminh0401@gmail.com"/);
  assert.match(html, /href="https:\/\/github.com\/khaiminh0401"/);
  assert.match(html, /href="\/engineering-portfolio\/assets\/resume\/Dao_Khai_Minh_Resume_2026.pdf"/);
  assert.match(html, /href="#education"/);
});

// Break caught: generated headings lack the fragments used by portfolio links.
test('adds stable fragments and keeps Mermaid as an accessible diagram source', () => {
  const html = renderMarkdown('architecture/README.md', '## Proposed LLM workflow\n\n```mermaid\nflowchart LR\nA --> B\n```');
  assert.match(html, /id="proposed-llm-workflow"/);
  assert.match(html, /class="mermaid"/);
  assert.match(html, /A --&gt; B/);
});
