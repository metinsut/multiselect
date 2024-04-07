type BoldTextProps = {
  text: string;
  keyText: string;
};

export function BoldText(props: BoldTextProps) {
  const { text, keyText } = props;
  const index = text.toLowerCase().indexOf(keyText.toLowerCase());

  if (index === -1) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {text.substring(0, index)}
      <strong className="text-bold text-black">
        {text.substring(index, index + keyText.length)}
      </strong>
      {text.substring(index + keyText.length)}
    </span>
  );
}
