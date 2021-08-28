import { useState, useCallback } from "react";
import { useRouter } from "next/router";

import debounce from "lodash.debounce";

interface DebounceFieldProps {
  value: string;
  onUpdate: (value: string) => void;
}

const DebounceField = ({
  value: outerValue,
  onUpdate,
}: DebounceFieldProps): JSX.Element => {
  const [fieldValue, setFieldValue] = useState<string>(outerValue);

  const debounced = useCallback(debounce(onUpdate, 500), []);

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    debounced(value);
    setFieldValue(value);
  };

  return (
    <input
      value={fieldValue}
      onChange={handleChange}
      placeholder="Search by name..."
    />
  );
};

export default DebounceField;
