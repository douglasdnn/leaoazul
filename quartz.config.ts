import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "O Bando do Leão Azul",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "pt-BR",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
    title: "Cinzel",           // Forte e Fantasia (opcional, pode ser o mesmo do header)
    header: "Alegreya Sans",   // Limpa, mas com personalidade
    body: "Spectral",          // Fonte Serfiada e Legível
    code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {          
      light: "#f0e6c6",        // Bordas leves: Tom mais escuro de pergaminho
      lightgray: "#5a5a5a",    // Bordas e elementos secundários: Cinza escuro (como o cinza de D&D)
      gray: "#303030",         // Links e texto mais pesado: Cinza mais escuro
      darkgray: "#202020",     // Texto do corpo: Preto/Cinza bem escuro
      dark: "#7a0000",         // Headers (Títulos H1, H2): Vermelho escuro/Borgonha (cor de detalhe do PHB)
      secondary: "#a0522d",    // Links: Castanho (Sienna)
      tertiary: "#5a2d1d",     // Links visitados
      highlight: "rgba(255, 230, 0, 0.15)", // Destaque de texto
      textHighlight: "#fff8c4",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts(),
              Plugin.ExplicitPublish(), // Only include files with publish: true in frontmatter
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
