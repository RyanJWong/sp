import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import otherStyles from "./Wallet/Wallet.module.scss";

const Modal = ({ show, onClose, children, title, content, closeable, onComplete, modalResponse }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [proposalNo, setProposalNo] = useState(0);
    const [] = useState();
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };

    const handleVoteYes = () => {
      var newProposalNo = proposalNo + 1;
      modalResponse.push(newProposalNo);
      setProposalNo(newProposalNo);
      if (newProposalNo == content.length) {
        onComplete();
      }
    };

    const handleVoteNo = () => {
      var newProposalNo = proposalNo + 1;
      setProposalNo(newProposalNo);
      if (newProposalNo == content.length) {
        onComplete();
      }
    };
  
    const modalContent = show ? (
      <StyledModalOverlay>
        <StyledModal>
          <StyledModalHeader>
            {
            (closeable || proposalNo == content.length) ? <a style={{color: "white", textDecoration: "none"}} href="#" onClick={handleCloseClick}>
              X
            </a> : null
            }
          </StyledModalHeader>
          <StyledModalTitle>{proposalNo < content.length && content[proposalNo] ? content[proposalNo].title : "Thank you!"}</StyledModalTitle>
          <StyledModalBody>{proposalNo < content.length && content[proposalNo] ? content[proposalNo].body : "Your votes have been cast!"}</StyledModalBody>
          {
            proposalNo < content.length ?
            <div className={otherStyles.modalButtons}>
              {/* <button onClick={handleVoteNo}>NO</button> */}
              <button onClick={handleVoteYes}>I AGREE</button>
            </div>
            :
            <div className={otherStyles.modalButtons}>
              <a className={otherStyles.modalButtons} href="https://devo-token-sale.vercel.app">NEXT STEPS</a>
            </div>
          }
        </StyledModal>
      </StyledModalOverlay>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      );
    } else {
      return null;
    }
};

const StyledModalBody = styled.div`
  z-index: 12;
  color: white;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
  z-index: 12;
`;

const StyledModal = styled.div`
  background: black;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
  z-index: 12;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 12;
`;

const StyledModalTitle = styled.div`
    font-size: 18px;
    z-index: 12;
    color: white;
`;

export default Modal;