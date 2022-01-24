import React, {useState,useEffect} from 'react';
import './App.css';
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from "react-bootstrap";

const  App = () => {
  const [players,setPlayers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  const getPlayerData = async () => {
    try {
      const data = await axios.get(
        "http://nba-players.herokuapp.com/players-stats"
        
      );
      console.log(data);
      setPlayers(data.data);
      setLoading(true);
    }catch (e) {
      console.log(e);
    }
  };
  const coloumns=[
    {dataField: "name", text: "Player Name"},
    {dataField: "points_per_game", text: "Points per Game"},
    {dataField: "team_name", text: "Player Team"},
  ];

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row)
      setModalInfo(row)
      toggleTrueFalse()
    }
  }

  useEffect(() => {
    getPlayerData();
  },[]);

  const toggleTrueFalse = () => {
    setShowModal(handleShow)
  }

  const ModalContent = () =>  {
    return  (
      <Modal show={show} onHide={handleClose}> 
      <Modal.Header closeBatton>
        <Modal.Title>
          {modalInfo.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Player stats</h4>
        <ul>
          <ol>Team name: {modalInfo.team_name}</ol>
          <ol>Assits per game: {modalInfo.assists_per_game}</ol>
          <ol>Block per game: {modalInfo.blocks_per_game}</ol>
          <ol>Games played: {modalInfo.games_played}</ol>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>

      </Modal>
    )
  }

  return (
    <div className="App">

  <BootstrapTable
    keyField="name"
    data={players}
    columns={coloumns}
    pagination={paginationFactory()}
    rowEvents={rowEvents}
 />
  {show ? <ModalContent/> : null} 
    </div>
  );
};

export default App;


 