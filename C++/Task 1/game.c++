#include <iostream>
#include <cstdlib>  // For rand() and srand()
#include <ctime>    // For time()

using namespace std;

int main() {
    // Seed the random number generator with the current time
    srand(static_cast<unsigned int>(time(0)));

    int secretNumber = rand() % 100 + 1; // Random number between 1 and 100
    int guess;
    int attempts = 0;

    cout << "🎯 Welcome to the Number Guessing Game!\n";
    cout << "I'm thinking of a number between 1 and 100.\n";

    // Game loop
    do {
        cout << "Enter your guess: ";
        cin >> guess;
        attempts++;

        if (guess < secretNumber) {
            cout << "Too low. Try again.\n";
        } else if (guess > secretNumber) {
            cout << "Too high. Try again.\n";
        } else {
            cout << "🎉 Congratulations! You guessed it in " << attempts << " attempts.\n";
        }
    } while (guess != secretNumber);

    return 0;
}
