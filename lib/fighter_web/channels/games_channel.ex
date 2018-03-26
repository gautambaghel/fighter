defmodule FighterWeb.GamesChannel do
  use FighterWeb, :channel

  alias Fighter.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game =  Fighter.GameBackup.load(name) || Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("action", %{"player1" => p1, "player2" => p2, "p1_items" => p1_items,
                "p2_items" => p2_items, "turnp1" => turnp1, "action" => action,
                "p1_status" => p1_status, "p2_status" => p2_status,}, socket) do
     game = Game.recieve_action(socket.assigns[:game], p1, p2, p1_items, p2_items,
     turnp1, action, p1_status, p2_status)
     Fighter.GameBackup.save(socket.assigns[:name], game)
     broadcast socket, "action_broadcast", game
     {:noreply, socket}
     # socket = assign(socket, :game, game)
     # {:reply, {:ok, %{ "game" => Game.client_view(game)}}, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
