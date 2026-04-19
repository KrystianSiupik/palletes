resource "aws_db_instance" "rds_db_instance" {
  allocated_storage      = 5
  db_name                = "palletes"
  engine                 = "postgres"
  engine_version         = "16.4"
  instance_class         = "db.t3.micro"
  username               = jsondecode(aws_secretsmanager_secret_version.db_login.secret_string)["login"]
  password               = jsondecode(aws_secretsmanager_secret_version.db_login.secret_string)["password"]
  db_subnet_group_name   = aws_db_subnet_group.rds_db_subnet_group.name
  vpc_security_group_ids = [aws_security_group.rds_security_group.id]
  skip_final_snapshot    = true
}

resource "aws_db_subnet_group" "rds_db_subnet_group" {
  name       = "aws_db_subnet_group"
  subnet_ids = [aws_subnet.palletes.id, aws_subnet.palletes_b.id]
}
