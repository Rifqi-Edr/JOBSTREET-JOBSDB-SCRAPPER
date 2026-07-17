FROM apify/actor-node:20

COPY package*.json ./

RUN npm --quiet --no-audit --no-update-notifier install --omit=dev

COPY . ./

CMD [ "npm", "start" ]
