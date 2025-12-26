import random

def play_game():
    print("🎯 Welcome to the Number Guessing Game!")
    max_attempts = 5
    score = 0
    round_number = 1

    while True:
        number_to_guess = random.randint(1, 100)
        attempts_left = max_attempts
        print(f"\n🔢 Round {round_number} - Guess the number between 1 and 100.")
        
        while attempts_left > 0:
            try:
                guess = int(input(f"Enter your guess ({attempts_left} attempts left): "))
            except ValueError:
                print("❌ Invalid input. Please enter a number.")
                continue

            if guess < number_to_guess:
                print("📉 Too low!")
            elif guess > number_to_guess:
                print("📈 Too high!")
            else:
                print(f"✅ Correct! You guessed it in {max_attempts - attempts_left + 1} attempts.")
                score += 1
                break

            attempts_left -= 1

        if attempts_left == 0 and guess != number_to_guess:
            print(f"💥 Out of attempts! The correct number was {number_to_guess}.")

        print(f"🎲 Score: {score} | Rounds Played: {round_number}")

        play_again = input("🔁 Do you want to play another round? (yes/no): ").strip().lower()
        if play_again not in ['yes', 'y']:
            print("👋 Thanks for playing! Final Score:", score)
            break

        round_number += 1

# Run the game
play_game()
