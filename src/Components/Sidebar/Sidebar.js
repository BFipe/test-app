import React, { useCallback } from "react";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ categories, selectedCategory, onChangeCategory }) => {
  const handleChangeCategory = useCallback(
    (category) => {
      onChangeCategory(category);
    },
    [onChangeCategory]
  );

  return (
    <div className={styles.sidebar_container}>
      <div
        className={
          styles.category +
          (selectedCategory === "" ? " " + styles.selected : "")
        }
        onClick={() => {
          handleChangeCategory("");
        }}
      >
        <p className={styles.category_name}>Все темы</p>
      </div>
      {categories.map((category) => {
        return (
          <div
            key={category}
            className={
              styles.category +
              (selectedCategory === category ? " " + styles.selected : "")
            }
            onClick={() => {
              handleChangeCategory(category);
            }}
          >
            <p className={styles.category_name}>{category}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
