import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function game_init(root, channel, currentPlayer) {
  ReactDOM.render(<Fighter channel={channel} currentPlayer={currentPlayer}/>, root);
}

class Fighter extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      turnp1: true, //is it player1's turn
      p1_status: 0,
      p2_status: 0,
      player1: { name: "-bot-", hp: 500, mp: 100 },
      player2: { name: "-bot-", hp: 500, mp: 100 },
      p1_items: { attack: true, block: true, mp: true },
      p2_items: { attack: true, block: true, mp: true },
    };

    this.channel.join()
        .receive("ok", this.gotView.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp) });
    }

    gotView(view) {
      this.setState(view.game);
    }

    sendAttack(action) {
      var state = this.state
      if(state.player1.name == "-bot-") {
        state.player1.name = this.props.currentPlayer
      } else if(state.player2.name == "-bot-") {
        state.player2.name = this.props.currentPlayer
      }

      this.channel.push("attack", {
        player1: state.player1 ,
        player2: state.player2 ,
        turnp1: false})
        .receive("ok", this.gotView.bind(this));
    }

    sendAction(action) {
    this.sendAttack(action)
    this.state.p1_status = action
      setTimeout(() => {
        this.returnIdle()
      }, 1000);
    }

    returnIdle() {
      this.setState({
        p1_status: 0
      });
    }


/* ATTRIBUTION: basic html and css were provided by Mike Mangialardi,
who wrote this https://medium.com/coding-artist/vue-js-pokemon-battle-tutorial-380cd72eb681
tutorial that we are taking the super basic fighter style layout from. The rest of
his tutorial is not used as it doesn't apply. */

// images of the top two figures
//https://imgur.com/a/TJbOJ  https://imgur.com/a/CtMo3

  render() {
    const playerTurn = this.state.turnp1;
    return (
      <div>
        <div>
          <img src="https://i.imgur.com/sQnbG5s.png" className="top-image-left"/>
          <img src="https://i.imgur.com/SdjJ3IZ.png" className="top-image-right"/>
        </div>
      <div>
      <div className="game-page">
           <div>
             <div className="battle-scene">
               <div className="box-top-left">
                 <h2 className="fighter"></h2>
                 <div className="hp-bar-top">
                   <HealthBar hp={this.state.player1.hp}></HealthBar>
                 </div>
                 <div className="mp-bar-top">
                   <StaminaBar mp={this.state.player1.mp}></StaminaBar>
                 </div>
                 <h4 className="level">{this.state.player1.name}</h4>
                 {playerTurn ? (
                   <img src="http://iconshow.me/media/images/ui/ios7-icons/png/512/arrow-left-b.png" className="pointer" />
                 ) : <h5></h5>}
                 <h5 className="hp-text">HP</h5>
                 <h5 className="mp-text">MP</h5>
                 <h5 className="hp">{this.state.player1.hp}/500</h5>
                 <h5 className="mp">{this.state.player1.mp}/100</h5>
               </div>
               <div className="box-top-right">
                 <PlayerOne status={this.state.p1_status}></PlayerOne>
               </div>
               <div className="box-bottom-left">
                 <PlayerTwo status={this.state.p2_status}></PlayerTwo>
               </div>
               <div className="box-bottom-right">
                 <h2 className="fighter"></h2>
                 <div className="hp-bar-bottom">
                   <HealthBar hp={this.state.player2.hp}></HealthBar>
                 </div>
                 <div className="mp-bar-bottom">
                  <StaminaBar mp={this.state.player2.mp}></StaminaBar>
                 </div>
                 <h4 className="level">{this.state.player2.name}</h4>
                   {playerTurn ? (
                     <h5></h5>
                   ) : (
                     <img src="http://iconshow.me/media/images/ui/ios7-icons/png/512/arrow-left-b.png" className="pointer" />
                   )}
                 <h5 className="hp-text">HP</h5>
                 <h5 className="mp-text">MP</h5>
                 <h5 className="hp">{this.state.player2.hp}/500</h5>
                 <h5 className="mp">{this.state.player2.mp}/100</h5>
               </div>
               <div className="bottom-menu">
                 <div className="battle-text-text-box-left">
                   { this.state.p1_items.attack ? (
                     <Button className="attack-boost-button" color="warning" size="sm" onClick={ () => {this.sendAction(3);} }>Attack Boost</Button>
                   ) : (<h5></h5>)}
                   { this.state.p1_items.block ? (
                     <Button className="block-boost-button" color="warning" size="sm" onClick={ () => {this.sendAction(4);} }>Block Boost</Button>
                   ) : (<h5></h5>)}
                   { this.state.p1_items.mp ? (
                     <Button className="stamina-boost-button" color="warning" size="sm" onClick={ () => {this.sendAction(5);} }>Stamina Boost</Button>
                   ) : (<h5></h5>)}
                 </div>
                 <div className="text-box-right">
                   <Button className="battle-text-top-left" color="link" onClick={ () => {this.sendAction(1);} }>Attack</Button>
                   <Button className="battle-text-top-right" color="link" onClick={ () => {this.sendAction(2);} }>Block</Button>
                   <Button className="battle-text-bottom-right" color="link" onClick={ () => {this.sendAction(6);} }>Skip</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );

  }
}

