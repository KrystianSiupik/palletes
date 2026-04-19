resource "aws_db_proxy" "rds_db_proxy" {
  name                   = "rds-db-proxy"
  debug_logging          = false
  engine_family          = "POSTGRESQL"
  idle_client_timeout    = 900
  require_tls            = true

  role_arn               = aws_iam_role.rds_proxy_role.arn
  vpc_security_group_ids = [aws_security_group.proxy_security_group.id]
  vpc_subnet_ids         = [aws_subnet.palletes.id, aws_subnet.palletes_b.id]

  auth {
    auth_scheme = "SECRETS"
    description = "rds db proxy auth"
    iam_auth    = "DISABLED"
    secret_arn  = aws_secretsmanager_secret.rds_db.arn
  }

  tags = {
    Name = "rds-db-proxy"
  }
}


resource "aws_db_proxy_default_target_group" "rds_db_proxy_tg" {
  db_proxy_name = aws_db_proxy.rds_db_proxy.name

  connection_pool_config {
    connection_borrow_timeout    = 120
    max_connections_percent      = 100
    max_idle_connections_percent = 50
    session_pinning_filters      = ["EXCLUDE_VARIABLE_SETS"]
  }

  lifecycle {
    replace_triggered_by = [aws_db_proxy.rds_db_proxy.id]
  }
}

resource "aws_db_proxy_target" "rds_db_proxy_target" {
  db_instance_identifier = aws_db_instance.rds_db_instance.identifier
  db_proxy_name          = aws_db_proxy.rds_db_proxy.name
  target_group_name      = aws_db_proxy_default_target_group.rds_db_proxy_tg.name

  # poczekaj aż RDS będzie `available`, inaczej attach się wywali
  depends_on = [aws_db_instance.rds_db_instance]

  lifecycle {
    replace_triggered_by = [aws_db_proxy.rds_db_proxy.id]
  }
}
