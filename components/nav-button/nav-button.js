const navButton = (buttonClass, buttonData, text, onClick) => {
  const button = document.createElement("button");
  button.classList.add(buttonClass);
  button.classList.add("button");
  button.setAttribute("data-js", buttonData);
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
};

export default navButton;
