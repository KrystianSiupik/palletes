resource "aws_security_group" "rds_security_group" {
  name        = "allow_rds"
  description = "Allow traffic to and from rds"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group" "proxy_security_group" {
  name        = "allow_proxy"
  description = "Traffic from and to proxy"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group" "lambda_security_group" {
  name        = "allow_lambda"
  description = "Traffic from and to proxy lambdas"
  vpc_id      = aws_vpc.main.id
}

resource "aws_security_group" "vpc_endpoints_sg" {
  name        = "vpc_endpoints"
  description = "Allow HTTPS from lambda to VPC endpoints"
  vpc_id      = aws_vpc.main.id
}

# ---------- INGRESS ----------

# RDS <- Proxy
resource "aws_vpc_security_group_ingress_rule" "rds_security_group_ingress" {
  security_group_id            = aws_security_group.rds_security_group.id
  referenced_security_group_id = aws_security_group.proxy_security_group.id
  from_port                    = 5432
  ip_protocol                  = "tcp"
  to_port                      = 5432
}

# Proxy <- Lambda
resource "aws_vpc_security_group_ingress_rule" "proxy_from_lambda" {
  security_group_id            = aws_security_group.proxy_security_group.id
  referenced_security_group_id = aws_security_group.lambda_security_group.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}

# VPC Endpoints <- Lambda (HTTPS)
resource "aws_vpc_security_group_ingress_rule" "vpc_endpoints_from_lambda" {
  security_group_id            = aws_security_group.vpc_endpoints_sg.id
  referenced_security_group_id = aws_security_group.lambda_security_group.id
  from_port                    = 443
  to_port                      = 443
  ip_protocol                  = "tcp"
}

# ---------- EGRESS ----------

# Lambda -> Proxy (5432)
resource "aws_vpc_security_group_egress_rule" "lambda_to_proxy" {
  security_group_id            = aws_security_group.lambda_security_group.id
  referenced_security_group_id = aws_security_group.proxy_security_group.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}

# Lambda -> VPC Endpoints (HTTPS do Secrets Manager / CloudWatch Logs)
resource "aws_vpc_security_group_egress_rule" "lambda_to_vpc_endpoints" {
  security_group_id            = aws_security_group.lambda_security_group.id
  referenced_security_group_id = aws_security_group.vpc_endpoints_sg.id
  from_port                    = 443
  to_port                      = 443
  ip_protocol                  = "tcp"
}

# Proxy -> RDS (5432)
resource "aws_vpc_security_group_egress_rule" "proxy_to_rds" {
  security_group_id            = aws_security_group.proxy_security_group.id
  referenced_security_group_id = aws_security_group.rds_security_group.id
  from_port                    = 5432
  to_port                      = 5432
  ip_protocol                  = "tcp"
}
