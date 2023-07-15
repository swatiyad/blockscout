defmodule BlockScoutWeb.DirectoriesController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
   def crypto_exchange(conn, _params) do
    render(conn, "crypto-exchange.html")
  end
   def dex(conn, _params) do
    render(conn, "dex.html")
  end
   def fiat_exchanges(conn, _params) do
    render(conn, "fiat-exchanges.html")
  end
   def guiwallet(conn, _params) do
    render(conn, "guiwallet.html")
  end
     def benchmark_listing(conn, _params) do
    render(conn, "benchmark_listing.html")
  end
    def pricewatch(conn, _params) do
    render(conn, "pricewatch.html")
  end
    def forum(conn, _params) do
    render(conn, "forum.html")
  end
   def blockchain(conn, _params) do
    render(conn, "blockchain.html")
  end
   def wyzthscan(conn, _params) do
    render(conn, "wyzthscan.html")
  end
   def directoriesservices(conn, _params) do
    render(conn, "directoriesservices.html")
  end
   def smart_contract_audit(conn, _params) do
    render(conn, "smart_contract_audit.html")
  end
   def smart_contracts_factory(conn, _params) do
    render(conn, "smart_contracts_factory.html")
  end
   def miningpools(conn, _params) do
    render(conn, "miningpools.html")
  end
   def directories_grants(conn, _params) do
    render(conn, "directories_grants.html")
  end
    def tools(conn, _params) do
    render(conn, "tools.html")
  end
end