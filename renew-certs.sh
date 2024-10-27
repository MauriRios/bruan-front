#!/bin/bash

# Renovar los certificados
certbot renew --quiet

# Reiniciar Nginx para que reconozca los nuevos certificados
nginx -s reload