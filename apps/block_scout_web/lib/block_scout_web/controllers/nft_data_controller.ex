defmodule BlockScoutWeb.NftDataController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
   def nft_token_transfer(conn, _params) do
    render(conn, "token_transfer.html")
  end
  def nft_mint(conn, _params) do
    render(conn, "nft_mint.html")
  end
end