export type Level = "iniciante" | "moderado" | "experiente";

export interface Lesson {
  id: string;
  level: Level;
  title: string;
  description: string;
  language: string;
  duration: string;
  content: LessonContent[];
}

export type LessonContent =
  | { type: "text"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "heading"; text: string };

export const LESSONS: Lesson[] = [
  // ── INICIANTE ──────────────────────────────────────────────────────────────
  {
    id: "py-01",
    level: "iniciante",
    title: "O que é Programação?",
    description:
      "Descubra o que é código, por que ele existe e como pense como um programador desde o primeiro dia.",
    language: "Python",
    duration: "15 min",
    content: [
      {
        type: "text",
        text: "Programação é a arte de dar instruções precisas a um computador para que ele execute tarefas. Pense assim: um computador é extremamente obediente, mas absolutamente literal — ele faz exatamente o que você manda, nada mais, nada menos.",
      },
      {
        type: "heading",
        text: "Seu primeiro programa",
      },
      {
        type: "text",
        text: 'A tradição em programação é começar com um programa que exibe a mensagem "Olá, Mundo!". Em Python, isso é incrivelmente simples:',
      },
      {
        type: "code",
        language: "python",
        code: `# Meu primeiro programa em Python
print("Olá, Mundo!")

# Você pode exibir qualquer texto
print("Eu estou aprendendo a programar!")
print("Isso é Python 🐍")`,
      },
      {
        type: "heading",
        text: "Como o computador entende seu código?",
      },
      {
        type: "text",
        text: "O Python é uma linguagem interpretada — um programa chamado interpretador lê seu código linha por linha, de cima para baixo, e executa cada instrução. É como seguir uma receita de culinária: você não pula etapas.",
      },
      {
        type: "code",
        language: "python",
        code: `# O Python executa linha por linha:
print("Linha 1: Isso aparece primeiro")
print("Linha 2: Depois isso")
print("Linha 3: E por último isso")`,
      },
      {
        type: "text",
        text: "Parabéns! Você acabou de entender o conceito mais fundamental de programação. Nas próximas lições, vamos aprender a armazenar informações em variáveis e tomar decisões com condicionais.",
      },
    ],
  },
  {
    id: "py-02",
    level: "iniciante",
    title: "Variáveis e Tipos de Dados",
    description:
      "Aprenda a armazenar e manipular informações: textos, números e valores verdadeiro/falso em Python.",
    language: "Python",
    duration: "20 min",
    content: [
      {
        type: "text",
        text: "Variáveis são como caixas etiquetadas onde você guarda informações. Você dá um nome à caixa e coloca um valor dentro. Depois, pode usar o nome para acessar ou modificar esse valor.",
      },
      {
        type: "heading",
        text: "Tipos de dados básicos",
      },
      {
        type: "code",
        language: "python",
        code: `# String (texto) — use aspas simples ou duplas
nome = "Ana"
sobrenome = 'Silva'
mensagem = "Olá, " + nome  # Concatenação

# Integer (número inteiro)
idade = 25
anoCorrente = 2026

# Float (número decimal)
altura = 1.68
nota = 9.5

# Boolean (verdadeiro ou falso)
maiorDeIdade = True
estudeHoje = False

print(nome, "tem", idade, "anos")  # Ana tem 25 anos`,
      },
      {
        type: "heading",
        text: "Operações com variáveis",
      },
      {
        type: "code",
        language: "python",
        code: `# Aritmética
preco = 49.90
desconto = 10.00
precoFinal = preco - desconto
print(f"Preço final: R$ {precoFinal}")  # R$ 39.9

# Verificando o tipo
print(type(nome))    # <class 'str'>
print(type(idade))   # <class 'int'>
print(type(altura))  # <class 'float'>

# Conversão de tipos
idadeTexto = str(idade)       # 25 → "25"
notaInteira = int(nota)       # 9.5 → 9
alturaTexto = float("1.75")   # "1.75" → 1.75`,
      },
      {
        type: "text",
        text: "Dica importante: em Python, os nomes de variáveis diferenciam maiúsculas de minúsculas. `nome` e `Nome` são variáveis diferentes! Use nomes descritivos para tornar seu código legível.",
      },
    ],
  },
  {
    id: "py-03",
    level: "iniciante",
    title: "Condicionais: if / else",
    description:
      "Ensine seu programa a tomar decisões com estruturas condicionais e lógica booleana em Python.",
    language: "Python",
    duration: "25 min",
    content: [
      {
        type: "text",
        text: "Condicionais permitem que seu programa tome caminhos diferentes dependendo de uma condição. É a base da lógica de programação — sem elas, seus programas fariam a mesma coisa sempre.",
      },
      {
        type: "heading",
        text: "Estrutura básica if/else",
      },
      {
        type: "code",
        language: "python",
        code: `idade = 17

if idade >= 18:
    print("Você é maior de idade")
    print("Pode votar nas eleições!")
else:
    print("Você é menor de idade")
    faltam = 18 - idade
    print(f"Faltam {faltam} ano(s) para você completar 18")

# Saída: Você é menor de idade
# Saída: Faltam 1 ano(s) para você completar 18`,
      },
      {
        type: "heading",
        text: "Múltiplas condições com elif",
      },
      {
        type: "code",
        language: "python",
        code: `nota = 7.5

if nota >= 9.0:
    conceito = "A — Excelente!"
elif nota >= 7.0:
    conceito = "B — Bom"
elif nota >= 5.0:
    conceito = "C — Regular"
else:
    conceito = "D — Reprovado"

print(f"Nota {nota}: {conceito}")
# Nota 7.5: B — Bom`,
      },
      {
        type: "heading",
        text: "Operadores de comparação e lógicos",
      },
      {
        type: "code",
        language: "python",
        code: `# Operadores: == != > < >= <=
x = 10

print(x == 10)   # True
print(x != 5)    # True
print(x > 8)     # True

# Operadores lógicos: and, or, not
temCarteira = True
temCarro = False

if temCarteira and temCarro:
    print("Pode dirigir!")
elif temCarteira or temCarro:
    print("Tem um dos dois")
else:
    print("Não pode dirigir")`,
      },
      {
        type: "text",
        text: "Observe que Python usa indentação (espaços) para definir blocos de código — diferente de outras linguagens que usam chaves `{}`. Sempre use 4 espaços (ou 1 tab) para cada nível de indentação.",
      },
    ],
  },

  // ── MODERADO ───────────────────────────────────────────────────────────────
  {
    id: "js-01",
    level: "moderado",
    title: "Funções e Arrow Functions",
    description:
      "Domine a declaração de funções, closures, arrow functions e callbacks em JavaScript moderno.",
    language: "JavaScript",
    duration: "25 min",
    content: [
      {
        type: "text",
        text: "Funções são blocos de código reutilizáveis que executam uma tarefa específica. São o bloco de construção fundamental de qualquer aplicação JavaScript — entender funções bem é entender JavaScript bem.",
      },
      {
        type: "heading",
        text: "Declarações de função",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Function declaration (sofre hoisting)
function saudar(nome) {
  return \`Olá, \${nome}! Bem-vindo.\`;
}

// Function expression
const calcularArea = function(largura, altura) {
  return largura * altura;
};

// Arrow function (ES6+)
const quadrado = (n) => n * n;
const soma = (a, b) => a + b;

console.log(saudar("Marina"));      // Olá, Marina! Bem-vindo.
console.log(calcularArea(5, 3));   // 15
console.log(quadrado(7));          // 49`,
      },
      {
        type: "heading",
        text: "Parâmetros padrão e rest",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Parâmetro padrão
function conectar(host, porta = 3000) {
  return \`Conectando em \${host}:\${porta}\`;
}

console.log(conectar("localhost"));        // localhost:3000
console.log(conectar("api.server.com", 8080)); // api.server.com:8080

// Rest parameters (...args)
const somar = (...numeros) => numeros.reduce((acc, n) => acc + n, 0);

console.log(somar(1, 2, 3));       // 6
console.log(somar(10, 20, 30, 40)); // 100`,
      },
      {
        type: "heading",
        text: "Callbacks e Higher-Order Functions",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Funções que recebem outras funções como argumento
function executarDuasVezes(fn, valor) {
  return fn(fn(valor));
}

const dobrar = (x) => x * 2;
console.log(executarDuasVezes(dobrar, 3)); // 12 (3→6→12)

// Uso real com setTimeout
function agendarMensagem(msg, delay) {
  setTimeout(() => {
    console.log(\`[\${new Date().toLocaleTimeString()}] \${msg}\`);
  }, delay);
}

agendarMensagem("Tarefa concluída!", 1000); // Após 1 segundo`,
      },
      {
        type: "text",
        text: "Arrow functions têm uma diferença crucial das funções normais: elas não têm seu próprio `this`. Isso as torna perfeitas para callbacks e métodos de array, mas inadequadas como métodos de objeto quando você precisa de `this`.",
      },
    ],
  },
  {
    id: "js-02",
    level: "moderado",
    title: "Arrays e Métodos Funcionais",
    description:
      "Explore map, filter, reduce e outros métodos poderosos para transformar e analisar coleções de dados.",
    language: "JavaScript",
    duration: "30 min",
    content: [
      {
        type: "text",
        text: "Arrays são listas ordenadas de valores. JavaScript oferece métodos funcionais que permitem transformar arrays de forma elegante e imutável — sem modificar o array original.",
      },
      {
        type: "heading",
        text: "map — transformar cada elemento",
      },
      {
        type: "code",
        language: "javascript",
        code: `const precos = [29.9, 49.9, 15.0, 89.9];

// Aplicar 10% de desconto em todos
const comDesconto = precos.map(preco => preco * 0.9);
console.log(comDesconto); // [26.91, 44.91, 13.5, 80.91]

// Transformar objetos
const usuarios = [
  { nome: "Ana", idade: 28 },
  { nome: "Bruno", idade: 22 },
  { nome: "Carla", idade: 35 },
];

const nomes = usuarios.map(u => u.nome);
console.log(nomes); // ["Ana", "Bruno", "Carla"]`,
      },
      {
        type: "heading",
        text: "filter — selecionar elementos",
      },
      {
        type: "code",
        language: "javascript",
        code: `const produtos = [
  { nome: "Notebook", preco: 3500, estoque: 5 },
  { nome: "Mouse",    preco: 89,   estoque: 0 },
  { nome: "Teclado",  preco: 249,  estoque: 12 },
  { nome: "Monitor",  preco: 1200, estoque: 3 },
];

// Apenas produtos em estoque
const disponiveis = produtos.filter(p => p.estoque > 0);

// Produtos baratos disponíveis
const baratos = produtos.filter(p => p.preco < 500 && p.estoque > 0);
console.log(baratos); // Mouse e Teclado (mas Mouse sem estoque...)`,
      },
      {
        type: "heading",
        text: "reduce — acumular em um valor",
      },
      {
        type: "code",
        language: "javascript",
        code: `const vendas = [120, 340, 89, 456, 230];

// Total das vendas
const total = vendas.reduce((acumulador, venda) => acumulador + venda, 0);
console.log(total); // 1235

// Agrupar por categoria
const itens = [
  { categoria: "frutas", nome: "maçã" },
  { categoria: "legumes", nome: "cenoura" },
  { categoria: "frutas", nome: "banana" },
];

const agrupado = itens.reduce((acc, item) => {
  if (!acc[item.categoria]) acc[item.categoria] = [];
  acc[item.categoria].push(item.nome);
  return acc;
}, {});

console.log(agrupado);
// { frutas: ["maçã", "banana"], legumes: ["cenoura"] }`,
      },
      {
        type: "text",
        text: "Encadeie esses métodos para criar pipelines de transformação: `produtos.filter(ativo).map(formatar).reduce(totalizar)`. Cada método retorna um novo array — os dados originais nunca são modificados.",
      },
    ],
  },
  {
    id: "js-03",
    level: "moderado",
    title: "Promises e Async/Await",
    description:
      "Domine programação assíncrona em JavaScript: Promises, fetch API e o padrão async/await para código legível.",
    language: "JavaScript",
    duration: "35 min",
    content: [
      {
        type: "text",
        text: "JavaScript é single-threaded, mas operações como chamadas de rede, leitura de arquivos e timers são assíncronas — elas não bloqueiam o restante do código enquanto esperam.",
      },
      {
        type: "heading",
        text: "Promises",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Uma Promise representa um valor futuro
const buscarDados = new Promise((resolve, reject) => {
  setTimeout(() => {
    const sucesso = true;
    if (sucesso) {
      resolve({ usuario: "Ana", pontos: 1500 });
    } else {
      reject(new Error("Falha na conexão"));
    }
  }, 1000);
});

buscarDados
  .then(dados => console.log("Dados:", dados))
  .catch(err => console.error("Erro:", err.message))
  .finally(() => console.log("Requisição finalizada"));`,
      },
      {
        type: "heading",
        text: "Async/Await — código assíncrono legível",
      },
      {
        type: "code",
        language: "javascript",
        code: `// async/await é "açúcar sintático" para Promises
async function buscarUsuario(id) {
  try {
    const resposta = await fetch(\`https://api.exemplo.com/users/\${id}\`);
    
    if (!resposta.ok) {
      throw new Error(\`Erro HTTP: \${resposta.status}\`);
    }
    
    const usuario = await resposta.json();
    return usuario;
  } catch (erro) {
    console.error("Falha ao buscar usuário:", erro.message);
    return null;
  }
}

// Usando a função
const usuario = await buscarUsuario(42);
if (usuario) {
  console.log(\`Bem-vindo, \${usuario.nome}!\`);
}`,
      },
      {
        type: "heading",
        text: "Executando em paralelo com Promise.all",
      },
      {
        type: "code",
        language: "javascript",
        code: `async function carregarDashboard(userId) {
  // Em SEQUÊNCIA (lento: espera um por um)
  // const perfil = await buscarPerfil(userId);
  // const posts  = await buscarPosts(userId);

  // Em PARALELO (rápido: ambos ao mesmo tempo)
  const [perfil, posts] = await Promise.all([
    buscarPerfil(userId),
    buscarPosts(userId),
  ]);

  return { perfil, posts };
}

// Promise.allSettled — continua mesmo se um falhar
const resultados = await Promise.allSettled([
  fetch("/api/dados-criticos"),
  fetch("/api/dados-opcionais"),
]);

resultados.forEach(r => {
  if (r.status === "fulfilled") console.log("OK:", r.value);
  else console.warn("Falhou:", r.reason);
});`,
      },
      {
        type: "text",
        text: "Regra prática: sempre use try/catch em funções async para tratar erros. Nunca deixe uma Promise sem tratamento de erro — erros não capturados podem crashar sua aplicação silenciosamente.",
      },
    ],
  },

  // ── EXPERIENTE ─────────────────────────────────────────────────────────────
  {
    id: "ts-01",
    level: "experiente",
    title: "TypeScript: Tipos e Interfaces",
    description:
      "Implemente tipagem estática robusta com TypeScript: tipos primitivos, interfaces, generics e utility types.",
    language: "TypeScript",
    duration: "35 min",
    content: [
      {
        type: "text",
        text: "TypeScript adiciona tipagem estática ao JavaScript, capturando erros em tempo de compilação — antes do código rodar. Isso resulta em código mais seguro, autocomplete melhor e refatorações mais seguras.",
      },
      {
        type: "heading",
        text: "Tipos básicos e Union Types",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Tipagem explícita
let nome: string = "Rafael";
let idade: number = 30;
let ativo: boolean = true;
let dados: unknown = null; // Tipo mais seguro que 'any'

// Union Types — pode ser um OU outro
type Status = "pendente" | "processando" | "concluído" | "erro";
let statusPedido: Status = "processando";

// Arrays tipados
const notas: number[] = [9.5, 8.2, 7.8];
const tags: Array<string> = ["ts", "nodejs", "react"];

// Tuple — array com tipos fixos por posição
const coordenada: [number, number] = [-23.5505, -46.6333];`,
      },
      {
        type: "heading",
        text: "Interfaces e Types",
      },
      {
        type: "code",
        language: "typescript",
        code: `interface Usuario {
  id: number;
  nome: string;
  email: string;
  avatar?: string; // Propriedade opcional
  readonly criadoEm: Date; // Só leitura
}

// Extensão de interface
interface Admin extends Usuario {
  permissoes: string[];
  nivelAcesso: 1 | 2 | 3;
}

// Type alias com intersecção
type Auditavel = {
  criadoPor: string;
  atualizadoEm: Date;
};

type Produto = {
  id: string;
  nome: string;
  preco: number;
} & Auditavel;

const produto: Produto = {
  id: "p-001",
  nome: "Notebook Pro",
  preco: 4500,
  criadoPor: "admin",
  atualizadoEm: new Date(),
};`,
      },
      {
        type: "heading",
        text: "Generics — código reutilizável com tipos",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Função genérica — funciona com qualquer tipo
function primeiroElemento<T>(array: T[]): T | undefined {
  return array[0];
}

const num = primeiroElemento([1, 2, 3]);    // tipo: number
const str = primeiroElemento(["a", "b"]);   // tipo: string

// Interface genérica para respostas de API
interface ApiResponse<T> {
  data: T;
  status: number;
  mensagem: string;
  timestamp: string;
}

type RespostaUsuario = ApiResponse<Usuario>;
type RespostaLista<T> = ApiResponse<T[]> & { total: number };

// Utility Types nativos do TypeScript
type UsuarioParcial = Partial<Usuario>;    // Todas opcionais
type UsuarioSoLeitura = Readonly<Usuario>; // Todas readonly
type SemId = Omit<Usuario, "id">;          // Remove 'id'
type ApenasNome = Pick<Usuario, "nome" | "email">; // Apenas esses`,
      },
      {
        type: "text",
        text: "Use `interface` para contratos de objetos que podem ser estendidos e `type` para unions, intersecções e aliases complexos. Generics são poderosos mas não os force — se um tipo específico funciona, use-o.",
      },
    ],
  },
  {
    id: "algo-01",
    level: "experiente",
    title: "Algoritmos de Ordenação",
    description:
      "Implemente e compare Bubble Sort, Merge Sort e Quick Sort — entenda complexidade Big O na prática.",
    language: "TypeScript",
    duration: "45 min",
    content: [
      {
        type: "text",
        text: "Algoritmos de ordenação são fundamentais em ciência da computação. A escolha do algoritmo certo pode fazer a diferença entre um programa que ordena 1 milhão de itens em milissegundos ou em minutos.",
      },
      {
        type: "heading",
        text: "Bubble Sort — O(n²)",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Simples mas ineficiente para grandes conjuntos
function bubbleSort(arr: number[]): number[] {
  const lista = [...arr]; // Não modifica o original
  const n = lista.length;

  for (let i = 0; i < n - 1; i++) {
    let trocou = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (lista[j] > lista[j + 1]) {
        [lista[j], lista[j + 1]] = [lista[j + 1], lista[j]]; // Destructuring swap
        trocou = true;
      }
    }
    if (!trocou) break; // Otimização: já ordenado
  }

  return lista;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// [11, 12, 22, 25, 34, 64, 90]`,
      },
      {
        type: "heading",
        text: "Merge Sort — O(n log n)",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Divide e conquista — estável e eficiente
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const meio = Math.floor(arr.length / 2);
  const esquerda = mergeSort(arr.slice(0, meio));
  const direita  = mergeSort(arr.slice(meio));

  return merge(esquerda, direita);
}

function merge(esq: number[], dir: number[]): number[] {
  const resultado: number[] = [];
  let i = 0, j = 0;

  while (i < esq.length && j < dir.length) {
    if (esq[i] <= dir[j]) {
      resultado.push(esq[i++]);
    } else {
      resultado.push(dir[j++]);
    }
  }

  return [...resultado, ...esq.slice(i), ...dir.slice(j)];
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]`,
      },
      {
        type: "heading",
        text: "Comparação de complexidade",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Comparativo de desempenho
const dados = Array.from({ length: 10_000 }, () =>
  Math.floor(Math.random() * 100_000)
);

console.time("Bubble Sort");
bubbleSort([...dados]);
console.timeEnd("Bubble Sort"); // ~500ms

console.time("Merge Sort");
mergeSort([...dados]);
console.timeEnd("Merge Sort");  // ~5ms

console.time("Native Sort");
[...dados].sort((a, b) => a - b);
console.timeEnd("Native Sort"); // ~2ms (Timsort: O(n log n))

/*
  Complexidades:
  Bubble Sort:  O(n²) tempo   | O(1) espaço
  Merge Sort:   O(n log n)    | O(n) espaço
  Quick Sort:   O(n log n)*   | O(log n) espaço
  Native .sort: O(n log n)    | Timsort otimizado
*/`,
      },
      {
        type: "text",
        text: "Para produção, use sempre o `.sort()` nativo — ele usa Timsort, que é altamente otimizado. Implemente esses algoritmos para entender os conceitos, não para substituir as soluções prontas.",
      },
    ],
  },
  {
    id: "algo-02",
    level: "experiente",
    title: "Estruturas de Dados",
    description:
      "Implemente pilhas, filas e árvores binárias em TypeScript — a base para resolver problemas complexos de forma eficiente.",
    language: "TypeScript",
    duration: "50 min",
    content: [
      {
        type: "text",
        text: "Estruturas de dados organizam informações de forma que operações específicas sejam eficientes. Escolher a estrutura certa pode transformar um algoritmo O(n²) em O(log n).",
      },
      {
        type: "heading",
        text: "Pilha (Stack) — LIFO",
      },
      {
        type: "code",
        language: "typescript",
        code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Uso real: verificar parênteses balanceados
function balanceado(expr: string): boolean {
  const pilha = new Stack<string>();
  const pares: Record<string, string> = { ")": "(", "]": "[", "}": "{" };

  for (const char of expr) {
    if ("([{".includes(char)) pilha.push(char);
    else if (")}]".includes(char)) {
      if (pilha.pop() !== pares[char]) return false;
    }
  }

  return pilha.isEmpty();
}

console.log(balanceado("({[]})"));  // true
console.log(balanceado("([)]"));    // false`,
      },
      {
        type: "heading",
        text: "Fila (Queue) — FIFO",
      },
      {
        type: "code",
        language: "typescript",
        code: `class Queue<T> {
  private items: Map<number, T> = new Map();
  private head = 0;
  private tail = 0;

  enqueue(item: T): void {
    this.items.set(this.tail++, item);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items.get(this.head)!;
    this.items.delete(this.head++);
    return item;
  }

  get size(): number {
    return this.tail - this.head;
  }

  isEmpty(): boolean {
    return this.head === this.tail;
  }
}

// O(1) para enqueue e dequeue — melhor que array!`,
      },
      {
        type: "heading",
        text: "Árvore Binária de Busca (BST)",
      },
      {
        type: "code",
        language: "typescript",
        code: `interface No<T> {
  valor: T;
  esquerda: No<T> | null;
  direita: No<T> | null;
}

class BST {
  private raiz: No<number> | null = null;

  inserir(valor: number): void {
    this.raiz = this._inserir(this.raiz, valor);
  }

  private _inserir(no: No<number> | null, valor: number): No<number> {
    if (!no) return { valor, esquerda: null, direita: null };
    if (valor < no.valor) no.esquerda = this._inserir(no.esquerda, valor);
    else if (valor > no.valor) no.direita = this._inserir(no.direita, valor);
    return no;
  }

  buscar(valor: number): boolean {
    let atual = this.raiz;
    while (atual) {
      if (valor === atual.valor) return true;
      atual = valor < atual.valor ? atual.esquerda : atual.direita;
    }
    return false;
  }

  // In-order traversal retorna elementos ordenados!
  emOrdem(): number[] {
    const resultado: number[] = [];
    const percorrer = (no: No<number> | null) => {
      if (!no) return;
      percorrer(no.esquerda);
      resultado.push(no.valor);
      percorrer(no.direita);
    };
    percorrer(this.raiz);
    return resultado;
  }
}

const arvore = new BST();
[5, 3, 7, 1, 4, 6, 8].forEach(v => arvore.inserir(v));
console.log(arvore.emOrdem()); // [1, 3, 4, 5, 6, 7, 8]
console.log(arvore.buscar(4)); // true — O(log n)`,
      },
      {
        type: "text",
        text: "A BST tem O(log n) para busca, inserção e deleção em média — mas O(n) no pior caso (árvore desbalanceada). Árvores auto-balanceadas como AVL e Red-Black garantem O(log n) sempre.",
      },
    ],
  },
];

export const LEVEL_META = {
  iniciante: {
    label: "Iniciante",
    emoji: "🌱",
    description:
      "Primeiros passos em programação com Python. Conceitos fundamentais explicados com clareza.",
    color: "iniciante",
    lessons: LESSONS.filter((l) => l.level === "iniciante"),
  },
  moderado: {
    label: "Moderado",
    emoji: "⚡",
    description:
      "JavaScript moderno com funções, arrays e programação assíncrona para devs em crescimento.",
    color: "moderado",
    lessons: LESSONS.filter((l) => l.level === "moderado"),
  },
  experiente: {
    label: "Experiente",
    emoji: "🚀",
    description:
      "TypeScript avançado, algoritmos e estruturas de dados para programadores sênior.",
    color: "experiente",
    lessons: LESSONS.filter((l) => l.level === "experiente"),
  },
} as const;
