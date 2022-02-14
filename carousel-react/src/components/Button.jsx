const Button = ({disabled, onClick, alt}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
    >
      <img src="static/images/cursor.png" alt={alt} className="button"></img>
    </button>
  );
};

export default Button;
