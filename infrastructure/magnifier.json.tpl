[
  {
    "name": "magnifier",
    "image": "${registry_url}:tf-setup",
    "networkMode": "awsvpc",
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${LOGS_GROUP}",
        "awslogs-region": "${AWS_REGION}",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "portMappings": [
      {
        "containerPort": 22,
        "hostPort": 22
      },
      {
        "containerPort": 80,
        "hostPort": 80
      },
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ],
    "environment": [
      {
        "name": "DATABASE_HOST",
        "value": "${DATABASE_HOST}"
      },
      {
        "name": "DATABASE_USER",
        "value": "${DATABASE_USER}"
      },
      {
        "name": "DATABASE_PORT",
        "value": "${DATABASE_PORT}"
      },
      {
        "name": "DATABASE_PASSWORD",
        "value": "${DATABASE_PASSWORD}"
      },
      {
        "name": "RAILS_LOG_TO_STDOUT",
        "value": "true"
      }
    ]
  }
]