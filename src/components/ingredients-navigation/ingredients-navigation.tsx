import { FC } from 'react';
import { nanoid } from 'nanoid';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

interface IIngredientNavigation {
  tabs: {
    TYPE: string;
    NAME: string;
  }[];
  currentTab: string;
  onTabClick: (tab: string) => void;
};

const IngredientsNavigation: FC<IIngredientNavigation> = ({ tabs, currentTab, onTabClick }) => {
  return (
    <nav style={{ display: 'flex' }}>
      {
        tabs.map(tab =>
          <Tab
            key={nanoid()}
            value={tab.NAME}
            active={currentTab === tab.TYPE}
            onClick={() => onTabClick(tab.TYPE)}
          >
            {tab.NAME}
          </Tab>)
      }
    </nav>
  )
}

export default IngredientsNavigation;
