#!/bin/bash
#export MIX_ENV=prod\
sudo chmod -R 777 ../blockscout
export ETHEREUM_JSONRPC_VARIANT=parity
export ETHEREUM_JSONRPC_HTTP_URL=https://rabbit.analog-rpc.com/
export ETHEREUM_JSONRPC_WS_URL=ws://rabbit.analog-rpc.com/ws
export DATABASE_URL=postgres://taralscan:wyzscan@localhost:5432/blockscout?ssl=false
export ETHEREUM_JSONRPC_TRACE_URL=https://rabbit.analog-rpc.com/
export ETHEREUM_JSONRPC_TRACE_URL=https://rabbit.analog-rpc.com/
export NETWORK=Blockchain Explorer
export SUBNETWORK="WYZth Scan Testnet :"
export LOGO=/images/wyz-logo.svg
export LOGO_FOOTER=/images/wyz-footer-logo.svg
#export ETHEREUM_JSONRPC_TRANSPORT=http
export NETWORK_PATH=/
export API_PATH=/
export BLOCKSCOUT_HOST=rabbit.analogscan.com
export BLOCKSCOUT_PROTOCOL=https
export SECRET_KEY_BASE=BASE=E/sdFN0JBURFmltKF+2BLp8JRqzPEJy9a3kwfDN7DooykJuAo3BKT0W7YFQ42d2/
# export CHECK_ORIGIN=false
# export PORT=4000
export COIN=Ana
export COIN_NAME=Ana
export BLOCKSCOUT_VERSION=v4.1.5-beta
export RELEASE_LINK=https://github.com/blockscout/blockscout/releases/tag/v4.1.5-beta

export LINK_TO_OTHER_EXPLORERS=false
export DISABLE_EXCHANGE_RATES=true
export ENABLE_TXS_STATS=true
export SHOW_PRICE_CHART=true
export SHOW_TXS_CHART=true
# export EXCHANGE_RATES_COINGECKO_COIN_ID=tarality
# export EXCHANGE_RATES_SOURCE=coin_market_cap
# export EXCHANGE_RATES_COINGECKO_API_KEY=4529b9d5-bfe7-4403-8259-a599c76b1ec5
# export COINGECKO_COIN_ID=tarality
export CACHE_TXS_COUNT_PERIOD=7200
export CACHE_BLOCK_COUNT_PERIOD=7200
export HISTORY_FETCH_INTERVAL=240
export TXS_HISTORIAN_INIT_LAG=0
export TXS_STATS_DAYS_TO_COMPILE_AT_INIT=10
export COIN_BALANCE_HISTORY_DAYS=90
export APPS_MENU=true
export TOKEN_METADATA_UPDATE_INTERVAL=1800
export CACHE_TOKEN_EXCHANGE_RATE_PERIOD=3600000
# export EXTERNAL_APPS='[{ "title": "Ana Bridge", "url": "https://bridge.inrx.io/" } ]'
export ENABLE_SOURCIFY_INTEGRATION=true 
export SOURCIFY_SERVER_URL=https://sourcify.dev/server
export SOURCIFY_REPO_URL=https://repo.sourcify.dev/contracts/
#export CHAIN_ID=303
export CHAIN_ID=1807
export DISPLAY_TOKEN_ICONS=true
export RE_CAPTCHA_SECRET_KEY=6Ldd_O8hAAAAAG1yA9GmQYunRTpp40TOX_A8sa2y
export RE_CAPTCHA_CLIENT_KEY=6Ldd_O8hAAAAANk3zRRCYpKTzUO4RcX9Pxv9n8_R
export JSON_RPC=https://rpc-mainnet3.wyzthchain.org
export ADMIN_PANEL_ENABLED=true
# export METADATA_CONTRACT=
export VALIDATORS_CONTRACT=0x874967F5Fe0b75Ee6592D981E5E47a2D11E3E2Bf
export POS_STAKING_CONTRACT=0xBb1cB38f61777bdFd9dfcB84e559E592D8809fDA
export RANDOM_AURA_CONTRACT=0xF494A55fB0f347E8526f13e5337C9EAfF273E873
export ENABLE_POS_STAKING_IN_MENU=true
export TOKEN_BALANCE_ON_DEMAND_FETCHER_THRESHOLD_MINUTES=60
export GAS_PRICE_ORACLE_NUM_OF_BLOCKS=200
export GAS_PRICE_ORACLE_SAFELOW_PERCENTILE=35
export GAS_PRICE_ORACLE_AVERAGE_PERCENTILE=60
export GAS_PRICE_ORACLE_FAST_PERCENTILE=90
export GAS_PRICE_ORACLE_CACHE_PERIOD=300
export DISPLAY_TOKEN_ICONS=true
export CHAIN_SPEC_PATH=https://gist.githubusercontent.com/amankumarp/4042810bc109983b42e746f7d23389d4/raw/907d8c5866a0557c9390efd8ddb9df4c8df804b4/spec.json
# export SUPPLY_MODULE=TokenBridge
# export SOURCE_MODULE=coin_gecko
export API_RATE_LIMIT=100
export API_RATE_LIMIT_BY_KEY=30
export API_RATE_LIMIT_BY_IP=30
export INDEXER_MEMORY_LIMIT=7


/bin/mix ecto.drop
/bin/mix ecto.create 
/bin/mix ecto.migrate
/bin/mix phx.digest.clean 
/bin/mix phx.digest
/bin/mix phx.server