import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const containerRef = useRef(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (!scriptAdded.current && containerRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            ["BINANCE:EGLDUSDT|1D"],
            ["BINANCE:BTCUSDT|1D"]
          ],
          "chartOnly": false,
          "width": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }
      `;
      containerRef.current.appendChild(script);
      scriptAdded.current = true;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        tradingview-widget-container 
        w-full 
        h-[500px] 
        md:h-[600px] 
        relative
        p-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-2xl animate-[pulse_4s_infinite]
      "
    >
      <div className="tradingview-widget-container__widget w-full h-full rounded-lg" />
      <div className="text-center mt-2 text-sm text-gray-500">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
          className="blue-text"
        >
          Track all markets on TradingView
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
