export const menuItems = [
  {
    value: "magazyn zewneczny",
    Link: "/",
    // icon: "home",
  },
  {
    value: "dodać",

    subMenu: [
      {
        value: "pracownik",
        Link: "/user",
      },
      {
        value: "stanowisko",
        Link: "/position",
      },
      {
        value: "element",
        Link: "/element",
      },
      {
        value: "projekt",
        Link: "/project",
      },
      {
        value: "module",
        Link: "/module",
      },
    ],
  },

  {
    value: "obróbka",
    Link: "/wareWork",
  },
  {
    value: "odbiór",
    Link: "/goodElement",
  },
];
