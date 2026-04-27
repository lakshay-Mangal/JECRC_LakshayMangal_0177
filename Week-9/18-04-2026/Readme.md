# Angular Change Detection Demo

Practical implementation of Angular's change detection strategies demonstrating the Change Detection Puzzle.

## Run Locally

```bash
npm install
ng serve
```

Open `http://localhost:4200`

---

## The Puzzle

**Component Hierarchy:**
```
AppComponent           (Default strategy)
└── DashboardComponent (OnPush strategy)
    └── StatsComponent (Default strategy)
```

`DashboardComponent` receives `@Input() userStats` from `AppComponent`.

```typescript
updateLocally() {
  this.userStats.score = 100;
}
```

After clicking a button that calls `updateLocally()`:
- `DashboardComponent` view does **NOT** update
- `StatsComponent` (child) **does** show the updated score

---

## Question Answers

### a) Why does DashboardComponent not update its own view? (3 marks)

`DashboardComponent` uses `ChangeDetectionStrategy.OnPush`. With this strategy Angular only re-renders the component when at least one of these conditions is true:

1. An `@Input()` binding receives a **new object reference**
2. An event is triggered from **within** the component itself
3. An `async` pipe in the template resolves a new value
4. `ChangeDetectorRef.markForCheck()` is called manually

The method `this.userStats.score = 100` directly **mutates** the existing object in memory. The variable `userStats` still points to the exact same object at the same memory address. Angular's `OnPush` check compares references using strict equality (`===`) — it does not deep-inspect property values. Since the reference has not changed, Angular concludes that the input is unchanged and **skips change detection** for `DashboardComponent`, leaving its view stale.

**Root cause in one sentence:** OnPush uses reference equality (`===`), and mutating a property does not change the object reference.

---

### b) Why does StatsComponent show the updated value? (3 marks)

`StatsComponent` uses `ChangeDetectionStrategy.Default` (which is the Angular default — no `changeDetection` option needed).

With the Default strategy Angular checks this component on **every single change detection cycle**, regardless of whether any input reference changed. Change detection cycles are triggered by any browser event — including the button click in `DashboardComponent`.

When the button is clicked:
1. Angular triggers a change detection cycle for the whole tree
2. `DashboardComponent` (OnPush) is **skipped** — its `@Input` reference has not changed
3. `StatsComponent` (Default) is **checked** — Default strategy never skips
4. Angular reads `userStats.score` from the template binding — this reads directly from the mutated object in memory — and finds the new value, updating the DOM

**Root cause in one sentence:** Default strategy checks every component on every cycle regardless of input references, so it picks up in-place mutations automatically.

---

### c) How to fix DashboardComponent without changing its strategy to Default? (4 marks)

Two correct approaches exist, both demonstrated in the app:

#### Fix 1 — Immutable update with the spread operator (Recommended)

```typescript
updateByImmutableCopy(): void {
  this.userStats = { ...this.userStats, score: this.userStats.score + 10 };
}
```

**Why it works:** The spread operator `{ ...this.userStats, score: newVal }` creates a **brand new object** in memory. `this.userStats` now points to a different reference. Angular's `OnPush` check sees the reference has changed (`oldRef !== newRef`) and schedules a re-render of `DashboardComponent`.

This is the preferred pattern because it:
- Keeps data flow predictable and unidirectional
- Works naturally with `OnPush` throughout the component tree
- Is compatible with NgRx, Signals, and reactive state management
- Makes state changes traceable since each update produces a new object

#### Fix 2 — ChangeDetectorRef.markForCheck()

```typescript
constructor(private cdr: ChangeDetectorRef) {}

updateWithMarkForCheck(): void {
  this.userStats.score += 10;
  this.cdr.markForCheck();
}
```

**Why it works:** `markForCheck()` walks up the component tree from `DashboardComponent` to the root and marks every ancestor as "dirty." On the next change detection cycle Angular will check all dirty components, including `DashboardComponent`, which then reads the mutated value and updates the view.

This is useful when you cannot avoid mutation (third-party libraries, WebSocket callbacks, etc.) but comes with a trade-off: you are partially working against `OnPush` since the component is being force-checked rather than truly reactive.

---

## How This Project Demonstrates the Solution

| Button in UI | Method called | What happens |
|---|---|---|
| "Mutate score +10" | `updateByMutation()` | Mutates object in place — Dashboard score stays stale, StatsComponent score updates |
| "Immutable update +10" | `updateByImmutableCopy()` | New object reference — both Dashboard and Stats update correctly |
| "markForCheck +10" | `updateWithMarkForCheck()` | Mutates but forces check — both Dashboard and Stats update |

The visual gap between the score displayed in `DashboardComponent` and the score displayed in `StatsComponent` makes the problem immediately visible. After clicking the broken button you can see the two numbers diverge.

---

## Key Concepts Summary

| Strategy | When Angular checks the component |
|---|---|
| Default | Every change detection cycle, unconditionally |
| OnPush | Only when input reference changes, own event fires, async pipe resolves, or markForCheck() is called |

**Best practice:** Use `OnPush` everywhere for performance. Always treat `@Input()` objects as immutable — never mutate them in place. Instead create a new object: `{ ...original, changedProp: newValue }`.

---

## Project Structure

```
src/app/
├── app.ts                  AppComponent — Default strategy, owns userStats
├── app.html
├── app.css
├── app.config.ts
├── dashboard/
│   ├── dashboard.ts        DashboardComponent — OnPush strategy
│   ├── dashboard.html
│   ├── dashboard.css
│   └── stats/
│       ├── stats.ts        StatsComponent — Default strategy
│       ├── stats.html
│       └── stats.css
└── main.ts
```