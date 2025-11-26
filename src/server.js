const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
const jsonServer = require("json-server"); // json-server adicionado

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// =========================================================
// Esta rota lê o arquivo news.json e o serve como JSON.
app.get('/api/news', (req, res) => {
    const newsPath = path.join(__dirname, '..', 'data', 'news.json');

    fs.readFile(newsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler news.json:', err);
            return res.status(500).json({
                error: 'Erro ao carregar notícias',
                details: err.message
            });
        }

        try {
            const newsData = JSON.parse(data);
            res.json(newsData);
        } catch (parseError) {
            console.error('Erro ao parsear news.json:', parseError);
            res.status(500).json({
                error: 'Erro ao processar notícias',
                details: parseError.message
            });
        }
    });
});
// =========================================================

// ====== JSON-SERVER CONFIG =======
// O json-server é usado para servir o db.json como uma API RESTful.
// Ele é aplicado a todas as rotas que começam com '/api'.
const apiRouter = jsonServer.router(
  path.join(__dirname, "..", "data", "db.json")
);
const middlewares = jsonServer.defaults();
app.use("/api", middlewares); 
app.use("/api", apiRouter); 
// =================================


// Carrega as perguntas para o quiz.
const perguntas = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "perguntas.json"), "utf-8")
);
const salas = {}; // Objeto para armazenar as salas de quiz ativas.

// Função auxiliar para embaralhar arrays (usada no quiz).
function embaralharArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Rotas para servir os arquivos HTML das diferentes páginas.

// Rota para a página inicial (redireciona para '/')
app.get("/home", (req, res) => {
  res.redirect("/");
});

// Rota para a página inicial (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Rota para a página de pontos de descarte.
app.get("/pontos-de-descarte", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "disposalPoints.html"));
});

// Rota para a página de contato.
app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Rota para a página de artigos (notícias).
app.get("/artigos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "articles.html"));
});


// Rotas específicas do quiz.
app.get("/quiz/entrar", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "quiz", "enterRoom.html"));
});

app.get("/quiz/criar", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "quiz", "createRoom.html"));
});

app.get("/quiz/jogar", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "quiz", "quiz.html"));
});

app.get("/quiz/espera", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "quiz", "waitingRoom.html"));
});


// Rota para lidar com o envio do formulário de contato.
app.post("/contato/enviar", (req, res) => {
  const dados = req.body;
  const filePath = path.join(__dirname, "..", "data", "contatos.json");

  fs.readFile(filePath, "utf-8", (err, data) => {
    let contatos = [];

    if (!err) {
      try {
        contatos = JSON.parse(data);
        if (!Array.isArray(contatos)) contatos = [];
      } catch {
        contatos = [];
      }
    }

    contatos.push({
      nome: dados.name,
      email: dados.email,
      mensagem: dados.message,
      dataEnvio: new Date().toISOString(),
    });

    fs.writeFile(filePath, JSON.stringify(contatos, null, 2), (err) => {
      if (err) {
        console.error("Erro ao salvar contato:", err);
        return res.status(500).json({ message: "Erro ao salvar mensagem." });
      }
      res.json({ message: "Mensagem enviada com sucesso!" });
    });
  });
});

