#!/bin/bash
export ETHEREUM_JSONRPC_VARIANT=geth
export ETHEREUM_JSONRPC_HTTP_URL=http://13.52.132.51:12002/
export DATABASE_URL=postgresql://dscuser:dsc123@localhost:5432/dscex
export API_V2_ENABLED=true
export COIN=DSC
export COIN_NAME=DSC
export BLOCK_TRANSFORMER=clique

mix phx.digest.clean 
mix phx.digest
mix phx.server

