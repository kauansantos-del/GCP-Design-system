export type Section =
  | 'home'
  | 'componentes'
  | 'docs'
  | 'galeria'

export type NavChild = { label: string; hash: string }
export type NavItem = { label: string; path: string; children?: NavChild[] }
export type NavCategory = { id: string; label: string; items: NavItem[] }

export const componentCategories: NavCategory[] = [
  {
    id: 'forms',
    label: 'Forms',
    items: [
      { label: 'Input', path: '/input' },
      { label: 'Select', path: '/select', children: [{ label: 'DropdownItem', hash: 'dropdown-item' }] },
      { label: 'Checkbox', path: '/checkbox' },
      { label: 'ToggleSwitch', path: '/toggle-switch' },
      { label: 'Upload', path: '/upload' },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { label: 'Button', path: '/button' },
      { label: 'IconButton', path: '/icon-button' },
      { label: 'SocialButton', path: '/social-button' },
      { label: 'TextLink', path: '/textlink' },
    ],
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: [
      { label: 'Toast', path: '/toast' },
      { label: 'Tooltip', path: '/tooltip' },
      { label: 'Tag', path: '/tag' },
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
      { label: 'Navbar', path: '/navbar' },
      { label: 'NavbarButton', path: '/navbar-button', children: [{ label: 'ContextMenuItem', hash: 'context-menu-item' }] },
      { label: 'AppSidebar', path: '/app-sidebar' },
    ],
  },
  {
    id: 'display',
    label: 'Display',
    items: [
      { label: 'ProjectCard', path: '/project-card', children: [{ label: 'StatusTag', hash: 'status-tag' }] },
      { label: 'StyleCard', path: '/style-card' },
      { label: 'ProductCard', path: '/product-card' },
    ],
  },
  {
    id: 'canvas',
    label: 'Canvas',
    items: [
      { label: 'CanvasToolButton', path: '/canvas-tool' },
      { label: 'CategoryPanel', path: '/category-panel' },
    ],
  },
]

export const docsCategories: NavCategory[] = [
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    items: [
      { label: 'Cores', path: '/cores' },
      { label: 'Tipografia', path: '/tipografia' },
      { label: 'Spacing', path: '/spacing' },
      { label: 'Guia de Uso', path: '/guia' },
    ],
  },
  {
    id: 'recursos',
    label: 'Recursos',
    items: [
      { label: 'Hand-off', path: '/docs/handoff' },
    ],
  },
]

export const galeriaCategories: NavCategory[] = [
  {
    id: 'galeria',
    label: '',
    items: [
      { label: 'Renders', path: '/galeria/renders' },
      { label: 'Ícones 3Ds', path: '/galeria/icones-3d' },
      { label: 'Ícones', path: '/galeria/icones' },
    ],
  },
]

export const componentPathSet = new Set(
  componentCategories.flatMap((c) => c.items.map((i) => i.path))
)

export const docsPathSet = new Set([
  '/cores',
  '/tipografia',
  '/spacing',
  '/guia',
  '/docs',
  '/docs/handoff',
])

export function getActiveSection(pathname: string): Section {
  if (pathname === '/' || pathname === '') return 'home'
  if (pathname.startsWith('/galeria')) return 'galeria'
  if (pathname.startsWith('/componentes') || componentPathSet.has(pathname)) return 'componentes'
  if (docsPathSet.has(pathname) || pathname.startsWith('/docs')) return 'docs'
  return 'home'
}
