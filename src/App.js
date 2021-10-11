import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    status: 'idle',
  };

  onSearch = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onImageClick = url => {};

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
