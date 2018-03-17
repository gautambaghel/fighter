import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function game_init(root, channel) {
  ReactDOM.render(<Fighter channel={channel}/>, root);
}

class Fighter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp) });
    }

    gotView(view) {
      this.setState(view.game);
    }

  render() {
    return (
      <div className="row">
         <h2> --- Rendering THIS --- </h2>
      </div> 
    );

  }
}
