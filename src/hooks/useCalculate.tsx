import { Calculator, Operator, OperatorType } from "../logic/Calculator";
import { useState } from "react";

const calculator = new Calculator();

export const useCalculate = () => {
  const [value, setValue] = useState<string>("0");
  const [isClearable, setIsClearable] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<OperatorType>("");

  const onCalculate = (input: string) => {
    if (isBasicOperator(input)) {
      setSelectedOperator(input);
    } else {
      if (input === Operator.equal) {
        setSelectedOperator("");
      }
      setIsClearable(true);
    }

    const num = calculator.calculate(input);
    setValue(num);
  };

  const onClear = () => {
    setIsClearable(false);
    setValue(calculator.calculate(Operator.clear));
  };

  const onAllClear = () => {
    setIsClearable(false);
    setSelectedOperator("");
    setValue(calculator.calculate(Operator.allClear));
  };

  return {
    value,
    isClearable,
    selectedOperator,
    onCalculate,
    onClear,
    onAllClear,
  };
};

const isBasicOperator = (operator: string): boolean => {
  return (
    operator === Operator.addition ||
    operator === Operator.subtraction ||
    operator === Operator.division ||
    operator === Operator.multiplication
  );
};
