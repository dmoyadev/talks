---
transition: fade
---

# 🌳 Tipos condicionales y ternarios
Igual que el ternario en el que estás pensando ahora mismo.

```ts {1|1-3|*}{lines:true}
type Conditional<Tipo, Legatario, Si, No> = Tipo extends Legatario ? Si : No;

type IsString<T> = Conditional<T, string, "Es un string!", "No es un string :(">;

type A = IsString<string>; // "Es un string!"
type B = IsString<number>; // "No es un string :("
```

---
transition: fade
hideInToc: true
---

# 🌳 Tipos condicionales y ternarios
Veamos un ejemplo

```ts {monaco} { editorOptions: { lineNumbers: true } }
function parseId(id: string | number): number | string {
	return typeof id === "string" ? parseInt(id) : id;
}

const a = parseId("123"); // `a` es `string | number`
const b = parseId(42);    // `b` es `string | number
```

<v-click>
<small>Con condicionales:</small>

```ts {monaco} { editorOptions: { lineNumbers: true } }
type ID<T> = T extends string ? number : T;

function parseId<T extends number | string>(id: T): ID<T> {
	return (typeof id === "string" ? parseInt(id) : id) as ID<T>;
}
const a = parseId("123"); // `a` es `number`
const b = parseId(42);    // `b` es `42` (un literal)
```

</v-click>

---
hideInToc: true
---

# 🌳 Tipos condicionales y ternarios
Útil para modelar flujos lógicos sin escribir código.

```ts {monaco} { editorOptions: { lineNumbers: true } }
type ToApi<T> = {
	[K in keyof T]: T[K] extends Date
		? string
		: T[K] extends object
			? ToApi<T[K]>
			: T[K];
};

type User = {
	id: number;
	name: string;
	birth: Date;
	meta: { active: boolean; lastLogin: Date };
};

type ApiUser = ToApi<User>;
const user: User       = { id: 1, name: 'Dani', birth: new Date(),   meta: { active: true, lastLogin: new Date() }};
const apiUser: ApiUser = { id: 1, name: 'Dani', birth: '28/03/1996', meta: { active: true, lastLogin: '17/11/2025' }};
// Resultado: Date se convierte en string, el resto se mantiene y los objetos se mapean recursivamente.
```
