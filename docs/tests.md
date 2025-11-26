# Teste de Software

| **Caso de Teste** | **CT01 – Criação de Salas parte 1** |
| :--------------: | ------------ |
| **Procedimento** | 1) Digite npm install no terminal <br> 2) Digite npm run dev no terminal <br> 3) Acesse o endereço http://localhost:3000 <br> 4) Clique na opção "Vamos Começar" no menu de navegação <br> 5) Clique em “Criar Sala” <br> 6) Selecione as Opções possíveis" <br> 5) Clique em “Criar Sala” |
| **Requisitos associados** | RF-001 |
| **Resultado esperado** | Redirecionamento para tela de administrar sala |
| **Resultado obtido** | Sucesso |



| **Caso de Teste** | **CT02 – Criação de Salas parte 2** |
| :--------------: | ------------ |
| **Procedimento** | 1) Verifique se o painel administrativo e exibido com: código da sala, lista de jogadores e botões para iniciar quiz e expulsar jogador <br> 2) Clique em “Iniciar Quiz” <br> 3) Verifique se há opção para Pular Pergunta e Finalizar Partida. <br> 4) Tente iniciar o quiz com menos de dois jogadores (espera-se bloqueio). |
| **Requisitos associados** | RF-005 |
| **Requisitos necessários** | O painel deve funcionar corretamente, respeitando a exigência mínima de 2 jogadores para iniciar o quiz. |
| **Resultado esperado** | O painel administrativo é exibido corretamente com as funcionalidades descritas. O quiz só pode ser iniciado com no mínimo dois jogadores. |
| **Resultado obtido** | Sucesso |



| **Caso de Teste** | **CT03 – Contato Ong** |
| :--------------: | ------------ |
| **Procedimento** | 1) Digite npm install no terminal <br> 2) Digite npm run dev no terminal <br> 3) Acesse o endereço http://localhost:3000 <br> 4) Clique na opção "Contato" no menu de navegação <br> 5) Preencha todos os campos do formulário <br> 6) Clique no botão "Enviar". |
| **Requisitos associados** | RF-003 |
| **Resultado esperado** | Enviar mensagem a equipe GreenIt |
| **Dados de entrada** | Inserção de dados válidos no formulário |
| **Resultado obtido** | Sucesso |



| **Caso de Teste** | **CT04 – Acessar página de artigos** |
| :--------------: | ------------ |
| **Procedimento** | 1) Digite npm install no terminal <br> 2) Digite npm run dev no terminal <br> 3) Acesse o endereço http://localhost:3000 <br> 4) Clique na opção "Artigos" no menu de navegação <br> 5) Na seção "Notícias em alta", clique em uma das notícias exibidas para ser redirecionado à página oficial do artigo <br> 6) Na seção "Últimas Notícias", clique em uma das notícias para ser redirecionado à página oficial correspondente |
| **Requisitos associados** | RF-004 |
| **Resultado esperado** | Redirecionamento correto para as páginas oficiais dos artigos selecionados |
| **Resultado obtido** | Sucesso |



| **Caso de Teste** | **CT05 - Acessar mapa com pontos de descarte** |
| :--------------: | ------------ |
| **Procedimento** | 1) Digite npm install no terminal <br> 2) Digite npm run dev no terminal <br> 3) Acesse o endereço http://localhost:3000 <br> 4) Clique na opção "Pontos de Descarte" no menu de navegação <br> |
| **Requisitos associados** | RF-002 |
| **Resultado esperado** | Carregamento do mapa com os pontos de descarte |
| **Resultado obtido** | Sucesso |



| **Caso de Teste** | **CT06 – Placar Final do Jogo** |
| :--------------: | ------------ |
| **Procedimento** | 1) Digite npm install no terminal <br> 2) Digite npm run dev no terminal <br> 3) Acesse o endereço http://localhost:3000 <br> 4) Clique em "Vamos Comecar" <br> 5) Digite o codigo da sala <br> 6) Espere o jogo iniciar <br> 7) Responda as perguntas <br> 8) Veja o ranking final |
| **Requisitos associados** | RF-006 |
| **Resultado esperado** | Mostrar o ranking com os jogadores com mais pontos |
| **Resultado obtido** | Sucesso |



| **Caso de Teste** | **CT07 – Entrar na Sala de Jogos** |
| :--------------: | ------------ |
| **Procedimento** |1) Digite npm install no terminal <br> 2) Digite npm run dev no terminal <br> 3) Acesse o endereço http://localhost:3000 <br> 4) Clique em "Vamos Comecar" <br> 5) Digite um apelido <br> 6) Selecione um avatar <br> 7) Digite o código da sala <br> 8) Clique em “Entrar” |
| **Requisitos associados** | RF-007 |
| **Resultado esperado** | Entrar na sala onde acontece os jogos |
| **Dados de entrada** | Inserção de apelido e código da sala |
| **Resultado obtido** | Sucesso |

