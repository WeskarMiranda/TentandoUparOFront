import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [orderBy, setOrderBy] = useState("nome");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProdutos, setFilteredProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/produto")
    .then((response) => response.json())
    .then((data) => {
      const produtosData = data;
      const produtosPorCategoria = {};

      // Organiza os produtos por categoria
      produtosData.forEach(produto => {
        if (!produtosPorCategoria[produto.categoria]) {
          produtosPorCategoria[produto.categoria] = [];
        }
        produtosPorCategoria[produto.categoria].push(produto);
      });

      setProdutos(produtosPorCategoria);
      setIsLoading(false);
    })
    .catch(handleFetchError);

    fetch("http://localhost:3001/categoria")
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch(handleFetchError);

    
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (codigo) => {
    navigate(`/produtoDetalhes/${codigo}`);
  };

  const handleFetchError = (error) => {
    console.error("Erro ao carregar produtos:", error);
  };

  const handleCategoriaChange = (event) => {
    const selectedCategoryId = parseInt(event.target.value, 10);
    setSelectedCategoria(selectedCategoryId);
  };
  

  const handleOrderByChange = (event) => {
    const [newOrderBy, newOrderDirection] = event.target.value.split(",");
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    const allProdutos = Object.values(produtos).reduce(
      (acc, curr) => acc.concat(curr),
      []
    );
  
    const filteredProdutos = allProdutos.filter((produto) =>
      produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (filteredProdutos.length > 0) {
      const sortedProdutos = [...filteredProdutos].sort(compareProdutos);
      setFilteredProdutos(sortedProdutos);
    } else {
      setFilteredProdutos([]);
    }
  };
  ;
  
  
  

  const compareProdutos = (a, b) => {
    let comparison = 0;
    if (orderBy === "nome") {
      comparison = a.nome.localeCompare(b.nome);
    } else if (orderBy === "preco") {
      comparison = a.preco - b.preco;
    }
    if (orderDirection === "desc") {
      comparison *= -1;
    }
    return comparison;
  };

  return (
    <div className="container text-center">
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <h1>Catálogo de Produtos</h1>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="searchQuery">Buscar por nome:</label>
              <div className="input-group">
                <input
                  
                  id="searchQuery"
                  type="text"
                  className="form-control"
                  value={searchQuery}
                  onChange={handleSearchQueryChange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSearchButtonClick}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <label htmlFor="orderby">Ordenar por:</label>
              <select
                id="orderby"
                className="form-control"
                value={`${orderBy},${orderDirection}`}
                onChange={handleOrderByChange}
              >
                <option value="nome,asc">Nome (A-Z)</option>
                <option value="nome,desc">Nome (Z-A)</option>
                <option value="preco,asc">Preço (Menor para Maior)</option>
                <option value="preco,desc">Preço (Maior para Menor)</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <label htmlFor="categoria">Categoria:</label>
              <select
                id="categoria"
                className="form-control"
                value={selectedCategoria}
                onChange={handleCategoriaChange}
              >
                <option value="">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCategoria ? (
            <div>
              <br />
              <hr />
              <h1>{categorias.find(cat => cat._id === selectedCategoria)?.nome}</h1>
              <br />
              <div className="row">
                {filteredProdutos.map((produto) => (
                  <div className="col-md-4" key={produto.codigo}>
                    <div className="card">
                      <img
                        src={`data:image/jpeg;base64,${btoa(
                          String.fromCharCode(...produto.imagem.data),
                        )}`}
                        alt={produto.nome}
                        className="card-img-top"
                        style={{ objectFit: "cover", height: "200px" }}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{produto.nome}</h5>
                        <p className="card-text">Preço: R$ {produto.preco}</p>

                        <button
                          className="btn btn-primary"
                          onClick={() => handleButtonClick(produto.codigo)}
                        >
                          Detalhes do Produto
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            categorias.map((categoria) => (
              <div key={categoria._id}>
                <br />
                <hr />
                <h1>{categoria.nome}</h1>
                <br />
                <div className="row">
                  {produtos[categoria._id]?.map((produto) => (
                    <div className="col-md-4" key={produto.codigo}>
                      <div className="card">
                        <img
                          src={`data:image/jpeg;base64,${btoa(
                            String.fromCharCode(...produto.imagem.data),
                          )}`}
                          alt={produto.nome}
                          className="card-img-top"
                          style={{ objectFit: "cover", height: "200px" }}
                        />

                        <div className="card-body">
                          <h5 className="card-title">{produto.nome}</h5>
                          <p className="card-text">Preço: R$ {produto.preco}</p>

                          <button
                            className="btn btn-primary"
                            onClick={() => handleButtonClick(produto.codigo)}
                          >
                            Detalhes do Produto
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}

export default Home;








