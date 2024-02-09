import React, { useState } from "react";
import MultiSelect from "./components/MultiSelect";
import { SelectOption } from "./components/MultiSelect";

const App = () => {
  const options = [
    { value: 1, label: "Education" },
    { value: 2, label: "Science" },
    {
      value: 3,
      label: "Art",
    },
    { value: 4, label: "Sport" },
    { value: 5, label: "Games" },
    { value: 6, label: "Health" },
  ];
  const [value, setValue] = useState<SelectOption[] | undefined>([options[0]]);
  return (
    <MultiSelect
      options={options}
      onChange={(opt) => setValue(opt)}
      value={value}
    />
  );
};

export default App;
