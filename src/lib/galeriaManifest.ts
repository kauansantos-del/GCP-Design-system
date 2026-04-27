// Auto-curated manifest of /galeria/* assets served by Vite middleware (vite.config.ts).
// Title is the human label displayed; src is the encoded URL.

const G = '/galeria'
const e = encodeURI

export type GalleryAsset = { id: string; title: string; src: string }
export type GallerySubcategory = { id: string; title: string; assets: GalleryAsset[] }
export type GalleryCategory = {
  id: string
  title: string
  hero?: string
  subcategories: GallerySubcategory[]
}

const titleize = (raw: string) =>
  raw
    .replace(/\.[a-z]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())

const asset = (id: string, src: string, title?: string): GalleryAsset => ({
  id,
  title: title ?? titleize(id),
  src,
})

// ─── Construir ────────────────────────────────────────────────────────────
export const construirGallery: GalleryCategory[] = [
  {
    id: 'arcos',
    title: 'Arcos',
    hero: e(`${G}/Categorias - Construir/categoria-arcos.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('arco-rebaixado', e(`${G}/Categorias - Construir/subcategorias/arcos/arco-rebaixado.png`)),
          asset('arco-retangular', e(`${G}/Categorias - Construir/subcategorias/arcos/arco-retangular.png`)),
        ],
      },
    ],
  },
  {
    id: 'cercas',
    title: 'Cercas',
    hero: e(`${G}/Categorias - Construir/categorias-cercas.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('cerca-de-madeira', e(`${G}/Categorias - Construir/subcategorias/cercas/cerca-de-madeira.png`)),
          asset('cerca-de-vidro', e(`${G}/Categorias - Construir/subcategorias/cercas/cerca-de-vidro.png`)),
          asset('cerca-muro-baixo', e(`${G}/Categorias - Construir/subcategorias/cercas/cerca-muro-baixo.png`)),
          asset('cerca-sebe', e(`${G}/Categorias - Construir/subcategorias/cercas/cerca-sebe.png`)),
        ],
      },
    ],
  },
  {
    id: 'divisorias',
    title: 'Divisórias',
    hero: e(`${G}/Categorias - Construir/categoria-divisorias.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('divisoria-alvenaria', e(`${G}/Categorias - Construir/subcategorias/divisorias/divisoria-alvenaria.png`)),
          asset('divisoria-curva', e(`${G}/Categorias - Construir/subcategorias/divisorias/divisoria-curva.png`)),
          asset('divisoria-drywall', e(`${G}/Categorias - Construir/subcategorias/divisorias/divisoria-drywall.png`)),
          asset('divisoria-meia-parede', e(`${G}/Categorias - Construir/subcategorias/divisorias/divisoria-meia-parede.png`)),
          asset('divisoria-vidro', e(`${G}/Categorias - Construir/subcategorias/divisorias/divisoria-vidro.png`)),
        ],
      },
    ],
  },
  {
    id: 'escadas',
    title: 'Escadas',
    hero: e(`${G}/Categorias - Construir/categorias-escada.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('escada-caracol', e(`${G}/Categorias - Construir/subcategorias/escadas/escada-caracol.png`)),
          asset('escada-l', e(`${G}/Categorias - Construir/subcategorias/escadas/escada-L.png`), 'Escada em L'),
          asset('escada-patamar', e(`${G}/Categorias - Construir/subcategorias/escadas/escada-patamar.png`)),
          asset('escada-u', e(`${G}/Categorias - Construir/subcategorias/escadas/escada-U.png`), 'Escada em U'),
        ],
      },
    ],
  },
  {
    id: 'janelas',
    title: 'Janelas',
    hero: e(`${G}/Categorias - Construir/categoria-janela.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('janela-basculante', e(`${G}/Categorias - Construir/subcategorias/janelas/janela-basculante.png`)),
          asset('janela-de-correr', e(`${G}/Categorias - Construir/subcategorias/janelas/janela-de-correr.png`)),
          asset('janela-fixa', e(`${G}/Categorias - Construir/subcategorias/janelas/janela-fixa.png`)),
          asset('janela-guilhotina', e(`${G}/Categorias - Construir/subcategorias/janelas/janela-guilhotina.png`)),
          asset('janela-panoramica', e(`${G}/Categorias - Construir/subcategorias/janelas/janela-panoramica.png`)),
        ],
      },
    ],
  },
  {
    id: 'lareira',
    title: 'Lareira',
    hero: e(`${G}/Categorias - Construir/categoria-lareira.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('lareira-de-canto', e(`${G}/Categorias - Construir/subcategorias/lareira/lareira-de-canto.png`)),
          asset('lareira-decorativa', e(`${G}/Categorias - Construir/subcategorias/lareira/lareira-decorativa.png`)),
          asset('lareira-suspensa', e(`${G}/Categorias - Construir/subcategorias/lareira/lareira-suspensa.png`)),
        ],
      },
    ],
  },
  {
    id: 'portas',
    title: 'Portas',
    hero: e(`${G}/Categorias - Construir/categoria-porta.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('porta-camarao', e(`${G}/Categorias - Construir/subcategorias/portas/porta-camarao.png`), 'Porta camarão'),
          asset('porta-de-correr', e(`${G}/Categorias - Construir/subcategorias/portas/porta-de-correr.png`)),
          asset('porta-dupla', e(`${G}/Categorias - Construir/subcategorias/portas/porta-dupla.png`)),
          asset('porta-garagem', e(`${G}/Categorias - Construir/subcategorias/portas/porta-garagem.png`)),
          asset('porta-pivotante', e(`${G}/Categorias - Construir/subcategorias/portas/porta-pivotante.png`)),
        ],
      },
    ],
  },
  {
    id: 'telhados',
    title: 'Telhados',
    hero: e(`${G}/Categorias - Construir/categorias-telhado.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('telhado-ceramica', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-ceramica.png`), 'Telhado cerâmica'),
          asset('telhado-concreto', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-concreto.png`)),
          asset('telhado-fibrocimento', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-fibrocimento.png`)),
          asset('telhado-metalico', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-metalico.png`), 'Telhado metálico'),
          asset('telhado-policarbonato', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-policarbonato.png`)),
          asset('telhado-shingle', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-shingle.png`)),
          asset('telhado-vidro', e(`${G}/Categorias - Construir/subcategorias/telhados/telhado-vidro.png`)),
        ],
      },
    ],
  },
  {
    id: 'terracos',
    title: 'Terraços',
    hero: e(`${G}/Categorias - Construir/cateogiras-terraço.png`),
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          asset('terraco-pergola', e(`${G}/Categorias - Construir/subcategorias/terraços/terraço-pergola.png`), 'Terraço pérgola'),
          asset('terraco-porcelanato', e(`${G}/Categorias - Construir/subcategorias/terraços/terraço-porcelanato.png`)),
          asset('terraco-varanda-integrada', e(`${G}/Categorias - Construir/subcategorias/terraços/terraço-varanda-integrada.png`)),
        ],
      },
    ],
  },
]

