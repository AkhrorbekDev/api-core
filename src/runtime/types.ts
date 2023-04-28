import {$Fetch, FetchContext, FetchOptions} from "ofetch";

interface ApiCoreInterface {
  baseURL: string,
  fetchOptions: $FetchOptions
  _fetch: $Fetch

  get(url: string, data: any, config: any): Promise<any>

  post(url: string, data: any, config: any): Promise<any>

  put(url: string, data: any, config: any): Promise<any>

  delete(url: string, data: any, config: any): Promise<any>

  head(url: string, data: any, config: any): Promise<any>

  trace(url: string, data: any, config: any): Promise<any>

  connect(url: string, data: any, config: any): Promise<any>

  options(url: string, data: any, config: any): Promise<any>

  config(args: ApiCoreInterface): this
}

type $FetchOptions = FetchOptions & {
  options: { [index: string | number | symbol]: any } &
    {
      config: {
        [index: string | number | symbol]: any
      },
      paramsSerializer: Function
    }
}

type $FetchContext = Omit<FetchContext, 'options'> & { options: $FetchOptions['options'] }

declare const useApiCore: () => any

export {$FetchContext, $FetchOptions, ApiCoreInterface, useApiCore}
export * from './core'
