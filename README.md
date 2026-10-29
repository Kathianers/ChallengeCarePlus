# 💙 Care Plus Experience: Gestão Inteligente e No-show na Saúde

Plataforma web desenvolvida como desafio proposto pela **Care Plus**, com o objetivo de combater os altos índices de *no-show* (faltas em consultas) através de gamificação, automação de filas de espera e atendimento. 

Trabalho desenvolvido em grupo no do curso de **Análise e Desenvolvimento de Sistemas (ADS)** da **FIAP**.

---

## 👥 Integrantes do Grupo
* **Kathiane Soares Ribeiro** — RM567900
* **Vinicius Simões Campos** — RM568098
* **Vinicius Moraes Maranha** — RM567863
* **Rafael Cardona Santa Helena** — RM568076
* **Victor Rafael Oliveira dos Santos** — RM568002

---

## 🚀 Sobre o Projeto

**O Problema:** Altos índices de *no-show* nas consultas, gerando ociosidade médica, atrasos para pacientes urgentes e dificuldade na realocação ágil de vagas.

**A Solução:** Uma plataforma web unificada que combina **Gamificação (Care Plus Rewards)** para engajar o paciente, um **Painel de Operador** com triagem inteligente e uma assistente virtual automatizada (**"Carie"**).

---

## 💡 Principais Funcionalidades

* **Área do Paciente & Care Plus Rewards:** O paciente gerencia seus agendamentos de forma transparente e ganha pontos de fidelidade com base na previsibilidade e na pontualidade.
* **Painel do Operador:** Central de monitoramento onde a equipe acompanha o preenchimento de lacunas abertas de forma automatizada e gere a lista de espera por especialidade e urgência.
* **Assistente Virtual "Carie":** Chatbot inteligente integrado para atendimento 24/7, focado em retenção (oferecendo telemedicina caso o paciente queira cancelar), triagem de urgência e consulta de pontos de fidelidade.
* **Modo Escuro (Dark Mode):** Alternância nativa de tema desenvolvida para reduzir a fadiga visual de operadores e pacientes.

---

## 📊 Regras de Negócio (Care Plus Rewards)

Para transformar a falta em engajamento positivo, o sistema valida as seguintes pontuações:

* **+100 pontos (Presença Confirmada):** Bonificação principal que garante a manutenção e ocupação da agenda médica;
* **+50 pontos (Aviso de Alteração):** Incentiva o paciente a redefinir horários antecipadamente, liberando a vaga para o fluxo de espera;
* **+10 pontos (Cancelamento Prévio):** Recompensa mínima pela sinalização antecipada da desistência.

---

## 🗄️ Modelagem de Banco de Dados (MER)

O Modelo Entidade-Relacionamento foi estruturado para suportar o perfil do paciente, o rastreio de status de consultas, médicos, especialidades e a gestão descentralizada da fila de espera:

* **PACIENTE:** Dados cadastrais, pontos de fidelidade e nível de *rewards*.
* **CONSULTA:** Registo de data, hora, status, associando paciente e médico.
* **MEDICO & ESPECIALIDADE:** Organização relacional da estrutura clínica.
* **FILA_ESPERA:** Gestão automatizada cruzando prioridade e especialidade.

---

## 🎯 Insights do Projeto

1. **Gamificação Comportamental:** Substituir multas e atritos por recompensas positivas gera maior previsibilidade e adesão voluntária dos pacientes.
2. **Triagem Invisível:** O algoritmo cruza especialidade e status de urgência automaticamente, aliviando a carga cognitiva da equipa de atendimento.
3. **Ergonomia e Inclusão:** O *Dark Mode* e componentes fluidos (como toasts e modais) combatem a fadiga ocupacional de quem utiliza o sistema por longos períodos.