function PlayerOne(params) {
  switch (params.status) {
    case 0: //resting https://imgur.com/a/6Y8J0
    return (
    <img src="https://i.imgur.com/YapuSsT.png" className="fighter-top" />
    );
    case 1:
    return ( //attack https://imgur.com/a/0xfXy
        <img src="https://i.imgur.com/Vnjgiaj.png" className="fighter-top" />
    );
    case 2: //block https://imgur.com/a/35fMZ
    return (
        <img src="https://i.imgur.com/zIcDUsN.png" className="fighter-top" />
    );
    case 3: //attack item https://imgur.com/a/2b0oT
    return (
        <img src="https://i.imgur.com/dJuiQ9R.png" className="fighter-top" />
    );
    case 4: //block item https://imgur.com/a/2b0oT
    return (
        <img src="https://i.imgur.com/dJuiQ9R.png" className="fighter-top" />
    );
    case 5: //stamina item https://imgur.com/a/2b0oT
    return (
        <img src="https://i.imgur.com/dJuiQ9R.png" className="fighter-top" />
    );
    case 6: //skip https://imgur.com/a/6Y8J0
    return (
    <img src="https://i.imgur.com/YapuSsT.png" className="fighter-top" />
    );
  }
}

function PlayerTwo(params) {
  switch (params.status) {
    case 0: //resting https://imgur.com/a/EBJsp
    return (
    <img src="https://i.imgur.com/0hoeM9F.png" className="fighter-bottom" />
    );
    case 1:
    return ( //attack https://imgur.com/a/U0bVQ
        <img src="https://i.imgur.com/nonFNdU.png" className="fighter-bottom" />
    );
    case 2: //block https://imgur.com/a/pI8N6
    return (
        <img src="https://i.imgur.com/G2W0nVK.png" className="fighter-bottom" />
    );
    case 3: //attack item https://imgur.com/a/zaLbH
    return (
        <img src="https://i.imgur.com/d0wQ482.png" className="fighter-bottom" />
    );
    case 4: //block item https://imgur.com/a/zaLbH
    return (
        <img src="https://i.imgur.com/d0wQ482.png" className="fighter-bottom" />
    );
    case 5: //stamina item https://imgur.com/a/zaLbH
    return (
        <img src="https://i.imgur.com/d0wQ482.png" className="fighter-bottom" />
    );
    case 6: //skip https://imgur.com/a/EBJsp
    return (
    <img src="https://i.imgur.com/0hoeM9F.png" className="fighter-bottom" />
    );
  }
}

function HealthBar(params) {
  var health = params.hp;
  if (health == 500) {
    return (
      <div className="hp-bar-fill"></div>
    );
  }
  else
  if (health <= 5) {
    return (
      <div className="hp-bar-0"></div>
    );
  }
  else
  if (health <= 100) {
    return (
      <div className="hp-bar-100"></div>
    );
  }
  else
  if (health <= 200) {
    return (
      <div className="hp-bar-200"></div>
    );
  }
  else
  if (health <= 300) {
    return (
      <div className="hp-bar-300"></div>
    );
  }
  else
  if (health <= 400) {
    return (
      <div className="hp-bar-400"></div>
    );
  }
  else {
    return (
      <div className="hp-bar-500"></div>
    );
  }
}

function StaminaBar(params) {
  var stamina = params.mp;
  if (stamina == 100) {
    return (
      <div className="mp-bar-fill"></div>
    );
  }
  else
  if (stamina <= 2) {
    return (
      <div className="mp-bar-0"></div>
    );
  }
  else
  if (stamina <= 20) {
    return (
      <div className="mp-bar-20"></div>
    );
  }
  else
  if (stamina <= 40) {
    return (
      <div className="mp-bar-40"></div>
    );
  }
  else
  if (stamina <= 60) {
    return (
      <div className="mp-bar-60"></div>
    );
  }
  else
  if (stamina <= 80) {
    return (
      <div className="mp-bar-80"></div>
    );
  }
  else {
    return (
      <div className="mp-bar-100"></div>
    );
  }
}
