```mermaid
sequenceDiagram
    participant User
    participant Landing UI
    participant Navigation
    participant Auth System
    participant Search System

    User->>Landing UI: Visit website
    Landing UI->>User: Display logo, tagline, and menu buttons
    User->>Search System: Enter search term
    Search System->>Landing UI: Filter/display results
    User->>Navigation: Click menu button
    Navigation->>User: Redirect to selected page
    User->>Auth System: Click "Sign Up / Log In"
    Auth System->>Navigation: Redirect to sign-in.html
    User->>Navigation: Click social media icon
    Navigation->>User: Open social media page
    User->>Landing UI: Click "Start Learning Now"
    Landing UI->>Navigation: Go to sign up screen
```
