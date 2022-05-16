import {
  FiHome,
  FiSliders,
  FiMapPin,
  FiFileText,
  FiShoppingCart,
  FiSettings,
  FiKey,
} from "react-icons/fi";
import { GiEyeTarget } from "react-icons/gi";
import { IconType } from "react-icons";

interface LinkItemProps {
  name: string;
  url: string;
  icon: IconType;
}

const LinkItem: Array<LinkItemProps> = [
  { name: "Home", url: "/", icon: FiHome },
  { name: "Nmap", url: "/nmap-scanner", icon: GiEyeTarget },
  { name: "Tracker", url: "/ip-tracker", icon: FiMapPin },
  { name: "Keygen", url: "/keygen", icon: FiKey },
  { name: "Settings", url: "/settings", icon: FiSettings },
];

export default LinkItem;
