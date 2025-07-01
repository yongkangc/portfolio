---
title: "Keeping trading models simple"
date: 2025-07-01
draft: false
description: "Why a straightforward approach, grounded in clear reasoning and minimal complexity, can set you up for success in the chaotic, competitive world of markets."
tags: ["trading", "strategy", "quantitative", "finance"]
---

# Keeping trading models simple

In trading, it's tempting to chase complex models and sophisticated techniques to gain an edge. But here's a truth worth embracing: **a good trading strategy doesn't need to be complicated to be effective**.

## The Core of a Winning Strategy

At its heart, every successful trading strategy revolves around a single, clear idea. You should be able to explain it in a few sentences. To build this foundation, you need to answer two critical questions:

### 1. Why are others willing—or forced—to trade at prices that work against them?

Understanding the motivations or pressures driving suboptimal trades (e.g., liquidity needs, forced liquidations, or behavioral biases) gives you insight into exploitable market inefficiencies.

For instance, data from historical market crashes shows that panic selling often creates temporary price dislocations, allowing disciplined traders to capitalize.

### 2. Why do you get to take the other side of those trades in a highly competitive market?

In a world of razor-sharp competition, you need a clear edge—whether it's faster execution, better data, or a unique perspective.

For example, high-frequency trading firms leverage low-latency infrastructure to exploit microsecond-level price discrepancies, as evidenced by studies showing their dominance in capturing short-term arbitrage opportunities.

Answer these questions with conviction, backed by data, and you've got a sensible starting point.

## Keep It Simple: Model the Edge Directly

When building your model, resist the urge to overcomplicate. Forget the dense textbooks and intricate algorithms for a moment. **Model your trading idea in the simplest, most direct way possible** without taking unreasonable shortcuts.

A basic momentum strategy, for instance, might rely on a single indicator like a moving average crossover, tested against historical price data to confirm its edge. This approach minimizes complexity while still capturing the core opportunity.

## The Internet Quant's Temptation

Enter the online quant enthusiast, bursting with ideas:

> "Dude, you're leaving money on the table! Add microstructural reversion factors and cross-asset relative value effects with this fancy statistical learning model!"

They're not entirely wrong—those factors might explain a bit more market variance. But here's the catch: **complexity comes at a cost**. When you take your model live, two major challenges emerge:

### The gap between theory and reality

Markets are fiercely competitive. What looks like a golden opportunity in your backtest is often spotted by others, too. Competitive trades are hard to execute, while uncompetitive ones—your "bad bets"—get filled all too easily. This adverse selection can erode your edge.

For example, studies on order book dynamics show that high-frequency traders often face fill rates below 20% on their best trades due to competition.

### Operational overload

Even a simple model generates a mountain of tasks. Two data feeds? They'll arrive late, with variable latency, and sometimes fail entirely. Data errors creep in. You'll need to monitor feed alignment, latency variance, and outages while ensuring your code doesn't break.

**Every added feature or model component multiplies these operational headaches.**

## The Hidden Complexity of "Simple" Features

Even with just two features, you're not off the hook. You'll need to:

- **Monitor distributions**: Are the inputs behaving as expected? A sudden shift in volatility could skew your features.
- **Handle misalignments and outliers**: Downtime or bad data can wreck your feature generation.
- **Scale effectively**: Ensure your system can handle real-time demands without crashing.

Your predictive model needs constant babysitting, too. Is it performing as expected? Does it need recalibration? The more components you add, the harder it is to reason through these issues.

## Trading Logic: A Prediction Problem in Disguise

Trading logic introduces its own complexities. Tracking order states and risk exposures becomes a prediction problem:

- You won't know if an order filled until after a delay. Do you wait or estimate?
- Your exposure is probabilistic, not certain, requiring constant recalculations.
- Reconciliations, compliance checks, and other operational tasks pile up.

## The Real Problem: Theory vs. Trading Performance

Even if your theoretical model performs well, your actual trading results may lag. Why? As trading veteran [@0xdoug](https://twitter.com/0xdoug) wisely noted:

> "It's not just one thing—it's everything."

Latency, data errors, execution delays, and market competition all chip away at your edge. Fixing this requires breaking the problem into manageable chunks, not piling on more features. While tweaking the model might help, it's rarely the first place to start.

## The Case for Simplicity

The takeaway? **Even the simplest, most direct trading model will overwhelm you with operational and analytical challenges.** Adding cross-asset factors or microstructural features might explain a sliver more market variance, but each addition introduces new jobs, confusion, and failure points.

Unless you're already operationally bulletproof, chasing theoretical gains is a recipe for chaos.

Instead, focus on what matters:

1. **Chunk down the problem**: Tackle operational issues like latency and data quality first.
2. **Prioritize the real jobs**: Monitor, manage, and optimize the systems you know need attention.
3. **Ignore the noise**: Online threads about fancy models are seductive but often distract from the grind of execution.

## Conclusion

Markets are chaotic, but a simple, well-executed strategy can cut through the noise. Build your edge, keep it lean, and stay disciplined. That's how you turn a good idea into real profits.
