import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    searchQuery: '',
  };

  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=22978515-5cb8795ed8e9eafc86c022855&image_type=photo&orientation=horizontal&per_page=12',
    )
      .then(r => r.json())
      .then(console.log);
  }

  onSearch = searchQuery => {
    // console.log(searchQuery);
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSearch} />
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
