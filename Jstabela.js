let ctt = document.getElementById('tabelacontatos');
let interacao = document.getElementById('interacao');
let interacaocontatos = document.getElementById('contato2');
const emailValidation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
var pessoas, index, acharpessoa;

var contadordecontatos = 0;
var contadordepessoas = 0;
var contadordenovoscontatos = 0;
var contadordecontatossalvos = 0;
let validadorparaobotaodeusuario = 0;
let validadorparaobotaodecontatos = 0;

var contatos = [];

class Listadepessoas {
    constructor() {
        this.pessoas = [];
    }

    getLista() {
        return this.pessoas;
    }

    getListarpessoa(num) {
        return this.pessoas[num];
    }

    adicionarPessoa(pessoa) {
        this.pessoas.push(pessoa);
    }
}

var listadepessoas = new Listadepessoas();

class Contato {
    constructor(nome1, email1, telefone1) {
        this.nome = nome1;
        this.email = email1;
        this.telefone = telefone1;
    }

    getNome() {
        return this.nome;
    }

    getEmail() {
        return this.email;
    }

    getTelefone() {
        return this.telefone;
    }

    setNome(nome2) {
        this.nome = nome2;
    }

    setEmail(email2) {
        this.email = email2;
    }

    setTelefone(telefone2) {
        this.telefone = telefone2;
    }
}

class Pessoa {

    constructor(nome1, cpf1, email1, telefone1, cidade1, rua1, quadra1, lote1, index1) {
        this.nome = nome1;
        this.cpf = cpf1;
        this.email = email1;
        this.telefone = telefone1;
        this.cidade = cidade1
        this.rua = rua1;
        this.quadra = quadra1;
        this.lote = lote1;
        this.index = index1;

        this.contatosdapessoa = [];
    }

    adicionarContato(contato) {
        this.contatosdapessoa.push(contato);
    }

    getCidade() {
        return this.cidade;
    }

    getEmail() {
        return this.email;
    }

    getTelefone() {
        return this.telefone;
    }

    getCpf() {
        return this.cpf;
    }

    getRua() {
        return this.rua;
    }

    getQuadra() {
        return this.quadra;
    }

    getLote() {
        return this.lote;
    }

    getNome() {
        return this.nome;
    }

    getContato(index) {
        return this.contatosdapessoa[index];
    }

    getContatos() {
        return this.contatosdapessoa;
    }

    getIndex() {
        return this.index;
    }

    setCidade(cidade) {
        this.cidade = cidade
    }

    setCpf(cpf2) {
        this.cpf = cpf2
    }

    setEmail(email) {
        this.email = email;
    }

    setTelefone(telefone) {
        this.telefone = telefone;
    }
    setRua(rua) {
        this.rua = rua;
    }

    setQuadra(quadra) {
        this.quadra = quadra;
    }

    setLote(lote) {
        this.lote = lote;
    }

    setNome(nome) {
        this.nome = nome;
    }

}

function cadastrar(nome, cpf, emaildocadastro, telefone, cidade, rua, quadra, lote) {
    if (validaSeTemCampoEmBranco(nome, telefone, cidade, rua, quadra, lote) && VerificaCPF(cpf) && contadordecontatos >= 2 && !!verificaCpfRepetido(cpf, contadordepessoas) && validaEmail(emaildocadastro) && verificaEmailRepetidoUsuario(emaildocadastro, contadordepessoas) && validaTelefone(telefone)) {

        pessoas = document.getElementById('tabelausuario');

        listadepessoas.adicionarPessoa(new Pessoa(nome, cpf, emaildocadastro, telefone, cidade, rua, quadra, lote, contadordepessoas))

        preencherTabela();

        let numerodecontatos = contatos.length;

        for (let k = 0; k < numerodecontatos; k++) {
            listadepessoas.getListarpessoa(contadordepessoas).adicionarContato(contatos[k]);
        }

        for (let i = 0; i < numerodecontatos; i++) {
            contatos.shift();
        }

        preencherformulario();
        contadordecontatos = 0;
        contadordepessoas++;

        limparcampos();
    }
    else if (!(VerificaCPF(document.getElementById('cpf').value))) {

        window.alert('CPF informado é invalido, favor informar cpf valido');

    } else if (contadordecontatos < 2) {
        window.alert('Necessario inserir no minimo 2 contatos');

    }

}

