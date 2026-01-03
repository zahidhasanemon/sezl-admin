export default [
  {
    title: "Dashboard",
    icon: { icon: "tabler-smart-home" },
    to: "dashboard",
  },
  {
    title: "Contact Submissions",
    icon: { icon: "tabler-question-mark" },
    to: "inquiries",
  },
  {
    title: "Settings",
    icon: { icon: "tabler-settings" },
    to: "settings",
  },
  {
    title: "Admin Users",
    icon: { icon: "tabler-password-user" },
    to: "admins",
  },
  {
    title: "CMS",
    icon: { icon: "tabler-cast" },
    children: [
      {
        title: "Home Page",
        icon: { icon: "tabler-home" },
        to: "pages-home",
      },
      {
        title: "Testimonials",
        icon: { icon: "tabler-thumb-up" },
        to: "testimonials",
      },
    ],
  },
];
