defmodule BlockScoutWeb.BlocksChatController do
  use BlockScoutWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
    def send_message(conn, _params) do
    url = "https://explorer.bitplug.io/pi/send-message"
    redirect(conn, external: url)
  end
end
