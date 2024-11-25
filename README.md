# Scamdom

**Scamdom** is a parody casino platform created as part of a school project. Developed in a team of two, this project demonstrates the mechanics of online gambling platforms in a humorous and educational way. It does not involve any real gambling or monetary transactions.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Disclaimer](#disclaimer)
- [License](#license)

## About

Scamdom was created to explore how online gambling platforms operate while critiquing their often manipulative practices. This project simulates a functional casino environment, focusing on two games: **Roulette** and **Mines**, each with predetermined outcomes to highlight how such systems can be manipulated.

## Features

- Two fully functional games:
  - **Roulette**: A synchronized game where the outcome is predetermined and shared across all players in real-time.
  - **Mines**: A unique game for each player with outcomes predetermined upon starting the game.
- A fully functional realtime live chat system synced across every player.
- Built to showcase:
  - How outcomes can be manipulated behind the scenes.
  - The illusion of fairness in gambling systems.
- User-friendly design, emphasizing fun and educational value.
---
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Druganov1/scamdom.git
   ```
2. Navigate to the project directory:
  ```bash
  cd scamdom
  ```
3. Install PHP dependencies using Composer:
  ```bash
composer install
  ```
4. Install JavaScript dependencies using npm:
  ```bash
npm install
  ```

5. Copy the `.env.example` file to `.env`:
  ```bash
cp .env.example .env
  ```

6. Generate an application key:
```bash
php artisan key:generate
```
7. Configure your .env file with database credentials and other environment variables.
#### This app uses the pusher protocol to maintain a live websocket connection between the client and server, you can create an account with a generous free tier at [Pusher](https://pusher.com/) (or you can host your own websocket server with [Soketi](https://soketi.app/), free and open source 😄)
8. Run database migrations:
```bash
php artisan migrate
```
9. Build frontend assets:
```bash
npm run dev 
```
10. Start the development server:
```bash
php artisan serve
```
---

## Usage

1. **Access the Application**
   - Start the Laravel development server:
     ```bash
     php artisan serve
     ```
   - Open the application in your browser at `http://localhost:8000` (or the address provided in the terminal).

2. **Register or Login**
   - Create an account or log in using the provided form. This is for demonstration purposes and does not involve real user accounts or sensitive data.

3. **Play Games**
   - Navigate to the games section in the app.
   - **Roulette**:
     - Join a live game with other players.
     - Observe the synchronized outcomes shared across all participants.
   - **Mines**:
     - Start a new game where outcomes are unique and predetermined for each player.
     - Strategically reveal tiles while avoiding mines to earn points.

4. **Real-Time Updates**
   - The app uses WebSocket connections powered by Pusher to provide live updates in **Roulette**, ensuring a synchronized experience for all players.
   - Chat with other players, moderators have a special badge in the chat.

5. **Educational Features**
   - Review the mechanics behind the scenes to understand how outcomes are predetermined.
   - Observe how these mechanics simulate fairness but can be controlled by the platform.

6. **End the Session**
   - Once finished, log out of your account, or simply close the browser.
---
## Disclaimer

**Scamdom** is a parody project created for educational purposes only. It is not a real gambling platform, and no actual money or real-world assets are involved in any of the games. All outcomes in the games are predetermined and are intended to showcase how online gambling platforms can manipulate perceptions of fairness.

- **No Real Gambling**: The platform does not involve real-money betting or transactions. The in-game currency and outcomes are simulated and hold no real-world value.
- **Educational Intent**: The purpose of this project is to demonstrate the mechanics of online gambling platforms, critique common practices in the industry, and highlight how easily outcomes can be manipulated behind the scenes.
- **Privacy**: No personal data is collected or used in this project. If user authentication is implemented, it is for the sole purpose of demonstration and does not involve any real-world user data.
- **Legal Compliance**: This project is not intended for use in any jurisdiction where online gambling is regulated or illegal. It is purely for educational purposes and should not be used to promote or engage in real-world gambling activities.
- **No Liability**: The developers are not responsible for any misuse of this project or any harm caused by the use of this platform, including but not limited to gambling behavior, addiction, or loss of money. The project is not intended to encourage or endorse real gambling.

By using this app, you acknowledge that it is a parody and agree to use it for educational purposes only.

---
## License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.
