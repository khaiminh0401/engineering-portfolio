const diagrams = [...document.querySelectorAll('pre.mermaid')];
if (diagrams.length) {
  try {
    const { default: mermaid } = await import('./vendor/mermaid/mermaid.esm.min.mjs');
    mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'base', themeVariables: {
      primaryColor: '#e9eee4', primaryTextColor: '#172a2e', primaryBorderColor: '#367460',
      lineColor: '#367460', secondaryColor: '#f8f7f2', tertiaryColor: '#fffefa', fontFamily: 'system-ui, sans-serif'
    }});
    await mermaid.run({ nodes: diagrams });
  } catch {
    // Keep the original, readable diagram source if rendering is unavailable.
    for (const diagram of diagrams) diagram.setAttribute('aria-label', 'Architecture diagram source');
  }
}
