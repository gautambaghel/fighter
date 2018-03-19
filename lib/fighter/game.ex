defmodule Fighter.Game do

	def new do
		%{
      hp1 : 500,
      mp1 : 100,
      hp2 : 500,
      mp2 : 100
		}
	end

	def client_view(game) do
		game
	end

 def guess(game, health) do
	 Map.put(game, :hp1, health)
 end
 
end
