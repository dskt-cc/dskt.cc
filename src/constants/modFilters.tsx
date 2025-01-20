import { TbMelon } from "react-icons/tb";
import { BiPackage, BiSolidPackage } from "react-icons/bi";

export const modTypeButtons = [
  {
    type: "All" as const,
    icon: null,
    label: "All",
    colors:
      "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
  },
  {
    type: "MelonLoader" as const,
    icon: <TbMelon className="text-lg" />,
    label: "MelonLoader",
    colors:
      "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
  },
  {
    type: "BepInEx" as const,
    icon: <BiPackage className="text-lg" />,
    label: "BepInEx",
    colors:
      "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
  },
  {
    type: "Both" as const,
    icon: <BiSolidPackage className="text-lg" />,
    label: "Both",
    colors:
      "from-miku-aquamarine/90 from-10% via-miku-waterleaf/80 via-50% to-miku-teal/90 to-90%",
  },
];

export const MOD_CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "Performance", label: "Performance" },
  { value: "QualityOfLife", label: "Quality of Life" },
  { value: "Content", label: "Content" },
  { value: "Overhaul", label: "Overhaul" },
  { value: "Other", label: "Other" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "downloads", label: "Most Downloads" },
  { value: "views", label: "Most Views" },
  { value: "featured", label: "Featured" },
];
