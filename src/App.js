import React, { Component } from "react";
import axios from "axios";

import "./App.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      quote: "",
      author: "",
      colors: [
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857",
        "#1b7fbd",
        "#ff6768",
        "#484c7f",
        "#ffbd39",
        "#6b48ff"
      ]
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
      this.animateShow();
    } catch (err) {
      console.error(err);
    }
  };

  animateShow = () => {
    var quoteText = document.getElementById("text");
    var quoteAuthor = document.getElementById("author");
    quoteText.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 700,
      fill: "forwards"
    });
    quoteAuthor.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 700,
      fill: "forwards"
    });
  };

  animateHide = () => {
    var quoteText = document.getElementById("text");
    var quoteAuthor = document.getElementById("author");
    quoteText.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 700,
      fill: "forwards"
    });
    quoteAuthor.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 700,
      fill: "forwards"
    });
  };

  generateQuote = () => {
    const { quotes } = this.state;
    const randNum = Math.floor(Math.random() * quotes.length);
    const quoteObj = quotes[randNum];
    this.setState({
      quote: quoteObj.quote,
      author: quoteObj.author
    });
  };

  newQuote = () => {
    this.animateHide();
    setTimeout(() => this.generateQuote(), 700);
    setTimeout(() => this.animateShow(), 700);
  };

  render() {
    const { quote, author, colors } = this.state;

    const randColor = colors[Math.floor(Math.random() * colors.length)];
    const buttonColor = {
      backgroundColor: randColor
    };
    return (
      <div
        id="wrapper"
        style={{ backgroundColor: randColor, color: randColor }}
      >
        <div id="quote-box">
          <div id="text">
            <h1>
              <i className="fas fa-quote-left" />
              {" " + quote}
            </h1>
          </div>
          <div id="author">
            <h3>{author}</h3>
          </div>
          <a
            id="tweet-quote"
            href={
              "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent('"' + quote + '" \n' + author)
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            <button id="tweet-button" style={buttonColor}>
              <i class="fab fa-twitter" />
            </button>
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={
              "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
              encodeURIComponent(author) +
              "&content=" +
              encodeURIComponent(quote) +
              "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
            }
          >
            <button id="tumblr-button" style={buttonColor}>
              <i class="fab fa-tumblr" />
            </button>
          </a>
          <button id="new-quote" onClick={this.newQuote} style={buttonColor}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default App;
