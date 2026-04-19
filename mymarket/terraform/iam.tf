resource "aws_iam_role" "rds_proxy_role" {
  name = "rds_proxy_role"

  assume_role_policy = jsonencode({ # kto może tę rolę przyjąć
    Version = "2012-10-17"
    Statement = {
      Effect = "Allow",
      Principal = {
        Service = "rds.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }
  })
}

resource "aws_iam_policy" "secret_manager_policy" {
  name = "secret_manager_policy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "Statement1",
        Effect = "Allow",
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ],
        Resource = aws_secretsmanager_secret.rds_db.arn
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "attach_proxy_rds" {
  name       = "secret_manager_for_proxy"
  roles      = [aws_iam_role.rds_proxy_role.name]
  policy_arn = aws_iam_policy.secret_manager_policy.arn
}


# ==================== LAMBDA ROLE ====================

# AWS wymaga execution role i co najmniej uprawnień do logów w CloudWatch, bo Lambda loguje tam domyślnie.
resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Logi do CloudWatch
resource "aws_iam_role_policy_attachment" "lambda_basic_logs" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Uprawnienia do tworzenia ENI w VPC
resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# Odczyt credentials do bazy z Secrets Managera
resource "aws_iam_role_policy_attachment" "lambda_secrets" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.secret_manager_policy.arn
}
