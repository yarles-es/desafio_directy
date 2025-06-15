import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { deleteRegister, getallRegisters } from "../../api/registers_api";
import Button from "../../components/Buttons/Button";
import ButtonDelete from "../../components/Buttons/ButtonDelete";
import ButtonEdit from "../../components/Buttons/ButtonEdit";
import DefaultContainer from "../../components/DefaultContainer";
import DefaultPage from "../../components/DefaultPage";
import DefaultTable from "../../components/DefaultTable";
import Input from "../../components/Input";
import ModalUpdateRegister from "../../components/Modals/ModalUpdateRegister";
import Nav from "../../components/Nav";
import useAlert from "../../hooks/useAlert";
import useOrderTable from "../../hooks/useOrderTable";
import type { Title } from "../../types/Table";
import { formatTime } from "../../utils/formatTime";

const CounterTablePage = () => {
  const alert = useAlert();

  const [dates, setDates] = useState({
    initialDate: "",
    finalDate: "",
  });

  const [modal, setModal] = useState({
    id: 0,
    isOpen: false,
  });

  const title: Array<Title> = [
    { key: "id", label: "ID", type: "number", order: true },
    { key: "time", label: "Tempo", type: "number", order: true },
    { key: "createdAt", label: "Data criação", type: "date", order: true },
    { key: "edit", label: "Editar", type: "actions", order: false },
    { key: "delete", label: "Deletar", type: "actions", order: false },
  ];

  const { data, refetch } = useQuery({
    queryKey: ["registers"],
    queryFn: () => getallRegisters(dates.initialDate, dates.finalDate),

    refetchOnWindowFocus: false,
  });

  const { dataOrder: itensOrder, handleOrder } = useOrderTable({
    data: data || [],
    titles: title,
  });

  const handleOrderClick = (title: Title) => {
    return () => handleOrder(title.key);
  };

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteRegister(id),
    onSuccess: () => {
      alert("Registro deletado com sucesso!", "success");
      refetch();
    },
    onError: (error) => {
      alert(error.message, "error");
    },
  });

  const handleDelete = (id: number) => {
    mutate(id);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDates((prev) => ({ ...prev, [name]: value }));
  };

  const validateDates = () => {
    const { initialDate, finalDate } = dates;

    if (initialDate && finalDate) {
      if (new Date(initialDate) > new Date(finalDate)) {
        alert("A data inicial não pode ser maior que a data final.", "error");
        return false;
      }
    }

    return true;
  };

  const handleConsult = () => {
    if (!validateDates()) return;
    refetch();
  };

  return (
    <DefaultPage>
      <DefaultContainer>
        <div className="mb-4.5 flex flex-col">
          <div className="mb-4.5 flex flex-col items-center">
            <Nav />
          </div>
          <div className="flex gap-2 flex-col items-center justify-center lg:flex-row">
            <div>
              <Input
                name="initialDate"
                type="date"
                label="Data inicial:"
                onChange={handleDateChange}
              />
            </div>
            <div>
              <Input
                name="finalDate"
                type="date"
                label="Data final:"
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="mb-4 mt-4 flex flex-col items-center">
            <Button
              primary
              onClick={handleConsult}
              className="flex w-full lg:w-50 justify-center rounded p-3"
            >
              Consultar
            </Button>
          </div>

          <div>
            <DefaultTable>
              <thead className="bg-gray-50 sticky top-0">
                <tr className="bg-[#313d4a] text-left ">
                  {title.map((title, key) =>
                    key === 0 ? (
                      <th
                        onClick={handleOrderClick(title)}
                        id={title.key}
                        key={key}
                        className={`py-4 px-4 font-medium text-white xl:pl-11 max-w-15 ${
                          title.order ? "cursor-pointer" : ""
                        }`}
                      >
                        {title.label}
                      </th>
                    ) : (
                      <th
                        onClick={handleOrderClick(title)}
                        id={title.key}
                        key={key}
                        className={`py-4 px-4 font-medium  text-white ${
                          title.order ? "cursor-pointer" : ""
                        }`}
                      >
                        {title.label}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {itensOrder.map((item, key) => (
                  <tr
                    key={key}
                    className="border-b border-[#2e3a47] hover:bg-[#313d4a]"
                  >
                    <td className="py-4 px-4 text-white xl:pl-11">
                      <p>{item.id}</p>
                    </td>

                    <td className="py-4 px-4 text-white">
                      <p>{formatTime(item.time)}</p>
                    </td>

                    <td className="py-4 px-4 text-white">
                      <p>{new Date(item.createdAt).toLocaleString("pt-BR")}</p>
                    </td>

                    <td className="py-4 px-4 text-white">
                      <ButtonEdit
                        onClick={() => setModal({ id: item.id, isOpen: true })}
                      >
                        Editar
                      </ButtonEdit>
                    </td>

                    <td className="py-4 px-4 text-white">
                      <ButtonDelete onClick={() => handleDelete(item.id)}>
                        Deletar
                      </ButtonDelete>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DefaultTable>
          </div>
        </div>
      </DefaultContainer>

      {modal.id > 0 && (
        <ModalUpdateRegister
          isOpen={modal.isOpen}
          onClose={() => setModal({ id: 0, isOpen: false })}
          id={modal.id}
          refetch={refetch}
        />
      )}
    </DefaultPage>
  );
};

export default CounterTablePage;
