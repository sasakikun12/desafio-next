import React, { useState } from "react";
import styled from "styled-components";

const isActive = (props) => props.active === "true";

const StyledButton = styled.button`
  background-color: ${(props) => (isActive(props) ? "#a0207a" : "#601349")};
  color: #fff;
  font-size: calc(0.6rem + 0.2vw);

  &:hover {
    background-color: #a0207a;
    color: #fff;
  }
`;

const VerticalNav = styled.div`
  background-color: #fff;
  color: #fff;
  border: 0;
  border-top: none;
`;

const VerticalNavbar = ({ setSelected }) => {
  const [activeButton, setActiveButton] = useState("products");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setSelected(buttonName);
  };

  return (
    <VerticalNav className="vertical-navbar">
      <StyledButton
        className={"btn mt-5 w-100"}
        active={`${activeButton === "products"}`}
        onClick={() => handleButtonClick("products")}
      >
        Produtos
      </StyledButton>

      <StyledButton
        className={"btn mt-2 w-100"}
        active={`${activeButton === "sales"}`}
        onClick={() => handleButtonClick("sales")}
      >
        Vendas
      </StyledButton>

      <StyledButton
        className={"btn mt-2 w-100"}
        active={`${activeButton === "discounts"}`}
        onClick={() => handleButtonClick("discounts")}
      >
        Descontos
      </StyledButton>
    </VerticalNav>
  );
};

export default VerticalNavbar;
