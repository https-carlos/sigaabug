// --- 1. CSS (Estilos) ---
const css = `
      body {
          font-family: 'Verdana', sans-serif;
          overflow: hidden;
          height: 100vh;
          margin: 0;
          cursor: progress;
      }
      
      /* Janelas de Erro */
      .xp-window {
          position: absolute;
          width: 350px;
          background-color: #ECE9D8;
          border: 3px solid #0055EA;
          border-radius: 4px 4px 0 0;
          box-shadow: 10px 10px 0px rgba(0,0,0,0.1);
          font-size: 12px;
          user-select: none;
          z-index: 10;
      }
      .title-bar {
          background: linear-gradient(to right, #0058EE, #026afe);
          padding: 4px 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          font-weight: bold;
          font-family: 'Tahoma', sans-serif;
      }
      .window-body {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
      }
      .icon { font-size: 32px; }
      .message {
          font-family: 'MS Sans Serif', 'Arial', sans-serif;
          line-height: 1.4;
      }
      .message strong { color: red; }
      .buttons {
          display: flex;
          justify-content: flex-end;
          padding: 0 15px 15px;
          gap: 10px;
      }
      .xp-button {
          min-width: 80px;
          background-color: #ECE9D8;
          border: 2px solid;
          border-color: #fff #000 #000 #fff;
          padding: 4px 10px;
          cursor: pointer;
          font-size: 11px;
      }
      .xp-button:hover { box-shadow: 1px 1px 1px #000; }
      .xp-button:active { border-color: #000 #fff #fff #000; box-shadow: none; }

      /* Tela Azul (BSOD) */
      #bsod {
          background-color: #000088;
          color: white;
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          padding: 50px;
          font-family: 'Courier New', monospace;
          box-sizing: border-box;
          font-size: 18px;
          z-index: 9999;
          outline: none; /* Remove borda de foco */
      }
      .bsod-menu {
          margin-top: 50px;
          list-style: none;
          padding: 0;
      }
      .bsod-item {
          margin-bottom: 15px;
          cursor: pointer;
          background: #000088;
          border: none;
          color: white;
          font-family: inherit;
          font-size: inherit;
          text-align: left;
          width: 100%;
          display: block;
          padding: 2px 5px;
      }
      /* Estilo quando selecionado (Mouse ou Teclado) */
      .bsod-item:hover, .bsod-item.selected {
          background-color: #AAAAAA;
          color: #000088;
      }
      .blink { animation: blinker 1s linear infinite; }
      @keyframes blinker { 50% { opacity: 0; } }
  `;

const styleSheet = document.createElement("style");
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

// --- 2. DADOS ---
const titles = [
  "Java Update (Crítico)",
  "Portal Acadêmico diz:",
  "Erro no Banco de Dados",
  "Servidor da Matrícula",
  "Aviso",
  "SIGAA.exe parou",
  "SIGAA",
];
const messages = [
  "Mini-teste amanhã de manhã",
  "O sistema caiu porque muita gente tentou logar ao mesmo tempo. Tente novamente em 2029.",
  "Servidor indisponível. Culpa sua.",
  "Sua presença foi registrada automaticamente como falta.",
  "Você tentou acessar um serviço que não tem utilidade desde de 1984.",
  "O site da universidade foi otimizado para funcionar perfeitamente em Internet Explorer 6. Não recomendamos navegadores posteriores a 2003.",
  "Sua internet caiu ou o sistema? (ngm sabe)",
  "FATAL ERROR: it's over.",
  "A secretaria está em horário de almoço (das 08:00 às 17:00).",
  "Atendimento da secretaria: ‘Encaminhamos para o setor responsável’. O setor responsável não existe.",
  "Sua mensagem será respondida em 5 a 90 anos úteis. Ou ignorada.",
  "Nota lançada: <strong>4.9</strong> (Precisa de 5.0). Arredondamento negado.",
];
const buttonLabels = [
  "Chorar",
  "Desistir",
  "Culpar o Sistema",
  "Tentar",
  "Aceitar Derrota",
  "404",
];

