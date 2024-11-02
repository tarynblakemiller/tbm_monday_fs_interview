export const Tag = ({ label, onRemove }) => {
  return (
    <span>
      {label}
      {onRemove && <button onClick={onRemove}>×</button>}
    </span>
  );
};
