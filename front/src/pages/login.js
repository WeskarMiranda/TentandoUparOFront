import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const bodyParam = {
      email: email,
      password: password,
    };

    api
  .post('/auth', bodyParam)
  .then((response) => {
    console.log(response.data);
    alert('Token gerado para o usuário ' + response.data.nome);
    localStorage.setItem('token', response.data.token);
    navigate('/');
  })
  .catch((err) => {
    if (err.response && err.response.data) {
      console.error(err.response.data); // Objeto de erro vindo do axios
      alert('Ocorreu um erro! ' + err.response.data.error);
    } else {
      console.error(err);
      alert('Ocorreu um erro! Veja no console.');
    }
  })
  .finally(() => {
    setEmail('');
    setPassword('');
  });

  }


  return (
    <div className="container text-center">
      <div className="row">
        <div className="form-custom">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Email:
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
            </div>
            <br />
            <div className="form-group">
              <label>
                Senha:
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </label>
            </div>
            <br />
            <div className="mt-3">
              <p>
                Ainda não se cadastrou? <Link to="/cadastro">Clique aqui</Link>
              </p>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
