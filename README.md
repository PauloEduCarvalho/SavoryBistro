# SavoryBistro
## Descrição
O SavoryBistro é uma aplicação desenvolvida para facilitar a administração de um restaurante, oferecendo funcionalidades para gerenciar pratos, pedidos e clientes de forma eficiente. O sistema permite operações CRUD para pratos e pedidos, além de gerenciar comunicação entre clientes e o sistema de pedidos.

## Casos de usos
 - RF01: O admin que acessar o sistema pode cadastrar novos pratos ao menu.
 - RF02: Um admin acessando o sistema pode alterar as informações de pratos já cadastrados.
 - RF03: Um admin acessando o sistema pode consultar as informações de pratos já cadastrados.
 - RF04: Um admin acessando o sistema pode excluir pratos já cadastrados.
 - RF05: O usuário que acessar o sistema pode cadastrar novos pedidos.
 - RF06: Um admin acessando o sistema pode alterar as informações de pedidos já cadastrados.
 - RF07: Um admin acessando o sistema pode consultar as informações de pedidos já cadastrados.
 - RF08: Um admin acessando o sistema pode excluir pedidos já cadastrados.
 - RF09: O admin que acessar o sistema pode cadastrar novos clientes.
 - RF10: Um admin acessando o sistema pode consultar as informações de clientes já cadastrados.
 - RF11: Um admin acessando o sistema pode alterar as informações de clientes já cadastrados.
 - RF12: Um admin acessando o sistema pode excluir clientes já cadastrados.
 - RF13: Um funcionário/gerente que deseja ver a quantidade de pedidos feitos em um dia.
 - RF14: Um usuário acessando o sistema pode fazer login no sistema com nome e senha.
 - RF15: Um usuário acessando o sistema pode fazer um cadastro no sistema.
 - RFN01: O sistema deve ser responsivo
 - RFN02: O sistema deve ser feito de uma maneira que garanta manutenibilidade.
 - RFN03: O relatório deve ser gerado em até 5 segundos.
 - RFN04: O sistema deve ter diferentes níveis de acesso entre cliente e admin
 
## Tecnologias Utilizadas 
- JavaScript (a versão depende do ambiente de execução, normalmente suportada pela versão node apresentada abaixo)
- HTML5
- CSS3 
- React v13.4.0
- Node.js v20.12.1
- PostgreSQL v16.4.1

# Estrutura do Projeto

Esta seção descreve a estrutura de pastas do projeto.

## Estrutura de Pastas

```markdown
/savory-bistro
server/
│
├── model/
│   ├── userSchema.js
│   ├── dishSchema.js
│   └── orderSchema.js
│
├── postgres/
│   └── postgres.js
│
├── controller/
│   ├── userController.js
│   ├── dishController.js
│   └── orderController.js
│
├── view/
│   └── routes.js
│   package.json          # Gerenciador de pacotes e scripts
└── index.js              # Ponto principal de entrada do sistema
│
├── /padroesadotados     # Documentação e padrões de requisitos adotados
│
├── /requisitos          # Documentos de requisitos do projeto
│

└── README.md            # Documentação do projetoção do projeto
```

## Regras de Uso do Git em Projetos

### Estratégia de Branches e Convenções de Commit

#### Branches

- **Branch de Desenvolvimento**: Trabalhe em novas funcionalidades e correções na branch `desenvolvimento`.
- **Branch Principal (`main`)**: No fim de cada sprint, faça o merge das mudanças da branch `desenvolvimento` para a branch `main` e execute a release.

#### Convenções de Commit

Antes de fazer um commit, use os seguintes prefixos para categorizar o tipo de mudança:

- `feat`: Para novas funcionalidades (ex: `feat: adiciona sistema de login`)
- `fix`: Para correções de bugs (ex: `fix: corrige erro na validação de formulário`)
- `docs`: Para atualizações na documentação (ex: `docs: atualiza guia de instalação`)
- `test`: Para adição ou modificação de testes (ex: `test: adiciona testes de integração`)

### Merge e Pull Requests

- **Revisão de Código**: Todos os pull requests devem ser revisados antes de serem aprovados.
- **Merge Conflicts**: Resolva conflitos de merge de forma cuidadosa para garantir que as alterações sejam integradas corretamente.

## Documentação

- **README**: Mantenha um arquivo `README.md` atualizado com informações sobre o projeto.

### Segurança e Acesso

- **Contfuncao de Acesso**: Defina permissões adequadas para quem pode acessar e modificar o repositório.

# Boas Práticas de Codificação

Para garantir a legibilidade, manutenção e qualidade do código, siga as seguintes boas práticas:

## 1. **Padrão de Notação de Código**

- **Consistência**: Adote um padrão de notação consistente em todo o projeto. Utilize ferramentas de formatação automática, como Prettier para JavaScript ou Black para Python, para manter a uniformidade do código.
- **Nomenclatura**: Use nomes de variáveis, funções e classes que sejam descritivos e sigam uma convenção padrão, como camelCase para variáveis e funções, e PascalCase para classes.

## 2. **Comentários e Documentação**

- **Comentários Claros e Úteis**: Comente o código apenas quando necessário para esclarecer a lógica complexa ou as intenções do código. Evite comentários óbvios que apenas repetem o que o código já está fazendo.
- **Documentação**: Mantenha a documentação atualizada, incluindo um arquivo `README.md` que descreva a finalidade do projeto, como configurar e usar, e qualquer outra informação relevante. 

## 3. **Princípios de Clean Code**

- **Legibilidade**: O código deve ser escrito de forma que seja facilmente compreendido por outros desenvolvedores. Utilize nomes descritivos e evite técnicas complexas desnecessárias.
- **Funções Pequenas e Simples**: Mantenha as funções pequenas e com uma única responsabilidade. Isso facilita a compreensão e a reutilização do código.


## Colaboradores
- Camily Gonçalves de Bem
- Paulo Eduardo Pereira Carvalho
- Pedro Henrique Cabral Moreira
