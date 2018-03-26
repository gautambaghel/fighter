defmodule Fighter.Game do

	def new do
		%{
      turnp1: true,
	    p1_status: 0,
	    p2_status: 0,
      player1: %{ name: "-waiting-", hp: 500, mp: 100 },
      player2: %{ name: "-waiting-", hp: 500, mp: 100 },
      p1_items: %{ attack: true, block: true, mp: true },
      p2_items: %{ attack: true, block: true, mp: true },
		}
	end

	def client_view(game) do
		game
	end

 def recieve_action(game, p1, p2, p1_items, p2_items, turnp1, action, p1_status, p2_status) do

	 cond do
		 action == 1 || action == 2 || action == 6->
			 perform_action(game, p1, p2, turnp1, action)
			 |> Map.put(:turnp1, !turnp1)
			 |> Map.put(:p1_items, p1_items)
			 |> Map.put(:p2_items, p2_items)
			 |> Map.put(:p1_status, p1_status)
			 |> Map.put(:p2_status, p2_status)

		 action == 3 || action == 4 || action == 5 ->				  
			 use_item(game, p1, p2, p1_items, p2_items, turnp1, action)
			 |> Map.put(:turnp1, !turnp1)
			 |> Map.put(:p1_status, p1_status)
			 |> Map.put(:p2_status, p2_status)
		 end
 end


 def perform_action(game, p1, p2, turnp1, action) do
	 cond do
		 action == 1 ->
		 attack_strength = Enum.random(70..100)
		 cond do
			 turnp1 ->
				 Map.put(game, :player2, %{ name: p2["name"], hp: (p2["hp"] - attack_strength), mp: p2["mp"]})
					|> Map.put(:player1, %{ name: p1["name"], hp: p1["hp"], mp: (p1["mp"] - 10) })
			 true ->
				 Map.put(game, :player1, %{ name: p1["name"], hp: (p1["hp"] - attack_strength), mp: p1["mp"] })
					|> Map.put(:player2, %{ name: p2["name"], hp: p2["hp"], mp: (p2["mp"] - 10)})
		 end
	 action == 2 ->
		 block_strength = Enum.random(50..90)
		 cond do
			 turnp1 ->
				 Map.put(game, :player1, %{ name: p1["name"], hp: (p1["hp"] + block_strength), mp: p1["mp"] })
				  |> Map.put(:player2, p2)
			 true ->
				 Map.put(game, :player2, %{ name: p2["name"], hp: (p2["hp"] + block_strength), mp: p2["mp"]})
				  |> Map.put(:player1, p1)
		 end
		 action == 6 ->
			 cond do
				 turnp1 ->
					 Map.put(game, :player1, %{ name: p1["name"], hp: p1["hp"], mp: (p1["mp"] + 20) })
					  |> Map.put(:player2, p2)
				 true ->
					 Map.put(game, :player2, %{ name: p2["name"], hp: p2["hp"], mp: (p2["mp"] + 20) })
					  |> Map.put(:player1, p1)
				 end
	 end
 end


	def use_item(game, p1, p2, p1_items, p2_items, turnp1, action) do
		cond do
	 action == 3 ->
		 cond do
			 turnp1 ->
				 Map.put(game, :player2, %{ name: p2["name"], hp: (p2["hp"] - 90), mp: p2["mp"]})
				  |> Map.put(:player1, p1)
					|> Map.put(:p1_items,  %{ attack: false, block: p1_items["block"] , mp: p1_items["mp"] })
 				  |> Map.put(:p2_items, p2_items)
			 true ->
				 Map.put(game, :player1, %{ name: p1["name"], hp: (p1["hp"] - 90), mp: p1["mp"] })
				  |> Map.put(:player2, p2)
					|> Map.put(:p2_items, %{ attack: false, block: p2_items["block"] , mp: p2_items["mp"] })
 				  |> Map.put(:p1_items, p1_items)
		 end
	 action == 4 ->
		 cond do
			 turnp1 ->
				 Map.put(game, :player1, %{ name: p1["name"], hp: (p1["hp"] + 55), mp: p1["mp"]})
				  |> Map.put(:player2, p2)
					|> Map.put(:p1_items, %{ attack: p1_items["attack"], block: false, mp: p1_items["mp"] })
 				  |> Map.put(:p2_items, p2_items)
			 true ->
				 Map.put(game, :player2, %{ name: p2["name"], hp: (p2["hp"] + 55), mp: p2["mp"] })
				  |> Map.put(:player1, p1)
					|> Map.put(:p2_items, %{ attack: p2_items["attack"], block: false, mp: p2_items["mp"] })
 				  |> Map.put(:p1_items, p1_items)
		 end
	 action == 5 ->
		 cond do
			 turnp1 ->
				 Map.put(game, :player1, %{ name: p1["name"], hp: p1["hp"], mp: (p1["mp"] + 40) })
				 |> Map.put(:player2, p2)
				 |> Map.put(:p1_items, %{ attack: p1_items["attack"], block: p1_items["block"], mp: false })
				 |> Map.put(:p2_items, p2_items)
			 true ->
				 Map.put(game, :player2, %{ name: p2["name"], hp: p2["hp"], mp: (p2["mp"] + 40)})
				 |> Map.put(:player1, p1)
				 |> Map.put(:p2_items, %{ attack: p2_items["attack"], block: p2_items["block"], mp: false })
				 |> Map.put(:p1_items, p1_items)
		 end
	 end
 end

end
