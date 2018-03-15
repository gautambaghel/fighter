defmodule FighterWeb.PageController do
  use FighterWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
