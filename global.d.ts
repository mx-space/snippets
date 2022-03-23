/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
// THIS FILE FOR MONACO EDITOR CODE COMPLETION

declare interface FunctionContextResponse {
  throws(code: number, message: any): void
  type(type: string): FunctionContextResponse
  status(code: number, statusMessage?: string): FunctionContextResponse
  send(data: any): void
}
declare interface FunctionContextRequest {
  query: Record<string, string>
  headers: Record<string, string>
  params: Record<string, string>
}

declare interface FastifyRequest {
  [k: string]: any
}
declare interface Context extends FunctionContextResponse {}
declare interface Context extends FunctionContextRequest {}
declare interface Context {
  req: FunctionContextRequest & FastifyRequest
  res: FunctionContextResponse

  model: SnippetModel
  document: SnippetModel & { [key: string]: any }
  getMaster: () => Promise<UserModel>

  storage: IStorage

  name: string
  reference: string

  writeAsset: (path: string, data: any, options: any) => void
  readAsset: (path: string, options: any) => void
}

declare interface IStorage {
  db: any
  cache: {
    get(key: string): Promise<string>
    set(key: string, value: string | object): Promise<string>
    dek(key: string): Promise<string>
  }
}

declare const __dirname: string
declare const __filename: ''

declare class Buffer {
  constructor(...args: any[]): Buffer
  from(...args: any[]): Buffer
  [x: string]: any
}

declare const console: Console

declare const logger: Console

declare const process: {
  env: Record<string, string>
  nextTick: (func: Function) => any
}
declare const context: Context

declare enum SnippetType {
  JSON = 'json',
  Function = 'function',
  Text = 'text',
  YAML = 'yaml',
}

declare interface SnippetModel extends BaseModel {
  type: SnippetType
  private: boolean
  raw: string
  name: string
  reference: string
  comment?: string
  metatype?: string
}

declare class BaseModel {
  created?: Date
  id?: string
}

declare class UserModel {
  username: string

  name: string

  introduce?: string

  avatar?: string

  mail?: string

  url?: string

  lastLoginTime?: Date

  lastLoginIp?: string

  socialIds?: any
}
declare function require(id: string, useCache?: boolean): Promise<any>
