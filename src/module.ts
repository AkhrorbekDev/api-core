import { defineNuxtModule, addPlugin, createResolver, addImports, addTemplate } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'api-core',
    configKey: 'api-core'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: 'https://example.com'
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    nuxt.options.build.transpile.push(resolver.resolve('./runtime'))

    const { dst } = addTemplate({
      src: resolver.resolve('./runtime/composables/useApiCore.ts'),
      write: true
    })

    addImports({
      name: 'useApiCore',
      from: resolver.resolve(dst)
    })
  }
})
