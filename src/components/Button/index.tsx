'use client';

interface PropType {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<PropType> = (props) => {
  const { text, onClick, disabled = false } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-xl bg-blue-600"
    >
      {text}
    </button>
  );
};

export default Button;
