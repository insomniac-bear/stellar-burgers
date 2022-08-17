import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Burgeringredients from "../burger-ingredients/burger-ingredients";
import mainStyles from "./main.module.css";

const Main: FC = () => {
  return (
    <main className={mainStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <Burgeringredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default Main;
