// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
// import { ZoneContextManager } from '@opentelemetry/context-zone';
// import { Resource }  from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
// import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
// import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';


// const exporter = new OTLPTraceExporter({
//   url: `${process.env.REACT_APP_OTEL_COLLECTOR_URL}/v1/traces`,
// });
// const provider = new WebTracerProvider({
//   resource: new Resource({
//     [SemanticResourceAttributes.SERVICE_NAME]: 'frontend',
//   }),
// });
// provider.addSpanProcessor(new BatchSpanProcessor(exporter));
// provider.register({
//   contextManager: new ZoneContextManager()
// });


// provider.addSpanProcessor(new BatchSpanProcessor(exporter));
// provider.register({
//   contextManager: new ZoneContextManager()
// });

// registerInstrumentations({
//   instrumentations: [
//     new XMLHttpRequestInstrumentation({
//       propagateTraceHeaderCorsUrls: [
//         new RegExp(`${process.env.REACT_APP_BACKEND_URL}`, 'g')
//         // /^https:\/\/4567-[a-z0-9]+-[a-z0-9]+-[a-z0-9].+[a-z0-9]+\.gitpod\.io\//g
//       ]
//     }),
//     new FetchInstrumentation({
//       propagateTraceHeaderCorsUrls: [
//         new RegExp(`${process.env.REACT_APP_BACKEND_URL}`, 'g')
//         // /^https:\/\/4567-[a-z0-9]+-[a-z0-9]+-[a-z0-9].+[a-z0-9]+\.gitpod\.io\//g
//       ]
//     }),
//     new DocumentLoadInstrumentation(),
//     // new UserInteractionInstrumentation(),
//   ],
// });
