export default function auth({ next, router }) {
  if (!localStorage.getItem("Telawaty_admin_dashboard_user_token")) {
    return router.push("/");
  }
  return next();
}
