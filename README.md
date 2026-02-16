plik otel.js

Ustaiwenie gdzie mają być wysyłane tracy do Otel Collectora
traceExporter: new OTLPTraceExporter({ url: "http://localhost:4317" })

Automatyczne zbieranie traceów bez manualnego wybierania
instrumentations: [getNodeAutoInstrumentations()]
