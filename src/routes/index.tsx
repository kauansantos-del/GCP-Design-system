import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { Home } from '@/pages/Home'
import { Cores } from '@/pages/Cores'
import { Tipografia } from '@/pages/Tipografia'
import { Spacing } from '@/pages/Spacing'
import { Guia } from '@/pages/Guia'
import { Buttons } from '@/pages/Buttons'
import { Inputs } from '@/pages/Inputs'
import { Checkboxes } from '@/pages/Checkboxes'
import { TextLinks } from '@/pages/TextLinks'
import { SocialButtons } from '@/pages/SocialButtons'
import { Tooltips } from '@/pages/Tooltips'
import { Tags } from '@/pages/Tags'
import { IconButtons } from '@/pages/IconButtons'
import { Selects } from '@/pages/Selects'
import { StyleCards } from '@/pages/StyleCards'
import { ToggleSwitches } from '@/pages/ToggleSwitches'
import { Toasts } from '@/pages/Toasts'
import { ProjectCards } from '@/pages/ProjectCards'
import { Uploads } from '@/pages/Uploads'
import { NavbarButtons } from '@/pages/NavbarButtons'
import { NavbarButtonPage } from '@/pages/NavbarButtonPage'
import { NotFound } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cores', element: <Cores /> },
      { path: 'tipografia', element: <Tipografia /> },
      { path: 'spacing', element: <Spacing /> },
      { path: 'guia', element: <Guia /> },
      { path: 'button', element: <Buttons /> },
      { path: 'input', element: <Inputs /> },
      { path: 'checkbox', element: <Checkboxes /> },
      { path: 'textlink', element: <TextLinks /> },
      { path: 'social-button', element: <SocialButtons /> },
      { path: 'tooltip', element: <Tooltips /> },
      { path: 'tag', element: <Tags /> },
      { path: 'icon-button', element: <IconButtons /> },
      { path: 'select', element: <Selects /> },
      { path: 'style-card', element: <StyleCards /> },
      { path: 'toggle-switch', element: <ToggleSwitches /> },
      { path: 'toast', element: <Toasts /> },
      { path: 'project-card', element: <ProjectCards /> },
      { path: 'upload', element: <Uploads /> },
      { path: 'navbar', element: <NavbarButtons /> },
      { path: 'navbar-button', element: <NavbarButtonPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
