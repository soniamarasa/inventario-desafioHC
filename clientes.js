const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputTel = document.getElementById('inputTel');
const inputCep = document.getElementById('cep');
const inputEnd = document.getElementById('rua');
const inputNum = document.getElementById('inputNum');
const inputComp = document.getElementById('inputComp');
const inputBairro = document.getElementById('bairro');
const inputCity = document.getElementById('cidade');
const inputState = document.getElementById('uf');
const formCC = document.getElementById('formCC');

window.addEventListener('load', () => {
  formCC.addEventListener('submit', (e) => {
    e.preventDefault();

    const client = {
      name: inputName.value,
      email: inputEmail.value,
      tel: inputTel.value,
      cep: inputCep.value,
      rua: inputEnd.value,
      num: inputNum.value,
      complemento: inputComp.value,
      bairro: inputBairro.value,
      cidade: inputCity.value,
      Estado: inputState.value,
    };
    let cadastroCliente = null;

    if (localStorage.hasOwnProperty('cadastroCliente')) {
      cadastroCliente = JSON.parse(localStorage.getItem('cadastroCliente'));
    } else {
      cadastroCliente = [];
    }

    cadastroCliente.push(client);
    localStorage.setItem('cadastroCliente', JSON.stringify(cadastroCliente));
    alert('Cliente cadastrado com sucesso!!!');
    location.reload();
  });
  listagem();
});

function mask(o, f) {
  setTimeout(function () {
    var v = mphone(o.value);
    if (v != o.value) {
      o.value = v;
    }
  }, 1);
}

function mphone(v) {
  var r = v.replace(/\D/g, '');
  r = r.replace(/^0/, '');
  if (r.length > 10) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
  } else if (r.length > 5) {
    r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
  } else {
    r = r.replace(/^(\d*)/, '($1');
  }
  return r;
}

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  inputEnd.value = '';
  inputBairro.value = '';
  inputCity.value = '';
  inputState.value = '';
  inputCep.value = '';
}

function meu_callback(conteudo) {
  if (!('erro' in conteudo)) {
    //Atualiza os campos com os valores.
    inputEnd.value = conteudo.logradouro;
    inputBairro.value = conteudo.bairro;
    inputCity.value = conteudo.localidade;
    inputState.value = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert('CEP não encontrado.');
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != '') {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      inputEnd.value = '...';
      inputBairro.value = '...';
      inputCity.value = '...';
      inputState.value = '...';

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src =
        'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert('Formato de CEP inválido.');
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}

function listagem() {
  let dados = JSON.parse(localStorage.getItem('cadastroCliente'));

  let tableC = document.getElementById('tbody');
  for (i = 0; i < dados.length; i++) {
    let client = Object.values(dados[i]);

    let tr = document.createElement('tr');

    let end = '';

    for (j = 0; j < client.length; j++) {
      if (j >= 3 && j <= 9) {
        if (client[j].length) {
          end =
            client[3] +
            ', ' +
            client[4] +
            ', nº ' +
            client[5] +
            '  ' +
            client[6] +
            '<br>';
          end += client[7] + ', ' + client[8] + '/' + client[9];
        }

        if (j == 8) {
          let td = document.createElement('td');
          td.className = 'end';
          td.innerHTML = end;
          tr.appendChild(td);
        }
      } else {
        let td = document.createElement('td');
        td.textContent = client[j];
        tr.appendChild(td);
      }
    }

    tableC.appendChild(tr);
  }
}
