defmodule BlockScoutWeb.DirectoriesController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
   def crypto_exchange(conn, _params) do
    render(conn, "crypto_exchange.html")
  end
   def dex(conn, _params) do
    render(conn, "dex.html")
  end
   def fiat_exchanges(conn, _params) do
    render(conn, "fiat_exchanges.html")
  end
   def gui_wallets(conn, _params) do
    render(conn, "gui_wallets.html")
  end
     def benchmark_listing(conn, _params) do
    render(conn, "benchmark_listing.html")
  end
end