import boto3
from datetime import datetime, timezone, timedelta

lambda_client = boto3.client('lambda', region_name='us-east-2')
cw_client = boto3.client('cloudwatch', region_name='us-east-2')

FUNCTION_NAME = 'desertation-backend-lambda'

PRICE_PER_REQUEST = 0.0000002
PRICE_PER_GB_SECOND = 0.0000166667

config = lambda_client.get_function_configuration(FunctionName=FUNCTION_NAME)
memory_mb = config['MemorySize']
memory_gb = memory_mb / 1024

print("=" * 60)
print("LAMBDA COST BREAKDOWN (production pricing, no free tier)")
print("=" * 60)
print(f"Function: {FUNCTION_NAME}")
print(f"Memory configured: {memory_mb} MB ({memory_gb} GB)")

end_time = datetime.now(timezone.utc)
start_time = end_time - timedelta(days=30)   
window_seconds = int((end_time - start_time).total_seconds())
period = 3600  

invocations_response = cw_client.get_metric_statistics(
    Namespace='AWS/Lambda',
    MetricName='Invocations',
    Dimensions=[{'Name': 'FunctionName', 'Value': FUNCTION_NAME}],
    StartTime=start_time,
    EndTime=end_time,
    Period=period,
    Statistics=['Sum']
)
total_invocations = sum(dp['Sum'] for dp in invocations_response['Datapoints'])

duration_response = cw_client.get_metric_statistics(
    Namespace='AWS/Lambda',
    MetricName='Duration',
    Dimensions=[{'Name': 'FunctionName', 'Value': FUNCTION_NAME}],
    StartTime=start_time,
    EndTime=end_time,
    Period=period,
    Statistics=['Average', 'SampleCount']
)
datapoints = duration_response['Datapoints']
if datapoints:
    total_weighted = sum(dp['Average'] * dp['SampleCount'] for dp in datapoints)
    total_samples = sum(dp['SampleCount'] for dp in datapoints)
    avg_duration_ms = total_weighted / total_samples if total_samples > 0 else 0
else:
    avg_duration_ms = 0

avg_duration_s = avg_duration_ms / 1000

print(f"\nWindow: {start_time} -> {end_time}  ({window_seconds/86400:.1f} days)")
print(f"Total invocations: {int(total_invocations)}")
print(f"Average duration: {avg_duration_ms:.2f} ms")

gb_seconds = total_invocations * avg_duration_s * memory_gb
request_cost = total_invocations * PRICE_PER_REQUEST
compute_cost = gb_seconds * PRICE_PER_GB_SECOND
total_cost = request_cost + compute_cost

print("\n" + "=" * 60)
print("COST CALCULATION (production pricing, no free tier)")
print("=" * 60)
print(f"GB-seconds used: {gb_seconds:.6f}")
print(f"Request cost:  ${request_cost:.8f}")
print(f"Compute cost:  ${compute_cost:.8f}")
print(f"TOTAL LAMBDA COST: ${total_cost:.8f}")

if total_invocations == 0:
    print("\nNote: No invocations found. Your function may not have been called in this window,")
    print("or CloudWatch metrics may take a few minutes to appear after invocation.")