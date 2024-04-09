up:
	@docker-compose up

build:
	@docker-compose build

sh:
	@docker-compose exec scholar-system bash

migration\:run:
	@docker-compose exec scholar-system bash -c "npm run migration:run"

migration\:revert:
	@docker-compose exec scholar-system bash -c "npm run migration:revert"