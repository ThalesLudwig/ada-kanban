# Ada Kanban

Frontend do projeto de desafio proposto pela empresa Ada Tech, seguindo as [instruções propostas](https://gitlab.com/gabriel.militello1/desafio-tecnico).

## Comandos
Iniciar o servidor de desenvolvimento: `npm run dev` \
Rodar tests: `npm run test`

## Considerações
- Inicialmente eu havia escolhido desenvolver o projeto utilizando Next.js, porém o mesmo me pareceu desnecessariamente robusto para um projeto tão simples como esse. Acabei optando pelo Vite, que geraria somente o necessário, sem código boilerplate.
- Com o uso do Vite também vieram algumas incompatibilidades, como o Jest. Apesar de ser possível - com certo trabalho - fazer essa integração funcionar, acabei optando por utilizar a biblioteca Vitest no lugar no Jest. O Vitest é um framework de testes Jest-friendly feito especialmente para o Vite.
- Normalmente eu usaria algum framework de CSS, como MUI (ou Paper, no caso de React Native), mas visto que este projeto tem o propósito de demonstrar minhas habilidades, achei mais justo escrever meu próprio CSS. Utilizei Styled-components para esse projeto, mas também costumo usar um CSS-in-JS mais puro.
- As intruções são bem claras quanto a ser permitida somente uma tela (também evitei modais) e que as edições devem ser feitas diretamente no próprio cartão. Isso torna a usabilidade bastante complicada, já que o cartão em si é compacto, então permiti que o usuário ao menos possa expandir a área de texto. Se me fosse dada mais liberdade, eu teria adicionado ou outra tela ou uma modal grande para visualização completa e edição das informações.
- Não acho uma boa prática que os identificadores das colunas sejam "ToDo", "Doing", e "Done", pois o uso de Pascal Case em identificadores pode gerar inconsistências. Que fosse "todo", ou um ID como "1". Mesmo assim, segui com o proposto.
- Me mantive nas regras de Lint básicas e recomendadas.
- Tomei a liberdade de adicionar algumas coisas no projeto:
    - **Drag and Drop**: qualquer kanban precisa permitir que o usuário arraste e solte os cartões entre as colunas, e por isso eu adicionei essa funcionalidade. As instruções também pedem que sejam adicionadas setas de movimentação nos cartões, então eu as coloquei, mesmo que se tornem irrelevantes.
    - **Tema**: adicionei um botão para trocar entre um tema claro e escuro, porque a claridade machucava meus olhos enquanto programava à noite.

## Bibliotecas utilizadas
- **redux**: Usei para armazenar o token de autenticação e o tema.
- **redux-persist**: Necessário para persistir o estado do Redux entre sessões.
- **jwt-decode**: Usei para decodificar o token de autenticação e verificar se o mesmo é valido e não expirou.
- **react-dnd**: Usei para a funcionalidade de drag and drop dos cartões.
- **react-icons**: Biblioteca de ícones. Optei pelo Feather Icons por preferência pessoal.
- **react-loading-spinner**: Usei para exibir um spinner de carregamento durante as requições. É bonito, e chega a ser uma pena que as coisas acontecem tão rápido que o usuário nem consegue vê-lo.
- **react-markdown**: Necessário para que o cartão aceite Markdown na descrição.
- **react-toastify**: Usei para exibir um toast de notificação quando algum erro acontece. Com sorte, você nunca vai vê-lo.
- **react-testing-library**: Usei para testar os componentes React.
- **styled-components**: Usei para auxiliar durante o desenvolvimento do CSS, e principalmente pelas habilidades de tematização.
