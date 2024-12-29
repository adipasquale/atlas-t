www-install:
	cd www && npm install

www-dev:
	cd www && npm run serve

strapi-install:
	cd strapi && npm install

strapi-dev:
	cd strapi && npm run develop

strapi-deploy:
	cd strapi && fly deploy

www-cachebump:
	./scripts/cachebump.sh
