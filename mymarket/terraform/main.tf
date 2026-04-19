terraform {
  # UWAGA: bucket trzeba stworzyć RĘCZNIE przed `terraform init`
  # (albo osobnym projektem TF w innym katalogu)
  backend "s3" {
    bucket       = "mymarket-terraform-state"
    key          = "infra/terraform.tfstate"
    region       = "eu-central-1"
    encrypt      = true
    use_lockfile = true # natywny lock w S3 (TF 1.10+)
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}
