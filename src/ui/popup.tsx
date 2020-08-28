import * as React from "react";
import * as ReactDOM from "react-dom";

import "../styles/popup.css";

interface IProps {}

interface IState {
  color?: string;
}

class ColorChanger extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      color: "",
    };

    chrome.storage.sync.get("color", (data) => {
      this.setState({
        color: data.color,
      });
    });
  }

  render() {
    return (
      <button
        value={this.state.color}
        onClick={(element) => {
          console.log(this.state.color);
          let eventTarget = element.target as HTMLTextAreaElement;
          let color = eventTarget.value;
          chrome.tabs.query({ active: true, currentWindow: true }, function (
            tabs
          ) {
            chrome.tabs.executeScript(tabs[0].id, {
              code: 'document.body.style.backgroundColor = "' + color + '";',
            });
          });
        }}
        style={{ backgroundColor: this.state.color }}
      ></button>
    );
  }
}

ReactDOM.render(<ColorChanger />, document.getElementById("root"));
