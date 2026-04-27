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
import { Componentes } from '@/pages/Componentes'
import { Documentacao } from '@/pages/Documentacao'
import { Galeria } from '@/pages/Galeria'
import { Renders } from '@/pages/Renders'
import { Icons3DPage } from '@/pages/Icons3DPage'
import { GaleriaIcones } from '@/pages/GaleriaIcones'
import { Handoff } from '@/pages/Handoff'
import { CanvasTools } from '@/pages/CanvasTools'
import { ProductCards } from '@/pages/ProductCards'
import { AppSidebars } from '@/pages/AppSidebars'
import { CategoryPanels } from '@/pages/CategoryPanels'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'componentes', element: <Componentes /> },
      { path: 'docs', element: <Documentacao /> },
      { path: 'docs/handoff', element: <Handoff /> },
      { path: 'galeria', element: <Galeria /> },
      { path: 'galeria/renders', element: <Renders /> },
      { path: 'galeria/icones-3d', element: <Icons3DPage /> },
      { path: 'galeria/icones', element: <GaleriaIcones /> },
      { path: 'canvas-tool', element: <CanvasTools /> },
      { path: 'product-card', element: <ProductCards /> },
      { path: 'app-sidebar', element: <AppSidebars /> },
      { path: 'category-panel', element: <CategoryPanels /> },
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
