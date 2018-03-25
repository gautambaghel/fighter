defmodule Fighter.Game do

	def new do
		%{
      turnp1: true,
      player1: %{ name: "-bot-", hp: 200, mp: 100, status: 0 },
      player2: %{ name: "-bot-", hp: 500, mp: 20, status: 0 },
      p1_items: %{ attack: false, block: true, mp: true },
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

 def recieve_action(game, p1, p2, turnp1, action) do
 	cond do
 		action == 1 ->
			attack_strength = Enum.random(70..100)
			cond do
				turnp1 ->
					Map.put(game, :player2, (p2.hp - attack_strength))
					Map.put(game, :player2, (mp - 10))
				true ->
					Map.put(game, :player1, (hp - attack_strength))
					Map.put(game, :player2, (mp - 10))
			end
		action == 2 ->
			block_strength = Enum.random(50..90)
			cond do
				turnp1 ->
					Map.put(game, :player1, (hp + block_strength))
				true ->
					Map.put(game, :player2, (hp + block_strength))
			end
	  action == 3 ->
			cond do
				turnp1 ->
					Map.put(game, :player2, (hp - 90))
					Map.put(game, :p1_items, attack: false)
				true ->
					Map.put(game, :player1, (hp - 90))
					Map.put(game, :p2_items, attack: false)
			end
		action == 4 ->
			cond do
				turnp1 ->
					Map.put(game, :player1, (hp + 55))
					Map.put(game, :p1_items, block: false)
				true ->
					Map.put(game, :player2, (hp + 55))
					Map.put(game, :p2_items, block: false)
			end
		action == 5 ->
			cond do
				turnp1 ->
					Map.put(game, :player1, (mp + 40))
					Map.put(game, :p1_items, mp: false)
				true ->
					Map.put(game, :player2, (mp + 40))
					Map.put(game, :p2_items, mp: false)
			end
		action == 6 ->
			cond do
				turnp1 ->
					Map.put(game, :turnp1, false)
					Map.put(game, :player1, (mp + 20))
				true ->
					Map.put(game, )
 	end
 end

end