function preencherTabela() {

    for (let j = pessoas.rows.length - 1; j > 0; j--) {
        pessoas.rows[j].remove();
    }

    for (let i = 0; i < listadepessoas.getLista().length; i++) {

        let qtdlinhas = pessoas.rows.length;

        let linha = pessoas.insertRow(qtdlinhas);

        let cnome = linha.insertCell(0);
        let ccpf = linha.insertCell(1);
        let cemail = linha.insertCell(2)
        let ctelefone = linha.insertCell(3);
        let botaovisualizar = linha.insertCell(4);

        botaovisualizar.innerHTML = 'Visualizar';
        botaovisualizar.setAttribute('id', 'botaovisualizar');

        cnome.innerHTML = listadepessoas.getListarpessoa(i).getNome();
        ccpf.innerHTML = listadepessoas.getListarpessoa(i).getCpf();
        ctelefone.innerHTML = listadepessoas.getListarpessoa(i).getTelefone();
        cemail.innerHTML = listadepessoas.getListarpessoa(i).getEmail();
    }
}

function cadastrodecontato(nome, email, telefone) {

    if (validaEmail(email) && !(telefone == "") && !(nome == "") && verificaEmailRepetidodeContatoEmPrimeiroCadastro(email) && validaTelefone(telefone)) {
        contadordecontatos++;

        contatos.push(new Contato(nome, email, telefone));

        document.getElementById("contato").value = "";
        document.getElementById("email").value = "";
        document.getElementById("telefo").value = ""

        contadordecontatossalvos++;

    }
    if ((telefone == "")) {
        window.alert('Insira um telefone');
    }
    if ((nome == "")) {
        window.alert('Insira um nome');

    }

}



function preencherformulario() {
    for (let i = 0; i < pessoas.rows.length; i++) {

        pessoas.rows[i].onclick = function () {

            document.getElementById('contato').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefo').value = '';

            index = this.rowIndex;
            acharpessoa = index;

            let qtdlinhas2;
            let p = listadepessoas.getListarpessoa(index - 1);
            let ccontato
            let cemail
            let ctelefone

            document.getElementById('nomeesobrenome').value = p.getNome();
            document.getElementById('cpf').value = p.getCpf();
            document.getElementById('emaildocadastro').value = p.getEmail();
            document.getElementById('telefone').value = p.getTelefone();
            document.getElementById('cidade').value = p.getCidade();
            document.getElementById('rua').value = p.getRua();
            document.getElementById('quadra').value = p.getQuadra();
            document.getElementById('lote').value = p.getLote();

            for (let j = ctt.rows.length - 1; j > 0; j--) {
                ctt.rows[j].remove();
            }

            for (let j = 0; j < p.getContatos().length; j++) {

                qtdlinhas2 = ctt.rows.length;

                let linha2 = ctt.insertRow(qtdlinhas2);
                ccontato = linha2.insertCell(0);
                cemail = linha2.insertCell(1);
                ctelefone = linha2.insertCell(2);
                cbotaoeditar = linha2.insertCell(3);


                ccontato.innerHTML = p.getContatos()[j].getNome();
                cemail.innerHTML = p.getContatos()[j].getEmail();
                ctelefone.innerHTML = p.getContatos()[j].getTelefone();

                cbotaoeditar.setAttribute('id', 'botaovisualizar');

                cbotaoeditar.innerHTML = '<input type="button" value="Editar">'

                preencherContatos()
            }

            document.getElementById('botaodecadastrarusuario').value = 'Cadastrar Novo Usuario';
            document.getElementById('botaodecadastrarusuario').removeAttribute('onclick');
            document.getElementById('botaodecadastrarusuario').setAttribute('onclick', 'iniciarNovoCadastro()');

            document.getElementById('salvarcontato').setAttribute('value', 'Adicionar novo contato');
            document.getElementById('salvarcontato').setAttribute('onclick', 'adicionarNovoContato()');


            let botaodesalvar = document.createElement('input');
            let botaodeexcluir = document.createElement('input');

            botaodesalvar.setAttribute('id', 'botaodesalvar');
            botaodesalvar.setAttribute('type', 'button');
            botaodesalvar.setAttribute('value', 'Salvar Edição');
            botaodesalvar.setAttribute('class', 'enviar');
            botaodesalvar.setAttribute('onclick', 'salvarEdicaodeUsuario()');

            botaodeexcluir.setAttribute('id', 'botaodeexcluir');
            botaodeexcluir.setAttribute('type', 'button');
            botaodeexcluir.setAttribute('value', 'Excluir Usuario');
            botaodeexcluir.setAttribute('class', 'enviar');
            botaodeexcluir.setAttribute('onclick', 'ExcluirUsuario()');


            if (validadorparaobotaodeusuario == 0) {
                validadorparaobotaodeusuario = 1
                interacao.appendChild(botaodeexcluir);
                interacao.appendChild(botaodesalvar);

            }
        }
    }
}


