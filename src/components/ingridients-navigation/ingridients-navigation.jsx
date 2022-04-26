import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const IngridientsNavigation = ({ tabs }) => {
  const [current, setCurrent] = React.useState(tabs[0]);

  return (
    <nav style={{ display: 'flex' }}>
      {
        tabs.map((tab, index) => <Tab key={index} value={tab} active={current === tab} onClick={setCurrent}>{tab}</Tab>)
      }
    </nav>
  )
}

IngridientsNavigation.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default IngridientsNavigation