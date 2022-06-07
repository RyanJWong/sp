import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const BlockModal = ({ show, content }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    const [] = useState();
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const modalContent = show ? (
      <StyledModalOverlay>
        <StyledModal>
          <StyledModalTitle>{"Please wait..."}</StyledModalTitle>
          <StyledModalBody>{content}</StyledModalBody>
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

export default BlockModal;