
import pandas as pd
import boto3

asg_client = boto3.client('autoscaling', region_name='us-east-2')
EC2_HOURLY = 0.0104   
ALB_HOURLY = 0.0225  


response = asg_client.describe_scaling_activities(
    AutoScalingGroupName='Desertation-ASG'
)
instances = response['Activities']
print(instances)
print("=" * 60)
print("EC2 INSTANCE COST BREAKDOWN")
print("=" * 60)

total_hours = 0.0
total_ec2_cost = 0.0

rows = []
for inst in instances:
    start = pd.to_datetime(inst["StartTime"])
    end = pd.to_datetime(inst["EndTime"])
    hours = (end - start).total_seconds() / 3600
    cost = EC2_HOURLY * hours
    total_hours += hours
    total_ec2_cost += cost
    rows.append({"Instance": inst["ID"], "Hours": round(hours, 3), "Cost ($)": round(cost, 5)})
    print(f"{inst['ID']}: {hours:.3f} hours -> ${cost:.5f}")