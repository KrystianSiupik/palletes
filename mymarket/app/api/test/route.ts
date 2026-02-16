import { trace, context } from "@opentelemetry/api";

export async function GET() {
  const tracer = trace.getTracer("manual-test");

  return tracer.startActiveSpan("manual-test-span", async (span) => {
    const sc = span.spanContext();
    console.log("TRACE_ID:", sc.traceId);

    await new Promise((r) => setTimeout(r, 300));
    span.end();
    return Response.json({ ok: true, traceId: sc.traceId });
  });
}
