defmodule BlockScoutWeb.ChartController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
  def tx(conn, _params) do
    render(conn, "tx.html")
  end
   def blocksize(conn, _params) do
    render(conn, "blocksize.html")
  end
    def bep2etxns(conn, _params) do
    render(conn, "bep2etxns.html")
  end
     def blocktime(conn, _params) do
    render(conn, "blocktime.html")
  end
     def gasprice(conn, _params) do
    render(conn, "gasprice.html")
  end

    def gaslimit(conn, _params) do
    render(conn, "gaslimit.html")
  end
   
    def uniqueaddress(conn, _params) do
    render(conn, "uniqueaddress.html")
  end
end