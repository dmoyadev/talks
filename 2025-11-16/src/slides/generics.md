---
transition: fade
---

# 🧩 Genéricos en profundidad
Un parámetro de tipo, igual que una función recibiendo parámetros.

Sin genéricos:
```ts {monaco} { editorOptions: { lineNumbers: true } }
function merge(a: object, b: object): object {
  return { ...a, ...b };
}

const result = merge({ id: 1 }, { name: "Alice" });

// `result` es solo `object`.  No sugiere `id` ni `name`
```

<br>

<v-click>
Con genéricos:

```ts {monaco} { editorOptions: { lineNumbers: true } }
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const result = merge({ id: 1 }, { name: "Alice" });

// `result` es { id: number; name: string }
```

</v-click>

---
transition: fade
hideInToc: true
---

# 🧩 Genéricos en profundidad
Funciona con cualquier tipo: interfaces, clases...

```ts {monaco} { editorOptions: { lineNumbers: true } }
interface ApiResponse<T> {
	data: T;
	error?: string;
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
	data: { id: 1, name: "Alice" },
};
```

```ts {monaco} { editorOptions: { lineNumbers: true } }
class Box<T> {
	content: T;
	constructor(content: T) {
		this.content = content;
	}
}

const stringBox = new Box("hello"); // Box<string>
const numberBox = new Box(42);      // Box<number>
```

---
transition: fade
hideInToc: true
---

# 🧩 Genéricos en profundidad
Se puede restringir para que solo acepte cierta clase de tipos con `extends`

```ts {monaco} { editorOptions: { lineNumbers: true } }
function getLength<T extends { length: number }>(value: T) {
	return value.length;
}

getLength("hola");      // ok
getLength([1, 2, 3]);   // ok
getLength(123);         // error
```

---
transition: fade
hideInToc: true
---

# 🧩 Genéricos en profundidad
Podemos modelar las relaciones entre tipos con `keyof`

```ts {monaco} { editorOptions: { lineNumbers: true } }
function getStats<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const result = {} as Pick<T, K>;
	keys.forEach(k => { result[k] = obj[k]; });
	return result;
}

const pokemon = { id: 1, name: "Pikachu", ps: 30, defense: 15, attack: 20, speed: 50 };
const pikachuStats = getStats(pokemon, ["defense", "attack"]);
// pikachuStats: { defense: number; attack: number }
```

---
hideInToc: true
---

# 🧩 Genéricos en profundidad
<span />

- Los tipos genéricos permiten código flexible y reutilizable.

- `extends` y `keyof` permiten restringir y relacionar tipos.

- Esto es la base de muchas utilidades que ya conocemos (`Pick`, `Partial`, `Omit`...).