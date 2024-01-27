interface StatusCharacterProps {
  status: string;
}

export const StatusCharacter = ({ status }: StatusCharacterProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "Alive":
        return "bg-green-500";
      case "Dead":
        return "bg-red-500";
      case "unknown":
      default:
        return "bg-gray-500";
    }
  };

  return (
    <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor()}`}>
      <span className="flex items-center justify-center h-full"></span>
    </span>
  );
};
