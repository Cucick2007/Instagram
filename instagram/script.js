//CADASTRO
function enviarDados() {

    var nome = document.getElementById('nome').value
    var usuario = document.getElementById('usuario').value
    var senha = document.getElementById('senha').value
    var email = document.getElementById('email').value

    fetch('http://localhost:3000/pessoas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: nome, usuario: usuario, senha: senha, email: email})
    })
    .then(resposta => resposta.JSON)
}
// -------------------------------------------------------

//LOGIN
const inputUsuario = document.getElementById("inputUsuario")
const inputSenha = document.getElementById("inputSenha")

function logar() {

    var encontrado = false;
    
    fetch("http://localhost:3000/pessoas").then(response => response.json()).then(Usuario => {

        Usuario.forEach(pessoa => {
            if (inputUsuario.value == "Admin" &&
                inputSenha.value == "0000") {
                    setTimeout(() => {
                        window.location.href = 'adm.html'
                    }, 500);
                    encontrado = true;
            } else{
                document.getElementById('erro').innerHTML = "";
            }

            if (inputUsuario.value == pessoa.email &&
                inputSenha.value == pessoa.senha) {
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 500);
                encontrado = true;
            } else{
                document.getElementById('erro').innerHTML = "";
            } 
            
        });

        if(!encontrado){
            document.getElementById('erro').innerHTML = "Registro inválido"
        }
    })
}

//TABELA
function pagADM(){
    

fetch("http://localhost:3000/pessoas")
    .then(resposta => resposta.json())
    .then(dados => {
        
        var tabelaCorpo = document.getElementById("tableCadastros");
        tabelaCorpo.innerHTML = ""

        dados.forEach(objeto => {
            var tr = document.createElement('tr');
            var tdId = document.createElement('td');
            var tdUsuario = document.createElement('td');
            var tdNome = document.createElement('td');
            var tdEmail = document.createElement('td');
            var tdSenha = document.createElement('td');

            tdId.innerHTML = objeto.id;
            tdUsuario.innerHTML = objeto.usuario;
            tdNome.innerHTML = objeto.nome;
            tdEmail.innerHTML = objeto.email;
            tdSenha.innerHTML = objeto.senha;

            tr.appendChild(tdId);
            tr.appendChild(tdUsuario);
            tr.appendChild(tdSenha);
            tr.appendChild(tdNome);
            tr.appendChild(tdEmail);

            tabelaCorpo.appendChild(tr);
        });
    })
}
//--------------------------------------------------------------

// ADM

function buscarDados() {
    var usuario = document.getElementById("inputUsuarioBusca").value;
    fetch("http://localhost:3000/pessoas", {
        method: 'GET',
    })
        .then(response => response.json())
        .then(dados => {

            var pessoaEncontrada = dados.find(pessoa => pessoa.usuario == usuario);
            if (pessoaEncontrada) {
                document.getElementById("inputNomeAtualizar").value = pessoaEncontrada.nome
                document.getElementById("inputEmailAtualizar").value = pessoaEncontrada.email
                document.getElementById("inputSenhaAtualizar").value = pessoaEncontrada.senha
                
            }
        })
}

function atualizarDados() {
    var usuario = document.getElementById("inputUsuarioBusca").value;
    var nome = document.getElementById("inputNomeAtualizar").value;
    var email = document.getElementById("inputEmailAtualizar").value;
    var senha = document.getElementById("inputSenhaAtualizar").value;
    var id

    if (nome == "" || idade == "" || email == "" || senha == "") {
        alert("Todos os campos devem estar completos!")
        return
    }

    fetch(`http://localhost:3000/pessoas/`).then(response => response.json()).then(dados => {
        var pessoaEncontrada = dados.find(pessoa => pessoa.usuario == usuario);
        if (pessoaEncontrada) {
            console.log(pessoaEncontrada.id)
            id = pessoaEncontrada.id
        } else {
            return
        }

        fetch(`http://localhost:3000/pessoas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                usuario: usuario,
                email: email,
                senha: senha
            })
        })
    })
}

function deletarCadastro() {
    var usuario = document.getElementById("inputUsuarioBusca").value;
    var id

    fetch(`http://localhost:3000/pessoas/`).then(response => response.json()).then(dados => {
        var pessoaEncontrada = dados.find(pessoa => pessoa.usuario == usuario);
        if (pessoaEncontrada) {
            console.log(pessoaEncontrada.id)
            id = pessoaEncontrada.id
        } else {
            return
        }

        fetch(`http://localhost:3000/pessoas/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
    })
}

// -------------------------------------------------------------