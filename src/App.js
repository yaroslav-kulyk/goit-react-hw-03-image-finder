import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchQuery: '',
  };

  onSearch = searchQuery => {
    // console.log(searchQuery);
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery query={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
