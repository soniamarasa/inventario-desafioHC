const inputCod = document.getElementById('inputCod');
const inputProduto = document.getElementById('inputProduto');
const categoria = document.getElementById('categoria');
const inputValor = document.getElementById('inputValor');
const inputQuant = document.getElementById('inputQuant');

const formCP = document.getElementById('formCP');

window.addEventListener('load', () => {
  formCP.addEventListener('submit', (e) => {
    e.preventDefault();

    const produto = {
      cod: inputCod.value,
      produto: inputProduto.value,
      categoria: categoria.value,
      valor: inputValor.value,
      quantidade: inputQuant.value,
    };
    let cadastroProduto = null;

    if (localStorage.hasOwnProperty('cadastroProduto')) {
      cadastroProduto = JSON.parse(localStorage.getItem('cadastroProduto'));
    } else {
      cadastroProduto = [];
    }

    cadastroProduto.push(produto);
    localStorage.setItem('cadastroProduto', JSON.stringify(cadastroProduto));
    alert('Produto cadastrado com sucesso!!!');
    location.reload();
  });
  listagem();
});

function listagem() {
  let dados = JSON.parse(localStorage.getItem('cadastroProduto'));

  let tableP = document.getElementById('tbody');
  for (i = 0; i < dados.length; i++) {
    let client = Object.values(dados[i]);

    let tr = document.createElement('tr');

    for (j = 0; j < client.length; j++) {
      let td = document.createElement('td');
      td.textContent = client[j];
      tr.appendChild(td);
    }

    tableP.appendChild(tr);
  }
}
