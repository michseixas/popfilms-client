<h1>
POPFILMS - FRONT END
</h1> 

Popfilms is our fullstack final project, featuring a social web app focused on movies. This is the front-end repository.  [here](https://github.com/michseixas/popfilms-client).

## About us
We are three movie enthusiasts and Ironhack students who have collaborated to create Popfilms, a captivating social web app dedicated to exploring and sharing our love for films.

![Project Image](https://t4.ftcdn.net/jpg/01/45/03/99/360_F_145039942_TlScPbqEWiBMPpfSyJyhBBCPcr1l52dP.jpg "Project Image")

## Deployment
You can check the app fully deployed [here](https://www.cactuscoleccion.com/). If you wish to view the API deployment instead, check [here](https://www.cactuscoleccion.com/).

## Work structure
We used [Trello](https://trello.com/home) to organize our workflow.

## Installation guide
- Fork this repo
- Clone this repo 

```shell
$ cd popfilms
$ npm install
$ npm start
```

## Routes
| Route                | Privacy         | Renders                  |
| -------------------- | :-------------: | ------------------------ |
| /                    | public          | HomePage                 |
| /signup              | public          | SignupPage               |
| /login               | public          | LoginPage                |
| /profile             | private (user)  | UserProfilePage          |
| /errorpage             | public (user)  | ErrorPage          |
| /allmovies             | private (user)  | AllMovies          |
| /moviedetails             | private (user)  | MovieDetails          |
|      ...        |   |           |

## Components
- Navbar
- CreateComments
- Alert
- ...

