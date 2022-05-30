import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemDataTypes } from '../../utils/const';

const IngredientsNavigation = ({ tabs, currentTab, onTabClick }) => {
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

IngredientsNavigation.propTypes = {
  tabs: PropTypes.arrayOf(itemDataTypes.isRequired).isRequired,
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
}

export default IngredientsNavigation