const audio = document.createElement("audio");
audio.id = "error-sound";
audio.src =
  "https://www.myinstants.com/media/sounds/windows-xp-error.mp3";
document.body.appendChild(audio);

// --- 3. VARIÁVEIS DE CONTROLE ---
let bsodActive = false;
let selectedIndex = 0; // Índice do menu selecionado

// --- 4. FUNÇÕES ---

function playSound() {
  const soundClone = audio.cloneNode();
  soundClone.volume = 0.4;
  soundClone.play().catch((e) => {});
}

function createPopup() {
  if (bsodActive) return; // Para de criar se a tela azul já estiver ativa

  const win = document.createElement("div");
  win.classList.add("xp-window");

  const x = Math.random() * (window.innerWidth - 360);
  const y = Math.random() * (window.innerHeight - 250);
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;

  const title = titles[Math.floor(Math.random() * titles.length)];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const btnText =
    buttonLabels[Math.floor(Math.random() * buttonLabels.length)];

  win.innerHTML = `
          <div class="title-bar">
              <span>${title}</span>
              <div style="background:#d1351be0; width:16px; height:16px; text-align:center; line-height:14px; border:1px solid white; cursor:pointer;" onclick="createPopup(); playSound()">x</div>
          </div>
          <div class="window-body">
              <div class="icon">⚠️</div>
              <div class="message">${msg}</div>
          </div>
          <div class="buttons">
              <button class="xp-button" onclick="createPopup(); createPopup(); playSound()">${btnText}</button>
          </div>
      `;
  document.body.appendChild(win);
  playSound();
}

function triggerBSOD() {
  bsodActive = true;
  document.body.innerHTML = "";

  const bsod = document.createElement("div");
  bsod.id = "bsod";
  
  // AQUI FOI FEITA A ALTERAÇÃO NO SEGUNDO ITEM DA LISTA (opt-1)
  bsod.innerHTML = `
          <div>A problem has been detected in the system (this always happens).</div>
          <br>
          <div>ERROR_CODE: XD</div>
          <br>
          <div>Use the arrow keys to select an option and press Enter:</div>
          <br>
          <ul class="bsod-menu">
              <li class="bsod-item selected" id="opt-0" onclick="location.reload()">
                  &gt; Tentar Novamente (Reiniciar Sistema)
              </li>
              <li class="bsod-item" id="opt-1" onclick="window.location.href='https://sigaa.ifal.edu.br/sigaa/verPortalDiscente.do'">
                  &gt; Voltar ao Normal (Ilusão)
              </li>
              <li class="bsod-item" id="opt-2" onclick="activatePlanB()">
                  &gt; <strong>PLANO B (Recomendado)</strong>
              </li>
          </ul>
          <div style="margin-top: auto; text-align: center;" class="blink">
              Press ENTER to continue...
          </div>
      `;
  document.body.appendChild(bsod);

  // Adiciona o listener para as setas do teclado
  document.addEventListener("keydown", handleKeyboard);
}

function handleKeyboard(e) {
  if (!bsodActive) return;

  const items = document.querySelectorAll(".bsod-item");
  const total = items.length;

  // Remove a seleção visual atual
  items[selectedIndex].classList.remove("selected");

  if (e.key === "ArrowDown") {
    selectedIndex = (selectedIndex + 1) % total;
  } else if (e.key === "ArrowUp") {
    selectedIndex = (selectedIndex - 1 + total) % total;
  } else if (e.key === "Enter") {
    // Simula o clique na opção selecionada
    items[selectedIndex].click();
    return;
  }

  // Adiciona a seleção visual na nova opção
  items[selectedIndex].classList.add("selected");
}

function activatePlanB() {
  const query = "como ficar rico sem estudar";
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;
}

function startChaos() {
  createPopup();

  let count = 0;
  const maxPopups = 30;

  const interval = setInterval(() => {
    createPopup();
    count++;

    if (count > 10) createPopup();

    if (count >= maxPopups) {
      clearInterval(interval);
      setTimeout(triggerBSOD, 1000);
    }
  }, 300);
}

window.onload = startChaos;

