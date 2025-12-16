const Button = (props?: {
  onClick?: () => void;
  children?: React.ReactNode;
}) => (
  <button onClick={props?.onClick}>{props?.children}</button>
);

export default Button;
