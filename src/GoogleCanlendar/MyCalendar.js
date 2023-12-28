import * as React from 'react';
import * as moment from 'moment';
import Calendar from './Calendar';

export class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      open: false,
    };
  }

  onChange = (value, inputValue) => {
    console.log(value.format('YYYY-MM-DD'));
    this.setState({ value });
  };

  onOpenChange = (status) => {
    console.log('open status: ' + status);
  };

  disabledDate = (currentDate, inputValue) => {
    return false;
  };

  render() {
    const { onChange, onOpenChange, disabledDate } = this;
    const { value } = this.state;
    return (
      <div
        style={{
          width: 200,
          margin: '200px auto',
        }}
      >
        <Calendar
          onChange={onChange}
          allowClear={true}
          value={value}
          disabled={false}
          placeholder={'please input date'}
          format={'YYYY-MM-DD'}
          onOpenChange={onOpenChange}
          disabledDate={disabledDate}
        />
      </div>
    );
  }
}
