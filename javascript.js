



//-----------------------------------------
//-----------------------------------------
//------Status ABERTO ou FECHADO-----------
// --- CONFIGURAÇÃO ---
// Defina os horários de fechamento e reabertura.
// Use o formato de 24 horas (Ex: 14:30 para 2 e meia da tarde)

// 💡 EXEMPLO 1: FECHADO DURANTE A NOITE/MADRUGADA (Passa pela meia-noite)
// const HORA_FECHAMENTO = '23:00'; // Fecha às 11 da noite
// const HORA_REABERTURA = '08:00'; // Reabre às 8 da manhã

// 💡 EXEMPLO 2: FECHADO AO MEIO-DIA (No mesmo dia)
// const HORA_FECHAMENTO = '12:00'; // Fecha ao meio-dia
// const HORA_REABERTURA = '14:00'; // Reabre às 2 da tarde

// Usando suas constantes originais para demonstração
const HORA_FECHAMENTO = '23:59'; 
const HORA_REABERTURA = '5:00'; 
// --------------------

function verificarStatus() {
    const agora = new Date();
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();

    // 1. Converte a hora atual para um número (Ex: 15h30m vira 1530)
    const horaMinutoAtual = horaAtual * 100 + minutoAtual;

    // 2. Converte os horários de configuração
    const [fechamentoHora, fechamentoMinuto] = HORA_FECHAMENTO.split(':').map(Number);
    const horaMinutoFechamento = fechamentoHora * 100 + fechamentoMinuto;

    const [reaberturaHora, reaberturaMinuto] = HORA_REABERTURA.split(':').map(Number);
    const horaMinutoReabertura = reaberturaHora * 100 + reaberturaMinuto;

    const container = document.getElementById('status-container');
    const texto = document.getElementById('status-text');

    let isFechado = false;

    // --- LÓGICA CORRIGIDA ---

    if (horaMinutoFechamento > horaMinutoReabertura) {
        // Cenário 1: Fechamento no dia anterior e Reabertura no dia ATUAL (Ex: 23:00 -> 08:00)
        // O período de fechamento atravessa a meia-noite.
        // Está FECHADO se a hora atual for APÓS o fechamento OU ANTES da reabertura.
        if (horaMinutoAtual >= horaMinutoFechamento || horaMinutoAtual < horaMinutoReabertura) {
            isFechado = true;
        }

    } else {
        // Cenário 2: Fechamento e Reabertura no MESMO dia (Ex: 12:00 -> 14:00)
        // O período de fechamento está contido no dia.
        // Está FECHADO se a hora atual for MAIOR OU IGUAL ao fechamento E MENOR que a reabertura.
        if (horaMinutoAtual >= horaMinutoFechamento && horaMinutoAtual < horaMinutoReabertura) {
            isFechado = true;
        }
    }

    // --- APLICAÇÃO DO ESTADO ---

    if (isFechado) {
        container.classList.remove('aberto');
        container.classList.add('fechado');
        texto.textContent = 'FECHADO';
        // O texto extra foi removido, mas você pode adicioná-lo de volta se quiser!
    } else {
        container.classList.remove('fechado');
        container.classList.add('aberto');
        texto.textContent = 'ABERTO';
    }
    
    // Opcional: Mostra a hora atual no console para debug
    console.log(`Hora atual: ${horaMinutoAtual}. Status: ${isFechado ? 'FECHADO' : 'ABERTO'}`);
}

// Executa a função imediatamente ao carregar
verificarStatus();

// Configura para verificar o status a cada minuto (60000 milissegundos)
setInterval(verificarStatus, 60000);




//-----------------------------------------
//-----------------------------------------
//-----script do 5 estrela/comentaro-------

function scrollCarousel(direction) {
        const track = document.getElementById('carouselTrack');
        // Define o quanto rolar (a largura de um card + o gap de 20px)
        const scrollAmount = 270; 

        // Rola o carrossel na direção especificada
        track.scrollLeft += direction * scrollAmount;
    }
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//--___java do html-pacotes___-------------



//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//---__Mensagens de Atenção__--------------

// 1. Mensagem de Boas-Vindas/Primeira Mensagem (Ser sempre a primeira vez)
const primeiraMensagem = "O **Bolo de Morango** foi o mais pedido hoje!";

// 2. Array com as mensagens que irão ALTERNAR
const mensagensAlternadas = [
    "O Drink **Manhattan** foi pedido por **5 pessoas** hoje!",
    "A promoção do drink **'Caipirinha'** está quase ao fim!",
    "Há **3 usuários** navegando e montando seus pedidos neste momento.",
    "O tempo das entregas pode subir devido ao alto volume de pedidos!"
];

// Função para embaralhar um array (algoritmo Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Verifica se o usuário já visitou o site
const isFirstVisit = localStorage.getItem('hasVisited') === null;
localStorage.setItem('hasVisited', 'true'); // Marca a visita para a próxima vez

let mensagensParaExibir = [];

if (isFirstVisit) {
    // Na primeira visita, exibe a primeira mensagem, e depois o resto embaralhado
    mensagensParaExibir.push(primeiraMensagem);
    mensagensParaExibir = mensagensParaExibir.concat(shuffleArray([...mensagensAlternadas]));
} else {
    // Em visitas subsequentes, embaralha todas as mensagens, incluindo a "Negroni"
    mensagensParaExibir = shuffleArray([primeiraMensagem, ...mensagensAlternadas]);
}


