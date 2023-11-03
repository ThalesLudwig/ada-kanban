# Ada Kanban

Backend do projeto de desafio proposto pela empresa Ada Tech, seguindo as [instruções propostas](https://gitlab.com/gabriel.militello1/desafio-tecnico).

## Iniciando
(esta parte não é necessária se estiver rodando através do Docker)
- Renomear o arquivo .env.example para .env
- O frontend espera o usuário "letscode" e senha "lets@123"

## Comandos
Iniciar o servidor de desenvolvimento: `npm run dev` \
Rodar tests: `npm run test`

## Considerações
- Para a construção dessa API eu utilizei Express, como foi exigido pelas instruções, mas hoje existem alternativas muito boas para esse tipo de trabalho, como o Restify.
- Apesar de não existir nenhuma regra para isso na documentação do protocolo REST, ao fazer uma requisição do tipo DELETE eu normalmente prefiro retornar o elemento que foi removido ao invés da lista restante, como foi exigido. Isso é puramente minha preferência pessoal.
- Os atributos do cartão são nomeados como "titulo", "descricao", e "lista", porém eu acredito que seja uma boa prática sempre deixar os nomes de variáveis e atributos em inglês. Como as instruções foram bem claras quanto a estes nomes, mantive-os em português.
- Contra a minha vontade, acabei deixando precisamente 7 "any" como tipagem, prática que eu jamais recomendo e normalmente não tolero. Porém, nesse caso, parece que a biblioteca Sequelize não lida bem com tipagens - isso é descrito na própria [documentação oficial](https://sequelize.org/docs/v6/other-topics/typescript/). Com mais tempo eu certamente poderia criar alguma tipagem que atendesse os critérios, mas tempo era algo que eu não tinha de sobra.
- Para persistência de dados, utilizei a solução proposta de SQLite e Sequelize.

## Bibliotecas utilizadas
- **cors**: Usado para garantir que o frontend e a API consigam se comunicar em endereços diferentes.
- **date-fns**: Usei para a formatação da data exibida no log das requisições de PUT e DELETE, como exigido pelas instruções.
- **dotenv**: Usado para leitura das variáveis de ambiente.
- **helmet**: Aplica headers de segurança básicos para todas as requisições.
- **jsonwebtoken**: Usei para manipular o token JWT.
- **morgan**: Usado para criação e manipulação de logs, o que me permitiu criar facilmente o middleware Logger.
- **sqlite3**: Motor do SQLite, para persistência de dados.
- **sequelize**: ORM para o SQLite.
- **jest**: Framework de testes.
- **supertest**: Biblioteca de testes auxiliar para testes com requisições HTTP.