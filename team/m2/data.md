1. Data Types:
   1. Flashcard sets containing flashcards
   2. Flashcard each has a question and answer
   3. User profile possibly to remember their specific flashcard sets
3. Attributes:
   1. Flashcard set:
       1. title: Name of set
       2. flashcards: Array holding flashcards
   2. Flashcard
       1. answer: the answer side of the flashcard
       2. question: the question side of the flashcard
   3. User Profile:
       1. sets: a collection of the users owned flashcard sets
       2. name: name of the user to display
       3. userID: a unique identifier for the given user
4. Relationship Between Data:
    1. The User creates flashcard sets, the flashcard sets contain flashcards, and the flashcards contain the study data
5. Data Sources:
    1. Primarily user-input data; they input what they would like to study and that's almost excusively the data we store
6. Collecting right and wrong answer:
    1. To output a score and what student's need to study more
    2. Given overall score of how student knows the subject
