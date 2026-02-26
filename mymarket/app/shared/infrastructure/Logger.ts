import { logs, SeverityNumber } from "@opentelemetry/api-logs";
import { trace, context } from "@opentelemetry/api";

function getTraceContext() {
  const span = trace.getSpan(context.active());
  return span?.spanContext();
}

export class Logger {
  private logger = logs.getLogger("app-logger");

  Info(message: string, meta?: Record<string, unknown>) {
    const spanContext = getTraceContext();

    this.logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "INFO",
      body: JSON.stringify({
        message,
        ...meta,
      }),
    });
  }

  Error(message: string, meta?: Record<string, unknown>) {
    const spanContext = getTraceContext();

    this.logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: "ERROR",
      body: JSON.stringify({
        message,
        ...meta,
      }),
    });
  }
}
