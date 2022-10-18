defmodule BlockScoutWeb.AuditContractController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
