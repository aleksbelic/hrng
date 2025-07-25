# 🎲 Human Random Number Generator

This project is a human-driven random number generator built in JavaScript. It collects keystrokes and measures the timing between them to produce entropy — randomness influenced by unpredictable human behavior.

## 🚀 Features

- Captures real-time keyboard input from the user  
- Measures time intervals between keystrokes  
- Generates randomness based on typing dynamics  
- Fully client-side, no external dependencies

## 🧠 How It Works

1. The user begins typing in the input field.
2. The app listens for `keydown` events.
3. On each keydown:
   - The key is added to the `pressedKeys` array  
   - The time delta since the last keydown event is added to the `keyTimings` array
4. The arrays `pressedKeys` and `keyTimings` are combined using XOR  
5. The result is salted with the user input and hashed using the [FNV-1a](https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function) algorithm  
6. The hash is reduced to a number between 0–99 using a modulo operation


## 🔐 Why This Is Considered Entropy

Human typing behavior is unpredictable and difficult to replicate. The variable timing between keydowns introduces non-deterministic data, which makes the outcome hard to fake or reproduce — a key trait of entropy.

## 🎯 Use Cases

- Seeding PRNGs or other algorithms requiring non-determinism  
- Adding personalized randomness to games  
- Educational demos on entropy and hashing

## 🛠️ Tech Stack

- HTML5  
- CSS3  
- Vanilla JavaScript

_No external libraries are required._

## 🧑‍💻 Usage

1. Clone or download the repository  
2. Open `index.html` in a modern browser  
3. Start typing random characters in the input field  
4. Watch the entropy data update in real-time  
5. Generate a random number

## 🧪 Disclaimer

This tool generates decent entropy for educational or casual use, but it **should not** be used for cryptographic security, password generation, private key creation, or secure token generation.

## 📄 License

MIT License — free to use, modify, and distribute. Attribution is appreciated.

Made with ❤️, XORs, and unpredictable typing.
