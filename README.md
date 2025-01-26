# comunica-web

Este repositório é uma aplicação desenvolvida utilizando o framework [Next.js](https://nextjs.org/) e diversas tecnologias modernas para otimizar a experiência do desenvolvedor, garantir um código limpo e funcional e fornecer uma interface responsiva e eficiente.

## Tecnologias Utilizadas

### 1. **[MSW](https://mswjs.io/)**
Utilizado para interceptar requisições HTTP durante os testes unitários. Isso garante que as requisições possam ser simuladas sem a necessidade de interação com servidores reais, permitindo testes mais rápidos e controlados.

### 2. **[@tanstack/react-query](https://tanstack.com/query/latest)**
Empregado para gerenciar o estado de cache HTTP das requisições, possibilitando:
- **Optimistic Updates**: Atualizações e remoções de usuários são realizadas de forma otimista, atualizando a interface do usuário instantaneamente antes mesmo da confirmação do servidor, proporcionando uma experiência mais ágil.
- Cache eficiente: Evita chamadas desnecessárias ao servidor, melhorando o desempenho.

### 3. **[@tanstack/react-table](https://tanstack.com/table/latest)**
Responsável pela criação de tabelas dinâmicas e altamente customizáveis, oferecendo uma exibição clara e organizada dos dados da aplicação.

### 4. **Middleware de Validação de Sessão**
Inclui um middleware para verificar se o usuário possui um token válido, garantindo que apenas usuários autenticados possam acessar determinadas áreas ou funcionalidades.

### 5. **[t3-oss/env](https://github.com/t3-oss/t3-env)**
Utilizado para validar as variáveis de ambiente em tempo de execução, reduzindo erros relacionados à configuração incorreta das variáveis.

### 6. **[Zod](https://zod.dev/)**
Biblioteca de validação utilizada para garantir que os dados sejam estruturados corretamente antes de serem processados. Ajuda a prevenir erros e garante integridade dos dados.

### 7. **[React Hook Form](https://react-hook-form.com/)**
Utilizado para gerenciar e validar formulários de maneira eficiente, oferecendo suporte às melhores práticas de acessibilidade e integração com outras ferramentas de validação, como o Zod.

### 8. **[Lefthook](https://github.com/evilmartians/lefthook)**
Adiciona hooks para validação de commits e padronização de código, garantindo consistência no repositório e prevenindo códigos mal formatados ou fora do padrão.

### 9. **[Vitest](https://vitest.dev/)**
Framework de testes unitários utilizado para garantir a qualidade do código e prevenir regressões durante o desenvolvimento.

### 10. **[Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**
Uma biblioteca leve para gerenciamento de estado, utilizada para contextos globais na aplicação de forma simples e eficiente.

### 10. Github Actions 
Adicionei um `workflow` para executar os testes na branch principal a cada commit.

## Estrutura do Projeto

- **`public/`**: Arquivos públicos como imagens e recursos estáticos.
- **`src/`**: Contém o código-fonte principal da aplicação, incluindo:
  - **Componentes:** Componentes reutilizáveis.
  - **Páginas:** Arquivos de rotas do Next.js.
  - **Contextos:** Gerenciamento de estado utilizando Zustand.
- **`test/`**: Testes unitários utilizando Vitest.

## Como Executar
> Crie um arquivo `.env` e copie as informações para o `.env.example`, não altere o `JWT_SECRET` para testar!

> Não esqueça de rodar o servidor. Você pode cloná-lo clicando [aqui](https://github.com/l-fernandocosta/express-comunica-web-service) 
1. Clone o repositório:
   ```bash
   git clone https://github.com/l-fernandocosta/comunica-web.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Scripts Disponíveis

- **`dev`**: Inicia o servidor de desenvolvimento.
- **`build`**: Gera a aplicação para produção.
- **`test`**: Executa os testes unitários com Vitest.
- **`lint`**: Verifica erros de lint no código.


