export const menuItems = [
  {
    value: "magazyn zewneczny",
    Link: "/",
    // icon: "home",
  },

  {
    value: "obróbka",
    Link: "/wareWork",
  },
  {
    value: "odbiór",
    Link: "/goodElement",
  },
  {
    value: "tygodniowa praca",
    Link: "/timeMachine",
  },
  {
    value: "harmonogram",
    Link: "/timeMachine",
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
];
