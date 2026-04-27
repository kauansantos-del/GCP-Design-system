# Handoff — Próximos passos

> Documento de transição. A próxima sessão deve ler este arquivo antes de começar.

## Contexto rápido

- **Projeto**: GCP Design System (Vite + React 19 + react-router 7 + Tailwind 4 + framer-motion)
- **Stack confirmada**: nada de Next.js. Os componentes ficam em `src/components/ui/`, páginas em `src/pages/`, rotas em `src/routes/index.tsx`, navegação em `src/lib/nav.ts`.
- **Dev server**: `npm run dev` → `http://localhost:5173`
- **Galeria de assets**: 1.6 GB em `./galeria/` (renders 3D + Hugeicons), servida pelo middleware customizado em `vite.config.ts` como `/galeria/*`.

## ⚠️ Bug ativo: galeria parecendo "não encontrada"

**Sintoma**: usuário relatou que não vê a pasta `galeria/` na árvore do IDE e que a navegação parece travada.

**Causa real (já investigada)**: o IDE estava aberto em `C:\Users\kauan\Documents\Codes\GCP\` (workspace antigo, com `web/` Next.js + docs), enquanto este projeto está em `C:\Users\kauan\Documents\Codes\GCP-Design-system\` — pasta **irmã**, não filha. Por isso a árvore não mostra os arquivos.

**Evidências de que tudo está no lugar e funciona**:
- `galeria/` contém 4 subpastas: `Categorias - Construir`, `Categorias - Objetos`, `huge icons pack.iconjar`, `icons 3D`
- Typecheck passa com 0 erros (`tsc --noEmit`)
- Todas rotas respondem 200: `/`, `/galeria`, `/category-panel`, `/canvas-tool`, `/product-card`, `/app-sidebar`, `/tooltip`
- Assets carregam 200: `/hugeicons-index.json`, `/galeria/icons 3D/*`, `/galeria/Categorias - Construir/*`, `/galeria/huge icons pack.iconjar/icons/*.svg`

**Como resolver com o usuário**:
1. Pedir pra ele abrir o IDE diretamente em `C:\Users\kauan\Documents\Codes\GCP-Design-system\` (`File → Open Folder`), **ou** adicionar essa pasta ao workspace existente (`File → Add Folder to Workspace`).
2. Hard refresh no browser na `/galeria` (`Ctrl+F5`) — pode ter cache antigo de quando os tiles eram placeholders.
3. Se mesmo assim ele relatar travamento na navegação, **investigar de verdade** — pode ser performance da galeria carregando muitos PNGs grandes (alguns são 4 MB / 2048×2048). Nesse caso, o caminho é otimizar: lazy-loading agressivo, virtualização da grid de Hugeicons (1548 itens × 3 estilos), ou converter PNGs pra WebP em build.

## Tarefas pedidas pelo usuário (nesta ordem)

### 1. Scroll-to-top em mudança de rota (BUG REAL)

Hoje, ao clicar em qualquer item da sidebar, a página nova carrega com o scroll **na mesma posição** da anterior. O usuário quer que **toda navegação resete pro topo**.

**Onde implementar**: o container que rola é o `<main>` em [src/components/layout/RootLayout.tsx](src/components/layout/RootLayout.tsx), linha 29 — `<main className="relative flex-1 overflow-y-auto">`. Não é o `window`, então `window.scrollTo(0, 0)` **não funciona** sozinho.

**Solução sugerida** (mais limpa): criar um pequeno componente `ScrollToTop` que escuta `useLocation()` e reseta o scroll do main:

```tsx
// src/components/effects/ScrollToTop.tsx
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

export function ScrollToTop({ scroller }: { scroller: React.RefObject<HTMLElement | null> }) {
  const { pathname, hash } = useLocation()
  const prev = useRef(pathname)
  useEffect(() => {
    if (hash) return // links com âncora (#status-tag) preservam o comportamento de scroll-into-view
    if (prev.current !== pathname && scroller.current) {
      scroller.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    prev.current = pathname
  }, [pathname, hash, scroller])
  return null
}
```

E no `RootLayout`:
```tsx
const mainRef = useRef<HTMLElement>(null)
// ...
<main ref={mainRef} className="...">
  <ScrollToTop scroller={mainRef} />
  ...
</main>
```

**Cuidado**: a `Sidebar` usa hash links (`#status-tag`, `#dropdown-item` etc) pra rolar pra subseções dentro da mesma página. O componente acima preserva isso checando `hash`.

### 2. Melhorar visual e comportamento dos scrollbars

Locais onde tem scroll hoje:
- `<main>` em `RootLayout.tsx:29` (scroll vertical da página inteira)
- `<Sidebar>` (`src/components/layout/Sidebar.tsx`) — usa `@radix-ui/react-scroll-area`, já estilizado
- `CategoryPanel` (`src/components/ui/CategoryPanel.tsx`) — área de itens com `overflow-y-auto`
- `CategoryPanels.tsx` showcase tem um seletor de página com `max-h-[300px] overflow-y-auto`
- `Galeria` Hugeicons grid (não tem scroll próprio, mas a página principal rola)

**Pedido do usuário**: deixar a aparência **e o comportamento** do scroll mais elegante em toda a plataforma.

**Sugestão**:
- Definir uma classe global utilitária em [src/styles/global.css](src/styles/global.css) com scrollbar fina/colorida pra usar em qualquer elemento com `overflow-y-auto`. Exemplo:
  ```css
  .scroll-elegant {
    scrollbar-width: thin;
    scrollbar-color: var(--gray-7) transparent;
  }
  .scroll-elegant::-webkit-scrollbar { width: 8px; height: 8px; }
  .scroll-elegant::-webkit-scrollbar-track { background: transparent; }
  .scroll-elegant::-webkit-scrollbar-thumb {
    background: var(--gray-6);
    border-radius: 999px;
    transition: background 200ms;
  }
  .scroll-elegant:hover::-webkit-scrollbar-thumb { background: var(--gray-8); }
  ```
- Aplicar em **todos** os containers que rolam, **especialmente** o `<main>`.
- Considerar `lenis` (já instalado em `package.json`) pra suavizar o scroll do main com inércia. Já existe um `LenisProvider` em `src/providers/LenisProvider.tsx` — verificar se está sendo usado e se vale a pena ativar.
- Smooth scroll behavior global no `html`/`body` via CSS (`scroll-behavior: smooth`) — mas **não** quebrar o scroll-to-top instantâneo da tarefa 1 (use `behavior: 'instant'` lá).

### 3. Outras melhorias de scroll que valem checar

- A grid de Hugeicons tem 1548 ícones × 3 estilos. Hoje carrega de 120 em 120 com botão "Carregar mais". Considerar **virtualização** (`react-virtuoso` ou `@tanstack/react-virtual`) se o usuário quiser ver tudo de uma vez sem perder performance.
- O `CategoryPanel` showcase em `/category-panel` lista 23 páginas no seletor lateral — o scroll dele também deve usar a classe elegante.
- A sidebar de componentes (`src/components/layout/Sidebar.tsx`) pode ganhar a mesma identidade visual.

## Verificações antes de fechar

```powershell
# typecheck
npx tsc -p tsconfig.app.json --noEmit
# rotas
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/   # deve dar 200
```

Não criar commits sem o usuário pedir explicitamente.
