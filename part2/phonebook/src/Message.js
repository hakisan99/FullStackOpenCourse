import React from 'react';

const MessageDisplay = ({messageDisplay}) => {
    if(!messageDisplay.message){
        return ''
    };
    return (
        <div className={`message-action-${messageDisplay.type}`}>
            {messageDisplay.message}
        </div>
    )
}

export default MessageDisplay