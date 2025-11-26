// Aguarda o DOM estar completamente carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos na página de artigos. Isso evita que o script tente
    // carregar notícias em outras páginas onde os elementos não existem.
    if (!window.location.pathname.includes('/artigos')) return;

    // Obtém as referências para os contêineres HTML onde as notícias serão exibidas.
    const lastNewsContainer = document.getElementById('lastNewsContainer');
    const trendingNewsContainer = document.getElementById('trendingNewsContainer');

    // Função para exibir mensagens de erro na interface do usuário e no console.
    function showError(message) {
        console.error(message);
        // Se o contêiner de últimas notícias existir, exibe uma mensagem de erro e um botão para recarregar.
        if (lastNewsContainer) {
            lastNewsContainer.innerHTML = `
                <div class="error-message">
                    <p>Não foi possível carregar as notícias.</p>
                    <button onclick="window.location.reload()">Tentar novamente</button>
                </div>
            `;
        }
    }

    // Função para renderizar as notícias no HTML.
    function renderNews(data) {
        // Verifica se os dados são válidos.
        if (!data) {
            showError('Dados de notícias inválidos');
            return;
        }

        // Renderiza as últimas notícias.
        if (lastNewsContainer && data.lastnews) {
            lastNewsContainer.innerHTML = data.lastnews.map(news => `
                <div class="news">
                    <div class="img">
                        <img src="${news.image}" alt="${news.title}" />
                    </div>
                    <div class="text">
                        <h3 class="title">
                            <a href="${news.link}" target="_blank">${news.title}</a>
                        </h3>
                        <p class="content">${news.description}</p>
                    </div>
                </div>
                <hr />
            `).join(''); // O join('') remove as vírgulas entre os elementos.
        }

        // Renderiza as notícias em alta.
        if (trendingNewsContainer && data.trendingnews) {
            trendingNewsContainer.innerHTML = data.trendingnews.map(news => `
                <div class="trendn">
                    <div class="img">
                        <img src="${news.image}" alt="${news.title}" />
                    </div>
                    <div class="title">
                        <h5><a href="${news.link}" target="_blank">${news.title}</a></h5>
                    </div>
                </div>
                <hr class="sideline" />
            `).join('');
        }
    }

    // Inicia o processo de carregamento das notícias.
    // Faz uma requisição para o endpoint '/api/news' do seu servidor.
    fetch('/api/news')
        .then(response => {
            // Verifica se a resposta da rede foi bem-sucedida (status 200-299).
            if (!response.ok) {
                // Lança um erro se a resposta não for OK, para ser capturado pelo .catch().
                throw new Error(`Erro na resposta do servidor: ${response.status} ${response.statusText}`);
            }
            return response.json(); // Converte a resposta para JSON.
        })
        .then(renderNews) // Chama a função renderNews com os dados recebidos.
        .catch(error => {
            // Captura e trata quaisquer erros que ocorram durante o fetch ou parsing do JSON.
            showError(`Erro ao carregar notícias: ${error.message}`);
        });
});
