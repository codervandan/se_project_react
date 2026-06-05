import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ clothingItems, handleOpenAddGarmentModal, handleOpenItemModal, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => item.owner === currentUser._id);
  return (
    <main className="profile">
      <SideBar handleSignOut={handleSignOut} />
      <ClothesSection
        clothingItems={userItems}
        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        handleOpenItemModal={handleOpenItemModal}
      />
    </main>
  );
}

export default Profile;
