import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createRegister } from "../../api/registers_api";
import Button from "../../components/Button";
import DefaultContainer from "../../components/DefaultContainer";
import DefaultPage from "../../components/DefaultPage";
import useAlert from "../../hooks/useAlert";

function formatTime(ms: number): string {
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const millis = Math.floor((ms % 1000) / 100);

  const pad = (n: number, len = 2) => String(n).padStart(len, "0");

  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${millis}`;
}

const CounterPage = () => {
  const alert = useAlert();
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState({
    isRunning: false,
    isSaving: false,
  });

  useEffect(() => {
    let interval: number;

    if (status.isRunning) {
      interval = setInterval(() => setTime((t) => t + 100), 100);
    }

    return () => clearInterval(interval);
  }, [status.isRunning]);

  const handleButtonClick = () => {
    if (status.isRunning) {
      mutation.mutate();
    } else {
      setTime(0);
      setStatus((prev) => ({ ...prev, isRunning: true }));
    }
  };

  const mutation = useMutation({
    mutationFn: () => createRegister({ time }),

    onMutate: async () => {
      setStatus({ isSaving: true, isRunning: false });
    },

    onSuccess: () => {
      alert("Tempo salvo com sucesso!", "success");
      setStatus((prev) => ({ ...prev, isSaving: false }));
    },

    onError: (error) => {
      alert(`Erro ao salvar tempo: ${error}`, "error");
      setStatus((prev) => ({ ...prev, isSaving: false }));
    },
  });

  return (
    <DefaultPage>
      <DefaultContainer>
        <div className="mb-4.5 flex flex-col gap-6 items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-white">Contador de Tempo</h1>

          <p className="text-4xl font-extrabold text-[#219653] drop-shadow-lg">
            {formatTime(time)}
          </p>

          <Button
            onClick={handleButtonClick}
            className="flex w-full lg:w-50 justify-center rounded p-3"
            primary
            disabled={status.isSaving}
          >
            {status.isSaving
              ? "Salvando..."
              : status.isRunning
              ? "Finalizar Contagem"
              : "Iniciar Contagem"}
          </Button>
        </div>
      </DefaultContainer>
    </DefaultPage>
  );
};

export default CounterPage;
