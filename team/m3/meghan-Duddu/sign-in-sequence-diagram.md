Feature: Sign-In/Login-In Screen

Description:
This feature displays ways for the users to log in if they are returning or sign up if they are new to the site. Additionally, the site's socials are linked along the bottom as well which can be accessed by clicking on each icon. Users can interact with the site by clicking on the boxes provided to create their email and password or use their login to get into their account. The system mainly handles click events.

Sequence Diagram:

```mermaid
sequenceDiagram
    participant User
    participant UI as User Interface
    participant JS as JavaScript
    participant Social as Social Media Links

    User->>UI: Open Sign-In/Login-In Screen
  
    User->>UI: Enter Username and Password
    UI->>JS: Trigger "Sign-Up" event
    JS->>JS: Validate Sign-Up Credentials
    JS->>UI: Display Confirmation or Error Message
    
    User->>UI: Enter Username and Password
    UI->>JS: Trigger "Login" event
    JS->>JS: Validate Login Credentials
    JS->>UI: Display User Account or Error Message
    
    User->>UI: Click on Social Media Links
    UI->>Social: Redirect to Social Media Login
