// #hard #utils

import type { GetOptional } from "./0058-hard-get-optional.ts"

type OptionalKeys<T> = keyof GetOptional<T>;