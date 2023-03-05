# Week 2 — Distributed Tracing
# Week 2 — Distributed Tracing

## Required Homework

## Instrument with HoneyComb

### Configure OpenTelemetry for Python-flask

This guide will help you add OpenTelemetry to a backend service, and ensure that instrumentation data is being sent to Honeycomb.

- Add HoneyComb opentelemetry libraries in `requirements.txt` and used pip to install them.
```txt
opentelemetry-api 
opentelemetry-sdk 
opentelemetry-exporter-otlp-proto-http 
opentelemetry-instrumentation-flask 
opentelemetry-instrumentation-requests
```

### Initialize

- Python Flask app initialization add this to the `app.py`. These updates will create and initialize a `tracer` and `Flask instrumentation` to send data to Honeycomb.

```python
# Initialize tracing with HoneyComb
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.instrumentation.requests import RequestsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Initialize tracing and an exporter that can send data to Honeycomb
provider = TracerProvider()
processor = BatchSpanProcessor(OTLPSpanExporter())
provider.add_span_processor(processor)
trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)

# Initialize automatic instrumentation with Flask
app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)
RequestsInstrumentor().instrument()
```


- Set HoneyComb API environment variables for docker compose. 
```yml
      OTEL_SERVICE_NAME: 'backend-flask'
      OTEL_EXPORTER_OTLP_ENDPOINT: "https://api.honeycomb.io"
      OTEL_EXPORTER_OTLP_HEADERS: "x-honeycomb-team=${HONEYCOMB_API_KEY}"
```


- To create spans, you need to get a `Tracer`. Add the following lines of code to the `services/home_activities.py file`.

```
from opentelemetry import trace

tracer = trace.get_tracer("tracer.name.here")
```

- **Creating Span**
- **Created a custom attribute inside that span**
```py
with tracer.start_as_current_span("home-activites-mock-data"):
    span = trace.get_current_span() # this will get the span
    now = datetime.now(timezone.utc).astimezone()
    span.set_attribute("app.now", now.isoformat()) # this app.now attribute will show inside this span "home-activites-mock-data" , its data is the time now in ISO foramt.
```

**Run queries to explore traces within Honeycomb.io**
![image]()

**Explore attributes of our custom span**
![image]()


## AWS X-RAY

### Instrument AWS X-Ray into Backend (Python-Flask) App
- Add the line below to `requirements.txt` file and install it using `pip install -r requirements.txt`.

```py
aws-xray-sdk
```
### Adding the middleware to your application (flask)

To instrument your Flask application, first configure a segment name on the xray_recorder. Then, use the XRayMiddleware function to patch your Flask application in code.

Add the following lines of code to `app.py`

```python
...
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware

app = Flask(__name__)

...
xray_url = os.getenv("AWS_XRAY_URL")
xray_recorder.configure(service='cruddur-backend-flask', dynamic_naming=xray_url)
XRayMiddleware(app, xray_recorder)
```

- In the `backend-flask` directory and create a `xray.json` file and add the lines below.

```json
{
  "SamplingRule": {
      "RuleName": "Cruddur",
      "ResourceARN": "*",
      "Priority": 9000,
      "FixedRate": 0.1,
      "ReservoirSize": 5,
      "ServiceName": "backend-flask",
      "ServiceType": "*",
      "Host": "*",
      "HTTPMethod": "*",
      "URLPath": "*",
      "Version": 1
  }
}
```
- Run this command at the project directory to generate a `sampling rule`.
```sh
aws xray create-sampling-rule --cli-input-json file://aws/json/xray-sampling-rule.json
```

### Configure and provision X-Ray daemon within docker-compose and send data back to X-Ray API


```yml
  xray-daemon:
    image: "amazon/aws-xray-daemon"
    environment:
      AWS_ACCESS_KEY_ID: "${AWS_ACCESS_KEY_ID}"
      AWS_SECRET_ACCESS_KEY: "${AWS_SECRET_ACCESS_KEY}"
      AWS_REGION: "aws-region"
    command:
      - "xray -o -b xray-daemon:2000"
    ports:
      - 2000:2000/udp
```
- Add these two environment variable to the backend (python-flask) in `docker-compose` file
```yml
      AWS_XRAY_URL: "*4567-${GITPOD_WORKSPACE_ID}.${GITPOD_WORKSPACE_CLUSTER_HOST}*"
      AWS_XRAY_DAEMON_ADDRESS: "xray-daemon:2000"
```

### Observe X-Ray traces within the AWS Console
**proof of work**
![image]()


 [commit details]()



## AWS CloudWatch Logs

### Install WatchTower and Import It in the Code

Add the following to the `requirements.txt` file.

```txt
watchtower
```

Use the following configuration to send Flask logs to a CloudWatch Logs stream called `cruddur`:

Add the following lines of code to `app.py`

```python
...
import watchtower, logging
from time import strftime

# Configuring Logger to Use CloudWatch
LOGGER = logging.getLogger(__name__)
LOGGER.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
cw_handler = watchtower.CloudWatchLogHandler(log_group='cruddur')
LOGGER.addHandler(console_handler)
LOGGER.addHandler(cw_handler)

@app.after_request
def after_request(response):
    timestamp = strftime('[%Y-%b-%d %H:%M]')
    LOGGER.error('%s %s %s %s %s %s', timestamp, request.remote_addr, request.method, request.scheme, request.full_path, response.status)
    return response
```

We'll log something in an API endpoint

```python
LOGGER.info('IAM Active Logger! from  /api/activities/home')
```

Set the following environment vars in the `backend-flask` service section of `docker-compose.yml`

```yml
AWS_DEFAULT_REGION: "${AWS_DEFAULT_REGION}"
AWS_ACCESS_KEY_ID: "${AWS_ACCESS_KEY_ID}"
AWS_SECRET_ACCESS_KEY: "${AWS_SECRET_ACCESS_KEY}"
```
`Note` Passing `AWS_REGION` doesn't seem to get picked up by `boto3` so pass `AWS_DEFAULT_REGION` instead


## Rollbar

### Add the Flask SDK

Installation

Make sure to install `Flask` and `blinker` dependencies first, by adding the following to `requirements.txt` file.

```txt
...
rollbar 
blinker
```

We need to set the `rollbar` access token

```bash
export ROLLBAR_ACCESS_TOKEN=""
gp env ROLLBAR_ACCESS_TOKEN=""
```

Add to `backend-flask` for docker-compose.yml

```yaml
ROLLBAR_ACCESS_TOKEN: "${ROLLBAR_ACCESS_TOKEN}"
```

### Add Rollbar to Your Flask Application

Add the following lines of code to `app.py`

```python
## Rollbar init code. You'll need the following to use Rollbar with Flask.
import rollbar
import rollbar.contrib.flask
from flask import got_request_exception

rollbar_access_token = os.getenv('ROLLBAR_ACCESS_TOKEN')
@app.before_first_request
def init_rollbar():
    """init rollbar module"""
    rollbar.init(
        # access token
        rollbar_access_token,
        # environment name
        'production',
        # server root directory, makes tracebacks prettier
        root=os.path.dirname(os.path.realpath(__file__)),
        # flask already sets up logging
        allow_logging_basic_config=False)

    # send exceptions from `app` to rollbar, using flask's signal system.
    got_request_exception.connect(rollbar.contrib.flask.report_exception, app)
```

We'll add an endpoint just for testing rollbar to `app.py`

```python
@app.route('/rollbar/test')
def rollbar_test():
    rollbar.report_message('Just for test', 'warning')
    return "Just for test"
```
