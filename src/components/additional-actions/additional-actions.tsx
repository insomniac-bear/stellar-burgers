import { FC } from "react";
import { nanoid } from "nanoid";
import AdditionalItem from "../additional-item/additional-item";
import styles from "./additional-actions.module.css";

interface IAdditionalItem {
  text: string;
  link: string;
  linkText: string;
}

interface IAdditionalItemProps {
  additionalItems: IAdditionalItem[];
}

const AdditionalActions: FC<IAdditionalItemProps> = ({ additionalItems }) => {
  return (
    <ul className={styles.container}>
      {additionalItems.map((item: IAdditionalItem) => (
        <AdditionalItem
          key={nanoid()}
          text={item.text}
          link={item.link}
          linkText={item.linkText}
        />
      ))}
    </ul>
  );
};

export default AdditionalActions;
