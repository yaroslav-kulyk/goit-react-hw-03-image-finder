import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    status: 'idle',
    showModal: false,
    modalURL: '',
  };

  onSearch = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  showModal = url => {
    console.log(url);
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalURL: url,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <div>
        <ToastContainer autoClose={2500} />
        {this.state.showModal && (
          <Modal url={this.state.modalURL} onClose={this.closeModal} />
        )}
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery
          query={this.state.searchQuery}
          page={this.state.page}
          onImageClick={this.showModal}
        />
        <Button onClick={this.onLoadMore} />
      </div>
    );
  }
}

export default App;
