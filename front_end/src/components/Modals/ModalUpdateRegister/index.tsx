import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getRegisterById, updateRegister } from "../../../api/registers_api";
import useAlert from "../../../hooks/useAlert";
import Button from "../../Buttons/Button";
import Input from "../../Input";
import Modal from "../Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  refetch: () => void;
};

const ModalUpdateRegister: React.FC<Props> = ({
  isOpen,
  onClose,
  id,
  refetch,
}) => {
  const alert = useAlert();
  const { data: register } = useQuery({
    queryKey: ["register", id],
    queryFn: () => getRegisterById(id),
    enabled: isOpen && id > 0,
  });

  const [date, setDate] = useState<string>(register?.createdAt || "");

  const { mutate } = useMutation({
    mutationFn: (newDate: string) => updateRegister(id, { createdAt: newDate }),
    onSuccess: () => {
      alert("Registro atualizado com sucesso!", "success");
      refetch();
      onClose();
    },
    onError: (error) => {
      alert("Erro ao atualizar o registro: " + error.message, "error");
    },
  });

  const handleUpdate = () => {
    if (date && date !== register?.createdAt) {
      mutate(date);
    } else {
      alert("Por favor, selecione uma data válida.", "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseClicked={true}>
      <div className="flex flex-col gap-4 items-center">
        <Input
          label="Selecione a nova data de criação:"
          type="date"
          value={date && new Date(date).toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button
          onClick={handleUpdate}
          primary
          className="flex w-full lg:w-50 justify-center rounded p-3"
        >
          Modificar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalUpdateRegister;
