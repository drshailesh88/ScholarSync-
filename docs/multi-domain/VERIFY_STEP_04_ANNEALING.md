# Step 4: Annealing Score Check

## AGENT: Local terminal (read-only measurement)

## PROMPT

Run the ScholarSync quality scoring system to measure if the multi-domain expansion degraded quality. The score must stay FROZEN (>95 composite). Before this sprint, the score was 99.4.

```bash
# Run the quality scorer
node quality-score.mjs 2>&1 | tee /tmp/annealing-check.log

# Check the last annealing log entry
tail -1 annealing-log.jsonl
```

## EXPECTED OUTCOME
- Composite score ≥ 95 (FROZEN temperature)
- No dimensional score below 80
- Phase averages all ≥ 95

## IF SCORE DROPPED
Report:
1. Which dimensions dropped and by how much
2. Which files from the multi-domain work likely caused each drop
3. The specific checkpoints that are now failing

This information feeds into Step 8 (self-heal) if needed.

## IMPORTANT
DO NOT modify any code. This is measurement only.
