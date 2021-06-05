# Simulacrum
Application Overview:
Interact with a panel of simulated AI characters--famous names from history and fiction.  

# To run this app, follow these instructions:
Make sure you have Node.js and npm installed
1. `git clone` repository URL
1. `cd` into the directory it creates
1. `cd` into the `src`
1. `touch api/database.json`
1. Visit <https://openweathermap.org/guide#how> to create an account and get your API key
1. In your `database.json` file, copy and paste the following arrays: 
    `{
        "users": [
          {
            "id": 1,
            "name": "*username*",
            "password": "*password*"
          }
        ],
        "questions": [],
        "answers": [],
        "characters": [],
        "avatars": []
    }`
1. Replace *username* and *password* with whatever you prefer
1. Serve JSON file using `json-server -w database.json -p 8088`
1. In a new tab in your terminal, `cd` into `src`, and `serve`
1. Go to the localhost in your browser and either ask a question or click the Admin link in the footer to login

# Homepage

#### Visitors 
* Can ask a question or view previously answered questions

#### Administrators can:
* See all questions, even those that have no received answers
* Provide answers to any question
* Add characters with associated avatar. 
  * Characters can be marked as `primary`, meaning that they are available to have questions directed to them.
  * Characters can be marked as `global`, meaning that any administrator can use the character to answer a questions.
* Add additional avatars for any characters.
  * Avatars are marked as `random` by default, indicating if a characters has multiple avatars, one will be used at random.
  * This can be turned off if an image is to be used e.g. as a specific reation.


# Planning Links
1. [ERD](https://dbdiagram.io/d/5fc6767f3a78976d7b7e1be0)
