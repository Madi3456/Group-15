sequenceDiagram
    User->>UI: Enter answers
    Javascript->>UI: Creates boxes of terms/definitions
    UI->>Javascript: Saving Answers
    JavaScript->>Database: Saving studysets to databases
