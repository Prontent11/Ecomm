import "./form-input.styles.scss";
const FormInput = ({ label, ...inputInformation }) => {
  return (
    <div className="group">
      <input {...inputInformation} className="form-input" />
      {label && (
        <label
          className={`${
            inputInformation.value.length ? "shrink" : ""
          }form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
