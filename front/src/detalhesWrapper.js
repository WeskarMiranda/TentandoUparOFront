import { useParams } from "react-router-dom";
import Detalhes from "./pages/produtoDetalhes";

function DetalhesWrapper() {
  const { codigo } = useParams();

  return <Detalhes codigo={codigo} />;
}

export default DetalhesWrapper;