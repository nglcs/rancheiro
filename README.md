# Rancheiro

<p align="center">
    <img src="https://img.shields.io/static/v1?label=nodejs&message=framework&color=blue&logo=NODE"/>
    <img src="https://img.shields.io/static/v1?label=react&message=framework&color=blue&logo=REACT"/>
    <img src="http://img.shields.io/static/v1?label=License&message=MIT&color=green"/>
    <img src="http://img.shields.io/static/v1?label=STATUS&message=IN%20DEVELOPMENT&color=RED"/>
    <a href="https://github.com/nglcs">
        <img src="https://img.shields.io/badge/Author-Lucas%20Vinícius-brightgreen" alt="Author" />
    </a>
</p>

> Automatically generate labels diagrams of the rancher infrastructure


### :pushpin: Topics 

- [Project description](#descrição-do-projeto)

- [Functionalities](#functionalities)

- [Layout](#mag-layout)

- [Prerequisites](#warning-prerequisites)

- [Installation](#gear-installation)

- [Running](#rocket-running)

- [Languages and dependencies](#books-languages-and-dependencies)

- [Common problems](#exclamation-common-problems)

- [TODO](#memo-todo)

- [Contributors](#octocat-contributors)

- [License](#scroll-licence)

## :page_with_curl: Project description

<p align="justify">
 The application focuses on documenting labels and assisting in the planning of host relocations Rancher 1.6/2. It allows an easy view of all hosts divided by environments / clusters as well as a history accessible by dates.
</p>

## :ballot_box_with_check: Functionalities

:heavy_check_mark: Sort by rancher and clusters/environment.

:heavy_check_mark: Sort the hosts by their attributes CPU, RAM, Storage and Name.

:heavy_check_mark: Check your hosts for today's date or a date passed in the calendar.

:heavy_check_mark: Sort by label or hostname.

:heavy_check_mark: Group hosts by their type: reverse, controlplane and worker.

:heavy_check_mark: Identifies labels by color code
## :mag: Layout

<p align="center">
   <img src="public/favicon.ico"/>
</p>

## :warning: Prerequisites

- [Docker](https://www.docker.com/) or [Kubernetes](https://kubernetes.io/)
- Rancher API keys

## :gear: Installation

Clone the repo:
```
git clone https://github.com/nglcs/diagram-rancher.git
```

Enter in the folder and install dependencies:
```
cd diagram-rancher
npm install
```

Make a configuration file:
```
asdasdasd
```


## :rocket: Running

Execute in development mode with npm:

```
npm start
```

## :books: Languages and dependencies

- [React](https://pt-br.reactjs.org/docs/create-a-new-react-app.html)
- [MaterialUI](https://github.com/mui-org/material-ui)

## :exclamation: Common problems

**Module not found: Can't resolve '../config/data.json'**
SOLUTION: You need to specify the `data.json` configuration file as described in [Installation step](#gear-installation)

## :memo: TODO

- asdasdasdasd

## :octocat: Contributors

| [<img src="https://avatars2.githubusercontent.com/u/28482530?s=460&u=47515efe5e9ff926a6c621c62020915a55cb1c6f&v=4" width=115><br><sub>Lucas Vinícius</sub>](https://github.com/nglcs) |  [<img src="https://avatars2.githubusercontent.com/u/6786018?s=460&v=4" width=115><br><sub>Yago Ernandes</sub>](https://github.com/yagoernandes) | 
| :---: | :---: 

## :scroll: Licence

The [MIT License]() (MIT)

Copyright :copyright: 2020 - Rancher's Diagram
