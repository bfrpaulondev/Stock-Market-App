
# Stock Market App

## Overview
Welcome to the Stock Market App! This is a React Native application that fetches and displays stock market data using the Alpha Vantage API. It allows you to select two currencies and view historical stock prices in a user-friendly interface.

## Features
- **Currency Selection**: Use dropdown lists to select the currencies you want to compare.
- **Supported Currencies**: GBP, EUR, and USD.
- **Historical Prices**: View a list of historical stock prices with Open, High, Low, and Close values.
- **Auto-Update**: The table updates automatically when currency pairs are changed.
- **Refresh Button**: Manually refresh the data to get the latest values.

## Future Features
I have exciting features planned for future updates:
- **Candlestick Charts**: Display stock prices using candlestick charts for better analysis.
- **Additional Chart Types**: Introduce more chart types for a more comprehensive view of stock data.
- **More Currencies**: Support additional currencies including Bitcoin and other cryptocurrencies.

## API

Im using the Alpha Vantage API to fetch stock market data. You can find the API documentation [here](https://www.alphavantage.co/documentation/).

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone [ https://github.com/bfrpaulondev/stockmarketapp.git](https://github.com/bfrpaulondev/Stock-Market-App.git)
    cd stockmarketapp
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your API key:
    Edit the `fetchStockData` function in the `stockSlice.ts` file and add your Alpha Vantage API key.


4. Start the application:
    ```bash
    npm start
    ```


## Running Tests

I have written unit tests using Jest and @testing-library/react-native. To run the tests, use the following command:

```bash
npm test
```

## Production Ready

This application is set up to be production-ready. Before deploying, make sure to update all dependencies and follow best practices for security and performance.

## Contribution

Feel free to contribute to this project! If you have any suggestions or find any bugs, please open an issue or submit a pull request.

Thank you for checking out the Stock Market App. I hope you find it useful and easy to use. Happy coding!
