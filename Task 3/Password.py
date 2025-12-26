import string
import random

def generate_password(length):
    if length < 4:
        print("❌ Password length should be at least 4 for good security.")
        return ""

    # Character sets
    letters = string.ascii_letters       # a-z + A-Z
    digits = string.digits               # 0-9
    symbols = string.punctuation         # Special characters

    # Combine all character sets
    all_chars = letters + digits + symbols

    # Ensure at least one character from each category
    password = [
        random.choice(string.ascii_lowercase),
        random.choice(string.ascii_uppercase),
        random.choice(digits),
        random.choice(symbols)
    ]

    # Fill the rest with random characters
    password += random.choices(all_chars, k=length - 4)

    # Shuffle to prevent predictable patterns
    random.shuffle(password)

    return ''.join(password)

def main():
    print("=== 🔐 Password Generator ===")

    try:
        length = int(input("Enter desired password length: "))
    except ValueError:
        print("❌ Please enter a valid number.")
        return

    password = generate_password(length)
    if password:
        print(f"\n✅ Generated Password: {password}")

if __name__ == "__main__":
    main()
