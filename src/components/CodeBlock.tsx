import type { ReactNode } from 'react';

interface CodeBlockProps {
  content: string;
  filename?: string;
}

function highlightLine(line: string): ReactNode {
  // YAML frontmatter markers
  if (line === '---') {
    return <span style={{ color: '#D97757' }}>{line}</span>;
  }

  // Comments
  if (line.startsWith('#') && !line.startsWith('##')) {
    return <span style={{ color: '#D97757', fontWeight: 700 }}>{line}</span>;
  }

  // Sub-headers
  if (line.startsWith('##')) {
    return <span style={{ color: '#D97757', fontWeight: 600 }}>{line}</span>;
  }

  // YAML keys (name:, description:)
  const yamlMatch = line.match(/^(\w[\w\s]*?)(:)(.*)/);
  if (yamlMatch) {
    return (
      <>
        <span style={{ color: '#4A7FB5' }}>{yamlMatch[1]}</span>
        <span style={{ color: '#8B8178' }}>{yamlMatch[2]}</span>
        <span style={{ color: '#F5F0E8' }}>{yamlMatch[3]}</span>
      </>
    );
  }

  // List items
  if (line.match(/^\d+\.\s/) || line.startsWith('- ')) {
    const marker = line.match(/^(\d+\.\s|- )/);
    if (marker) {
      return (
        <>
          <span style={{ color: '#D97757' }}>{marker[1]}</span>
          <span style={{ color: '#F5F0E8' }}>{line.slice(marker[1].length)}</span>
        </>
      );
    }
  }

  // Code fence
  if (line.startsWith('```')) {
    return <span style={{ color: '#8B8178' }}>{line}</span>;
  }

  // Quoted strings
  if (line.includes('"')) {
    const parts = line.split(/(".*?")/g);
    return (
      <>
        {parts.map((part, i) =>
          part.startsWith('"') && part.endsWith('"') ? (
            <span key={i} style={{ color: '#E8DFD0' }}>{part}</span>
          ) : (
            <span key={i} style={{ color: '#F5F0E8' }}>{part}</span>
          )
        )}
      </>
    );
  }

  return <span style={{ color: '#F5F0E8' }}>{line}</span>;
}

export function CodeBlock({ content, filename = 'SKILL.md' }: CodeBlockProps) {
  const lines = content.split('\n');

  return (
    <div className="overflow-hidden rounded-md" style={{ boxShadow: 'var(--ob1-shadow)' }}>
      {/* Terminal bar */}
      <div className="flex items-center gap-2 bg-[#0a1420] px-4 py-2.5">
        <span className="inline-block h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="inline-block h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="inline-block h-3 w-3 rounded-full bg-[#28c840]" />
        <span
          className="ml-3 text-xs text-stone"
          style={{ fontFamily: 'var(--ob1-font-mono)', fontWeight: 600 }}
        >
          {filename}
        </span>
      </div>
      {/* Code content */}
      <div
        className="max-h-[70vh] overflow-auto bg-navy p-4"
        style={{ fontFamily: 'var(--ob1-font-mono)', fontSize: '13px', lineHeight: '1.7', fontWeight: 600 }}
      >
        <pre className="whitespace-pre-wrap break-words">
          {lines.map((line, i) => (
            <div key={i}>{line === '' ? '\u00A0' : highlightLine(line)}</div>
          ))}
        </pre>
      </div>
    </div>
  );
}
