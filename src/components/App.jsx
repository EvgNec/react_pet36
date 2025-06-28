import React, { Component } from 'react';
import * as API from '../Service/API/API.js';
import css from './App.module.css';  // <-- Імпортуємо

export class App extends Component {
  state = {
    news: [],
    search: '',
    nextPage: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSearch = async e => {
    e.preventDefault(); // Не дозволяє перезавантажити сторінку
    const { search } = this.state;
    try {
      const newsItem = await API.getNews(search);
      this.setState({ news: newsItem.results, nextPage: newsItem.nextPage });
    } catch (error) {
      console.log('🚀 ~ App ~ onSearch error:', error);
    }
  };

  onSearchMore = async e => {
    e.preventDefault(); // Не дозволяє перезавантажити сторінку
    const { search, nextPage } = this.state;
    try {
      const newsItem = await API.addNews(search, nextPage);
      this.setState(prevState => ({
        news: [...prevState.news, ...newsItem.results],
        nextPage: newsItem.nextPage,
      }));
    } catch (error) {
      console.log('🚀 ~ App ~ onSearch error:', error);
    }
  };

  render() {
    const { search, news } = this.state;
    return (
      <div className={css.container}>
        <form onSubmit={this.onSearch} className={css.form}>
          <button type="submit" className={css.button}>Search</button>
          <input
            type="text"
            name="search"
            required
            placeholder="filter name"
            onChange={this.handleChange}
            value={search}
            autoFocus
            autoComplete="off"
            className={css.input}
          />
        </form>
        <ul className={css.list}>
          {news.map((item, index) => (
            <li key={item.link || index} className={css.item}>
              <h3>{item.pubDate} {item.title}</h3>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Перейти до статті
              </a>
              <p>{item.description}</p>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} width="200" className={css.image} />
              )}
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.onSearchMore} className={css.button}>
          More
        </button>
      </div>
    );
  }
}

export default App;