/* eslint-disable react/prop-types */
const CustomButton = ({ button_text, link, color_styles, hover_color }) => {
  const handleRedirect = () => {
    const targetUrl = { link };
    window.open(targetUrl.link, "_blank");
  };

  // original button styles
  const buttonStyles = "w-full mb-2 px-4 py-2 text-sm font-medium rounded-lg";

  // Transition styles
  const transitionStyles = "transition-all duration-300 ease-in";

  // Hover styles
  const hoverStyles = "group";

  return (
    <button
      type="submit"
      onClick={handleRedirect}
      className={`${buttonStyles} ${transitionStyles} ${hoverStyles} ${color_styles} ${hover_color}`}
    >
      {button_text}
    </button>
  );
};

export default CustomButton;
