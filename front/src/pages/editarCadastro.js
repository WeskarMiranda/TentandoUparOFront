import React, { useState } from 'react';

function EditarCadastro() {
  const [name, setName] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [numeroCvc, setNumeroCvc] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');

  function handleFotoPerfilChange(event) {
    const file = event.target.files[0];
    setFotoPerfil(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nome', name);
    formData.append('telefone', telefone);
    formData.append('endereco', endereco);
    formData.append('cartaoNome', nomeCartao);
    formData.append('cartaoNumero', numeroCartao);
    formData.append('cartaoCvc', numeroCvc);
    formData.append('fotoPerfil', fotoPerfil);

    fetch('http://localhost:3001/cliente', {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Cadastro atualizado com sucesso!');
      })
      .catch((err) => {
        console.error(err);
        alert('Ocorreu um erro ao atualizar o cadastro. Verifique no console.');
      })
      .finally(() => {
        // Limpar os campos após a atualização do cadastro
        setName('');
        setTelefone('');
        setCpf('');
        setEmail('');
        setPassword('');
        setEndereco('');
        setNomeCartao('');
        setNumeroCartao('');
        setNumeroCvc('');
        setFotoPerfil('');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="mt-5 text-center">
          <h2>Editar Cadastro</h2>
        </div>
        <div className="row mt-5">
          <div className="col">
            <div>
              <div className="mt-3">
                <label>Dados do Cadastro</label>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="nameInput">Nome:</label><br />
              <input className="form-control" placeholder="Nome Completo" id="nameInput" type="text" value={name} onChange={(e) => { setName(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="telefoneInput">Telefone:</label><br />
              <input className="form-control" placeholder="Telefone" id="telefoneInput" type="text" maxLength={12} value={telefone} onChange={(e) => { setTelefone(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="cpfInput">CPF:</label><br />
              <input className="form-control" placeholder="CPF" id="cpfInput" type="text" maxLength={11} value={cpf} onChange={(e) => { setCpf(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="emailInput">Email:</label><br />
              <input className="form-control" placeholder="Email" id="emailInput" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="passwordInput">Senha:</label><br />
              <input className="form-control" placeholder="Senha" id="passwordInput" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="enderecoInput">Endereço:</label><br />
              <input className="form-control" placeholder="Endereço" id="enderecoInput" type="text" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="fotoPerfilInput">Foto de Perfil:</label><br />
              <input className="form-control" id="fotoPerfilInput" type="file" onChange={handleFotoPerfilChange} /><br />
            </div>
          </div>
          <div className="col">
            <div className="mt-3">
              <label>Dados do Cartão</label>
            </div>
            <div className="mt-3">
              <label htmlFor="nomeCartaoInput">Nome do Cartão:</label><br />
              <input className="form-control" placeholder="Nome do cartão do usuário" id="nomeCartaoInput" type="text" value={nomeCartao} onChange={(e) => { setNomeCartao(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="numeroCartaoInput">Número do Cartão:</label><br />
              <input className="form-control" placeholder="Número do cartão do usuário" id="numeroCartaoInput" type="text" maxLength={20} value={numeroCartao} onChange={(e) => { setNumeroCartao(e.target.value) }} /><br />
            </div>
            <div className="mt-3">
              <label htmlFor="numeroCvcInput">Número do CVC:</label><br />
              <input className="form-control" placeholder="Número do CVC" id="numeroCvcInput" type="password" maxLength={3} value={numeroCvc} onChange={(e) => { setNumeroCvc(e.target.value) }} /><br />
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <button className="btn btn-success" type="submit">Atualizar Cadastro</button>
        </div>
      </div>
    </form>
  );
}

export default EditarCadastro;

