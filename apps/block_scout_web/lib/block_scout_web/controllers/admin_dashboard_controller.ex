defmodule BlockScoutWeb.AdminDashboardController do
  use BlockScoutWeb, :controller

  def signin(conn, _params) do
    render(conn, "index.html")
  end
  def signup(conn, _params) do
    render(conn, "signup.html")
  end
  def addIcon(conn, %{"id" => id}) do
    render(conn, "add-icon.html", id: id)
  end
  def verify(conn, %{"id" => id}) do
    # Here you can use the "id" parameter to perform verification logic
    render(conn, "verification-successful.html", id: id)
  end
  def forgetpassword(conn,_params) do
    render(conn, "forget-password.html")
  end
  def userdashboard(conn,%{"id" => id}) do
    render(conn, "userdashboard.html", id: id)
  end
  def userdashboardicon(conn, %{"id" => id}) do
    render(conn, "userdashboard-icon.html", id: id)
  end
  def adminsignin(conn,_params) do
    render(conn, "admin-signin.html")
  end
end
