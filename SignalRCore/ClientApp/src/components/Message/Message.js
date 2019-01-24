import React from 'react';
import utils from '../../utils';

const Message = props => {
  return (
    <div className="message">
    {
      props.files.map((file, i) => {
        return(
          <div className="message-file"> {file} </div>);
      })
    }

    <div className="message-username">{props.userName} ~ <b>{utils.getDateString(props.postedAt)}</b></div>
    <div className="message-text">{props.contents}</div>
  </div>
  )
}

export default Message;