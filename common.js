//simple component
// var Component = React.createClass({
//   propTypes: {
//     name: React.PropTypes.string.isRequired,
//     secondName: React.PropTypes.string,
//     age: React.PropTypes.number
//   },
//   getDefaultProps: function() {
//     return {
//       secondName: '',
//       age: 20
//     }
//   },
//   render: function() {
//     return React.DOM.h1(
//       null,
//       "My name is " + this.props.name  + ' i am ' + this.props.age
//     );
//   }
// });
//
// ReactDOM.render(
//     React.createElement(Component, {
//       name: "Vasya",
//       // age: 23
//     }),
//     document.getElementById('app')
// );

/* вторая часть */

var TextAreaCounter = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      text: '',
    };
  },
  getInitialState: function() {
    return {
      text: this.props.text,
    }
  },
  _textChange: function(ev) {
    this.setState({
      text: ev.target.value
    });
  },
  componentDidUpdate: function(oldProps, oldState) {
    if (this.state.text.length > 10) {
      this.replaceState(oldState);
      alert('много!');
    }
  },
  render: function() {
    var counter = null;
    if (this.state.text.length > 0) {
      counter = React.DOM.h3(null, this.state.text.length);
    }
    return React.DOM.div({
        className: this.props.className
    },
      React.DOM.textarea({
        value: this.state.text,
        onChange: this._textChange
      }),
      counter
    );
  }
});

ReactDOM.render(
  React.createElement(TextAreaCounter, {
    // text: 'Andrey',
    className: "header"
  }),
  document.getElementById('app')
);
