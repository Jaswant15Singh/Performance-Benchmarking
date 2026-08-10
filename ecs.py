import pandas as pd
import boto3
from datetime import datetime, timezone, timedelta

asg_client = boto3.client('autoscaling', region_name='us-east-2')

EC2_HOURLY = 0.0104
ALB_HOURLY = 0.0225

end_time = datetime.now(timezone.utc)
start_time = end_time - timedelta(days=30)

response = asg_client.describe_scaling_activities(
    AutoScalingGroupName='Desertation-ASG'
)
activities = response['Activities']
activities = [
    a for a in activities
    if start_time <= a['StartTime'] <= end_time
]

launches = {}
terminations = {}

for activity in activities:
    desc = activity['Description']
    if 'Launching' in desc:
        iid = desc.split(': ')[1].strip()
        launches[iid] = activity['StartTime']
    elif 'Terminating' in desc:
        iid = desc.split(': ')[1].strip()
        terminations[iid] = activity['StartTime']

instances = []
still_running = []

for iid, start in launches.items():
    if iid in terminations:
        instances.append({"id": iid, "start": start, "end": terminations[iid], "status": "terminated"})
    else:
        now = datetime.now(timezone.utc)
        instances.append({"id": iid, "start": start, "end": now, "status": "still running"})
        still_running.append(iid)

if still_running:
    print(f"Note: {len(still_running)} instance(s) still running (cost calculated up to NOW): {still_running}\n")

print("=" * 60)
print("EC2 INSTANCE COST BREAKDOWN (production pricing, no free tier)")
print("=" * 60)

total_hours = 0.0
total_ec2_cost = 0.0
rows = []

for inst in instances:
    start = pd.to_datetime(inst["start"])
    end = pd.to_datetime(inst["end"])
    hours = (end - start).total_seconds() / 3600
    cost = EC2_HOURLY * hours
    total_hours += hours
    total_ec2_cost += cost
    rows.append({
        "Instance": inst["id"],
        "Status": inst["status"],
        "Hours": round(hours, 3),
        "Cost ($)": round(cost, 5)
    })
    print(f"{inst['id']} [{inst['status']}]: {hours:.3f} hours -> ${cost:.5f}")

df = pd.DataFrame(rows)
print("\n" + df.to_string(index=False))

print("\n" + "-" * 60)
print(f"TOTAL EC2 instance-hours: {total_hours:.3f}")
print(f"TOTAL EC2 cost:           ${total_ec2_cost:.5f}")

if instances:
    earliest = min(pd.to_datetime(i["start"]) for i in instances)
    latest = max(pd.to_datetime(i["end"]) for i in instances)
    alb_window_hours = (latest - earliest).total_seconds() / 3600
    alb_cost = ALB_HOURLY * alb_window_hours

    print("\n" + "=" * 60)
    print("ALB COST (assumes ALB ran continuously across the whole window)")
    print("=" * 60)
    print(f"Window: {earliest} -> {latest}")
    print(f"ALB hours: {alb_window_hours:.3f}")
    print(f"ALB cost:  ${alb_cost:.5f}")

    grand_total = total_ec2_cost + alb_cost
    print("\n" + "=" * 60)
    print("GRAND TOTAL (ECS-side: EC2 + ALB, production pricing)")
    print("=" * 60)
    print(f"EC2 cost:  ${total_ec2_cost:.5f}")
    print(f"ALB cost:  ${alb_cost:.5f}")
    print(f"TOTAL:     ${grand_total:.5f}")
else:
    print("No paired launch/terminate events found.")