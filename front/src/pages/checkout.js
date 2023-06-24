import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';

const pedidoItems = {
  total: 285.0,
  items: [
    {
      nome: 'Item 1',
      qtde: 2,
      preco: 150,
    },
    {
      nome: 'Item 2',
      qtde: 1,
      preco: 50,
    },
  ],
};

export default function Checkout() {
  const navigate = useNavigate();

  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [numeroCvc, setNumeroCvc] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      try {
        const data = jwt(storedToken);
        console.log(data);

        if (pedidoItems.items.length === 0) {
          alert('O carrinho está vazio! Adicione itens antes de finalizar o pedido.');
        } else {
          console.log('Endereço para entrega:', endereco);
          console.log('Telefone para contato:', telefone);
          console.log('Cartão para compra:', nomeCartao);
          console.log('Número do cartão:', numeroCartao);
          console.log('Número CVC:', numeroCvc);
          alert('Compra efetuada com sucesso para o cliente código: ' + data.codigo + '.');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Usuário não autenticado! Por favor, faça o login!');
      navigate('/login');
    }
  }

  function handleNumeroCartaoChange(event) {
    let numero = event.target.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    if (numero.length > 20) {
      numero = numero.slice(0, 20); // Limita o número a 20 dígitos
    }
    setNumeroCartao(numero);
  }

  function handleNumeroCvcChange(event) {
    let cvc = event.target.value.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    if (cvc.length > 3) {
      cvc = cvc.slice(0, 3); // Limita o CVC a 3 dígitos
    }
    setNumeroCvc(cvc);
  }

  return (
    <div className="container text-center">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {pedidoItems.items.map((item, i) => (
            <div className="col" key={i}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.nome}</h5>
                  <p>Quantidade: {item.qtde}</p>
                  <p>Preço: {item.preco}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col">
            <br />
            <p className="lead">Valor Total do Pedido: R$ {pedidoItems.total}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4>Dados para entrega:</h4>
            <br />
            <label htmlFor="enderecoInput">Endereço:</label><br />
            <input
              className="form-control"
              placeholder="Endereço"
              id="enderecoInput"
              type="text"
              value={endereco}
              onChange={(event) => setEndereco(event.target.value)}
              required
            />
            <br />
            <label htmlFor="telefoneInput">Telefone:</label><br />
            <input
              className="form-control"
              placeholder="Telefone"
              id="telefoneInput"
              type="text"
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              required
            />
          </div>
          <div className="col">
            <h4>Informações do Cartão:</h4>
            <br />
            <label htmlFor="nomeCartaoInput">Nome do Cartão:</label><br />
            <input
              className="form-control"
              placeholder="Nome do cartão do usuário"
              id="nomeCartaoInput"
              type="text"
              value={nomeCartao}
              onChange={(event) => setNomeCartao(event.target.value)}
              required
            />
            <br />
            <label htmlFor="numeroCartaoInput">Número do Cartão:</label><br />
            <input
              className="form-control"
              placeholder="Número do cartão do usuário"
              id="numeroCartaoInput"
              type="text"
              maxLength={20}
              value={numeroCartao}
              onChange={handleNumeroCartaoChange}
              required
            />
            <br />
            <label htmlFor="numeroCvcInput">Número do CVC:</label><br />
            <input
              className="form-control"
              placeholder="Número do CVC"
              id="numeroCvcInput"
              type="password"
              maxLength={3}
              value={numeroCvc}
              onChange={handleNumeroCvcChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}