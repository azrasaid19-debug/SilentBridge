import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("login", "routes/login.jsx"),
  route("register", "routes/register.jsx"),
  route("dashboard", "routes/dashboard.jsx"),
  route("add-sign", "routes/add-sign.jsx"),
  route("my-signs", "routes/my-signs.jsx"),
  route("practice", "routes/practice.jsx"),
  route("about", "routes/about.jsx"),
  route("community", "routes/community.jsx"),
  route("learn", "routes/learn.jsx"),
];
