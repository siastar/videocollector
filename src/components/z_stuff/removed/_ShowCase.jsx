import React from "react";
//import ContentCard from "./ContentCard.jsx";
import { ContentCard } from "./ContentCard.jsx";
// *** use {} when import { functional components }
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const ShowCase = props => {
  //console.log('test3333 showCase props.showCaseProps.cards:' , props.showCaseProps.cards)

  function resultsShowCase() {
    let cards = props.showCaseProps.cards.map(singleCard => {
      let cardIndex = props.showCaseProps.cards.indexOf(singleCard);
      const singleCardProps = {
        cardIndex: cardIndex,
        cardData: props.showCaseProps.cards[cardIndex],
        cardStatus: props.showCaseProps.cardsStatus[cardIndex],
        cardHandlers: props.showCaseProps.cardHandlers,
        saveSessionData: props.showCaseProps.saveSessionData
        //spinnerStatus: props.showCaseProps.spinnerBox[cardIndex]
      };

      return (
        <ContentCard
          singleCardProps={singleCardProps}
          key={cardIndex}
          headTo={'results-showcase'}
        ></ContentCard>
      );
    });

    return cards;
  }

  return <div className="results-case">{resultsShowCase()}</div>;
};
