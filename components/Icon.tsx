import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

type Props = {
  name:
    | React.ComponentProps<typeof FontAwesome>["name"]
    | React.ComponentProps<typeof FontAwesome5>["name"];
  color: string;
  size?: number;
  version?: "4" | "5";
};

const Icons: React.FC<Props> = ({ version = "4", ...props }) => {
  const { size = 28, ...rest } = props;

  const IconComponent = version === "4" ? FontAwesome : FontAwesome5;

  return <IconComponent size={size} {...rest} />;
};

export default Icons;
