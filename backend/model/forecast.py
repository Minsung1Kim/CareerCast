import numpy as np

def predict_unemployment(country):
    # Placeholder: Replace with ARIMA/LSTM model inference
    # Example: Return dummy data for demo
    years = list(range(1990, 2025))
    historical = np.random.uniform(3, 15, size=len(years)-5).tolist()
    forecast = np.random.uniform(3, 15, size=5).tolist()
    rmse = np.random.uniform(0.5, 2.0)
    mae = np.random.uniform(0.5, 2.0)
    return {
        "country": country,
        "years": years,
        "historical": historical,
        "forecast": forecast,
        "rmse": rmse,
        "mae": mae
    }