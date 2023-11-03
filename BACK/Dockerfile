FROM node

WORKDIR /app

COPY . .

ENV PORT=5000
ENV JWT_SECRET=adatech
ENV LOGIN=letscode
ENV PASSWORD=lets@123

RUN npm install

CMD ["npm", "run", "dev"]
