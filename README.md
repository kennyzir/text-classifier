# "Text Classifier"

> Classify text into predefined or custom categories. Use when agents need to route tickets, moderate content, categorize emails, or tag documents. Uses keyword matching and TF-IDF scoring. No external API needed.

[![License: MIT-0](https://img.shields.io/badge/License-MIT--0-blue.svg)](LICENSE)
[![Claw0x](https://img.shields.io/badge/Powered%20by-Claw0x-orange)](https://claw0x.com)
[![OpenClaw Compatible](https://img.shields.io/badge/OpenClaw-Compatible-green)](https://openclaw.org)

## What is This?

This is a native skill for **OpenClaw** and other AI agents. Skills are modular capabilities that agents can install and use instantly - no complex API setup, no managing multiple provider keys.

Built for OpenClaw, compatible with Claude, GPT-4, and other agent frameworks.

## Installation

### For OpenClaw Users

Simply tell your agent:

```
Install the ""Text Classifier"" skill from Claw0x
```

Or use this connection prompt:

```
Add skill: text-classifier
Platform: Claw0x
Get your API key at: https://claw0x.com
```

### For Other Agents (Claude, GPT-4, etc.)

1. Get your free API key at [claw0x.com](https://claw0x.com) (no credit card required)
2. Add to your agent's configuration:
   - Skill name: `text-classifier`
   - Endpoint: `https://claw0x.com/v1/call`
   - Auth: Bearer token with your Claw0x API key

### Via CLI

```bash
npx @claw0x/cli add text-classifier
```

---


# Text Classifier

Classify text into categories using keyword matching and TF-IDF scoring. Supports 8 predefined categories (technology, business, science, health, sports, politics, entertainment, education) or custom categories you define.

## How It Works

1. Tokenize input text, remove stop words
2. Match against category keyword lists
3. Score using term frequency relative to text length
4. Return top category with confidence and ranked alternatives

## Use Cases

- Content moderation (flag inappropriate content)
- Ticket routing (assign support tickets to teams)
- Email categorization (inbox triage)
- Document tagging (auto-label content)
- News classification (topic detection)

## Prerequisites

1. **Sign up at [claw0x.com](https://claw0x.com)**
2. **Create API key** in Dashboard
3. **Set environment variable**: `export CLAW0X_API_KEY="ck_live_..."`

## Pricing

**FREE.** No charge per call.

- Requires Claw0x API key for authentication
- No usage charges (price_per_call = 0)
- Unlimited calls

## Example

**Input**:
```json
{
  "text": "The new GPU from NVIDIA delivers 2x performance for machine learning workloads, making it ideal for training large language models."
}
```

**Output**:
```json
{
  "category": "technology",
  "confidence": 85,
  "top_categories": [
    {"category": "technology", "score": 12.5},
    {"category": "business", "score": 2.1},
    {"category": "science", "score": 1.8}
  ]
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Text too short (<10 chars) or too long (>50K) |
| 401 | Missing or invalid API key |
| 500 | Classification failed (not billed) |

## About Claw0x

[Claw0x](https://claw0x.com) is the native skills layer for AI agents.

**GitHub**: [github.com/kennyzir/text-classifier](https://github.com/kennyzir/text-classifier)


---

## About Claw0x

Claw0x is the native skills layer for AI agents - not just another API marketplace.

**Why Claw0x?**
- **One key, all skills** - Single API key for 50+ production-ready skills
- **Pay only for success** - Failed calls (4xx/5xx) are never charged
- **Built for OpenClaw** - Native integration with the OpenClaw agent framework
- **Zero config** - No upstream API keys to manage, we handle all third-party auth

**For Developers:**
- [Browse all skills](https://claw0x.com/skills)
- [Sell your own skills](https://claw0x.com/docs/sell)
- [API Documentation](https://claw0x.com/docs/api-reference)
- [OpenClaw Integration Guide](https://claw0x.com/docs/openclaw)

## Links

- [Claw0x Platform](https://claw0x.com)
- [OpenClaw Framework](https://openclaw.org)
- [Skill Documentation](https://claw0x.com/skills/text-classifier)
