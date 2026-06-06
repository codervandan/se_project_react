import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal.jsx";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeatherData } from "../../utils/weatherApi";
import { coordinates } from "../../utils/constants";
import { getItems, addItem, deleteItem, addCardLike, removeCardLike, updateProfile } from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";

import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    console.log("click");
    setActiveModal("add-garment-modal");
  }

  function handleOpenLoginModal() {
    setActiveModal("login-modal");
  }

  function handleOpenEditProfileModal() {
    setActiveModal("edit-profile-modal");
  }

  function handleOpenRegisterModal() {
    setActiveModal("register-modal");
  }

  function handleTempUnitChange() {
    if (currentTempUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleAddItemSubmit(inputValues) {
    console.log("ADDING ITEM:", inputValues);

    addItem(inputValues)
      .then((data) => {
        console.log("ITEM CREATED:", data);

        setClothingItems((items) => [data, ...items]);

        handleCloseModal();
      })
      .catch((err) => {
        console.error("ADD ITEM ERROR:", err);
      });
  }

  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== item._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) => cards.map((item) => (item._id === id ? updatedCard : item)));
        })
        .catch(console.error);
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) => cards.map((item) => (item._id === id ? updatedCard : item)));
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    auth
      .signup({
        name,
        avatar,
        email,
        password,
      })
      .then(() =>
        auth.signin({
          email,
          password,
        }),
      )
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    updateProfile({
      name,
      avatar,
    })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);

        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleWeatherSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherData(latitude, longitude)
        .then((data) => {
          setWeatherData(data);
        })
        .catch(console.error);
    };

    const handleWeatherError = (error) => {
      console.warn("Geolocation failed, using fallback coordinates:", error.message);
      getWeatherData(coordinates.latitude, coordinates.longitude)
        .then((data) => {
          setWeatherData(data);
        })
        .catch(console.error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleWeatherSuccess, handleWeatherError, {
        maximumAge: 600000,
        timeout: 10000,
      });
    } else {
      handleWeatherError(new Error("Geolocation is not supported by this browser."));
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((response) => {
        // setClothingItems(data.reverse());
        console.log("ITEMS:", response);
        setClothingItems(response.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("TOKEN:", token);

    if (!token) {
      return;
    }

    auth
      .checkToken(token)
      .then((userData) => {
        console.log("USERATA:", userData);
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("CHECK TOKEN ERROR:", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider value={{ currentTempUnit, handleTempUnitChange }}>
        <div className="app">
          <div className="app__content">
            <Header
              weatherData={weatherData}
              handleOpenAddGarmentModal={handleOpenAddGarmentModal}
              isLoggedIn={isLoggedIn}
              handleOpenLoginModal={handleOpenLoginModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                    currentTempUnit={currentTempUnit}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                      handleOpenItemModal={handleOpenItemModal}
                      handleSignOut={handleSignOut}
                      handleOpenEditProfileModal={handleOpenEditProfileModal}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <Footer />
            <ItemModal
              card={selectedCard}
              isOpen={activeModal === "item-modal"}
              onClose={handleCloseModal}
              onDeleteItem={handleDeleteItem}
            />
            <AddItemModal
              isOpen={activeModal === "add-garment-modal"}
              onClose={handleCloseModal}
              handleAddItemSubmit={handleAddItemSubmit}
            />

            <LoginModal
              isOpen={activeModal === "login-modal"}
              onClose={handleCloseModal}
              handleLogin={handleLogin}
              onSwitchToRegister={handleOpenRegisterModal}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile-modal"}
              onClose={handleCloseModal}
              onUpdateProfile={handleUpdateProfile}
            />
            <RegisterModal
              isOpen={activeModal === "register-modal"}
              onClose={handleCloseModal}
              handleRegister={handleRegister}
              onSwitchToLogin={handleOpenLoginModal}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
