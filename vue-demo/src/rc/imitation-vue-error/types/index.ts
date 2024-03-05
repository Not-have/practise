export interface ErrorPayload {
    type: 'error'
    err: {
        [name: string]: any
        message: string
        stack: string
        id?: string
        frame?: string
        plugin?: string
        pluginCode?: string
        loc?: {
            file?: string
            line: number
            column: number
        }
    }
}

export interface IOptions {
    links: boolean
}