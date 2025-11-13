# Docker Services

Development infrastructure services for the monorepo.

## Services

### PostgreSQL
- **Port:** 5432
- **User:** forge
- **Password:** forge123
- **Database:** forge_dev
- **Connection String:** `postgresql://forge:forge123@localhost:5432/forge_dev`

### RabbitMQ
- **AMQP Port:** 5672
- **Management UI:** http://localhost:15672
- **User:** forge
- **Password:** forge123

### MailHog (Email Testing)
- **SMTP Port:** 1025
- **Web UI:** http://localhost:8025
- Configure your app to send emails to `localhost:1025`
- All emails will be caught and displayed in the web UI instead of being sent

## Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f postgres

# Restart a service
docker-compose restart postgres

# Remove all data (WARNING: deletes volumes)
docker-compose down -v
```

## Health Checks

```bash
# PostgreSQL
docker-compose ps postgres

# RabbitMQ
curl http://localhost:15672/api/health/checks/alarms

# MailHog
curl http://localhost:8025/api/v2/messages
```
