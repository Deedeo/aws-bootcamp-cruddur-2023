from datetime import datetime, timedelta, timezone
from opentelemetry import trace
# from lib.db import pool, query_wrap_array
from lib.db import db

tracer = trace.get_tracer("home.activities")

class HomeActivities:
   def run(cognito_user_id=None):
        # logger.info("Test from Home Activities")
        # with tracer.start_as_current_span("home-activities-mock-data"):
        #     span = trace.get_current_span()
        #     now = datetime.now(timezone.utc).astimezone()
        #     span.set_attribute("app.now", now.isoformat())
            
            sql = db.template('activities','home')
            # sql = db.read_sql_template('activities', 'home')
            results = db.query_array_json(sql)

            return results