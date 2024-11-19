import { Button } from "@nextui-org/react";
import React, { useState } from "react";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      name: "mastercard",
      color: "#0061A8",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    },
    {
      name: "visa",
      color: "#E2CB38",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2000px-Visa_Inc._logo.svg.png",
    },
    {
      name: "dinersclub",
      color: "#888",
      src: "http://www.worldsultimatetravels.com/wp-content/uploads/2016/07/Diners-Club-Logo-1920x512.png",
    },
    {
      name: "americanExpress",
      color: "#108168",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/600px-American_Express_logo.svg.png",
    },
    {
      name: "discover",
      color: "#86B8CF",
      src: "https://lendedu.com/wp-content/uploads/2016/03/discover-it-for-students-credit-card.jpg",
    },
    {
      name: "dankort",
      color: "#0061A8",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Dankort_logo.png",
    },
  ];

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value.replace(/(.{4})/g, "$1 ").trim());

    const prefix = parseInt(value.substring(0, 4));
    let cardType = null;

    if (prefix >= 51 && prefix <= 55) cardType = cards[0];
    else if (prefix.toString().startsWith("4")) cardType = cards[1];
    else if ([36, 38, 39].includes(parseInt(value.substring(0, 2)))) cardType = cards[2];
    else if ([34, 37].includes(parseInt(value.substring(0, 2)))) cardType = cards[3];
    else if (prefix === 65) cardType = cards[4];
    else if (prefix === 5019) cardType = cards[5];

    setSelectedCard(cardType);
  };

  const handleNameChange = (e) => setCardHolder(e.target.value);

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) value = value.slice(0, 2) + " / " + value.slice(2, 4);
    setExpiryDate(value);
  };

  const handleSecurityCodeChange = (e) => {
    setSecurityCode(e.target.value.replace(/\D/g, "").slice(0, 3));
  };

  return (
    <div className="card-payment">
      <div className="container" style={{gap: '150px'}}>
        <div className="col1" >
          <div
            className="card"
            style={{ backgroundColor: selectedCard ? selectedCard.color : "#cecece" }}
          >
            <div className="front">
              <div className="type">
                {selectedCard && <img className="bankid" src={selectedCard.src} alt="Card logo" />}
              </div>
              <span className="chip"></span>
              <span className="card_number">
                {cardNumber || "●●●● ●●●● ●●●● ●●●●"}
              </span>
              <div className="date">
                <span className="date_value">{expiryDate || "MM / YYYY"}</span>
              </div>
              <span className="fullname">{cardHolder || "FULL NAME"}</span>
            </div>
            <div className="back">
              <div className="magnetic"></div>
              <div className="bar"></div>
              <span className="seccode">{securityCode || "●●●"}</span>
              <span className="chip"></span>
              <span className="disclaimer">
                This card is property of Random Bank of Random corporation. <br />
                If found please return to Random Bank of Random corporation - 21968 Paris,
                Verdi Street, 34
              </span>
            </div>
          </div>
        </div>
        <div className="col2  glass-payment">
          <label className="label2">מספר כרטיס</label>
          <input
            className="number input2"
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19"
            placeholder="מספר כרטיס"
          />
          <label className="label2">שם בעל הכרטיס</label>
          <input
            className="inputname input2"
            type="text"
            value={cardHolder}
            onChange={handleNameChange}
            placeholder="שם מלא"
          />
          <label className="label2">תאריך תפוגה</label>
          <input
            className="expire input2"
            type="text"
            value={expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM / YYYY"
          />
          <label className="label2">קוד אבטחה</label>
          <input
            className="ccv  input2"
            type="text"
            value={securityCode}
            onChange={handleSecurityCodeChange}
            maxLength="4"
            placeholder="CVC"
          />
          <Button className="buy">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
  
};

export default PaymentForm;