// Manipuladores de eventos Socket.IO para o quiz.
io.on("connection", (socket) => {
  socket.on("criarSala", ({ tema, dificuldade, tempo, adminId }) => {
    const codigo = gerarCodigoUnico();
    const filtradas = perguntas[tema].filter(
      (p) => p.dificuldade === dificuldade
    );
    const filaEmbaralhada = embaralharArray(filtradas);

    salas[codigo] = {
      codigo,
      tema,
      dificuldade,
      tempo,
      jogadores: [],
      pontuacao: {},
      perguntaAtual: null,
      emAndamento: false,
      adminId,
      filaPerguntas: filaEmbaralhada,
      respostasDaRodada: [],
      indiceAtual: 0,
    };

    socket.join(codigo);
    socket.emit("salaCriada", { codigo });
  });

  socket.on("entrarSala", ({ codigo, apelido, avatar, playerId }) => {
    const sala = salas[codigo];
    if (!sala) return;

    const existe = sala.jogadores.some((j) => j.playerId === playerId);
    if (!existe) {
      sala.jogadores.push({ apelido, avatar, playerId });
      sala.pontuacao[playerId] = 0;
    }

    socket.join(codigo);
    io.to(codigo).emit("jogadoresAtualizados", sala.jogadores);
  });

  socket.on("iniciarQuiz", (codigo) => {
    const sala = salas[codigo];
    if (!sala) return;

    sala.emAndamento = true;
    io.to(codigo).emit("quizIniciado");
  });

  socket.on("responder", ({ codigo, playerId, resposta }) => {
    const sala = salas[codigo];
    if (!sala || !sala.perguntaAtual) return;

    const jaRespondeu = sala.respostasDaRodada.find(
      (r) => r.playerId === playerId
    );
    if (jaRespondeu) return;

    const correta = resposta === sala.perguntaAtual.correta;

    sala.respostasDaRodada.push({
      playerId,
      tempoResposta: Date.now(),
      correta,
    });

    if (correta) {
      const bonus =
        10 + (sala.jogadores.length - sala.respostasDaRodada.length);
      sala.pontuacao[playerId] = (sala.pontuacao[playerId] || 0) + bonus;
    }

    io.to(codigo).emit("pontuacaoAtualizada", {
      pontuacao: sala.pontuacao,
      jogadores: sala.jogadores,
    });

    if (sala.respostasDaRodada.length === sala.jogadores.length) {
      sala.indiceAtual++;
      setTimeout(() => enviarNovaPergunta(codigo), 1000);
    }
  });

  socket.on("pularPergunta", (codigo) => {
    const sala = salas[codigo];
    if (!sala) return;

    sala.indiceAtual++; // avança para a próxima pergunta
    enviarNovaPergunta(codigo);
  });

  socket.on("finalizarPartida", (codigo) => {
    const sala = salas[codigo];
    if (!sala) return;

    const ranking = sala.jogadores
      .map((jogador) => ({
        apelido: jogador.apelido,
        avatar: jogador.avatar,
        pontos: sala.pontuacao[jogador.playerId] || 0,
      }))
      .sort((a, b) => b.pontos - a.pontos);

    io.to(codigo).emit("fimDoQuiz", ranking);
    delete salas[codigo];
  });

  socket.on("expulsarJogador", ({ codigo, playerId }) => {
    const sala = salas[codigo];
    if (!sala) return;

    sala.jogadores = sala.jogadores.filter((j) => j.playerId !== playerId);
    delete sala.pontuacao[playerId];

    io.to(codigo).emit("jogadoresAtualizados", sala.jogadores);
  });

  socket.on("solicitarPrimeiraPergunta", (codigo) => {
    enviarNovaPergunta(codigo);
  });
});

// Função para enviar a próxima pergunta do quiz.
function enviarNovaPergunta(codigo) {
  const sala = salas[codigo];
  if (!sala) return;

  const proxima = sala.filaPerguntas[sala.indiceAtual];
  if (!proxima) {
    const ranking = sala.jogadores
      .map((jogador) => ({
        apelido: jogador.apelido,
        avatar: jogador.avatar,
        pontos: sala.pontuacao[jogador.playerId] || 0,
      }))
      .sort((a, b) => b.pontos - a.pontos);

    io.to(codigo).emit("fimDoQuiz", ranking);
    delete salas[codigo];
    return;
  }

  sala.perguntaAtual = proxima;
  sala.respostasDaRodada = [];

  io.to(codigo).emit("novaPergunta", {
    pergunta: proxima.pergunta,
    opcoes: proxima.opcoes,
    tempo: sala.tempo || 30,
  });
}

// Função para gerar um código único para as salas do quiz.
function gerarCodigoUnico() {
  let codigo;
  do {
    codigo = Math.floor(1000 + Math.random() * 9000).toString();
  } while (salas[codigo]);
  return codigo;
}

// Inicia o servidor.
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`db.json com localidades disponível em http://localhost:${PORT}/api`);
});
