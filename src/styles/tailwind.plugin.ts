import plugin from 'tailwindcss/plugin'

export const designSystemPlugin = plugin(function ({ addUtilities }) {
  // ── Display — Archivo Extrabold ──
  const displaySizes = [72, 64, 60, 56, 52, 48, 44, 40, 36]
  const displayUtils: Record<string, Record<string, string>> = {}
  displaySizes.forEach((size) => {
    displayUtils[`.text-display-${size}`] = {
      fontFamily: "'Archivo', sans-serif",
      fontSize: `${size / 16}rem`,
      fontWeight: '800',
      lineHeight: '1.1',
      letterSpacing: '0.01em',
    }
  })

  // ── Heading — Archivo ──
  const headingSizes = [32, 28, 24, 20, 18, 16, 14]
  const headingWeights: Record<string, string> = {
    extrabold: '800',
    bold: '700',
    semibold: '600',
  }
  const headingUtils: Record<string, Record<string, string>> = {}
  Object.entries(headingWeights).forEach(([name, weight]) => {
    headingSizes.forEach((size) => {
      headingUtils[`.text-heading-${name}-${size}`] = {
        fontFamily: "'Archivo', sans-serif",
        fontSize: `${size / 16}rem`,
        fontWeight: weight,
        lineHeight: '1',
        letterSpacing: '0',
      }
    })
  })

  // ── Body — Raleway ──
  const bodySizes = [20, 18, 16, 14, 12]
  const bodyWeights: Record<string, string> = {
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
  }
  const bodyUtils: Record<string, Record<string, string>> = {}
  Object.entries(bodyWeights).forEach(([name, weight]) => {
    bodySizes.forEach((size) => {
      bodyUtils[`.text-body-${name}-${size}`] = {
        fontFamily: "'Raleway', sans-serif",
        fontSize: `${size / 16}rem`,
        fontWeight: weight,
        lineHeight: '1.3',
        letterSpacing: '0',
      }
    })
  })

  addUtilities({ ...displayUtils, ...headingUtils, ...bodyUtils })
})
