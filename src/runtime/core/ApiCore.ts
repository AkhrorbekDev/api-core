// @ts-ignore
import qs from 'qs'
import {$Fetch, $fetch, FetchContext, FetchOptions} from 'ofetch'
import {buildURL} from './helpers/buildUrl'
import {$FetchContext, ApiCoreInterface} from "../types";


function _createFetch() {
  return $fetch.create({
    // @ts-ignore
    baseURL: this.baseURL,
    // @ts-ignore
    ...this.fetchOptions,
  })
}

class ApiCore implements ApiCoreInterface {
  baseURL = ''
  _fetch: $Fetch
  // @ts-ignore
  fetchOptions = {
    retry: 0,
    onRequest(ctx: $FetchContext) {
      ctx.options.paramsSerializer = (query: any) => {
        return qs.stringify(query, {
          arrayFormat: 'indices',
          skipNulls: true,
        })
      }
      if (ctx.options.config) {
        Object.keys(ctx.options.config).forEach((key) => {
          ctx.options[key] = ctx.options.config[key]
        })
      }
      ctx.request = buildURL(ctx.request, ctx.options.params, ctx.options.paramsSerializer).replace(/^\?/, '')
      ctx.options._params = ctx.options.params

      delete ctx.options.params
    },

    onRequestError(ctx: FetchContext) {
    },
    onResponse(ctx: FetchContext) {
    },
    onResponseError(ctx: FetchContext) {
    },
  }

  constructor(options: any) {
    if (!options.baseURL) {
      throw Error('baseURL is required option')
    }
    this.baseURL = options.baseURL
    if (options.fetchOptions) {
      this.fetchOptions = options.fetchOptions
    }
    this._fetch = _createFetch.call(this)

  }

  get(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      method: 'get',
      ...data,
      config,
    })
  }

  post(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'post',
      ...data,
      config,
    })
  }

  delete(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'delete',
      config,
    })
  }

  put(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'put',
      config,
    })
  }

  head(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'head',
      config,
    })
  }

  connect(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'connect',
      config,
    })
  }

  options(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'options',
      config,
    })
  }

  trace(url: string, data: any, config = null) {
    return this.$_fetch(url, {
      body: data.data,
      method: 'trace',
      config,
    })
  }

  $_fetch(url: any, options: FetchOptions & { config: any }) {
    return new Promise((resolve, reject) => {
      this._fetch(url, options).then((res: any) => {
        return resolve(res)
      })
    })
  }

  config(args: ApiCoreInterface) {
    if (Object.keys(args).length) {
      Object.keys(args).forEach((key) => {
        // @ts-ignore
        this[key] = args[key]
      })
    }
    return this
  }

}

export {ApiCore}
