import React from 'react';
import logo from './logo.svg';

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img
        src={logo}
        style={{
          position: 'absolute',
          left: mouse.x,
          top: mouse.y,
          width: '30px',
          height: '30px'
        }}
      />
    );
  }
}

class Mouse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '300px' }} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

export default class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: 0 };
    setInterval(
      () =>
        this.setState(prev => ({
          timer: ++prev.timer
        })),
      1000
    );
  }
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }
  render() {
    return (
      <div>
        <h1>Move the mouse around! {this.state.timer}</h1>
        <Mouse>{this.renderTheCat}</Mouse>
      </div>
    );
  }
}
