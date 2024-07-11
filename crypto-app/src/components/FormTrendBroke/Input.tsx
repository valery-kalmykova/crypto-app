"use client";

import styles from "./styles.module.css";

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  price?: string;
  label: string;
}

const Input = ({ value, setValue, price, label }: InputProps) => {
  const handleChange = (event: any) => {
    if (isNaN(event.target.value)) {
      event.target.value.replace("");
    } else {
      setValue(event.target.value);
    }
  };

  return (
    <label className={styles.label}>
      {" "}
      {label}
      <input
        value={value}
        onChange={(event) => handleChange(event)}
        className={styles.input}
        type="string"
        name={value}
        placeholder={price && price}
      />
    </label>
  );
};

export default Input;