// ─── Objetos ──────────────────────────────────────────────────────────────
const obj = (folder: string, file: string, title?: string): GalleryAsset =>
  asset(file.replace(/\.png$/i, '').toLowerCase(), e(`${G}/Categorias - Objetos/${folder}/${file}`), title)

export const objetosGallery: GalleryCategory[] = [
  {
    id: 'sofa',
    title: 'Sofás e poltronas',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('sofa e poltronas', 'sofa-2-lugares.png', 'Sofá 2 lugares'),
          obj('sofa e poltronas', 'sofa-3-lugares.png', 'Sofá 3 lugares'),
          obj('sofa e poltronas', 'sofa-cama.png', 'Sofá-cama'),
          obj('sofa e poltronas', 'sofa-chaise-longue.png', 'Chaise longue'),
          obj('sofa e poltronas', 'sofa-de-canto.png', 'Sofá de canto'),
          obj('sofa e poltronas', 'sofa-namoradeira.png', 'Namoradeira'),
          obj('sofa e poltronas', 'sofa-poltrona.png', 'Poltrona'),
          obj('sofa e poltronas', 'sofa-puff.png', 'Puff'),
        ],
      },
    ],
  },
  {
    id: 'mesas',
    title: 'Mesas',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('mesas', 'mesa-de-jantar.png', 'Mesa de jantar'),
          obj('mesas', 'mesa-de-centro.png', 'Mesa de centro'),
          obj('mesas', 'mesa-lateral.png', 'Mesa lateral'),
          obj('mesas', 'mesa-de-apoio.png', 'Mesa de apoio'),
          obj('mesas', 'mesa-aparador-console.png', 'Aparador / Console'),
          obj('mesas', 'mesa-bancada-balcao.png', 'Bancada / Balcão'),
          obj('mesas', 'mesa-escritorio.png', 'Mesa de escritório'),
          obj('mesas', 'mesa-escrivaninha.png', 'Escrivaninha'),
          obj('mesas', 'mesa-cabeceira.png', 'Cabeceira'),
        ],
      },
    ],
  },
  {
    id: 'cadeiras',
    title: 'Cadeiras e banquetas',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('cadeiras e banquetes', 'cadeira-jantar.png', 'Cadeira de jantar'),
          obj('cadeiras e banquetes', 'cadeira-escritorio.png', 'Cadeira de escritório'),
          obj('cadeiras e banquetes', 'cadeira-de-varanda.png', 'Cadeira de varanda'),
          obj('cadeiras e banquetes', 'banqueta-alta.png', 'Banqueta alta'),
          obj('cadeiras e banquetes', 'banqueta-baixa.png', 'Banqueta baixa'),
          obj('cadeiras e banquetes', 'banco.png', 'Banco'),
        ],
      },
    ],
  },
  {
    id: 'camas',
    title: 'Camas e colchões',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('camas e colchoes', 'cama-casal.png', 'Cama de casal'),
          obj('camas e colchoes', 'cama-box.png', 'Cama box'),
          obj('camas e colchoes', 'cama-beliche.png', 'Beliche'),
          obj('camas e colchoes', 'berço.png', 'Berço'),
          obj('camas e colchoes', 'cabeceira-avulsa.png', 'Cabeceira avulsa'),
          obj('camas e colchoes', 'colchao.png', 'Colchão'),
        ],
      },
    ],
  },
  {
    id: 'armarios',
    title: 'Armários e guarda-roupas',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('armarios e guarda roupas', 'Guarda-roupa-duas-portas.png', 'Guarda-roupa 2 portas'),
          obj('armarios e guarda roupas', 'Guarda-roupa-quatro-portas-2.png', 'Guarda-roupa 4 portas'),
          obj('armarios e guarda roupas', 'guarda-roupa-seis-portas-2.png', 'Guarda-roupa 6 portas'),
          obj('armarios e guarda roupas', 'Closed-e-modulado.png', 'Closet modulado'),
          obj('armarios e guarda roupas', 'Armário-multiuso.png', 'Armário multiuso'),
          obj('armarios e guarda roupas', 'Sapateira-2.png', 'Sapateira'),
        ],
      },
    ],
  },
  {
    id: 'estantes',
    title: 'Estantes e prateleiras',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('estantes e prateleiras', 'Estante-livro.png', 'Estante de livros'),
          obj('estantes e prateleiras', 'estante-tv.png', 'Estante de TV'),
          obj('estantes e prateleiras', 'cristaleira-vitrine.png', 'Cristaleira / vitrine'),
          obj('estantes e prateleiras', 'nicho-decorativo.png', 'Nicho decorativo'),
          obj('estantes e prateleiras', 'prateleira-parede.png', 'Prateleira de parede'),
        ],
      },
    ],
  },
  {
    id: 'rack',
    title: 'Rack e painéis de TV',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('rack e paineis de tv', 'rack-de-chao.png', 'Rack de chão'),
          obj('rack e paineis de tv', 'Rack-suspenso.png', 'Rack suspenso'),
          obj('rack e paineis de tv', 'painel-tv.png', 'Painel de TV'),
          obj('rack e paineis de tv', 'home-theater-completo.png', 'Home theater'),
          obj('rack e paineis de tv', 'suporte-tv.png', 'Suporte de TV'),
        ],
      },
    ],
  },
  {
    id: 'comodas',
    title: 'Cômodas e gaveteiros',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('comodas e gaveteiros', 'comoda-3-gavetas.png', 'Cômoda 3 gavetas'),
          obj('comodas e gaveteiros', 'comoda-4-gavetas.png', 'Cômoda 4 gavetas'),
          obj('comodas e gaveteiros', 'gaveteiro.png', 'Gaveteiro'),
          obj('comodas e gaveteiros', 'trocador.png', 'Trocador'),
        ],
      },
    ],
  },
  {
    id: 'cozinha',
    title: 'Cozinha',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('cozinha', 'ilha-de-cozinha.png', 'Ilha'),
          obj('cozinha', 'balcao-de-cozinha.png', 'Balcão'),
          obj('cozinha', 'armario-aereo.png', 'Armário aéreo'),
          obj('cozinha', 'armario-de-piso.png', 'Armário de piso'),
          obj('cozinha', 'paneleiro.png', 'Paneleiro'),
          obj('cozinha', 'fruteira.png', 'Fruteira'),
          obj('cozinha', 'lixeira.png', 'Lixeira'),
        ],
      },
    ],
  },
  {
    id: 'banheiro',
    title: 'Banheiro',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('banheiro', 'gabinete-com-pia.png', 'Gabinete com pia'),
          obj('banheiro', 'espelheira.png', 'Espelheira'),
          obj('banheiro', 'box.png', 'Box'),
          obj('banheiro', 'chuveiro.png', 'Chuveiro'),
          obj('banheiro', 'banheira.png', 'Banheira'),
          obj('banheiro', 'privada.png', 'Privada'),
          obj('banheiro', 'armário-de-banheiro.png', 'Armário de banheiro'),
          obj('banheiro', 'porta-toalha.png', 'Porta-toalha'),
          obj('banheiro', 'acessorios.png', 'Acessórios'),
        ],
      },
    ],
  },
  {
    id: 'iluminacao',
    title: 'Iluminação',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('iluminação', 'Pendente.png', 'Pendente'),
          obj('iluminação', 'Plafon.png', 'Plafon'),
          obj('iluminação', 'Lustre.png', 'Lustre'),
          obj('iluminação', 'Spot.png', 'Spot'),
          obj('iluminação', 'Luminaria-mesa.png', 'Luminária de mesa'),
          obj('iluminação', 'luminaria-piso.png', 'Luminária de piso'),
          obj('iluminação', 'luminaria-parede.png', 'Luminária de parede'),
          obj('iluminação', 'luminaria-espelho.png', 'Luminária para espelho'),
          obj('iluminação', 'fita led.png', 'Fita LED'),
        ],
      },
    ],
  },
  {
    id: 'tapetes',
    title: 'Tapetes e cortinas',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('tapetes e cortinas', 'tapete-retangular.png', 'Tapete retangular'),
          obj('tapetes e cortinas', 'tapete-redondo.png', 'Tapete redondo'),
          obj('tapetes e cortinas', 'tapete-passadeira.png', 'Passadeira'),
          obj('tapetes e cortinas', 'cortina.png', 'Cortina'),
          obj('tapetes e cortinas', 'cortina-romana.png', 'Cortina romana'),
          obj('tapetes e cortinas', 'persiana.png', 'Persiana'),
        ],
      },
    ],
  },
  {
    id: 'decoracao',
    title: 'Decoração',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('decoração', 'quadro.png', 'Quadro'),
          obj('decoração', 'espelho-decorativo.png', 'Espelho decorativo'),
          obj('decoração', 'vaso-decorativo.png', 'Vaso decorativo'),
          obj('decoração', 'planta-artificial.png', 'Planta artificial'),
          obj('decoração', 'escultura.png', 'Escultura'),
          obj('decoração', 'bandeja-decorativa.png', 'Bandeja decorativa'),
          obj('decoração', 'porta-retrato.png', 'Porta-retrato'),
          obj('decoração', 'livros-decorativos.png', 'Livros decorativos'),
          obj('decoração', 'relogio-de-parede.png', 'Relógio de parede'),
          obj('decoração', 'manta.png', 'Manta'),
        ],
      },
    ],
  },
  {
    id: 'eletrodomesticos',
    title: 'Eletrodomésticos',
    subcategories: [
      {
        id: 'tipos',
        title: 'Tipos',
        assets: [
          obj('eletrodomésticos', 'geladeira.png', 'Geladeira'),
          obj('eletrodomésticos', 'fogao.png', 'Fogão'),
          obj('eletrodomésticos', 'cocktop.png', 'Cooktop'),
          obj('eletrodomésticos', 'forno.png', 'Forno'),
          obj('eletrodomésticos', 'micro-ondas.png', 'Micro-ondas'),
          obj('eletrodomésticos', 'depurador.png', 'Depurador'),
          obj('eletrodomésticos', 'lava-louças.png', 'Lava-louças'),
          obj('eletrodomésticos', 'maquina-de-lavar.png', 'Máquina de lavar'),
          obj('eletrodomésticos', 'secaodra.png', 'Secadora'),
          obj('eletrodomésticos', 'tv.png', 'TV'),
          obj('eletrodomésticos', 'ar-condicionado.png', 'Ar-condicionado'),
          obj('eletrodomésticos', 'purificador-de-agua.png', 'Purificador de água'),
        ],
      },
    ],
  },
]

export const allGalleryGroups = [
  { id: 'objetos' as const, label: 'Objetos', categories: objetosGallery },
  { id: 'construir' as const, label: 'Construir', categories: construirGallery },
]

export type GalleryGroupId = 'objetos' | 'construir'

export function findCategory(group: GalleryGroupId, categoryId: string) {
  const list = group === 'construir' ? construirGallery : objetosGallery
  return list.find((c) => c.id === categoryId) ?? list[0]
}
