pull:
	docker pull postgres:latest

postgresinit:
	docker run --name postgres -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=postgres -d postgres:latest

createdb:
	docker exec -it postgres createdb --username=root --owner=root todo_app

.PHONY: pull postgresinit createdb