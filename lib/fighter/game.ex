defmodule Fighter.Game do

	def new do
		%{
      turnp1: true,
      player1: %{ name: "-bot-", hp: 200, mp: 100, status: 0 },
      player2: %{ name: "-bot-", hp: 500, mp: 20, status: 0 },
      p1_items: %{ attack: true, block: true, mp: true },
      p2_items: %{ attack: true, block: true, mp: true },
		}
	end

	def client_view(game) do
		game
	end

 def guess(game, health) do
	 Map.put(game, :hp1, health)
 end

 def attack(game, p1, p2, turnp1) do
	 Map.put(game, :player1, p1)
	 |> Map.put(:player2, p2)
	 |> Map.put(:turnp1, turnp1)
 end

end
