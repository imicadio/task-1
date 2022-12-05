import React, { FC } from "react";

import icon_user from "../../assets/icon_user.svg";
import icon_check from "../../assets/icon_check.svg";

import { ICard } from "./models";

const Card: FC<ICard> = ({ person, image }) => {
  return (
    <>
      <img src={image} alt={person?.name} className="section__image" />
      <div className="section__name">
        <h2 className="text-center">{person?.name}</h2>
        <div className="name__actions">
          <img src={icon_user} alt="icon user" />
          <img src={icon_check} alt="icon check" className="ml-2" />
        </div>
      </div>
      <div className="section__details">
        <p>
          age: {person?.birth_year} <br /> eye color: {person?.eye_color}
        </p>
      </div>
    </>
  );
};

export default Card;
