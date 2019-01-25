import React from 'react';
import utils from '../../utils';
import {Link} from 'react-router-dom';

const Message = props => {

  let content = null;
  const imgExp = /(\.jpg|\.jpeg|\.gif|\.png|\.bmp)$/i;

  if (props.link){
    if(imgExp.test(props.link))
      content = <Link to={props.link}><img src={props.link} width='30' height='30' /></Link>;
    else
      content = <Link to={props.link}>download</Link>
  }

  return (
    <div className="message" id={props.key}>
      <div className="message-username">{props.userName} ~ <b>{utils.getDateString(props.postedAt)}</b></div>
      <div className="message-text">{text}</div>

      {content}

    </div>
  )
}

export default Message;