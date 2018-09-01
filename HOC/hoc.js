<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>higher order component</title>
  </head>
  <body>
    <h2>Higher order component with redux</h2>
    <p>This page demonstrates using React with no build tooling.</p>
    <p>React is loaded as a script tag.</p>

    <!-- We will put our React component inside this div. -->
    <div id="like_button_container"></div>
    <div id="other_container"></div>
    <div id="other_container2"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <!-- Load our React component. -->
    <!-- <script src="like_button.js"></script> -->
    <script type="text/babel">
      const e = React.createElement;

      class LikeButton extends React.Component {
        constructor(props) {
          super(props);
          this.state = { liked: false, inputValue: '', messages: [] };
        }

        inputChanged(e) {
          const messages = [...this.state.messages]
          messages.push(e.target.value);
          console.log(e.target.value);
          this.setState({ inputValue: e.target.value, messages });
        }

        render() {
          console.log('main render');
          return (
            <div>
              <button onClick = {() => this.setState({ liked: !this.state.liked })}>{this.state.liked ? 'Revert!!' : 'Like'}</button>
              <input type="text" onChange={(e) => this.inputChanged(e)} value={this.state.inputValue} />
              <TestPureComponent />
              
              {/* this.state.messages.map((item) => {
                return (
                  <div>
                    <TestPureComponent />
                  </div>
                );
              }) */}
            </div>
          );
        }
      }

      class TestPureComponent extends React.PureComponent {
        render() {
          console.log('r-pure');
          return (
            <h3>this is h1 tag!! {this.props.message}</h3>
          );
        }
      }

      const domContainer = document.querySelector('#like_button_container');
      ReactDOM.render(<LikeButton />, domContainer);
    </script>

  </body>
</html>