import React from "react";
import { useAuthContext } from "../context/authContext";
import AddNew from "../components/Modal/AddNew";
import Genres from "../components/Genres/Genres";
import Movies from "../components/Movies/Movies";
import { Button, ButtonGroup } from "react-bootstrap";

function Dashboard() {
  const [_isAuthenticated, handleAuthChange] = useAuthContext();

  const handleLogOut = () => {
    handleAuthChange(false);
  };

  //////////// Add New Modal ////////////
  const [addNewModal, setAddNewModal] = React.useState({ isVisible: false });

  const handleShowAddNewModal = () => {
    setAddNewModal({ isVisible: true });
  };

  const handleCloseModal = () => {
    setAddNewModal({ isVisible: false });
  };

  ///////////////////////////////////////
  return (
    <div className="Dashboard">
      <div className="container">
        <div className="row">
          <div id="leftColumn" className="col-sm-12 col-md-3">
            <AddNew
              modalTitle="Select Option"
              modalBody="Click on the data you want to add"
              showModal={addNewModal}
              onClickBtnAddNew={handleShowAddNewModal}
              handleCloseAddNewModal={handleCloseModal}
            />
            <Genres />
            <ButtonGroup className="d-flex mt-5">
              <Button onClick={handleLogOut}>Log Out</Button>
            </ButtonGroup>
          </div>
          <div id="rightColumn" className="col-sm-12 col-md-9">
            <Movies />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
