import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

import styles from "styles/Users.module.scss";

interface DebounceFieldProps {
  value: string;
  onUpdate: (value: string) => void;
}

const DebounceField = ({
  value: outerValue,
  onUpdate,
}: DebounceFieldProps): JSX.Element => {
  const [fieldValue, setFieldValue] = useState<string>(outerValue);

  const debounced = useCallback(debounce(onUpdate, 300), []);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    debounced(value);
    setFieldValue(value);
  };

  return (
    <input
      className={styles.inputfield}
      value={fieldValue}
      onChange={handleChange}
      placeholder="Search by name..."
    />
  );
};

export default DebounceField;
