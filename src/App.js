import React, { Component } from "react";
import axios from "axios";

import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      quote: "",
      author: ""
    };
  }

  componentDidMount = async () => {
    try {
      const quoteData = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );

      const data = quoteData.data.quotes;
      const randNum = Math.floor(Math.random() * data.length);
      const quoteObj = data[randNum];

      this.setState({
        quotes: data,
        quote: quoteObj.quote,
        author: quoteObj.author
      });
      //console.log(this.state.quote, this.state.author);
    } catch (err) {
      console.error(err);
    }
  };

  newQuote = () => {
    const { quotes } = this.state;
    const randNum = Math.floor(Math.random() * quotes.length);
    const quoteObj = quotes[randNum];
    this.setState({
      quote: quoteObj.quote,
      author: quoteObj.author
    });
  };

  render() {
    const { quote, author } = this.state;
    return (
      <div id="wrapper">
        <div id="quote-box">
          <div id="text">
            <h1>{quote}</h1>
          </div>
          <div className="author">{author}</div>
          <a id="tweet-quote" href="https://twitter.com/intent/tweet">
            <button className="tweet-button">Tweet Quote</button>
          </a>
          <button id="new-quote" onClick={this.newQuote}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
