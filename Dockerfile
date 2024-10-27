# Stage 0, based on Node.js, to build and compile Angular
FROM node:20.12.2 as node
WORKDIR /app
COPY ./ /app/
RUN npm install
ARG configuration=production
RUN npm run build -- --configuration=$configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

# Instalar cron y certbot
RUN apk add --no-cache bash curl certbot && \
    echo "0 0 * * * /renew-certs.sh" | crontab -

# Copiar los archivos de la aplicación
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copiar el script de renovación
COPY renew-certs.sh /renew-certs.sh

# Hacer el script ejecutable
RUN chmod +x /renew-certs.sh

# Comando para iniciar Nginx y cron
CMD ["sh", "-c", "crond && nginx -g 'daemon off;'"]