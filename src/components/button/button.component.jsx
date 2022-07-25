import "./button.styles.scss";

const BUTTON_TYPE_ClASSES = {
  google: "google-sign-in",
  inverted: "inverted"
};

const Button = ({ children, buttonType, ...buttonInformation }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_ClASSES[buttonType]}`}
      {...buttonInformation}
    >
      {children}
    </button>
  );
};

export default Button;
