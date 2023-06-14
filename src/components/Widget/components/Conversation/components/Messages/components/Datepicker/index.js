import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserMessage, emitUserMessage } from 'actions';
// import { PROP_TYPES } from 'constants';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Datepicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const handleChange = (date) => {
    setStartDate(null);
    if (date === null) {
      return;
    }
    const { chooseReply } = props;
    const formattedDate = formatDate(date);
    chooseReply(formattedDate, formattedDate);
    // console.log(formatDate(date));
  };

  return (
    <React.Fragment>
      <div className="rw-datepicker-container">
        <DatePicker
          showIcon
          selected={startDate}
          onChange={date => setStartDate(date)}
          placeholderText="Select a date"
          inline
        />
        <button
          className="rw-submit-button"
          onClick={
            () => handleChange(startDate)
          }
        >Submit
        </button>
      </div>
    </React.Fragment>

  );
};

Datepicker.propTypes = {
  chooseReply: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  chooseReply: (payload, title) => {
    if (title) dispatch(addUserMessage(title));
    dispatch(emitUserMessage(payload));
  }
});

export default connect(null, mapDispatchToProps)(Datepicker);