function iniciarNovoCadastro() {
    validadorparaobotaodeusuario = 0;
    limparcampos()

    document.getElementById('botaodecadastrarusuario').value = 'Cadastrar Usuario';
    document.getElementById('botaodecadastrarusuario').removeAttribute('onclick');
    document.getElementById('botaodecadastrarusuario').setAttribute('onclick', 'cadastrar(nomeesobrenome.value,cpf.value,emaildocadastro.value,telefone.value,cidade.value,rua.value,quadra.value,lote.value)');
    document.getElementById('salvarcontato').setAttribute('onclick', 'cadastrodecontato(contato.value,email.value,telefo.value)');

    interacao.removeChild(document.getElementById('botaodesalvar'));
    interacao.removeChild(document.getElementById('botaodeexcluir'));

    for (let j = ctt.rows.length - 1; j > 0; j--) {
        ctt.rows[j].remove();
    }

    if (validadorparaobotaodecontatos == 0) {
        interacaocontatos.removeChild(document.getElementById('botaodesalvarcontato'));
        interacaocontatos.removeChild(document.getElementById('botaodeexcluircontato'));

    }
    validadorparaobotaodecontatos = 0;
}

function limparcampos() {
    document.getElementById('nomeesobrenome').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('quadra').value = '';
    document.getElementById('lote').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('emaildocadastro').value = '';

    document.getElementById('contato').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefo').value = '';
}


function salvarEdicaodeUsuario() {

    let pe = listadepessoas.getListarpessoa(acharpessoa - 1);

    pe.setNome(document.getElementById('nomeesobrenome').value);
    pe.setCidade(document.getElementById('cidade').value);
    pe.setRua(document.getElementById('rua').value);
    pe.setQuadra(document.getElementById('quadra').value);
    pe.setLote(document.getElementById('lote').value);

    if (verificaCpfRepetido((document.getElementById('cpf').value), acharpessoa - 1)) {
        pe.setCpf(document.getElementById('cpf').value);
        pessoas.rows[index].cells[1].innerHTML = pe.getCpf();
    }

    if (verificaEmailRepetidoUsuario(document.getElementById('emaildocadastro').value, acharpessoa - 1)) {
        pe.setEmail(document.getElementById('emaildocadastro').value);
    }

    if(validaTelefone(document.getElementById('telefone').value)){ 
        pe.setTelefone(document.getElementById('telefone').value);
    }

    pessoas.rows[index].cells[0].innerHTML = pe.getNome();
    pessoas.rows[index].cells[2].innerHTML = pe.getEmail();
    pessoas.rows[index].cells[3].innerHTML = pe.getTelefone();

}

function ExcluirUsuario() {
    let cpf = '';
    contadordepessoas--;

    for (let j = ctt.rows.length - 1; j > 0; j--) {
        ctt.rows[j].remove();
    }

    validadorparaobotaodecontatos = 1;
    listadepessoas.getLista().splice(acharpessoa - 1, 1);
    iniciarNovoCadastro();
    preencherTabela();
    preencherformulario()

}

