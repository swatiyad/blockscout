defmodule BlockScoutWeb.DisqusController do
  use BlockScoutWeb, :controller

  def index(conn, %{"id" => id}) do
    conn = fetch_session(conn)
    conn = fetch_flash(conn)

    conn
    |> assign(:page_identifier, id)
    |> render("index.html")
  end
end
