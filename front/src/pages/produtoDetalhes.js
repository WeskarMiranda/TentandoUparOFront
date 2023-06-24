import { useState, useEffect } from "react";
import CommentList from "../components/Comments/commentList";
import Checkout from './checkout';

function ProdutoDetalhes(props) {
  const { codigo } = props;
  const [detalhes, setDetalhes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [categorias, setCategorias] = useState();
  const [mediaNotas, setMediaNotas] = useState(0);

  

  useEffect(() => {
    fetch(`http://localhost:3001/produto/${codigo}`)
    .then((response) => response.json())
    .then((data) => {
      setDetalhes(data);
      setIsLoading(false);
       {/* setComentarios(data);
        const notas = data.map((comentario) => comentario.nota);
        const media = notas.reduce((total, nota) => total + nota, 0) / notas.length;
      setMediaNotas(media);*/}
    })
    .catch((error) => {
      console.error("Erro ao carregar detalhes do produto:", error);
      setIsLoading(false);
      });

      fetch('http://localhost:3001/categoria')
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      });
  }, [codigo]);

  const categoriaSelecionada = detalhes && categorias.find(categoria => categoria._id === detalhes.categoria);
const nomeCategoria = categoriaSelecionada ? categoriaSelecionada.nome : '';

  

  return (
    <div className="container">
      {isLoading ? (
        <h1>Carregando Detalhes...</h1>
      ) : (
        <>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <img
                src={`data:image/jpeg;base64,${btoa(String.fromCharCode(...detalhes.imagem.data),)}`}
                alt={detalhes.nome}
                style={{ maxWidth: "50%", marginLeft: "auto", marginRight: "auto" }}
              />
            </div>
            <div className="col">
              <h1>Nome: {detalhes.nome}</h1>
              <p>Categoria: {nomeCategoria}</p>
              <p>Descrição: {detalhes.descricao}</p>
              <p>Total: {detalhes.preco}</p>
              {/*<p>Nota: {mediaNotas}</p>*/}
              <p>Quantidade: {detalhes.quantidade}</p>
              <button onClick={() => Checkout }>Adicionar ao Carrinho</button>
            </div>
          </div>
          <div>
            <h2>Comentários:</h2>
          {/*  <CommentList comentarios={comentarios} produtoCodigo={codigo} />*/}
          </div>
        </>
      )}
    </div>
  );
}

export default ProdutoDetalhes;
