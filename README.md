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
Intensive. The front-end is my work. General Assembly built the back-end using
Ruby on Rails.

The basic goals are to:
  <ul>
    <li>Have valid user authorization</li>
    <li>Generate games from the back end</li>
    <li>Place x and o game pieces on the board where the user clicks</li>
    <li>Not allow users to place pieces on already occupied space, or
    continue playing after the game ends.</li>
    <li>Indicate when a game ends, and how</li>
    <li>Retrieve each users' record of games played</li>
  </ul>

My personal stretch goals are:
  <ul>
  <li>Ability to switch between playing with a friend or against a computer</li>
  <li>A 'bomb' play to remove a piece, rather than add a piece (pending)</li>
  </ul>

## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used

<b>Built with</b>
- [Ruby on Rails](https://rubyonrails.org/)
- [AJAX](https://api.jquery.com/category/ajax/)
- [JQuery](https://jquery.com/)
- [Node.js](https://nodejs.org/en/)
- [Github Pages](https://pages.github.com/)

## Features
- User authorization related features
  - Sign up
    - Shows sign-up form, and nothing else
    - Sign up via the backend Ruby API
    - After signing up, prompts user to sign in
      - **This should go to the sign-in form instead of just prompting**
  - Sign in
    - Shows sign-in form, and nothing else
    - Sign in via the backend Ruby API
    - After signing in,
      - App welcomes the user
  - Sign Out
    - After the user clicks sign-out form
      - Alert user that they are signed out
      - Hide everything except the signed out alert, sign-in button, and sign-up button
  - Change Password
    - Show the change password form and nothing else
    - Keep the nav bar intact
    - After password successfully changes, alert the user for 4 seconds
  - Profile
    - Shows the user profile
    - Games played
    - Games finished
    - Games won as player x
    - **This function takes too long to render. May need a spinner**
  - Revisit unfinished games
    - Make a GET request to the API to list all games the user hasn't finished
    - List the unfinished game IDs as buttons
- Game related features
  - Add new game
    - Modal pops up with a form:
      - Game mode - hot seat / against computer
      - Computer mode - easy vs less easy

## Code Example
Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Installation
Provide step by step series of examples and explanations about how to get a development env running.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests
Describe and show how to run the tests with code examples.

## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## Contribute

Let people know how they can contribute into your project. A [contributing guideline](https://github.com/zulip/zulip-electron/blob/master/CONTRIBUTING.md) will be a big plus.

## Credits
Give proper credits. This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project.
