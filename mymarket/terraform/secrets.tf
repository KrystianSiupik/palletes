resource "aws_secretsmanager_secret" "rds_db" {
  name = "rds_db"

  tags = {
    Name = "main"
  }
}

resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"

  # żeby `terraform apply` nie regenerował hasła i nie resetował bazy
  lifecycle {
    ignore_changes = all
  }
}

locals {
  db_login = {
    login    = "admin"
    password = random_password.password.result
  }
}

resource "aws_secretsmanager_secret_version" "db_login" {
  secret_id     = aws_secretsmanager_secret.rds_db.id
  secret_string = jsonencode(local.db_login)
}
