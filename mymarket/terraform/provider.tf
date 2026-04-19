provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "mymarket"
      Environment = "dev"
      ManagedBy   = "terraform"
    }
  }
}
