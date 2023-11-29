/** Icons are imported separatly to reduce build time */
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/reservation",
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: "Reservation",
  },
];

export default routes;
