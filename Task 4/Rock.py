import random

def get_computer_choice():
    return random.choice(["rock", "paper", "scissors"])

def determine_winner(user, computer):
    if user == computer:
        return "tie"
    elif (user == "rock" and computer == "scissors") or \
         (user == "paper" and computer == "rock") or \
         (user == "scissors" and computer == "paper"):
        return "user"
    else:
        return "computer"

def show_result(user_choice, computer_choice, result):
    print(f"\n🧍 You chose: {user_choice}")
    print(f"💻 Computer chose: {computer_choice}")
    
    if result == "tie":
        print("🔁 It's a tie!")
    elif result == "user":
        print("✅ You win!")
    else:
        print("❌ You lose!")

def main():
    print("🎮 Welcome to Rock-Paper-Scissors!")
    user_score = 0
    computer_score = 0

    while True:
        print("\nChoose rock, paper, or scissors:")
        user_choice = input("👉 Your choice: ").lower()

        if user_choice not in ["rock", "paper", "scissors"]:
            print("❌ Invalid choice. Please try again.")
            continue

        computer_choice = get_computer_choice()
        result = determine_winner(user_choice, computer_choice)
        show_result(user_choice, computer_choice, result)

        if result == "user":
            user_score += 1
        elif result == "computer":
            computer_score += 1

        print(f"\n📊 Scores - You: {user_score} | Computer: {computer_score}")

        play_again = input("\n🔁 Play again? (yes/no): ").strip().lower()
        if play_again not in ["yes", "y"]:
            print("👋 Thanks for playing!")
            break

if __name__ == "__main__":
    main()
