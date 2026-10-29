// LÓGICA DO CHATBOT E CHAT FLUTUANTE

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatCallout = document.getElementById('chatCallout');

    chatWindow.classList.toggle('show-chat');
    chatCallout.classList.toggle('hide-callout');
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (text) {
        appendMessage(text, 'user');
        input.value = '';
        
        const chatBox = document.getElementById('chatBox');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-msg text-muted';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<i>Carie está a digitar...</i>';
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            const indicator = document.getElementById('typingIndicator');
            if(indicator) indicator.remove();
            
            let resposta = "";
            let textoMinusculo = text.toLowerCase();

            if (textoMinusculo.includes("cancelar")) {
                resposta = "Que pena, vi que deseja cancelar. Para não perder os seus pontos de fidelidade, que tal alterar esta consulta presencial para uma de Telemedicina agora mesmo?";
            } else if (textoMinusculo.includes("agendar") || textoMinusculo.includes("marcar")) {
                resposta = "Perfeito! Para qual especialidade deseja agendar? (Ex: Cardiologia, Odontologia, Clínica Geral)";
            } else if (textoMinusculo.includes("dor") || textoMinusculo.includes("urgente") || textoMinusculo.includes("emergência")) {
                resposta = "⚠️ Se está a sentir dores fortes ou é uma emergência, por favor, dirija-se ao pronto-socorro mais próximo ou ligue para o 192.";
            } else if (textoMinusculo.includes("telemedicina")) {
                resposta = "Ótima escolha! Consultas via telemedicina são práticas e ajudam a otimizar a nossa agenda. Vou enviar o link da sua sala virtual.";
            } else if (textoMinusculo.includes("pontos") || textoMinusculo.includes("pontuação")) {
                resposta = `Tem atualmente ${pontos} pontos no Care Plus Rewards! Continue a confirmar as suas consultas ou a utilizar a telemedicina para subir de nível e ganhar mais benefícios.`;
            } else {
                resposta = "Entendi. Vou registar a sua solicitação no sistema. Posso ajudar com mais alguma coisa relacionada aos seus agendamentos?";
            }

            appendMessage(resposta, 'bot');
        }, 1500);
    }
}

function sendQuickReply(text) {
    const input = document.getElementById('chatInput');
    input.value = text;
    sendMessage();
}

// LÓGICA DA GAMIFICAÇÃO E ÁREA DO PACIENTE
let pontos = 350;

// Carrega um som de moeda (Mario/Videogame/gamficação)
const somMoeda = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
somMoeda.volume = 0.5;

function interagirConsulta(acao, event) {
    let pontosGanhos = 0;
    let mensagem = "";
    let titulo = "";

    if (acao === 'confirmar') {
        pontosGanhos = 100;
        titulo = "Consulta Confirmada!";
        mensagem = "Agradecemos a pontualidade e o compromisso com a sua saúde.";
    } else if (acao === 'reagendar') {
        pontosGanhos = 50;
        titulo = "Reagendamento Iniciado";
        mensagem = "A sua solicitação foi registada e o horário original foi libertado.";
    } else if (acao === 'cancelar') {
        pontosGanhos = 10;
        titulo = "Consulta Cancelada";
        mensagem = "Agradecemos o aviso prévio. O horário foi para a lista de espera.";
    }

    // Toca o Som da Moeda
    somMoeda.currentTime = 0; // Zera o som pra poder tocar rápido se clicar várias vezes
    somMoeda.play().catch(e => console.log("Áudio bloqueado pelo navegador"));

    // ativa a Animação Visual da Moeda 
    if (event) {
        criarAnimacaoMoeda(event.clientX, event.clientY);
    }

    // Soma os pontos na memória
    pontos += pontosGanhos;

    // Atrasamos o Modal em 800ms para dar tempo de ver a moeda a voar até ao placar
    // dentro da função interagirConsulta, no setTimeout de 800ms 
    setTimeout(() => {
        document.getElementById('tituloModalPontos').innerText = titulo;
        document.getElementById('mensagemModalPontos').innerText = mensagem;
        document.getElementById('pontosGanhosModal').innerText = `+${pontosGanhos} pts`;

        const modalPontos = new bootstrap.Modal(document.getElementById('modalNotificacaoPontos'));
        modalPontos.show();
        
        // Atualiza o número de pontos
        const pontosDisplay = document.getElementById('pontosDisplay');
        if (pontosDisplay) pontosDisplay.innerText = pontos;
        
        // NOVO Atualiza a frase de "Faltam X pontos"
        const textoNivel = document.getElementById('proximoNivelTexto');
        if (textoNivel) {
            if (pontos >= 500) {
                textoNivel.innerText = "Parabéns! Você alcançou o nível máximo.";
            } else {
                let falta = 500 - pontos;
                textoNivel.innerText = `Faltam ${falta} pontos para o Nível 4!`;
            }
        }
        
        // Atualiza a barra de nível
        const barraProgresso = document.getElementById('barraProgresso');
        if (barraProgresso) {
            let novoTamanho = Math.min((pontos / 500) * 100, 100); 
            barraProgresso.style.width = novoTamanho + '%';
            if(pontos >= 500) barraProgresso.innerText = "Nível 4 Atingido!";
        }
    }, 800);

    // Altera o Card de Consulta
    const consultaCard = document.getElementById('consultaCard');
    if (consultaCard) {
        consultaCard.innerHTML = `
            <div class="card-body text-center d-flex flex-column justify-content-center h-100 p-4">
                <div class="mb-3">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0066cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h5 class="fw-bold" style="color: var(--cp-blue);">Ação processada</h5>
                <p class="text-muted small">A agenda inteligente já atualizou o sistema e a fila de espera.</p>
            </div>
        `;
    }
}