## Registro dos Testes de Software

|*Caso de Teste*                                 |*CT01*                                         |
|---|---|
|Requisito Associado | RF-002 - A aplicação deve mostrar os pontos de descarte de lixo eletrônico próximos do usuário.|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1XwI8SGtyl9LjkC9Up1h1yAAJPeAo3B9Z/view?usp=sharing | 

|*Caso de Teste*                                 |*CT02*                                        |
|---|---|
|Requisito Associado | RF-003 - A aplicação deve possuir um espaço para contato para divulgar campanhas.|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1t46AfwEBWt0MswcCMhdRDgxl4SpNUjMr/view?usp=sharing | 

|*Caso de Teste*                                 |*CT03*                                        |
|---|---|
|Requisito Associado | RF-004 - A aplicação deve possuir um espaço com artigos atuais e notícias sobre sustentabilidade.|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/14GHhxC5S-siQC053aDUwn9vnft5sLtmM/view?usp=sharing | 



## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja ver notícias sobre reciclagem e vê que há boas fontes de notícia no site. |
| 2             | Você é um(a) professor(a) pensando em criar atividades onde possa ensinar os alunos de forma divertida sobre descarte de lixo eletrônico. |
| 3             | Você e uma criança/adolescente com curiosidade sobre reciclagem que deseja jogar um jogo com seus amigos sobre o assunto. |
| 4             | Você é uma representante de ONG pensando em como divulgar as ideias da organização. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja ver notícias sobre reciclagem e vê que há boas fontes de notícia no site.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4                    | 13.03 segundos                  |
| 2       | SIM             | 5                    | 10.38 segundos                  |
| 3       | SIM             | 5                    | 08.32 segundos                  |
|         |                 |                      |                                 |
| **Média** | 100%          | 4.6                  | 10.58 segundos                  |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 04.50 segundos |


    Comentários dos usuários: Achei as noticias bem interessantes!


Cenário 2: Você é um(a) professor(a) pensando em criar atividades onde possa ensinar os alunos de forma divertida sobre descarte de lixo eletrônico.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 38.25 segundos                  |
| 2       | SIM             | 5                    | 28.83 segundos                  |
| 3       | SIM             | 5                    | 22.62 segundos                  |
|         |                 |                      |                                 |
| **Média** | 100%          | 5                    | 30 segundos                     |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.05 segundos |


    Comentários dos usuários: O site é fácil de usar, porem acho que poderia ter mais temas nas atividades.


Cenário 3: Você e uma criança/adolescente com curiosidade sobre reciclagem que deseja jogar um jogo com seus amigos sobre o assunto.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4                    | 20.65 segundos                  |
| 2       | SIM             | 4                    | 16.40 segundos                  |
| 3       | SIM             | 5                    | 22 segundos                     |
|         |                 |                      |                                 |
| **Média** | 100%          | 4.3                  | 19.68 segundos                  |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 10 segundos |


Comentários dos usuários: Achei divertido para jogar com meus amigos!


Cenário 4: Você é uma representante de ONG procurando a aba de contato e enviando a equipe as ideias da organização.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 37.91 segundos                  |
| 2       | SIM             | 5                    | 32.02 segundos                  |
| 3       | SIM             | 5                    | 24.56 segundos                  |
|         |                 |                      |                                 |
| **Média** | 100%          | 5                    | 31.49 segundos                  |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 17.45 segundos |

Comentários dos usuários: Muito bom ter um lugar para divulgar a minha ONG.

## Avaliação dos Testes de Usabilidade

Os resultados dos testes de usabilidade foram altamente positivos. A aplicação demonstrou uma taxa de sucesso de 100% em todos os cenários propostos, validando sua funcionalidade e a capacidade dos usuários em completar as tarefas. Complementarmente, a satisfação subjetiva dos usuários foi elevada, com médias de avaliação variando entre 4.3 e 5 (em uma escala de 1 a 5), o que indica uma percepção de "boa" a "ótima" experiência.

Apesar do sucesso geral, observamos uma discrepância consistente no tempo de conclusão dos cenários entre os usuários comuns e o especialista. Enquanto a média dos usuários variou de 10.58 a 31.49 segundos por cenário, o especialista obteve tempos entre 4.50 e 17.45 segundos. Embora essa diferença seja parcialmente esperada devido ao conhecimento prévio do desenvolvedor sobre a interface, a magnitude dessa variação sugere oportunidades significativas de melhoria na usabilidade. Trabalhar para reduzir essa lacuna pode tornar a navegação e a interação para novos usuários ainda mais intuitivas e eficientes, aproximando sua experiência à de um usuário experiente.



