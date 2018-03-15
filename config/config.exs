# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :fighter,
  ecto_repos: [Fighter.Repo]

# Configures the endpoint
config :fighter, FighterWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "5HZE4PbWcybQlqKu9mp4p/L4oie10MXVx1y/NF0hwyt51mCK1GqRP+kS9temH32Z",
  render_errors: [view: FighterWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Fighter.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
