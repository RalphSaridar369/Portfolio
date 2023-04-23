import WebsiteIcon from "../../images/html.gif";
import MobileIcon from "../../images/smartphone.gif";
import DatabaseIcon from "../../images/database.gif";

export const our_services = [
  {
    name: "Web Development",
    description:
      "We specialize in developing web apps using React or basic HTML, CSS, and JS, and offer custom scripting, API development, and websockets to meet your needs. Let us help bring your project to life with our expertise and dedication to delivering results. Contact us to discuss your web app development needs.",
    icon: WebsiteIcon,
    pricing: [
      "$100 - $200: 1 - 3 pages, frontend only",
      "$200 - $400: 4 - 9 pages, frontend only",
      "$600 - $900: frontend and backend",
    ],
  },
  {
    name: "Mobile Development",
    description:
      "Our experienced team of mobile app developers can create high-quality apps using React Native that work seamlessly on both iOS and Android platforms. Whether you need a basic app or a complex one with advanced features, we have the expertise to bring your vision to life. Let us help bring your project to life with our expertise and dedication to delivering results.",
    icon: MobileIcon,
    pricing: [
      "$200 - $400: app both ios and android",
      "$500 - $800: app both ios and android with backend",
    ],
  },
  {
    name: "Backend Development",
    description:
      "Our team of experienced developers specializes in creating high-quality backend solutions using Node.js, Laravel, and Python. We offer a wide range of services, including API development, websockets, and custom scripting. Let us help bring your project to life with our expertise and dedication to delivering results.",
    icon: DatabaseIcon,
    pricing: [
      "$50 - $100: python scripts",
      "$200 - $600: API either in nodejs or laravel",
    ],
  },
];
