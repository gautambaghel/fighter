defmodule FighterWeb.PageController do
  use FighterWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def lobby(conn, _params) do
    sessions = Fighter.GameBackup.get_state
    render conn, "lobby.html" , sessions: sessions
  end

  def game(conn, params) do
    render conn, "game.html", game: params["game"]
  end

end
