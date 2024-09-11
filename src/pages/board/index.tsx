import { CardBoard } from "@/components/Templates";
import { Button } from "@/components/ui/button";
import { IBoard } from "@/interfaces/board.interfaces";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ModalAddTask } from "./components";
import ModalAddBoard from "./components/ModalAddBoard";
import ModalDelete from "./components/ModalDelete";
import { useBoardAction } from "./hooks/board.hooks";

const BoardPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();

  const {
    formikBoard,
    isLoadAdd,
    isModalAddBoard,
    selectedBoard,
    setSelectedBoard,
    isModalAddTask,
    setIsModalAddTask,
    boards,
    isLoadBoard,

    setModalAddBoard,
    isLoadAddTask,
    formikTask,

    isOpenAlert,
    onOpenAlert,
    setIsOpenAlert,
    setSelectedTask,
    handleDeleteTask,
    isLoadDeleteTask,
    openModalUpdate,
  } = useBoardAction();

  // const handleMoveTask = async (body: IMoveTask) => {
  //   try {
  //     const resp = await API.post("/task/move", body);
  //     console.log(resp?.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <div className=" h-screen">
      <div className="flex justify-between my-3 px-5">
        <div className="text-lg font-semibold text-blue-400">TODO</div>

        <div className="flex gap-4">
          <Button
            className="bg-blue-600"
            onClick={() => setModalAddBoard(true)}
          >
            Add Board
          </Button>
          <Button className="bg-red-500" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="flex gap-3 mt-10 overflow-x-auto px-5">
        {boards?.map((item: IBoard, idx: number) => (
          <CardBoard
            key={idx + "board"}
            board={item}
            setSelectedTask={setSelectedTask}
            onOpenAlert={onOpenAlert}
            openModalUpdate={openModalUpdate}
            setOpenModalBoard={() => {
              setSelectedBoard(item);
              setModalAddBoard(true);
            }}
            onOpenModalTask={() => {
              setSelectedBoard(item);
              setIsModalAddTask(true);
            }}
          />
        ))}
      </div>

      {isModalAddTask && (
        <ModalAddTask
          isLoadAddTask={isLoadAddTask}
          isOpen={isModalAddTask}
          formik={formikTask}
          onCancel={() => {
            setIsModalAddTask(false);
            setSelectedBoard(null);
            setSelectedTask(null);
          }}
          onClose={() => {
            setIsModalAddTask(false);
            setSelectedBoard(null);
            setSelectedTask(null);
            formikBoard?.resetForm();
          }}
        />
      )}

      {isLoadBoard && (
        <div className="flex flex-row items-center py-5 justify-center w-screen bg-white">
          <FaSpinner className="animate-spin mr-2" />
          <div>Loading...</div>
        </div>
      )}

      {isModalAddBoard && (
        <ModalAddBoard
          setSelectedBoard={() => setSelectedBoard(null)}
          selectedBoard={selectedBoard}
          formik={formikBoard}
          isLoadAdd={isLoadAdd}
          isOpen={isModalAddBoard}
          setOpenModal={setModalAddBoard}
        />
      )}

      {isOpenAlert && (
        <ModalDelete
          isOpen={isOpenAlert}
          isLoading={isLoadDeleteTask}
          onOK={handleDeleteTask}
          setIsOpen={() => setIsOpenAlert(false)}
          onClose={() => {
            setIsOpenAlert(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default BoardPage;
