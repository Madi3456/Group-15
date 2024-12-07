Feature Description: User inputs terms/defintions and a study set will be created. This study set will then be stored into a database for future use.

sequenceDiagram
    User->>UI: Enter answers
    Javascript->>UI: Creates boxes of terms/definitions
    UI->>Javascript: Saving Answers
    JavaScript->>Database: Saving studysets to databases
