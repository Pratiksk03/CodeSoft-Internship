import requests

def fetch_exchange_rate(base_currency, target_currency):
    url = f"https://api.exchangerate.host/convert?from={base_currency}&to={target_currency}"
    try:
        response = requests.get(url)
        data = response.json()
        if "result" in data:
            return data["result"]
        else:
            raise ValueError("Invalid response format.")
    except Exception as e:
        print("❌ Error fetching exchange rate:", e)
        return None

def convert_currency():
    print("💱 Welcome to the Currency Converter\n")
    
    # Input
    base_currency = input("Enter base currency (e.g. USD): ").upper()
    target_currency = input("Enter target currency (e.g. INR): ").upper()
    
    try:
        amount = float(input("Enter amount to convert: "))
        if amount < 0:
            print("❌ Amount must be a positive number.")
            return
    except ValueError:
        print("❌ Invalid amount.")
        return

    # Fetch rate and convert
    print("🔄 Fetching exchange rate...")
    rate = fetch_exchange_rate(base_currency, target_currency)

    if rate:
        converted = amount * rate
        print(f"\n✅ {amount:.2f} {base_currency} = {converted:.2f} {target_currency}")
    else:
        print("⚠️ Could not convert currency.")

# Run the converter
if __name__ == "__main__":
    convert_currency()
