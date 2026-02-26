import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("app");
const counter = meter.createCounter("app_test_hits_total");

export async function GET() {
  counter.add(1);
  return Response.json({ ok: true });
}
