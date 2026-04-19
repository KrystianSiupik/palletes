#
# Przed `terraform apply` trzeba zbudować kod lambd (TS -> JS):
#
#   npx esbuild app/backend/lambdas/pallet/index.ts \
#     --bundle --platform=node --target=node20 \
#     --outfile=app/backend/lambdas/pallet/dist/index.js
#
#   npx esbuild app/backend/lambdas/order/handler.ts \
#     --bundle --platform=node --target=node20 \
#     --outfile=app/backend/lambdas/order/dist/handler.js
#

# ==================== PALLET ====================

data "archive_file" "pallet" {
  type        = "zip"
  source_dir  = "${path.module}/../app/backend/lambdas/pallet/dist"
  output_path = "${path.module}/build/pallet.zip"
}

resource "aws_lambda_function" "pallet_endpoint" {
  filename      = data.archive_file.pallet.output_path
  function_name = "pallet_endpoint"

  role    = aws_iam_role.lambda_role.arn
  handler = "index.handler" # nazwa pliku + funkcji

  runtime = "nodejs20.x"

  source_code_hash = data.archive_file.pallet.output_base64sha256

  vpc_config {
    subnet_ids         = [aws_subnet.palletes.id, aws_subnet.palletes_b.id]
    security_group_ids = [aws_security_group.lambda_security_group.id]
  }

  environment {
    variables = {
      DB_HOST    = aws_db_proxy.rds_db_proxy.endpoint
      DB_NAME    = aws_db_instance.rds_db_instance.db_name
      SECRET_ARN = aws_secretsmanager_secret.rds_db.arn
    }
  }
}

resource "aws_cloudwatch_log_group" "pallet_endpoint" {
  name              = "/aws/lambda/${aws_lambda_function.pallet_endpoint.function_name}"
  retention_in_days = 14
}

# ==================== ORDER ====================

data "archive_file" "order" {
  type        = "zip"
  source_dir  = "${path.module}/../app/backend/lambdas/order/dist"
  output_path = "${path.module}/build/order.zip"
}

resource "aws_lambda_function" "order_endpoint" {
  filename      = data.archive_file.order.output_path
  function_name = "order_endpoint"

  role    = aws_iam_role.lambda_role.arn
  handler = "handler.handler"

  runtime = "nodejs20.x"

  source_code_hash = data.archive_file.order.output_base64sha256

  vpc_config {
    subnet_ids         = [aws_subnet.palletes.id, aws_subnet.palletes_b.id]
    security_group_ids = [aws_security_group.lambda_security_group.id]
  }

  environment {
    variables = {
      DB_HOST    = aws_db_proxy.rds_db_proxy.endpoint
      DB_NAME    = aws_db_instance.rds_db_instance.db_name
      SECRET_ARN = aws_secretsmanager_secret.rds_db.arn
    }
  }
}

resource "aws_cloudwatch_log_group" "order_endpoint" {
  name              = "/aws/lambda/${aws_lambda_function.order_endpoint.function_name}"
  retention_in_days = 14
}
