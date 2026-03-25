import { RouterProvider } from 'react-router'
import { LenisProvider } from '@/providers/LenisProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { router } from '@/routes'

export default function App() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </ThemeProvider>
  )
}
