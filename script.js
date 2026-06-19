// ==========================================
// 1. FUNCIONALIDADE DE TROCA DE TEMA
// ==========================================
const btnTema = document.getElementById('btn-tema');

btnTema.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        btnTema.innerHTML = '🌙 Tema Escuro';
    } else {
        btnTema.innerHTML = '☀️ Tema Claro';
    }
});

// ==========================================
// 2. VALIDAÇÃO E ENVIO REAL DO FORMULÁRIO
// ==========================================
const formulario = document.getElementById('meuFormulario');

formulario.addEventListener('submit', function(event) {
    // Evita recarregar a página padrão
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validação 1: Campos vazios
    if (nome === '' || email === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos antes de enviar.');
        return;
    }

    // Validação 2: Formato do E-mail
    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmailValido.test(email)) {
        alert('Por favor, insira um e-mail válido (exemplo: usuario@dominio.com).');
        return;
    }

    // Muda o texto do botão para mostrar que está carregando
    const btnSubmit = formulario.querySelector('button[type="submit"]');
    btnSubmit.innerHTML = 'ENVIANDO...';

    // Captura todos os dados digitados
    const dadosFormulario = new FormData(formulario);

    // Envia os dados silenciosamente para o Formspree
    fetch(formulario.action, {
        method: 'POST',
        body: dadosFormulario,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Sucesso
            alert('Mensagem enviada com sucesso! Obrigado pelo contato, ' + nome + '.');
            formulario.reset();
        } else {
            // Erro no Formspree
            alert('Ocorreu um problema ao enviar a mensagem. Tente novamente mais tarde.');
        }
        // Volta o botão ao estado original
        btnSubmit.innerHTML = 'ENVIAR MENSAGEM';
    }).catch(error => {
        // Erro de internet
        alert('Ocorreu um problema de conexão. Verifique sua internet.');
        btnSubmit.innerHTML = 'ENVIAR MENSAGEM';
    });
});