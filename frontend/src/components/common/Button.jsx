const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false
}) => {

  return (

    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="custom-btn"
    >
      {children}
    </button>

  );

};

export default Button;