// FUNÇÃO QUE CRIA A MOEDA VOADORA 
function criarAnimacaoMoeda(startX, startY) {
    // Cria o elemento da moeda pra tla
    const coin = document.createElement('div');
    coin.innerText = '🪙';
    coin.className = 'coin-particle';
    //pos de point click
    coin.style.left = startX + 'px';
    coin.style.top = startY + 'px';
    document.body.appendChild(coin);

    const painelPontos = document.getElementById('pontosDisplay');
    let endX = startX;
    let endY = startY - 100;

    if (painelPontos) {
        const rect = painelPontos.getBoundingClientRect();
        endX = rect.left + (rect.width / 2);
        endY = rect.top + (rect.height / 2);
    }

    // força o navegador pra fazer a rnder da pos antes de animar 
    void coin.offsetWidth;

    // Lança a moeda pro destino e aplica a classe que encolhe/desaparece
    coin.style.left = endX + 'px';
    coin.style.top = endY + 'px';
    coin.classList.add('coin-fade');

    // Remove a moeda do código depois de a animação terminar
    setTimeout(() => {
        coin.remove();
    }, 800);
}

// LÓGICA DO PAINEL DO OPERADOR (FILA E MODAL)

function adicionarFila() {
    const nome = document.getElementById('nomePaciente').value;
    const telefone = document.getElementById('telefonePaciente').value;
    const especialidade = document.getElementById('especialidadePaciente').value;
    const prioridade = document.getElementById('prioridadePaciente').value;

    if (!nome || !telefone) {
        alert("Por favor, preencha o nome e o telefone.");
        return;
    }

    const tabela = document.getElementById('tabelaFila').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();
    
    const classePrioridade = prioridade === 'Alta' ? 'priority-Alta' : 'priority-Baixa';

    novaLinha.innerHTML = `
        <td class="p-3 fw-medium">${nome}</td>
        <td class="p-3 text-muted">${telefone}</td>
        <td class="p-3 text-muted">${especialidade}</td>
        <td class="p-3 ${classePrioridade}">${prioridade === 'Alta' ? 'Urgente' : 'A aguardar'}</td>
    `;

    document.getElementById('formFila').reset();
}

let modalAlocacaoInstancia; 

function alocarHorario() {
    const tabela = document.getElementById('tabelaFila').getElementsByTagName('tbody')[0];
    
    if (tabela.rows.length === 0) {
        alert("A lista de espera está vazia no momento.");
        return;
    }

    modalAlocacaoInstancia = new bootstrap.Modal(document.getElementById('modalAlocar'));
    modalAlocacaoInstancia.show();
}

function processarAlocacao() {
    const especialidadeLiberada = document.getElementById('especialidadeVaga').value;
    const especialidadeFormatada = especialidadeLiberada.trim().toLowerCase();
    const tabela = document.getElementById('tabelaFila').getElementsByTagName('tbody')[0];
    
    let linhaSelecionada = -1;
    let pacienteAlocado = "";
    let encontrouUrgente = false;

    for (let i = 0; i < tabela.rows.length; i++) {
        const linha = tabela.rows[i];
        const especialidadeFila = linha.cells[2].innerText.trim().toLowerCase();
        const statusFila = linha.cells[3].innerText.trim().toLowerCase();

        if (especialidadeFila === especialidadeFormatada) {
            if (statusFila === "urgente") {
                linhaSelecionada = i;
                pacienteAlocado = linha.cells[0].innerText;
                encontrouUrgente = true;
                break; 
            } else if (!encontrouUrgente && linhaSelecionada === -1) {
                linhaSelecionada = i;
                pacienteAlocado = linha.cells[0].innerText;
            }
        }
    }

    modalAlocacaoInstancia.hide();

    // Notificação Toast
    setTimeout(() => {
        if (linhaSelecionada !== -1) {
            const aviso = encontrouUrgente ? "🚨 URGÊNCIA ATENDIDA! " : "✅ ";
            mostrarNotificacao(`${aviso}Vaga de ${especialidadeLiberada} alocada para: ${pacienteAlocado}. Notificação enviada.`);
            tabela.deleteRow(linhaSelecionada);
        } else {
            mostrarNotificacao(`❌ Nenhum paciente a aguardar por ${especialidadeLiberada}.`);
        }
    }, 400);
}

// LÓGICA DE DARK MODE E OUTRAS UTILIDADES 

function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        btn.innerText = "🌙 Modo Escuro";
        btn.classList.replace('btn-light', 'btn-outline-primary');
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.innerText = "☀️ Modo Claro";
        btn.classList.replace('btn-outline-primary', 'btn-light');
    }
}

function mostrarNotificacao(mensagem) {
    const toastElement = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastBody');
    toastBody.innerText = mensagem;
    
    const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show();
}

//=LÓGICA DO MODAL DE FIDELIDADE=
function abrirFidelidade() {
    const modalFid = new bootstrap.Modal(document.getElementById('modalFidelidade'));
    modalFid.show();
}

