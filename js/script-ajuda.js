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

const form = document.getElementById('form-ajuda');
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
        celular: form.celular.value.trim(),
        email: form.email.value.trim(),
        rua: form.rua.value.trim(),
        numero: form.numero.value.trim(),
        bairro: form.bairro.value.trim(),
        cidade: form.cidade.value.trim(),
        estado: form.estado.value.trim().toUpperCase(),
        descricao: form.descricao.value.trim()
    };

    const erros = [];

    if (!dados.nome) {
        erros.push("O campo Nome completo é obrigatório.");
    } else if (dados.nome.length < 10) {
        erros.push("Favor inserir o nome completo.");
    }

    if (!dados.celular) {
        erros.push("O campo Celular é obrigatório.");
    } else if (!/^\d{11}$/.test(dados.celular)) {
        erros.push("Número de celular inválido. Use o formato 11999999999.");
    }

    if (!dados.email) {
        erros.push("O campo E-mail é obrigatório.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
        erros.push("Formato de e-mail inválido.");
    }

    if (!dados.rua) erros.push("O campo Rua é obrigatório.");
    if (!dados.numero) erros.push("O campo Número do endereço é obrigatório.");
    if (!dados.bairro) erros.push("O campo Bairro é obrigatório.");
    if (!dados.cidade) erros.push("O campo Cidade é obrigatório.");
    if (!dados.estado || dados.estado.length !== 2) erros.push("Informe o Estado com 2 letras, como SP.");


    if (!dados.descricao) {
        erros.push("Descreva sua necessidade.");
    }

    if (erros.length > 0) {
        document.getElementById('mensagemErro').innerHTML = `<ul><li>${erros.join('</li><li>')}</li></ul>`;
        erroDialog.showModal();
        return;
    }

    const resumo = `
  <p><strong>Nome:</strong> ${dados.nome}</p>
  <p><strong>Celular:</strong> ${dados.celular}</p>
  <p><strong>Email:</strong> ${dados.email}</p>
  <p><strong>Endereço:</strong> ${dados.rua}, ${dados.numero} - ${dados.bairro}, ${dados.cidade} - ${dados.estado}</p>
  <p><strong>Necessidade:</strong> ${dados.descricao}</p>
`;
    resumoConteudo.innerHTML = resumo;
    resumoDialog.showModal();
});

fecharDialog.addEventListener('click', () => {
    resumoDialog.close();
    location.reload(); // recarrega a página após fechar o diálogo
});
