import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
} from "../utils";

export const navLists = [
  "PORTFOLIO",
  "SWAP",
  "POOLS",
  "FARMS",
  "ANALYTICS",
  "ADMIN",
];

export const hightlightsSlides = [
  {
    id: 1,
    textLists: [
      "Enter Emerald DEX.",
      "Game‑changing DeFi.",
      "Unmatched performance.",
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: [
      "Powered by MultiversX.",
      "So secure. So fast. So unstoppable.",
    ],
    video: highlightSecondVideo,
    videoDuration: 4,
  },
  {
    id: 3,
    textLists: [
      "A massive token catalog.",
      "Seamless liquidity.",
      "All in one place.",
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ["All-new intuitive interface.", "What’s your next move?"],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const models = [
  {
    id: 1,
    title: "",
    color: [""],
    img: yellowImg,
  },
];

export const sizes = [{ label: '6.1"', value: "small" }];
export const footerLinks = ["Privacy Policy", "Terms of Use", "Legal"];
