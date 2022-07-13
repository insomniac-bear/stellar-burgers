import PropTypes from 'prop-types';

const FeedCompletedCount = ({ count, type }) => {
  const period = type === 'onTotal' ? 'все время' : 'сегодня';
  return(
    <div className='pt-10'>
      <p className='text text_type_main-default'>Выполнено за {period}:</p>
      <p className='text text_type_digits-large'>{count}</p>
    </div>
  );
};

FeedCompletedCount.propTypes = {
  count: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['onToday', 'onTotal']).isRequired,
};

export default FeedCompletedCount;