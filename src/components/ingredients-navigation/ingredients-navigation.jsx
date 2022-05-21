import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const ingredientsNavigation = ({ tabs }) => {
  const [current, setCurrent] = React.useState(tabs[0]);

  return (
    <nav style={{ display: 'flex' }}>
      {
        tabs.map((tab, index) => <Tab key={index} value={tab} active={current === tab} onClick={setCurrent}>{tab}</Tab>)
      }
    </nav>
  )
}

ingredientsNavigation.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default ingredientsNavigation