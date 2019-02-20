## Tic Tac Toe
Play tic-tac-toe against yourself, your friend, or against a computer on one
device.

In order to play a game, you'll need to make an account. You can also replay any
games you left unfinished.

Please note that this is a toy application. The user authorization is NOT secure.
Please do not use any passwords that you used anywhere else. I woudl also
recommend using a fake email.

## Motivation
This project was the first major assignment in General Assembly's Web Development
Intensive Program. The front-end is my work. General Assembly built the back-end using
Ruby on Rails.

## Tech/framework used

<b>Built with</b>
- [Ruby on Rails](https://rubyonrails.org/)
- [AJAX](https://api.jquery.com/category/ajax/)
- [JQuery](https://jquery.com/)
- [Node.js](https://nodejs.org/en/)
- [Github Pages](https://pages.github.com/)
- [Bootstrap](https://getbootstrap.com/)

## Features
Users can sign up, sign in, change password, look up game records, and sign out
in the app.

There are two game modes - easy, and hot seat. The hot seat mode assumes that
two players are using one computer.
Users can pass the screen around and fill in the board. Easy mode is against a
computer that is randomly placing pieces in empty places on the board.
The computer makes its move after a one-second delay to simulate a real person.

## Planning
This was the initial wireframe [!wireframe](https://imgur.com/3CJ1fiB.jpg)

The user stories I decided to focus on were:
- Be able to sign up, sign in, sign out, change password, and be notified if
there were issues
- All visible buttons serve a function
- Invalid moves are disallowed, and user gets feedback for invalid moves (moving
into already occupied spaces on the board)
- Be able to see past game data, such as total number of games played

After meeting the above user stories, I came up with some stretch user stories:
- Be able to play against a computer
- See a progress spinner while the app is communicating with the API so the
user would know that the app is waiting to hear a response
- See a modern, responsive website

I was able to meet the first stretch goal - users can play aginast a computer
that randomly places pieces in empty parts of the board.

After getting to know the API better, I changed my wireframe to the below.
[!updatedwireframe](https://slack-files.com/T0351JZQ0-FGC9Z1F43-281b8389c1.jpg)

My main issues were:
1) Have app recognize that a game is over
  - The engine has an array of win conditions - after each move, the game loops
  through each of the win conditions to see if the conditions were met.
  - If the game board is full, the game declares a tie
2) Disallow moves after a game is over
  - I initially solved this by getting rid of the game grid from the browser,
  later, I disallowed moves by deleting classes that trigger a user move feedback
  from the grid, essentially freezing it.
3) Have a central source of 'truth' for the game state.
  - Every time a user moves by clicking the game board, the game engine adds
  a piece to its representation of the game grid (a 1-dimensional array) in the
  corresponding index. I set the browser to update from the locally stored game board
  The user's move also triggers the API to update the game state from the back end.

  I was trying to keep as much of the game in the local environment as possible
  since I don't own the back end, but given a back end that I own, I would make
  the browser view update from the back end API to have just one source
  of the game state.

## API Reference

This game's back end is a tic-tac-toe API built by General Assembly. Please see the documentation [here](https://git.generalassemb.ly/ga-wdi-boston/game-project-api)

## How to use?
Visit the game [here](https://tarayoo.github.io/tic-tac-toe/)
You will need to sign up first to get access to new games. Please do not use real
passwords or emails. This is a toy application.

## Future Goals
I'd like to clean up the classes, and ids in index.html to make the UI easier to
write and debug. The app, as of now, is not accessible.

## Credits
The game grid design is from Jennifer Meade, one of the GA instructors.
The computer's random moves was calculated with a random number function from
MDN.
