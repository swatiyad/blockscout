defmodule BlockScoutWeb.TermsOfServiceController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
  def privacy(conn, _params) do
    render(conn, "privacy_policy.html")
  end
end
