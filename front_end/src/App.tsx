import { useNavigate } from "react-router-dom";
import Button from "./components/Buttons/Button";
import DefaultContainer from "./components/DefaultContainer";
import DefaultPage from "./components/DefaultPage";
import Nav from "./components/Nav";

function App() {
  const navigate = useNavigate();

  return (
    <DefaultPage>
      <DefaultContainer>
        <div className="mb-4.5 flex flex-col gap-6 items-center justify-center text-center">
          <Nav />
          <h1 className="text-2xl font-bold text-white">
            Bem vindo ao contador de tempo!
          </h1>
          <p className="mt-4 text-gray-300">
            Projeto desenvolvido para o desafio de front-end da empresa Directy
          </p>
          <Button
            className="flex w-full lg:w-100 justify-center rounded p-3"
            primary
            type="button"
            onClick={() => navigate("/counter")}
          >
            Iniciar
          </Button>
        </div>
      </DefaultContainer>
    </DefaultPage>
  );
}

export default App;
