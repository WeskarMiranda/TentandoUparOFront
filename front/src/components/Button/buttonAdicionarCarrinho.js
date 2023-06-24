import React from "react";
import { useHistory } from "react-router-dom";

function ButtonAdicionarCarrinho({ produto, cartItems, setCartItems }) {
  const history = useHistory();

  const handleAdicionarCarrinho = () => {
    // Verifica se o produto já está no carrinho
    const itemExistente = cartItems.find((item) => item.codigo === produto.codigo);

    if (itemExistente) {
      // Caso o produto já esteja no carrinho, você pode implementar sua lógica específica aqui,
      // como aumentar a quantidade do produto no carrinho ou exibir uma mensagem de erro.
      console.log("O produto já está no carrinho!");
    } else {
      // Caso contrário, adiciona o produto ao carrinho
      const novoItem = { codigo: produto.codigo, quantidade: 1 };
      setCartItems([...cartItems, novoItem]);
      console.log("Produto adicionado ao carrinho!");

      // Navega para a tela de checkout
      history.push("/checkout");
    }
  };

  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={handleAdicionarCarrinho}
    >
      Adicionar ao Carrinho
    </button>
  );
}

export default ButtonAdicionarCarrinho;
