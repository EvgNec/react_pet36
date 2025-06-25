import React, { Component } from 'react'
import * as API from '../Service/API/API.js';

export class App extends Component {
  state = {
    news: [],
    search: '',

  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value});
  };

  onSearch = async (e) => {
    e.preventDefault(); // Не дозволяє перезавантажити сторінку
    const { search } = this.state;
    try {
      const newsItem = await API.getNews(search);
      this.setState({ news: newsItem, search: '' }); // або [...prevState.news, ...newsItem] для додавання
    } catch (error) {
      console.log("🚀 ~ App ~ onSearch error:", error);
    }
  };

  render() {
    const { search, news } = this.state;
    return (
      <div>
        <form
          onSubmit={this.onSearch}
        >
          <button type="submit">
            Search
          </button>
          <input
            type="text"
            name="search"
            required
            placeholder="filter name"
            onChange={this.handleChange}
            value={search}
            autoFocus
            autoComplete="off"
          />
        </form>
        <ul>
          {news.map((item, index) => (
            <li key={item.link || index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} width="200" />
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App

