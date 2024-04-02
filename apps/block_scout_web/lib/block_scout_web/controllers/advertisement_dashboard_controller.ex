defmodule BlockScoutWeb.AdvertisementDashboardController do
  use BlockScoutWeb, :controller

  def index(conn, %{"id" => id}) do
    render(conn, "index.html", id: id)
  end
end
