interface InputLabelProps {
  labelFor: string;
  labelText: string | JSX.Element;
  className?: string;
}

const InputLabel = (props: InputLabelProps) => {
  const { labelFor, className, labelText } = props;
  return (
    <label htmlFor={labelFor} className={className}>
      {labelText}
    </label>
  );
};

export default InputLabel;
