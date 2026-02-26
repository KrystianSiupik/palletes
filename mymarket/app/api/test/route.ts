import { trace, context } from "@opentelemetry/api";
import { Logger } from "@/app/shared/infrastructure/Logger";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";

export async function GET() {
  const tracer = trace.getTracer("manual-test");
  const logger = new Logger();

  return tracer.startActiveSpan("manual-test-span", async (span) => {
    const sc = span.spanContext();

    logger.Info("First log", { super: " jest git" });
    logs.getLogger("test").emit({
      severityNumber: 9,
      body: "manual test log",
    });

    console.log("OTEL STARTED");

    await new Promise((r) => setTimeout(r, 300));
    span.end();
    return Response.json({ ok: true, traceId: sc.traceId });
  });
}
