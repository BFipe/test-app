import React from "react";
import styles from "./Card.module.scss";

const Card = ({ name, image, bgColor }) => {
  return (
    <div className={styles.card_container}>
      <div
        className={styles.image_container}
        style={{ backgroundColor: bgColor }}
      >
        <img className={styles.image} src={image} alt={name} />
      </div>
      <div className={styles.name_container}>
        <p className={styles.name}>{name}</p>
      </div>
    </div>
  );
};

export default Card;
