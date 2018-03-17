defmodule FighterWeb.PageController do
  use FighterWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def game(conn, params) do
    render conn, "game.html", game: params["game"], players: params["players"]
  end

end
