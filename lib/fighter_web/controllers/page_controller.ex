defmodule FighterWeb.PageController do
  use FighterWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def lobby(conn, _params) do
    render conn, "lobby.html"
  end

  def game(conn, params) do
    render conn, "game.html", game: params["game"]
  end

end
