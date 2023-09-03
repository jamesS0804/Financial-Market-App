require 'httparty'

class UnitController < ApplicationController
    include JsonRender
    def get_data
        array_of_stocks = ["AMZN", "META", "BAC", "NU", "AAPL", "AMD", "PLTR", "NIO", "MRVL", "LCID", "ABEV", "GOOGL", "SOFI", "JWN", "XPEV", "T", "SNAP", "NVDA", "INTC", "DIS", "WMT", "TSLA", "BYND", "GOOG", "COST", "TGT", "RCL", "PEP", "MA", "VZ", "UNH", "PG", "WBA", "CVX", "JPM", "XOM", "NFLX", "GS", "MSFT"]

        joined_stocks = array_of_stocks.join(',')

        base_url = 'https://yahoo-finance127.p.rapidapi.com'

        headers = {
            'X-RapidAPI-Host' => 'yahoo-finance127.p.rapidapi.com',
            'X-RapidAPI-Key' => ENV['YAHOO_FINANCE_API_KEY']
        }
        end_point = '/multi-quote/'
        url = "#{base_url}#{end_point}#{joined_stocks}"

        response = HTTParty.get(url, headers: headers)

        if response.success?
            all_stocks = JSON.parse(response.body)
            all_stocks.each do |stock|
                unit = Unit.new(
                    market_name: 'STOCK',
                    symbol: stock[1]['symbol'],
                    company_name: stock[1]['shortName'],
                    exchange: stock[1]['fullExchangeName'],
                    price_per_share: stock[1]['regularMarketPreviousClose']['raw'],
                    bid: stock[1]['bid']['raw'],
                    volume: stock[1]['regularMarketVolume']['raw'],
                    ask: stock[1]['ask']['raw'],
                    change: stock[1]['regularMarketChange']['raw'],
                    change_percent: stock[1]['regularMarketChangePercent']['raw'],
                    average_daily_volume: stock[1]['averageDailyVolume10Day']['raw'],
                    currency: stock[1]['currency'],
                )
                unit.save
            end
            render_json_response(data: all_stocks, message: 'Stock data obtained.')
        end
    end
    def get_stored_data
        all_stored_data = Unit.all
        render_json_response(data: all_stored_data, message: 'Stock data obtained.')
    end

    private

    def render_json_response(status_code: nil, message: , data: nil)
        render_json(status_code, message , data)
    end
end
