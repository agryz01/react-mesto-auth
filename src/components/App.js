import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Promise.all([
      api.getUserInformation(),
      api.getCards()
    ])
      .then(([userData, cardData]) => {
        setCards(cardData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }, [])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api.setUserInformation(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleCardLike(card) {
    const isFavourites = card.likes.some(item => item._id === currentUser._id);

    api.toggleCardLikes(isFavourites, card._id).then((newCard) => {
      setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleCardDelete(card) {
    api.deletCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);
    api.addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль 
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <EditProfilePopup buttonText={isLoading? 'Сохранение...' : 'Сохранить'} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} />
        <AddPlacePopup buttonText={isLoading? 'Создание...' : 'Создать'} onAddPlace={handleAddPlace} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />
        <EditAvatarPopup buttonText={isLoading? 'Сохранение...' : 'Сохранить'} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} />
        <PopupWithForm name='window_confirmation' title='Вы уверены?' buttonText='Да' />
        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;