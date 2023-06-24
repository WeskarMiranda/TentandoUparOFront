import React from "react";

function CommentList(props) {
  const { produtoCodigo, comentarios } = props;

  const comentariosDoProduto = comentarios.filter(
    (comentario) => comentario.produtoCodigo === produtoCodigo
  );

  // Calcula a média das notas dos comentários
  const calcularMediaNotas = () => {
    if (comentariosDoProduto.length > 0) {
      const notas = comentariosDoProduto.map((comentario) => comentario.nota);
      const media = notas.reduce((total, nota) => total + nota, 0) / notas.length;
      return media.toFixed(2); // Arredonda para 2 casas decimais
    }
    return 0;
  };

  return (
    <>
      {comentariosDoProduto.length > 0 ? (
        comentariosDoProduto.map((comentario) => (
          <div key={comentario.codigo}>
            <p>
              <strong>{comentario.usuario}:</strong> {comentario.texto}
            </p>
          </div>
        ))
      ) : (
        <p>Sem comentários para esse produto.</p>
      )}
      <p>Média das notas: {calcularMediaNotas()}</p>
    </>
  );
}

export default CommentList;

