import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function game_init(root, channel) {
  ReactDOM.render(<Fighter channel={channel}/>, root);
}

class Fighter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.channel = props.channel;
    this.state = {
      hp1: 500,
      mp1: 100,
      hp2: 500,
      mp2: 100,
    };

    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp) });
    }

    saveState() {
         this.channel.push("saveState", {"hp1": 250})
           .receive("ok", this.gotView.bind(this));
       }
    gotView(view) {
      this.setState(view.game);
    }

/* ATTRIBUTION: basic html and css were provided by Mike Mangialardi,
who wrote this https://medium.com/coding-artist/vue-js-pokemon-battle-tutorial-380cd72eb681
tutorial that we are taking the super basic fighter style layout from. The rest of
his tutorial is not used as it doesn't apply. */

  render() {
    return (
      <div className="game-page">
      <div className="row">
      </div>

      <div className="row">
           <div>
             <div className="battle-scene">
               <div className="box-top-left">
                 <h2 className="fighter"></h2>
                 <div className="hp-bar-top">
                   <div className="hp-bar-fill"></div>
                 </div>
                 <div className="mp-bar-top">
                   <h4>hi</h4>
                 </div>
                 <h4 className="level"></h4>
               </div>
               <div className="box-top-right">
                 <img className="fighter-top" />
               </div>
               <div className="box-bottom-left">
                 <img className="fighter-bottom" />
               </div>
               <div className="box-bottom-right">
                 <h2 className="fighter"></h2>
                 <div className="hp-bar-bottom">
                   <div className="hp-bar-fill"></div>
                 </div>
                 <h4 className="level"></h4>
                 <h4 className="hp"></h4>
               </div>
               <div className="bottom-menu">
                 <div className="battle-text text-box-left">
                 </div>
                 <div className="text-box-right">
                   <h4 className="battle-text-top-left"></h4>
                   <h4 className="battle-text-bottom-left"></h4>
                   <h4 className="battle-text-top-right"></h4>
                   <h4 className="battle-text-bottom-right"></h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="save-button">
            <Button onClick={ () => {this.saveState();} }>Save</Button>
         </div>

        </div>
    );

  }
}
