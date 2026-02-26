const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");
const { OTLPLogExporter } = require("@opentelemetry/exporter-logs-otlp-grpc");
const { SimpleLogRecordProcessor } = require("@opentelemetry/sdk-logs");
const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-grpc");
const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");

const traceExporter = new OTLPTraceExporter({ url: "http://otel:4317" });
const logExporter = new OTLPLogExporter({ url: "http://otel:4317" });

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
  logRecordProcessors: [new SimpleLogRecordProcessor(logExporter)],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({ url: "http://otel:4317" }),
    exportIntervalMillis: 5000,
  }),
});

sdk.start();
