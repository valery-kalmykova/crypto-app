"use client";

import styles from "../styles.module.css";

const SwitchMode = ({ onlyWatched, setOnlyWatched, searchText }: any) => {
  return (
    <div className={styles.switchContainerBox}>
      <label className={styles.switchLabel}>Show only watched</label>
      <div className={styles.switchContainer}>
        <input
          className={styles.switchInput}
          checked={onlyWatched}
          type="checkbox"
          onChange={() => {}}
        />
        <span
          className={styles.switchSliderRound}
          style={searchText.length >= 1 ? { opacity: 0.5 } : { opacity: 0.8 }}
          onClick={() => {
            if (searchText.length >= 1) return;
            setOnlyWatched(!onlyWatched);
          }}
        ></span>
      </div>
    </div>
  );
};

export default SwitchMode;
