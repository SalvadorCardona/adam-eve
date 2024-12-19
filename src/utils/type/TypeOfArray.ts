export type TypeOfArray<T> = T extends (infer U)[] ? U : never
