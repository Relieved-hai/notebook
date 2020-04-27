type A = { a: number, b: string }
type A1 = Partial<A> // { a?: number; b?: string;}

let a: A1 = {}
