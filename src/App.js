import React, {Component} from 'react';
import PlayStore from './playstore/playstore';


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      apps: [],
      genres: '',
      sort: '',
      error: null
    }
  }

  setGenre(genres) {
    this.setState({
      genres
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;
console.log(url);
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        });
      })

  }

  render() {
    //map over all the apps
    const apps = this.state.apps.map((app, i) => {
      return <PlayStore {...app} key={i}/>
    })
    console.log(apps);
    return (
      <main className="App">
        <h1>Google Play Store apps</h1>
        <div className="genres">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="genres">Search: </label>
            <select id="genres" name="genres" onChange={e => this.setGenre(e.target.value)}>
              <option value="">None</option>
              <option value="action">Action</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
              <option value="casual">Casual</option>
              <option value="arcade">Arcade</option>
              <option value="card">Card</option>
            </select>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="rating">Rating</option>
              <option value="app">App</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;
