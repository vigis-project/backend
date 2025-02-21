<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Run docker-compose

```bash
$ docker compose --env-file .development.env up --build
```

# ВАЖНО! Применить миграции чтобы создать роли USER, ADMIN и STAFF
Зайти в контейнер
```bash
$ docker exec -it nest-app bash
```
Применить миграции
```bash
$ npx sequelize-cli db:migrate
```
# Откатить миграции
Откатить последнюю миграцию
```bash
$ npx sequelize-cli db:migrate:undo
```
Откатить все миграции
```bash
$ npx sequelize-cli db:migrate:undo:all
```

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```