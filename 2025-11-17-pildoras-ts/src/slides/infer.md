
---
transition: fade
---

# 🕵 Inferencia avanzada con `infer`
Recordando la palabra `never`, que será útil para entender el siguiente ejemplo:

TypeScript debe ser capaz de representar cuando el código lógicamente no puede suceder:

```ts {monaco} { editorOptions: { lineNumbers: true } }
const neverReturns = () => {
	// Lanza error en la primera línea
	throw new Error("Siempre lanza un error, nunca llega a poder devolver nada");
};
const test = neverReturns();
```

---
transition: fade
hideInToc: true
---

# 🕵 Inferencia avanzada con `infer`
"Si este tipo es así, extrae lo que hay ahí dentro y llámalo R"

```ts {monaco} { editorOptions: { lineNumbers: true } }
function getData(): string {
  return "hello";
}

const result = getData();
// Intellisense ❌ → siempre `string`
```

<v-click>
<small>Con infer:</small>

```ts {monaco} { editorOptions: { lineNumbers: true } }
type ReturnTypeOf<T> = T extends (...args: unknown[]) => infer R ? R : never;

function getData() {
	return { id: 1, name: "Alice" };
}

const result: ReturnTypeOf<typeof getData> = getData();
// Intellisense ✅ → { id: number; name: string }
result.name; // autocompleta
```

</v-click>


---
transition: fade
hideInToc: true
---

# 🕵 Inferencia avanzada con `infer`
Ejemplo práctico 1: extraer parámetros de funciones

```ts {monaco} { editorOptions: { lineNumbers: true } }
type FirstParam<T> = T extends (arg: infer P, ...rest: any[]) => any ? P : never;

function saveUser(user: { id: number; name: string }) {}

type Param = FirstParam<typeof saveUser>;
```

Útil para generar validaciones, middlewares o tests automáticamente basados en las propias funciones.

---
transition: fade
hideInToc: true
---

# 🕵 Inferencia avanzada con `infer`
Ejemplo práctico 2: "desenvolver" promesas

```ts {monaco} { editorOptions: { lineNumbers: true } }
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

type A = UnwrapPromise<Promise<number>>; // number
type B = UnwrapPromise<string>; // string
```

Si es una promesa, extraigo su valor interno; si no, lo dejo tal cual

---
hideInToc: true
---

# 🕵 Inferencia avanzada con `infer`
Ejemplo práctico 3: recursividad

```ts {monaco} { editorOptions: { lineNumbers: true } }
type FlattenArray<T> = T extends (infer U)[] ? FlattenArray<U> : T;

type A = FlattenArray<number[][][]>; // number
```

Este patrón se usa muchísimo en librerías de formularios, zod, react-query… prácticamente cualquier sistema que
necesite limpiar o normalizar tipos complejos.