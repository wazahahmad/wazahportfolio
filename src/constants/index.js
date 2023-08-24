import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  laravel,
  wordpress,
  php,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  ylesia,
  upwork,
  shopify,
  carrent,
  jobit,
  tripguide,
  ylesiatech,
  asianhouse,
  mandsense,
  procat,
  threejs,
  link,
  
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Custom Wordpress Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Laravel Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Laravel",
    icon: laravel,
  },
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Wordpress",
    icon: wordpress,
  },
];

const experiences = [
  {
    title: "Web Developer",
    company_name: "Fiver & Upwork",
    icon: upwork,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using Laravel and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Wordpress Developer",
    company_name: "Ylesia Technologies",
    icon: ylesia,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - August 2023",
    points: [
      "Developing and maintaining web applications using Wordpress and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },

];

const testimonials = [
  {
    testimonial:
      "whenever you are looking for a great person to work with fast, efficient and really good with WordPress he is your go-to for sure its a no brainer",
    name: "Lgunther",
    designation: "CFO",
    company: "Makondi",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Always a pleasure to work with Ahmad, he devotes time to each assignment and is trustworthy",
    name: "Lenaslan",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "I am delighted to be able to work with this freelance. Without doubt the best I have collaborated with on Fiverr !",
    name: "Yohanhmd",
    designation: "CTO",
    company: "Ylesia Technologies",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Ylesia Technologies",
    description:
      "Web-based platform that allows users to hire agency for any kind of mobile, web or graphic design projects.",
    tags: [
      {
        name: "elementor",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      
    ],
    image: ylesiatech,
    source_code_link: "https://ylesiatechnologies.com/",
  },
  {
    name: "Asian House",
    description:
      "Web application that enables users to search for resturant branches, select specific food options and order food.",
    tags: [
      {
        name: "resturant",
        color: "blue-text-gradient",
      },
      {
        name: "orderfood",
        color: "green-text-gradient",
      },
      {
        name: "custom website",
        color: "pink-text-gradient",
      },
    ],
    image: asianhouse,
    source_code_link: "https://asian-house.fr/",
  },
  {
    name: "Procat Media",
    description:
      "A comprehensive media agency website to showcase their interactive portfolio to the users.",
    tags: [
      {
        name: "media",
        color: "blue-text-gradient",
      },
      {
        name: "wordpress",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: procat,
    source_code_link: "https://procatmedia.com/",
  },
  {
    name: "Mandsense",
    description:
      "Web and moobile based website to sell candles, sprays, diffusers and other aromatic products.",
    tags: [
      {
        name: "shopify",
        color: "blue-text-gradient",
      },
      {
        name: "customdevelopment",
        color: "green-text-gradient",
      },
    
    ],
    image: mandsense,
    source_code_link: "https://mandsense.fr/",
  },
];

export { services, technologies, experiences, testimonials, projects };
