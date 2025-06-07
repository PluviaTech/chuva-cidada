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

const form = document.getElementById('form-ocorrencia');
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
        responsavel: form.responsavel.value.trim(),
        rua: form.rua.value.trim(),
        numero: form.numero.value.trim(),
        bairro: form.bairro.value.trim(),
        cidade: form.cidade.value.trim(),
        estado: form.estado.value.trim().toUpperCase(),
        tipo: form.tipo.value,
        descricao: form.descricao.value.trim(),
        foto: form.foto.files[0]
    };

    const erros = [];

    if (!dados.responsavel || dados.responsavel.length < 10) {
        erros.push("Nome Completo do responsável é obrigatório.");
    }

    if (!dados.rua) erros.push("O campo Rua é obrigatório.");
    if (!dados.numero) erros.push("O campo Número é obrigatório.");
    if (!dados.bairro) erros.push("O campo Bairro é obrigatório.");
    if (!dados.cidade) erros.push("O campo Cidade é obrigatório.");
    if (!dados.estado || dados.estado.length !== 2) erros.push("Informe o Estado com 2 letras, como SP.");

    if (!dados.tipo) erros.push("Selecione o tipo de ocorrência.");

    if (erros.length > 0) {
        document.getElementById('mensagemErro').innerHTML = `<ul><li>${erros.join('</li><li>')}</li></ul>`;
        erroDialog.showModal();
        return;
    }

    const resumo = `
    <p><strong>Responsável:</strong> ${dados.responsavel}</p>
    <p><strong>Endereço:</strong> ${dados.rua}, ${dados.numero} - ${dados.bairro}, ${dados.cidade} - ${dados.estado}</p>
    <p><strong>Tipo de ocorrência:</strong> ${dados.tipo}</p>
    ${dados.descricao ? `<p><strong>Descrição adicional:</strong> ${dados.descricao}</p>` : ''}
    ${dados.foto ? `<p><strong>Foto enviada:</strong> ${dados.foto.name}</p>` : '<p><em>Sem foto enviada.</em></p>'}
  `;

    resumoConteudo.innerHTML = resumo;
    resumoDialog.showModal();
});

fecharDialog.addEventListener('click', () => {
    resumoDialog.close();
    location.reload(); // recarrega a página após fechar o diálogo
});

