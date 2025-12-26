def calculator():
    print("=== Simple Calculator ===")

    try:
        num1 = float(input("Enter the first number: "))
        op = input("Enter an operation (+, -, *, /): ").strip()
        num2 = float(input("Enter the second number: "))
    except ValueError:
        print("❌ Invalid input. Please enter numeric values.")
        return

    if op == '+':
        result = num1 + num2
    elif op == '-':
        result = num1 - num2
    elif op == '*':
        result = num1 * num2
    elif op == '/':
        if num2 == 0:
            print("❌ Cannot divide by zero.")
            return
        result = num1 / num2
    else:
        print("❌ Invalid operator.")
        return

    print(f"✅ Result: {num1} {op} {num2} = {result}")

# Run the calculator
if __name__ == "__main__":
    calculator()
