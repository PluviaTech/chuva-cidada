const btnMobile = document.getElementById('btn-mobile');

function ToggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    event.currentTarget.setAttribute('aria-label', active ? 'Fechar Menu' : 'Abrir Menu');
}

btnMobile.addEventListener('click', ToggleMenu);
btnMobile.addEventListener('touchstart', ToggleMenu);

// Formulário
const form = document.getElementById('form-contato');
const resumoDialog = document.getElementById('resumoDialog');
const resumoConteudo = document.getElementById('resumoConteudo');
const fecharDialog = document.getElementById('fecharDialog');

// Dialog de erro
const erroDialog = document.createElement('dialog');
erroDialog.id = 'erroDialog';
erroDialog.innerHTML = `
  <h3>⚠️ Erros no formulário</h3>
  <div id="mensagemErro"></div>
  <button id="fecharErro">Fechar</button>
`;
document.body.appendChild(erroDialog);

document.getElementById('fecharErro').addEventListener('click', () => {
    erroDialog.close();
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = {
        nome: form.nome.value.trim(),
        idade: form.idade.value.trim(),
        genero: form.genero.value,
        telefone: form.telefone.value.trim(),
        email: form.email.value.trim(),
        cidade: form.cidade.value.trim(),
        bairro: form.bairro.value.trim(),
        periodo: form.periodo.value,
        experiencia: form.experiencia.value,
    };

    const erros = [];

    // Verificações campo a campo
    if (!dados.nome) {
        erros.push("O campo Nome completo é obrigatório.");
    } else if (dados.nome.length < 10) {
        erros.push("Favor inserir o nome completo.");
    }

    if (!dados.idade) {
        erros.push('O campo Idade é obrigatório.');
    } else if (isNaN(dados.idade) || parseInt(dados.idade) < 18) {
        erros.push('A Idade mínima para se voluntariar é 18 anos.');
    }

    if (!dados.genero) {
        erros.push('É necessário selecionar pelo menos uma das opções de gênero. Caso prefira existe a opção "Prefiro não dizer".');
    }

    if (!dados.telefone) {
        erros.push('O campo Telefone é obrigatório.');
    } else if (!/^\d{11}$/.test(dados.telefone)) {
        erros.push('Número de telefone não atende ao formato esperado. Insira neste formato "11999999999".');
    }

    if (!dados.email) {
        erros.push('O campo E-mail é obrigatório.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
        erros.push('E-mail inválido.');
    }

    if (!dados.cidade) {
        erros.push("O campo Cidade é obrigatório.");
    }
    if (!dados.bairro) {
        erros.push("O campo Bairro é obrigatório.");
    }

    if (!dados.periodo) {
        erros.push('Selecione sua Disponibilidade.');
    }

    if (!dados.experiencia) {
        erros.push('Informe se já participou de ações voluntárias.');
    }

    if (erros.length > 0) {
        document.getElementById('mensagemErro').innerHTML = `<ul><li>${erros.join('</li><li>')}</li></ul>`;
        erroDialog.showModal();
        return;
    }

    // Se passou, mostra o resumo
    const resumo = `
    <p><strong>Nome:</strong> ${dados.nome}</p>
    <p><strong>Idade:</strong> ${dados.idade}</p>
    <p><strong>Gênero:</strong> ${dados.genero}</p>
    <p><strong>Telefone:</strong> ${dados.telefone}</p>
    <p><strong>Email:</strong> ${dados.email}</p>
    <p><strong>Cidade:</strong> ${dados.cidade}</p>
    <p><strong>Bairro:</strong> ${dados.bairro}</p>
    <p><strong>Disponibilidade:</strong> ${dados.periodo}</p>
    <p><strong>Experiência prévia:</strong> ${dados.experiencia}</p>
    `;
    resumoConteudo.innerHTML = resumo;
    resumoDialog.showModal();
});

fecharDialog.addEventListener('click', () => {
    resumoDialog.close();
    location.reload(); // recarrega a página após fechar o diálogo
});