# Feature: Display Test Scores and Generate Graph

## Description
This feature displays a table of test scores along with a graph visualizing the scores. Users can interact with the table by clicking on a test number to get a detailed result page (simulated with an alert). The system involves populating the table dynamically, handling click events, and rendering a graph using Chart.js.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant UI as User Interface
    participant JS as JavaScript
    participant Chart as Chart.js

    User->>UI: Open the Test Scores page
    UI->>JS: Request to populate table
    JS->>JS: Dynamically generate table rows
    JS->>UI: Render table with test data

    User->>UI: Click on test number
    UI->>JS: Trigger "click" event
    JS->>JS: Simulate navigation (show alert)
    JS-->>User: Display "Redirecting to results page..." alert

    UI->>JS: Request to generate graph
    JS->>Chart: Pass test scores data
    Chart-->>JS: Generate bar chart
    JS->>UI: Render graph below table
