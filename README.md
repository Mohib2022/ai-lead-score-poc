# ai-lead-score-poc

A lightweight React component library to **display AI-based Lead Scores and their timelines** in a flexible and customizable way.

This package helps you easily show lead scores, compare multiple leads, visualize score history, and even inject lead scores into existing HTML tables — without rewriting your UI.

---

## 📦 Package Overview

`ai-lead-score-poc` is a React-based npm package designed to show **lead score data and timeline insights** for students or leads.

It works out-of-the-box with minimal setup and also gives you full freedom to **customize UI components** according to your design system (MUI, custom CSS, etc.).

> ⚠️ **Important Note**  
> For now, the `apiKey` is **static** and must be:
>
> ```ts
> https://www.demoapi.com
> ```
>
> Passing any other value will not work.  
> This will be made dynamic in future releases.

---

## 🚀 What Can This Package Do?

- Show **single lead score**
- Show **multiple lead scores**
- Inject **lead score column** into any existing table
- Display **lead score timeline**
- Show timeline inside a **dialog/modal**
- Support **fully custom UI components**

---

## 📥 Installation

```bash
npm install ai-lead-score-poc

yarn add ai-lead-score-poc
```

---

## 🧩 Components & Usage Details

Below are all available components with clear explanations and prop details.

---

### 1️⃣ ShowSingleLeadScore

Displays the lead score for a **single student**.

### Props

| Prop Name         | Type            | Required | Description                       |
| ----------------- | --------------- | -------- | --------------------------------- |
| `apiKey`          | `string`        | ✅       | Must be `https://www.demoapi.com` |
| `studentId`       | `string`        | ✅       | Unique student/lead ID            |
| `CustomComponent` | `ComponentType` | ❌       | Custom UI for rendering score     |

### CustomComponent Props

```ts
{
  isLoading: boolean;
  score: number;
}
```

### Example

```tsx
import { ShowSingleLeadScore } from "ai-lead-score-poc";

export default function SingleScoreExample() {
  return (
    <ShowSingleLeadScore
      apiKey="https://www.demoapi.com"
      studentId="STUDENT_123"
    />
  );
}
```

## 2️⃣ LeadScoreTimelineDialog

Shows lead score timeline inside a dialog/modal.

### Props

| Prop Name         | Type            | Required | Description                                     |
| ----------------- | --------------- | -------- | ----------------------------------------------- |
| `DialogInitiator` | `ComponentType` | ✅       | Button or element to open dialog                |
| `TimelineDialog`  | `ComponentType` | ❌       | Custom dialog UI                                |
| `CustomTimeline`  | `ComponentType` | ❌       | Custom timeline UI                              |
| `studentId`       | `string`        | ✅       | Student ID                                      |
| `apiKey`          | `string`        | ✅       | Static API key                                  |
| `dialogTitle`     | `string`        | ❌       | Dialog Header (default : `Lead Score Timeline`) |

### DialogInitiator Props

```ts
{
  onClick: () => void;
}
```

### TimelineDialog Props

```ts
{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  leadScoreDetails: {
    date: string;
    score: number;
    message: string;
  }
  [];
}
```

### CustomTimeline Props

```ts
CustomTimelineProps
{
  timelineDetails: {
    date: string;
    score: number;
    message: string;
  }[];
  isLoading?: boolean;
}
```

### Example

```tsx
import { LeadScoreTimelineDialog } from "ai-lead-score-poc";

export default function TimelineDialogExample() {
  return (
    <LeadScoreTimelineDialog
      apiKey="https://www.demoapi.com"
      studentId="STUDENT_123"
      DialogInitiator={({ onClick }) => (
        <button onClick={onClick}>View Lead Timeline</button>
      )}
    />
  );
}
```

## 3️⃣ MultipleStudentLeadScore

Displays lead scores for multiple students at once.

### Props

| Prop Name         | Type            | Required | Description              |
| ----------------- | --------------- | -------- | ------------------------ |
| `studentIds`      | `string[]`      | ✅       | List of student IDs      |
| `apiKey`          | `string`        | ✅       | Static API key           |
| `loader`          | `ReactElement`  | ❌       | Loader UI while fetching |
| `className`       | `string`        | ❌       | Custom wrapper class     |
| `CustomComponent` | `ComponentType` | ❌       | Custom UI for score list |

### CustomComponent Props

```ts
{
  scores: Array<{
    studentId: string;
    name: string;
    leadScore: number | null;
    email: string;
    phone: number;
  }>;
}
```

### Example

```tsx
import { MultipleStudentLeadScore } from "ai-lead-score-poc";

export default function MultipleScoreExample() {
  return (
    <MultipleStudentLeadScore
      apiKey="https://www.demoapi.com"
      studentIds={["STUDENT_1", "STUDENT_2", "STUDENT_3"]}
    />
  );
}
```

## 4️⃣ LeadScoreTimeline

Shows lead score history in different layouts like table, card, or timeline.

### Props

| Prop Name          | Type                | Required | Description        |
| ------------------ | ------------------- | -------- | ------------------ |
| `apiKey`           | `string`            | ✅       | Static API key     |
| `studentId`        | `string`            | ✅       | Student ID         |
| `timelineType`     | `timelineTypes`     | ❌       | UI type            |
| `timelinePosition` | `timelinePositions` | ❌       | Timeline alignment |
| `CustomTimeline`   | `ComponentType`     | ❌       | Custom timeline UI |
| `classes`          | `object`            | ❌       | Custom class names |

**timelineTypes** :
`"table" | "card" | "timeline" | undefined`

**timelinePositions** : `"right" | "left" | "alternate" | "alternate-reverse" | undefined`

### CustomTimeline Props

```ts
CustomTimelineProps
{
  timelineDetails: {
    date: string;
    score: number;
    message: string;
  }[];
  isLoading?: boolean;
}
```

### Example

```tsx
import { LeadScoreTimeline } from "ai-lead-score-poc";

export default function TimelineExample() {
  return (
    <LeadScoreTimeline
      apiKey="https://www.demoapi.com"
      studentId="STUDENT_123"
      timelineType="timeline"
      timelinePosition="alternate"
    />
  );
}
```

## 5️⃣ InjectLeadScoreTableColumn

Injects a Lead Score column into any existing HTML table using its ID.

### Props

| Prop Name              | Type            | Required | Description               |
| ---------------------- | --------------- | -------- | ------------------------- |
| `tableId`              | `string`        | ✅       | Target table ID           |
| `studentIds`           | `string[]`      | ✅       | Student IDs (row-wise)    |
| `headerName`           | `string`        | ✅       | Column header text        |
| `apiKey`               | `string`        | ✅       | Static API key            |
| `headerInjectionIndex` | `number`        | ❌       | Injection Column position |
| `CustomComponent`      | `ComponentType` | ❌       | Custom cell UI            |

### CustomComponent Props

```ts
{
  isLoading: boolean;
  score: number;
}
```

### Example

```tsx
import { InjectLeadScoreTableColumn } from "ai-lead-score-poc";

export default function InjectColumnExample() {
  return (
    <table id="student-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>john@email.com</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>jane@email.com</td>
        </tr>
      </tbody>

      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="student-table"
        headerName="Lead Score"
        studentIds={["STUDENT_1", "STUDENT_2"]}
        headerInjectionIndex={2}
      />
    </table>
  );
}
```

## 🧠 Summary

- ai-lead-score-poc helps you display lead scores and insights quickly
- Works well with existing UI and tables
- Fully customizable components
- Easy to integrate into any React app
- Currently uses a static API key, which will be improved later
