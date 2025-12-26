#include <iostream>
using namespace std;

int main() {
    double num1, num2;
    char operation;

    cout << "🧮 Basic Calculator\n";
    cout << "-------------------\n";

    // Input first number
    cout << "Enter first number: ";
    cin >> num1;

    // Input second number
    cout << "Enter second number: ";
    cin >> num2;

    // Choose operation
    cout << "Choose an operation (+, -, *, /): ";
    cin >> operation;

    // Perform the chosen operation
    switch (operation) {
        case '+':
            cout << "Result: " << num1 << " + " << num2 << " = " << (num1 + num2) << endl;
            break;
        case '-':
            cout << "Result: " << num1 << " - " << num2 << " = " << (num1 - num2) << endl;
            break;
        case '*':
            cout << "Result: " << num1 << " * " << num2 << " = " << (num1 * num2) << endl;
            break;
        case '/':
            if (num2 != 0)
                cout << "Result: " << num1 << " / " << num2 << " = " << (num1 / num2) << endl;
            else
                cout << "Error: Division by zero is not allowed." << endl;
            break;
        default:
            cout << "Invalid operation. Please use +, -, *, or /." << endl;
    }

    return 0;
}
