import {addPlugin, createResolver, defineNuxtModule} from '@nuxt/kit'
import defu from "defu";

// Define a type for hex colors
type HexColor = string & { __hexColor: never };
// Check if a value is a valid hex color code
const isValidHexColor = (value: string): value is HexColor => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
const fallbackHexColor = '#B72EB2' as HexColor

// change a property type definition from number to HexColor
export interface CustomColor {
  value: string
  name: string
  blend?: boolean
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  sourceColor?: string
  customColors?: CustomColor[]
}

const resolver = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'theme',
    configKey: 'theme'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    // ...
    sourceColor: '#000',
    customColors:[
      {
        name: 'Solid White',
        value: '#FFF',
        blend: true,
      }
    ]
  },
  hooks:{
    // 'imports:dirs'(dirs) {
    //   dirs.push(resolver.resolve('./runtime/composables'),)
    // }
  },
  setup(options, nuxt) {

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    // Merge the module options with the Nuxt options
    const mergedModuleOptions =  defu(nuxt.options?.theme, options) as Required<ModuleOptions>

    // Validate the sourceColor option
    if (!isValidHexColor(mergedModuleOptions.sourceColor)) {
      console.warn('Invalid sourceColor option, using fallback color instead.')
      mergedModuleOptions.sourceColor = fallbackHexColor
    }

    // Add the sourceColor option to the Nuxt options
    nuxt.options.theme = mergedModuleOptions

    // Auto import the CSS file
    nuxt.options.css.push(resolver.resolve('./runtime/module.css'))

    // auto import utils/theme_utils.ts from nod
  }
})
