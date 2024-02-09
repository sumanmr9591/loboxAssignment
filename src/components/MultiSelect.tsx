import React, { useState, useEffect } from "react";
import "./select.scss";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  onChange: (value: SelectOption[] | undefined) => void;
  value: SelectOption[];
  setOptions: (value: SelectOption[]) => void;
};

const MultiSelect = ({ value, onChange, options, setOptions }: SelectProps) => {
  const [newOption, setNewOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const clearOptions = () => onChange([]);

  const selectOption = (option: SelectOption) => {
    if (value.includes(option)) {
      onChange(value.filter((o) => o !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return value.some((val) => val.value === option.value);
  };

  const checkInputKeyPress = (e: KeyboardEvent) => {
    if (e.code === "Enter" && newOption.length > 0) {
      const newEntry = {
        label: newOption,
        value: Number(options.length + 1),
      };
      const newOptions = [...options, newEntry];
      setOptions(newOptions);
      selectOption(newEntry);
      setNewOption("");
    }
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  return (
    <div className="mainContainer">
      <h3>React Multi Select</h3>
      <div
        tabIndex={0}
        className="container"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onBlur={() =>
          setTimeout(() => {
            setIsOpen(false);
          }, 100)
        }
      >
        <span className="value">
          {value.map((v) => (
            <button
              key={v.value}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(v);
              }}
              className="optionBadge"
            >
              {v.label}
              <span className="removeBtn">&times;</span>
            </button>
          ))}
        </span>
        <input
          type="text"
          value={newOption}
          onChange={(e) => {
            e.stopPropagation();
            setNewOption(e.target.value);
          }}
          placeholder="Add New Option..."
          onKeyPress={(e) => checkInputKeyPress(e)}
        />
        <button
          className="clearBtn"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
          &times;
        </button>
        <div className="divider"></div>
        <div className={`caret ${isOpen ? "inverted" : ""}`}></div>
        <ul className={`options ${isOpen ? "show" : ""}`}>
          {options.map((option: SelectOption, index: number) => (
            <li
              key={option.value}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              className={`option ${
                isOptionSelected(option) ? "selected" : ""
              } ${index === highlightedIndex ? "highlighted" : ""}`}
            >
              {option.label}
              {isOptionSelected(option) && <span>&#10003;</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;
