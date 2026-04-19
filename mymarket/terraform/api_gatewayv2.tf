# AWS podaje, że HTTP APIs są prostsze, tańsze i mają niższe opóźnienia niż REST API

resource "aws_apigatewayv2_api" "general" {
  name          = "http-endpoints-api-gateway"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"] # zamień na konkretną domenę frontu na prod
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["content-type", "authorization"]
  }
}

# Stage $default z auto_deploy – bez tego API nie ma URL-a
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.general.id
  name        = "$default"
  auto_deploy = true
}

# ==================== PALLET ====================

resource "aws_apigatewayv2_integration" "pallet" {
  api_id                 = aws_apigatewayv2_api.general.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.pallet_endpoint.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_pallets" {
  api_id    = aws_apigatewayv2_api.general.id
  route_key = "GET /pallets"
  target    = "integrations/${aws_apigatewayv2_integration.pallet.id}"
}

resource "aws_lambda_permission" "apigw_pallet" {
  statement_id  = "AllowAPIGatewayInvokePallet"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pallet_endpoint.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.general.execution_arn}/*/*"
}

# ==================== ORDER ====================

resource "aws_apigatewayv2_integration" "order" {
  api_id                 = aws_apigatewayv2_api.general.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.order_endpoint.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "get_orders" {
  api_id    = aws_apigatewayv2_api.general.id
  route_key = "GET /orders"
  target    = "integrations/${aws_apigatewayv2_integration.order.id}"
}

resource "aws_lambda_permission" "apigw_order" {
  statement_id  = "AllowAPIGatewayInvokeOrder"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.order_endpoint.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.general.execution_arn}/*/*"
}
