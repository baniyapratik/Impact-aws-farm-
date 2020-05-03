import React from 'react';
import { faMarsDouble } from '@fortawesome/free-solid-svg-icons';

const Message = (props) => {
    return (<div className="">
        <div className="col">
            <div class="card">
                <div class="card-body">
                    {props.speaks === 'bot' && 
                        <div className="col-sm-4">
                            <a className="glyphicon glyphicon-user">{props.speaks}</a>
                        </div>
                    }
                    {props.speaks === 'me' && 
                        <div className="col-sm-4">
                            <a className="glyphicon glyphicon-user">{props.speaks}</a>
                        </div>
                    }
                    <div className="col-8">
                        <span className="text-primary">
                            {props.text}
                        </span>
                    </div>
                    
                </div>
            </div>  
        </div>
    </div>)
}

export default Message;