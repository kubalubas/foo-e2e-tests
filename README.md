# How to run project and E2E tests

## Requirements
[Installed node](https://nodejs.org/en/)

[Installed git](https://git-scm.com/downloads)

## Instalation
Install progractor globally
```
npm i protractor -g
```

Use npm to install project
```
npm install
```

## How to run e2e tests
In project destination run
```
npm start
```
In second terminal in project destination run
```
protractor
```

## Possible problems
When running protractor, you may be asked about updating webdriver-manager then run
```
webdriver-manager update
```
and then

```
protractor
```
to run tests.