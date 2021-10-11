import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  onSearch = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={2500} />
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery query={this.state.searchQuery} page={this.state.page} />
        <Button onClick={this.onLoadMore} />
      </div>
    );
  }
}

export default App;