let currentIndex = 0; // Índice inicial da mensagem
const boxElement = document.getElementById('atencao-box');
const conteudoElement = document.getElementById('mensagem-conteudo');

// Configurações de tempo
const tempoExibicao = 9000; // Tempo que a mensagem fica VISÍVEL (9 segundos)
const tempoIntervalo = 20000; // Tempo TOTAL do ciclo (20 segundos)
const tempoEspera = tempoIntervalo - tempoExibicao; // Tempo que fica invisível (21 segundos)

function showNextMessage() {
    // Pega a mensagem atual
    // O array 'mensagensParaExibir' está agora com a ordem definida (ou embaralhada)
    let message = mensagensParaExibir[currentIndex];

    // Insere o conteúdo, convertendo **texto** para <strong>texto</strong> (negrito)
    conteudoElement.innerHTML = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 1. Exibe a caixa (Display ON)
    boxElement.style.display = 'flex';

    // 2. Agenda para esconder a caixa após o tempo de exibição
    setTimeout(() => {
        boxElement.style.display = 'none';

        // 3. Agenda a próxima exibição após o tempo de espera (21 segundos)
        setTimeout(showNextMessage, tempoEspera);
    }, tempoExibicao);

    // Atualiza o índice para a próxima mensagem (circular)
    currentIndex = (currentIndex + 1) % mensagensParaExibir.length;
}

// Inicia o ciclo de mensagens após um atraso de 2 segundos (2000 ms)
setTimeout(showNextMessage, 2000); 



  /* ========================================= */
        /* JAVASCRIPT: LÓGICA DE CRIAÇÃO DO BOLO E WHATSAPP */
        /* ========================================= */
        const form = document.getElementById('form-bolo');
        const resumoTexto = document.getElementById('resumo-texto');
        const btnFinalizar = document.getElementById('btn-finalizar');
        const recheioCheckboxes = document.querySelectorAll('.recheio-checkbox');
    
    
    //O whatsapp 
        const telefoneWhatsApp = '5591984111645'; // Formato: 55 + DDD + Número
    //O whatsapp 
    
    
        // Função para garantir que apenas 2 recheios sejam selecionados
        recheioCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const checkedCount = document.querySelectorAll('.recheio-checkbox:checked').length;
                if (checkedCount > 2) {
                    alert('Você pode selecionar no máximo 2 sabores de recheio.');
                    this.checked = false;
                }
                updateResumo(); // Atualiza o resumo após a mudança
            });
        });

        // Adiciona um listener a todos os elementos do formulário para atualizar o resumo
        form.addEventListener('change', updateResumo);
        form.addEventListener('keyup', updateResumo);

        function updateResumo() {
            // 1. Coleta os dados do formulário
            const tamanhoSelect = document.getElementById('tamanho-bolo');
            const tamanho = tamanhoSelect.options[tamanhoSelect.selectedIndex].value;
            const precoBase = tamanhoSelect.options[tamanhoSelect.selectedIndex].getAttribute('data-preco') || 0;
            
            const massa = document.querySelector('input[name="massa"]:checked')?.value || 'Não selecionada';
            
            const recheiosSelecionados = Array.from(document.querySelectorAll('input[name="recheio"]:checked'))
                                             .map(cb => cb.value)
                                             .join(', ') || 'Nenhum selecionado (máx. 2)';
            
            const dataEntrega = document.getElementById('data-entrega').value || 'Não informada';
            const obsDecoracao = document.getElementById('decoracao-obs').value.trim() || 'Nenhuma';

            // Formata o Preço
            const precoFormatado = parseFloat(precoBase).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            // 2. Monta o texto do Resumo para o Site
            const resumoVisual = `
Tamanho/Andares: ${tamanho}
Massa: ${massa}
Recheios: ${recheiosSelecionados}
Data Desejada: ${dataEntrega}
Observações Decoração: ${obsDecoracao}
-----------------------------
Preço Base Estimado: ${precoFormatado}
Devido as Observações o valor pode mudar
-----------------------------
______________🥰_____________`;

            // 3. Atualiza o elemento no HTML
            resumoTexto.textContent = resumoVisual;

            // 4. Monta a Mensagem para o WhatsApp
            const mensagemWhatsApp = `Olá, Eli! Gostaria de fazer um orçamento para um bolo personalizado.
%0A%0A*Detalhes do Pedido:*
%0A🍰 Tamanho/Andares: ${tamanho}
%0A🍞 Massa: ${massa}
%0A🍬 Recheios: ${recheiosSelecionados}
%0A📅 Data Desejada: ${dataEntrega}
%0A🎨 Decoração/Obs: ${obsDecoracao}
%0A
%0A*Preço Base Estimado:* ${precoFormatado}
%0A
%0APor favor, confirme a disponibilidade e o valor final. Obrigada!`;

            // 5. Atualiza o link do botão de WhatsApp
            const linkWhatsApp = `https://api.whatsapp.com/send?phone=${telefoneWhatsApp}&text=${mensagemWhatsApp}`;
            btnFinalizar.href = linkWhatsApp;
        }

        // Chama a função ao carregar a página para preencher o resumo inicial
        document.addEventListener('DOMContentLoaded', updateResumo);
  