function preencherContatos() {
    ctt = document.getElementById('tabelacontatos');

    for (let i = 0; i < ctt.rows.length; i++) {
        ctt.rows[i].onclick = function () {

            index = this.rowIndex;

            document.getElementById('contato').value = ctt.rows[index].cells[0].innerText;
            document.getElementById('email').value = ctt.rows[index].cells[1].innerText;
            document.getElementById('telefo').value = ctt.rows[index].cells[2].innerText;


            let botaodesalvarcontato = document.createElement('input');

            botaodesalvarcontato.setAttribute('id', 'botaodesalvarcontato');
            botaodesalvarcontato.setAttribute('type', 'button');
            botaodesalvarcontato.setAttribute('value', 'Editar Contato');
            botaodesalvarcontato.setAttribute('class', 'enviar2');
            botaodesalvarcontato.setAttribute('onclick', 'salvarEdicaodeContato()');

            let botaodeexcluircontato = document.createElement('input');

            botaodeexcluircontato.setAttribute('id', 'botaodeexcluircontato');
            botaodeexcluircontato.setAttribute('type', 'button');
            botaodeexcluircontato.setAttribute('value', 'Excluir Contato');
            botaodeexcluircontato.setAttribute('class', 'enviar2');
            botaodeexcluircontato.setAttribute('onclick', 'excluirContato()');

            if (validadorparaobotaodecontatos == 0) {
                validadorparaobotaodecontatos = 1
                interacaocontatos.appendChild(botaodesalvarcontato);
                interacaocontatos.appendChild(botaodeexcluircontato);
            }

        }
    }
}

function excluirContato() {

    ctt = document.getElementById('tabelacontatos');
    let p = listadepessoas.getListarpessoa(acharpessoa - 1)

    if (p.getContatos().length > 2) {
        p.getContatos().splice(index - 1, 1);

        for (let j = ctt.rows.length - 1; j > 0; j--) {
            ctt.rows[j].remove();
        }

        for (let j = 0; j < p.getContatos().length; j++) {

            let qtdlinhas2 = ctt.rows.length;

            let linha2 = ctt.insertRow(qtdlinhas2);
            let ccontato = linha2.insertCell(0);
            let cemail = linha2.insertCell(1);
            let ctelefone = linha2.insertCell(2);
            let cbotaoeditar = linha2.insertCell(3);


            ccontato.innerHTML = p.getContatos()[j].getNome();
            cemail.innerHTML = p.getContatos()[j].getEmail();
            ctelefone.innerHTML = p.getContatos()[j].getTelefone();

            cbotaoeditar.setAttribute('id', 'botaovisualizar');

            cbotaoeditar.innerHTML = '<input type="button" value="Editar">';

            document.getElementById('contato').value = '';
            document.getElementById('email').value = '';
            document.getElementById('telefo').value = '';

        }
        validadorparaobotaodecontatos = 1;
        preencherContatos();
    } else {
        alert('O usuario não pode ter menos de 2 contatos')
    }
}

function adicionarNovoContato() {

    let p = listadepessoas.getListarpessoa(acharpessoa - 1);
    let email = document.getElementById('email').value;
    let nome = document.getElementById('contato').value;
    let telefone = document.getElementById('telefo').value;

    if (validaEmail(email) && !(telefone == "") && !(nome == "") && verificaEmailRepetidosContatos(email, ctt.rows.length)) {

        let pe = listadepessoas.getListarpessoa(acharpessoa - 1);

        pe.getContatos().push(new Contato(document.getElementById('contato').value,
            document.getElementById('email').value,
            document.getElementById('telefo').value));

        for (let j = ctt.rows.length - 1; j > 0; j--) {
            ctt.rows[j].remove();
        }
        for (let j = 0; j < p.getContatos().length; j++) {

            let qtdlinhas2 = ctt.rows.length;

            let linha2 = ctt.insertRow(qtdlinhas2);
            ccontato = linha2.insertCell(0);
            cemail = linha2.insertCell(1);
            ctelefone = linha2.insertCell(2);
            cbotaoeditar = linha2.insertCell(3);


            ccontato.innerHTML = p.getContatos()[j].getNome();
            cemail.innerHTML = p.getContatos()[j].getEmail();
            ctelefone.innerHTML = p.getContatos()[j].getTelefone();

            cbotaoeditar.setAttribute('id', 'botaovisualizar');

            cbotaoeditar.innerHTML = '<input type="button" value="Editar">'

            preencherContatos()
        }

    }
    if ((telefone == "")) {
        window.alert('Insira um telefone');
        // document.getElementById("telefo").style.border = "2px solid red";
    }
    if ((nome == "")) {
        window.alert('Insira um nome');
        // document.getElementById("contato").style.border = "2px solid red";
    }


}


