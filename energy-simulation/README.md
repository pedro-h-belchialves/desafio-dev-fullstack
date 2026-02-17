## Desafio

A Energy Simulation Platform é uma aplicação completa para simulação energética, composta por uma API backend e uma aplicação web frontend. O projeto foi desenvolvido com foco em arquitetura escalável, boas práticas de engenharia de software, organização estrutural e experiência do usuário. Toda a aplicação é containerizada utilizando Docker, garantindo ambiente padronizado, reprodutibilidade e facilidade de execução.

## Para iniciar o projeto

Para iniciar o projeto, é necessário primeiro criar os arquivos de configuração de ambiente. Na pasta da API deve ser criado um arquivo .env contendo as variáveis de conexão com o banco de dados PostgreSQL, a porta da aplicação e a URL do serviço externo utilizado para processamento de PDF. É importante que a variável de conexão com o banco utilize como host o nome do serviço definido no Docker, e não localhost, pois a comunicação ocorre dentro da rede interna dos containers.

Na pasta do frontend deve ser criado um arquivo .env.local contendo as variáveis de URL da API. Uma variável é utilizada para chamadas realizadas pelo navegador e deve apontar para localhost, enquanto a outra é utilizada internamente pelo servidor do Next.js e deve apontar para o nome do serviço da API na rede Docker.

Após a criação dos arquivos de ambiente, é necessário garantir que Docker e Docker Compose estejam instalados na máquina. Com isso validado, basta executar o comando de inicialização do Docker Compose (docker compose up -d) na raiz do projeto. Esse processo irá criar automaticamente o container do banco de dados PostgreSQL, buildar e iniciar a API, buildar e iniciar o frontend, além de configurar a rede interna que permite a comunicação entre os serviços.

Com o ambiente em execução, o frontend estará disponível na porta 3000 e a API na porta 5500, ambos acessíveis via localhost.

## Sobre a API

A API foi desenvolvida utilizando Node.js com TypeScript e estruturada com base em Clean Architecture, aplicando princípios SOLID e conceitos de Domain Driven Design. A organização do código é dividida em camadas bem definidas, separando domínio, aplicação, infraestrutura e apresentação. Essa abordagem garante baixo acoplamento, alta testabilidade e facilidade de manutenção e evolução do sistema.

No domínio da aplicação existem três principais elementos conceituais: Consumo, Unidade e Lead. Consumo é modelado como um Value Object, pois não possui identidade própria e existe apenas como parte de uma Unidade. Unidade e Lead são entidades, pois possuem identidade única. O Lead é definido como Aggregate Root do domínio, sendo responsável por controlar a consistência e a persistência das demais estruturas relacionadas. Por esse motivo, apenas o Lead possui repositório, centralizando a manipulação de dados e respeitando as regras de agregação do DDD.

A persistência é realizada com Prisma ORM integrado ao PostgreSQL. A escolha do Prisma proporciona tipagem forte, migrations versionadas, maior produtividade e integração eficiente com TypeScript. As rotas da API foram implementadas com Fastify, escolhido por sua alta performance, baixo overhead e excelente suporte a tipagem. Para testes automatizados foi utilizado o Vitest, garantindo cobertura das regras de negócio, validações críticas e casos de uso principais.

## Sobre o Front

O frontend foi desenvolvido utilizando Next.js com App Router e TypeScript. A arquitetura prioriza componentização, reutilização e separação clara de responsabilidades. Componentes globais reutilizáveis ficam organizados na pasta components, enquanto componentes específicos de cada página ficam organizados dentro de uma pasta \_components em cada rota. Essa estrutura evita acoplamento desnecessário e melhora a organização do código.

Toda a comunicação com a API é realizada a partir do servidor utilizando Server Actions, garantindo maior segurança, melhor controle de fluxo e evitando exposição de lógica sensível no client. Essa abordagem também favorece performance e integração com os mecanismos de cache e renderização do Next.js.

O design da interface foi desenvolvido seguindo princípios modernos de UI e UX, incluindo a regra 60/30/10 para distribuição de cores, garantindo hierarquia visual equilibrada e foco adequado nas ações principais. Todas as cores do sistema são centralizadas em variáveis globais, facilitando manutenção e evolução visual da aplicação. Essa padronização permite alterar temas e estilos de maneira simples e segura.

A infraestrutura do projeto é totalmente baseada em Docker. Os containers de banco de dados, API e frontend são conectados por uma rede interna dedicada, permitindo comunicação segura e isolada. Essa abordagem assegura consistência entre ambientes de desenvolvimento e produção, além de simplificar o processo de setup e execução.

O projeto foi construído com foco em qualidade de código, arquitetura limpa, escalabilidade e experiência profissional tanto no backend quanto no frontend. A combinação de boas práticas de engenharia, organização estrutural e decisões técnicas modernas resulta em uma aplicação sólida, manutenível e preparada para evolução contínua.
