data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  # wymagane przez VPC Endpoints Interface z private DNS
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "main"
  }
}

resource "aws_subnet" "palletes" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.0.0/18"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "palletes-a"
  }
}

resource "aws_subnet" "palletes_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.64.0/18"
  availability_zone = data.aws_availability_zones.available.names[1]

  tags = {
    Name = "palletes-b"
  }
}

# ----- VPC Endpoints (żeby lambda w prywatnym subnecie miała dostęp do AWS API bez NAT) -----

resource "aws_vpc_endpoint" "secretsmanager" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.${var.aws_region}.secretsmanager"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true

  subnet_ids         = [aws_subnet.palletes.id, aws_subnet.palletes_b.id]
  security_group_ids = [aws_security_group.vpc_endpoints_sg.id]

  tags = {
    Name = "secretsmanager-endpoint"
  }
}

resource "aws_vpc_endpoint" "logs" {
  vpc_id              = aws_vpc.main.id
  service_name        = "com.amazonaws.${var.aws_region}.logs"
  vpc_endpoint_type   = "Interface"
  private_dns_enabled = true

  subnet_ids         = [aws_subnet.palletes.id, aws_subnet.palletes_b.id]
  security_group_ids = [aws_security_group.vpc_endpoints_sg.id]

  tags = {
    Name = "logs-endpoint"
  }
}
