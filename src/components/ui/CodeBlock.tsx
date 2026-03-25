import { useState } from 'react'

type CodeBlockProps = {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-[12px] overflow-hidden border border-[var(--gray-6)] bg-[var(--gray-2)]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--gray-4)] bg-[var(--gray-3)]">
        <span className="text-[var(--gray-9)] text-[12px] font-mono uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[12px] font-medium cursor-pointer transition-all duration-200 border-none"
          style={{
            fontFamily: "'Archivo', sans-serif",
            backgroundColor: copied ? 'var(--green-3)' : 'var(--gray-4)',
            color: copied ? 'var(--green-11)' : 'var(--gray-11)',
          }}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Copiado
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copiar codigo
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <div className="overflow-x-auto p-4">
        <pre className="m-0 text-[13px] leading-[1.6] text-[var(--gray-12)]" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
