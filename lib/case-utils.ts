import * as camelcase from 'camelcase'
import * as uppercamelcase from 'uppercamelcase'
import * as decamelize from 'decamelize'

export function toCamelCase(...args: string[]) {
    return camelcase(...args);
}

export function toPascalCase(...args: string[]) {
    return uppercamelcase(...args);
}

export function toSnakeCase(s: string, sep = '_') {
    return decamelize(s, sep)
}
