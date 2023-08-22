defmodule BlockScoutWeb.Router do
  use BlockScoutWeb, :router

  alias BlockScoutWeb.Plug.GraphQL
  alias BlockScoutWeb.{ApiRouter, WebRouter}

  if Application.compile_env(:block_scout_web, ApiRouter)[:wobserver_enabled] do
    forward("/wobserver", Wobserver.Web.Router)
  end

  if Application.compile_env(:block_scout_web, :admin_panel_enabled) do
    forward("/admin", BlockScoutWeb.AdminRouter)
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(BlockScoutWeb.CSPHeader)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  forward("/api", ApiRouter)

  if Application.compile_env(:block_scout_web, ApiRouter)[:reading_enabled] do
    # Needs to be 200 to support the schema introspection for graphiql
    @max_complexity 200

    forward("/graphql", Absinthe.Plug,
      schema: BlockScoutWeb.Schema,
      analyze_complexity: true,
      max_complexity: @max_complexity
    )

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: BlockScoutWeb.Schema,
      interface: :advanced,
      default_query: GraphQL.default_query(),
      socket: BlockScoutWeb.UserSocket,
      analyze_complexity: true,
      max_complexity: @max_complexity
    )
  else
    scope "/", BlockScoutWeb do
      pipe_through(:browser)
      get("/api-docs", PageNotFoundController, :index)
      get("/eth-rpc-api-docs", PageNotFoundController, :index)
    end
  end

  scope "/", BlockScoutWeb do
    pipe_through(:browser)

    get("/api-docs", APIDocsController, :index)
    get("/eth-rpc-api-docs", APIDocsController, :eth_rpc)
  end

  url_params = Application.compile_env(:block_scout_web, BlockScoutWeb.Endpoint)[:url]
  api_path = url_params[:api_path]
  path = url_params[:path]

  if path != api_path do
    scope to_string(api_path) <> "/verify_smart_contract" do
      pipe_through(:api)

      post("/contract_verifications", BlockScoutWeb.AddressContractVerificationController, :create)
    end
  else
    scope "/verify_smart_contract" do
      pipe_through(:api)

      post("/contract_verifications", BlockScoutWeb.AddressContractVerificationController, :create)
    end
  end



  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/signin", AdminDashboardController, :signin
  get "/add-icon/:id", AdminDashboardController, :addIcon
  get "/signup", AdminDashboardController, :signup
  get "/verify/:id", AdminDashboardController, :verify
  get "/forget-password", AdminDashboardController, :forgetpassword
end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/contract-verify", ContractVerifyController, :index
end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/charts", ChartController, :index
   get("/charts/tx", ChartController, :tx)
   get("/charts/blocksize", ChartController, :blocksize)
   get("/charts/bep2etxns", ChartController, :bep2etxns)
 get("/charts/gasused", ChartController, :blocktime)
  get("/charts/gasprice", ChartController, :gasprice)
   get("/charts/gaslimit", ChartController, :gaslimit)
   get("/charts/uniqueaddress", ChartController, :uniqueaddress)
end


  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/statistics", StatisticsController, :index

end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/vyper-verification", VyperContractVerificationController, :index

end
  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/diff-checker", DiffCheckerController, :index

end
  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/preferences", PreferencesController, :index

end
scope "/tx", BlockScoutWeb do
  get "/:id/disqus", DisqusController, :index
end
  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/top-nft", NftDataController, :index
   get "/latest-nft-transactions", NftDataController, :nft_token_transfer
   get "/latest-mint", NftDataController, :nft_mint
end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/pushTx", BroadcastTransactionController, :index

end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/contract-search", SearchContractController, :index
end


  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/directories", DirectoriesController, :index
  get "/directories/dex", DirectoriesController, :dex
  get "/directories/crypto-exchange", DirectoriesController, :crypto_exchange
   get "/directories/fiat-exchanges", DirectoriesController, :fiat_exchanges
   get "/directories/gui-wallets", DirectoriesController, :guiwallet
    get "/directories/benchmark-listing", DirectoriesController, :benchmark_listing
    get "/directories/price-watch", DirectoriesController, :pricewatch
    get "/directories/forum", DirectoriesController, :forum
     get "/directories/blockchain", DirectoriesController, :blockchain
      get "/directories/wyzth", DirectoriesController, :wyzthscan
     get "/directories/services", DirectoriesController, :directoriesservices
     get "/directories/smart-contract-audit", DirectoriesController, :smart_contract_audit
      get "/directories/smart-contracts-factory", DirectoriesController, :smart_contracts_factory
       get "/directories/mining-pool", DirectoriesController, :miningpools
       get "/directories/mining-talk", DirectoriesController, :mining
     get "/directories/grants", DirectoriesController, :directories_grants
     get "/directories/tools", DirectoriesController, :tools
end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/terms-of-service", TermsOfServiceController, :index
  get "/privacy-policy", TermsOfServiceController, :privacy
end

  scope "/", BlockScoutWeb do
  pipe_through :browser
  get "/chat", BlocksChatController, :index
   post "/node-api/send-message", BlocksChatController, :send_message
end




  if Application.compile_env(:block_scout_web, WebRouter)[:enabled] do
    forward("/", BlockScoutWeb.WebRouter)
  else
    scope "/", BlockScoutWeb do
      pipe_through(:browser)

      forward("/", APIDocsController, :index)

    end
  end
end
