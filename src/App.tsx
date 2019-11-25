import React, { Component } from 'react';
import './App.css';

interface Props {
    httpClient: HttpClient
}


interface State {
    data: string[]
}

class App extends Component<Props, State> {

  httpClient: HttpClient;

  constructor(props: Props) {
    super(props);
    this.httpClient = props.httpClient;

    this.state = {
      data: []
    }
  }

  getData = () => {
      this.httpClient.get<string[]>('/data')
          .then((response) => {
              this.setState({
                  data: response
              })
          })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div className="App">
          <div className="data">
              {this.state.data.map((item, i) => (
                  <div key={i} className="data-item">{item}</div>
              )}
            </div>
          <button className="data-button" onClick={this.getData}>
              get new data
          </button>
      </div>
    );
  }
}

export default App;
