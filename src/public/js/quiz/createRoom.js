lucide.createIcons();

const socket = io();
let codigoSala = null;
let adminId = localStorage.getItem("adminId");

if (!adminId) {
  adminId = crypto.randomUUID();
  localStorage.setItem("adminId", adminId);
}

document.addEventListener("DOMContentLoaded", () => {
  let select = document.querySelector(".select"),
    selectedValue = document.getElementById("selected-value"),
    optionsViewButton = document.getElementById("options-view-button"),
    inputsOptions = document.querySelectorAll(".option input"),
    dificuldadeValue = document.getElementById("dificuldade-value"),
    dificuldadeToggle = document.getElementById("dificuldade-toggle"),
    inputsDificuldade = document.querySelectorAll(".option-dificuldade input");

  const btnCriar = document.getElementById("btnConfirmarCriacao");
  const btnIniciar = document.getElementById("iniciar");
  const btnPular = document.getElementById("pular");
  const configuracaoSala = document.getElementById("configuracaoSala");
  const painelAdmin = document.getElementById("painelAdmin");
  const btnFinalizar = document.getElementById("finalizarPartida");
  const btnVoltar = document.getElementById("btnVoltar");

  // Armazenando o conteudo do select como a opção marcada no inicio

  inputsDificuldade.forEach((input) => {
    input.addEventListener("click", (event) => {
      dificuldadeValue.textContent = input.dataset.label;

      const isMouseOrTouch =
        event.pointerType == "mouse" || event.pointerType == "touch";

      isMouseOrTouch && dificuldadeToggle.click();
    });
  });

  inputsOptions.forEach((input) => {
    input.addEventListener("click", (event) => {
      selectedValue.textContent = input.dataset.label;

      const isMouseOrTouch =
        event.pointerType == "mouse" || event.pointerType == "touch";

      isMouseOrTouch && optionsViewButton.click();
    });
  });

  btnIniciar.disabled = true;

  btnCriar.addEventListener("click", (e) => {
    e.preventDefault();

    const temaSelecionado = document.querySelector(
      'input[name="category"]:checked'
    );
    const tema = temaSelecionado ? temaSelecionado.value : "";

    const dificuldadeSelecionada = document.querySelector(
      'input[name="dificuldade"]:checked'
    );
    const dificuldade = dificuldadeSelecionada
      ? dificuldadeSelecionada.value
      : "";

    const tempo = parseInt(document.getElementById("tempo").value, 10);

    if (!tema || !dificuldade || isNaN(tempo) || tempo <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    socket.emit("criarSala", { tema, dificuldade, tempo, adminId });
  });

  btnIniciar.addEventListener("click", () => {
    const jogadores = document.querySelectorAll("#lista-jogadores li").length;
    if (jogadores < 2) {
      alert("Você precisa de pelo menos 2 jogadores para iniciar.");
      return;
    }

    if (!codigoSala) {
      console.warn("Código da sala ainda não foi definido.");
      return;
    }

    socket.emit("iniciarQuiz", codigoSala);
  });

  btnPular.addEventListener("click", () => {
    if (codigoSala) {
      socket.emit("pularPergunta", codigoSala);
    }
  });

  btnVoltar.addEventListener("click", () => {
    location.href = "/quiz/entrar";
  });

  btnFinalizar.addEventListener("click", () => {
    if (!codigoSala) return;

    const confirmar = confirm("Tem certeza que deseja finalizar a partida?");
    if (confirmar) {
      socket.emit("finalizarPartida", codigoSala);
      location.href = "/quiz/entrar";
    }
  });
});

socket.on("salaCriada", ({ codigo }) => {
  socket.on("salaCriada", ({ codigo }) => {
    codigoSala = codigo;
    localStorage.setItem("codigoSalaAdmin", codigoSala);

    document.getElementById(
      "codigoSala"
    ).textContent = `Código da sala: ${codigoSala}`;
    configuracaoSala.style.display = "none";
    painelAdmin.style.display = "block";

    setTimeout(() => {
      btnIniciar.disabled = false;
      btnPular.style.display = "none";
    }, 100);
  });
});

socket.on("jogadoresAtualizados", (jogadores) => {
  const ul = document.getElementById("lista-jogadores");
  ul.innerHTML = "";

  jogadores.forEach((j) => {
    const li = document.createElement("li");
    li.innerHTML = `<img src="${j.avatar}" width="50" style="vertical-align: middle; margin-right: 8px;" /> ${j.apelido}`;
    ul.appendChild(li);
  });

  const ulGerenciar = document.getElementById("listaGerenciarJogadores");
  ulGerenciar.innerHTML = "";

  jogadores.forEach((j) => {
    const li = document.createElement("li");
    li.innerHTML = `${j.apelido} 
      <button onclick="expulsar('${j.playerId}')">Expulsar</button>`;
    ulGerenciar.appendChild(li);
  });

  document.getElementById("iniciar").disabled = jogadores.length < 2;
});

socket.on("pontuacaoAtualizada", ({ pontuacao, jogadores }) => {
  const ul = document.getElementById("listaGerenciarJogadores");
  ul.innerHTML = "";

  jogadores.forEach((j) => {
    const li = document.createElement("li");
    li.innerHTML = `${j.apelido} - ${pontuacao[j.playerId] || 0} pts 
      <button onclick="expulsar('${j.playerId}')">Expulsar</button>`;
    ul.appendChild(li);
  });
});

socket.on("novaPergunta", () => {
  document.getElementById("pular").style.display = "inline";
});

socket.on("fimDoQuiz", () => {
  document.getElementById("pular").style.display = "none";
});

socket.on("partidaFinalizada", () => {
  alert("Você finalizou a partida. A sala foi encerrada.");
  location.href = "/";
});

function expulsar(playerId) {
  if (codigoSala) {
    socket.emit("expulsarJogador", { codigo: codigoSala, playerId });
  }
}
