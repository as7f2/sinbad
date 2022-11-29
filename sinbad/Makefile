help:
	@echo "list of available ui commands"
	@echo
	@echo "available in npm"
	@echo "init			- initialize node modules."
	@echo "install			- install node dependencies."
	@echo "purge     		- remove node modules."
	@echo "start     		- start ui react app."
	@echo "test                    - run  ui tests."
	@echo
	@echo "to build docker containers"
	@echo "build-dev       	- build ui in dev container"
	@echo "build-prod       	- build ui in production container"
	@echo "start-dev      		- run ui in dev docker container."
	@echo "start-prod      	- run ui in prod docker container."
	@echo "purge-dev		- purge ui dev docker containers."
	@echo "purge-prod		- purge ui prod docker containers."
	@echo "status-dev		- get status of ui dev docker containers."
	@echo "status-prod		- get status of ui prod docker containers."
	@echo "info			- ui docker info (after running up or build)"

# env variables
UI_CONTAINER_NAME_DEV := infra_ui-dev
UI_CONTAINER_NAME_PROD := infra_ui-prod
UI_PORT_DEV := 3000
UI_PORT_PROD := 1337
UI_HOST := localhost
# react commands
init:
	@echo "init npm..."
	@npm init
deps:
	@echo "installing deps..."
	npm ci .
purge:
	@echo "remove deps..."
	@rm -r ${CURDIR}/node_modules
start:
	@echo "starting react app..."
	@npm run dev
test:
	@echo "testing with jest..."
	@npm run test
lint:
	@echo "linting with prettier..."
	@npm run lint
# docker commands
build-dev:
	@docker build -f ./dockerfiles/Dockerfile . -t ${UI_CONTAINER_NAME_DEV}
build-prod:
	@docker build -f ./dockerfiles/Dockerfile.prod . -t ${UI_CONTAINER_NAME_PROD}
start-dev: 
	$(eval UI_CONTAINER_ID = $(shell (docker ps -aqf "name=${UI_CONTAINER_NAME_DEV}")))
	$(if $(strip $(UI_CONTAINER_ID)), \
		@echo "existing dev container found. please run make purge-dev",\
		@echo "running ui container..." && docker run -p ${UI_PORT_DEV}:3000 --name ${UI_CONTAINER_NAME_DEV} ${UI_CONTAINER_NAME_DEV}:latest)
	$(endif)
start-prod:
	$(eval UI_CONTAINER_ID = $(shell (docker ps -aqf "name=${UI_CONTAINER_NAME_PROD}")))
	$(if $(strip $(UI_CONTAINER_ID)), \
		@echo "existing prod container found. please run make purge-dev",\
		@echo "running ui container..." && docker run -p ${UI_PORT_PROD}:80 --name ${UI_CONTAINER_NAME_PROD} ${UI_CONTAINER_NAME_PROD}:latest)
	$(endif)
purge-dev:
	$(eval UI_CONTAINER_ID = $(shell (docker ps -aqf "name=${UI_CONTAINER_NAME_DEV}")))
	$(if $(strip $(UI_CONTAINER_ID)), \
		@echo "purging dev ui container..." && docker stop ${UI_CONTAINER_ID} && docker rm ${UI_CONTAINER_ID},\
		@echo "dev ui container not running.")
	$(endif)
purge-prod:
	$(eval UI_CONTAINER_ID = $(shell (docker ps -aqf "name=${UI_CONTAINER_NAME_PROD}")))
	$(if $(strip $(UI_CONTAINER_ID)), \
		@echo "purging prod ui container..." && docker stop ${UI_CONTAINER_ID} && docker rm ${UI_CONTAINER_ID},\
		@echo "prod ui container not running.")
	$(endif)
status-dev:
	$(eval UI_CONTAINER_ID = $(shell (docker ps -aqf "name=${UI_CONTAINER_NAME_DEV}")))
	$(if $(strip $(UI_CONTAINER_ID)), \
		@echo "dev ui container running",\
		@echo "dev ui container not running.")
	$(endif)
status-prod:
	$(eval UI_CONTAINER_ID = $(shell (docker ps -aqf "name=${UI_CONTAINER_NAME_PROD}")))
	$(if $(strip $(UI_CONTAINER_ID)), \
		@echo "prod ui container running",\
		@echo "prod ui container not running.")
	$(endif)
info:
	@echo "dev port: ${UI_PORT_DEV} \nprod port: ${UI_PORT_PROD} \nhost: ${UI_HOST}"
	@echo "dev container name: ${UI_CONTAINER_NAME_DEV} \nprod container name: ${UI_CONTAINER_NAME_PROD}"
	@echo "dev url: http://${UI_HOST}:${UI_PORT_DEV}"
	@echo "prod url: http://${UI_HOST}:${UI_PORT_PROD}"