function salvarEdicaodeContato() {
    let email = document.getElementById('email').value;
    let telefone = document.getElementById('telefo').value;
    let nome = document.getElementById('contato').value

    if (verificaEmailRepetidosContatos(document.getElementById('email').value, index - 1) && validaEmail(email) && !(telefone == "") && !(nome == "")) {
        let pe = listadepessoas.getListarpessoa(acharpessoa - 1);

        pe.getContato(index - 1).setNome(nome);
        pe.getContato(index - 1).setEmail(email);
        pe.getContato(index - 1).setTelefone(telefone);

        ctt.rows[index].cells[0].innerHTML = pe.getContato(index - 1).getNome();
        ctt.rows[index].cells[1].innerHTML = pe.getContato(index - 1).getEmail();
        ctt.rows[index].cells[2].innerHTML = pe.getContato(index - 1).getTelefone();

    }
    if ((telefone == "")) {
        window.alert('Insira um telefone');
        // document.getElementById("telefo").style.border = "2px solid red";
    }
    if ((nome == "")) {
        window.alert('Insira um nome');
        // document.getElementById("contato").style.border = "2px solid red";
    }

}

function validaEmail(email) {
    let validacaoRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validacaoRegex.test(email)) {
        alert('E-mail invalido');
      
    }

    return validacaoRegex.test(email);
}

function validaTelefone(telefone){
    let validacaoRegex = /^\d{2}\s?\d{4,5}-?\d{4}$/;
    if (!validacaoRegex.test(telefone)) {
        alert('Telefone invalido');
    }
    return validacaoRegex.test(telefone);
}


function VerificaCPF(strCpf) {

    var soma;
    var resto;
    soma = 0;
    if (strCpf == "00000000000") {
        return false;
    }
    for (i = 1; i <= 9; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (i = 1; i <= 10; i++) {
        soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto == 10 || resto == 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto != parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function verificaCpfRepetido(cpf, index1) {
    for (let i = 0; i <= index1; i++) {

        if (i != index1 && listadepessoas.getListarpessoa(i).getCpf() == cpf) {
            alert('Já existe um cadastro com esse cpf');
            return false;
        }

    }
    return true;

}

function verificaEmailRepetidoUsuario(email, index1) {

    for (let i = 0; i <= index1; i++) {

        if (i != index1 && listadepessoas.getListarpessoa(i).getEmail() == email) {
            alert('Já existe um cadastro com esse e-mail');
            return false;
        }

    }
    return true;
}

function verificaEmailRepetidosContatos(email, index) {
    let validaquantidadedeemail = 0;
    let pe = listadepessoas.getListarpessoa(acharpessoa - 1);
    for (let i = 0; i < pe.getContatos().length; i++) {
        if (pe.getContatos()[i].getEmail() == email && i != index) {
            validaquantidadedeemail++;

        }
        if (validaquantidadedeemail == 1) {
            alert('Já existe um contato com esse e-mail');
            return false;
        }

    }

    return true;
}

function verificaEmailRepetidodeContatoEmPrimeiroCadastro(email) {
    let verificadordeemails = 0;

    for (let i = 0; i < contatos.length; i++) {
        if (contatos[i].getEmail() == email) {
            verificadordeemails++;
        }
        if (verificadordeemails == 1) {
            alert('Já existe um contato com esse e-mail');
            return false;
        }
    }

    return true;
}


function validaSeTemCampoEmBranco(nome, telefone, cidade, rua, quadra, lote) {
    if (nome != '' && telefone != '' && cidade != '' && rua != '' && quadra != '' && lote != '') {
        return true

    }
    if (nome == '') {
        alert('preencha o campo de Nome');
    }
    if (telefone == '') {
        alert('preencha o campo de Telefone');
    }
    if (cidade == '') {
        alert('preencha o campo de Cidade');
    }
    if (rua == '') {
        alert('preencha o campo de Rua');
    }
    if (quadra == '') {
        alert('preencha o campo de Quadra');
    }
    if (lote == '') {
        alert('preencha o campo de Lote');
    }

    return false
}