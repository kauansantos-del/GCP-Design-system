import { useState, useCallback } from 'react'

export function useCopyToClipboard() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedValue(text)
    setTimeout(() => setCopiedValue(null), 1500)
  }, [])

  return { copiedValue, copy }
}
