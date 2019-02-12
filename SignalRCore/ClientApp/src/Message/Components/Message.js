import React, { Fragment } from 'react';
import { getDateString } from '../../utils';

const Message = props => {

    return (
        <Fragment>
            <div className="message-username">{props.userName} ~ <b>{getDateString(props.postedAt)}</b></div>
            <div className="well well-sm">
                <div className="message-text">{props.content}</div>

                {
                    props.files ? (
                        props.files.map((file) => {
                            return (
                                <div key={file.id}><a href='#active' onClick={() => props.onDownloadFile(file.id, file.name)}>{file.name}</a></div>
                            );
                        })
                    ) : null
                }

            </div>

            <br />

        </Fragment>
    )
}

export default Message;