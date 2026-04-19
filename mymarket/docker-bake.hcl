group "default" {
    targets = ["main"]
}


variable "PROD" {
    default = "latest"
}

target "_common" {
    platforms = ["linux/amd64"]
}

target "_cache" {
    cache-from = ["type=registry,ref=ghcr.io/KrystianSiupik/palletes:buildcache"]
    cache-to   = ["type=registry,ref=ghcr.io/KrystianSiupik/palletes:buildcache,mode=max"]
}


target "main" {
    context = "."
    inherits = ["_common", "_cache"]
    dockerfile = "Dockerfile"
    tags = ["krystiansiupik/palletes:${PROD}"]
}

