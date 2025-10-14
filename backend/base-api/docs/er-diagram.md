### Entity Relationship Diagram

Paste this into a Mermaid-compatible viewer or view directly in tools that render Mermaid.

```mermaid
erDiagram
  USER {
    int id PK
    varchar email UNIQUE
    varchar password
    timestamp created_at
    timestamp updated_at
  }

  STUDENTS {
    int id PK
    int user_id FK
    varchar roll_no
    int class_id FK
    timestamp created_at
    timestamp updated_at
  }

  CLASSES {
    int id PK
    varchar name UNIQUE
    timestamp created_at
    timestamp updated_at
  }

  SUBJECTS {
    int id PK
    varchar name UNIQUE
    timestamp created_at
    timestamp updated_at
  }

  TERMS {
    int id PK
    varchar name UNIQUE
    date start_date
    date end_date
    timestamp created_at
    timestamp updated_at
  }

  HOMEWORK {
    int id PK
    varchar title
    text description
    int class_id FK
    int subject_id FK
    date due_date
    int assigned_by_id
    timestamp created_at
    timestamp updated_at
  }

  HOMEWORK_SUBMISSIONS {
    int id PK
    int homework_id FK
    int student_id
    text content
    varchar attachment_url
    enum status
    varchar grade
    varchar remarks
    timestamp created_at
    timestamp updated_at
  }

  MARKS {
    int id PK
    int student_id
    int exam_id
    int subject_id FK
    decimal score
    varchar grade
    varchar remarks
    decimal total
    int position
    int term_id FK
    int class_id FK
    date date
    timestamp created_at
    timestamp updated_at
  }

  ATTENDANCE {
    int id PK
    int student_id
    int class_id
    int subject_id
    enum status
    int taken_by_id
    varchar remarks
    date date
    timestamp created_at
    timestamp updated_at
  }

  FEES {
    int id PK
    int student_id
    varchar title
    decimal amount
    date due_date
    enum status
    decimal paid_amount
    timestamp created_at
    timestamp updated_at
  }

  PAYMENTS {
    int id PK
    int student_id
    decimal amount
    varchar currency
    varchar method
    enum status
    varchar razorpay_order_id UNIQUE
    varchar razorpay_payment_id
    timestamp created_at
    timestamp updated_at
  }

  PAYSLIPS {
    int id PK
    int student_id
    tinyint month
    smallint year
    enum status
    timestamp created_at
    timestamp updated_at
  }

  TC {
    int id PK
    int student_id
    int class_id
    int term_id
    varchar reason
    enum status
    date requested_date
    date processed_date
    varchar file_url
    varchar file_mime
    varchar file_name
    timestamp created_at
    timestamp updated_at
  }

  %% Relationships
  USER ||--o{ STUDENTS : has
  CLASSES ||--o{ STUDENTS : includes
  CLASSES ||--o{ HOMEWORK : used_for
  SUBJECTS ||--o{ HOMEWORK : covers
  HOMEWORK ||--o{ HOMEWORK_SUBMISSIONS : receives
  SUBJECTS ||--o{ MARKS : graded_in
  TERMS ||--o{ MARKS : during
  CLASSES ||--o{ MARKS : for
  STUDENTS ||--o{ MARKS : gets
  STUDENTS ||--o{ ATTENDANCE : has
  CLASSES ||--o{ ATTENDANCE : in
  SUBJECTS ||--o{ ATTENDANCE : for
  STUDENTS ||--o{ FEES : billed
  STUDENTS ||--o{ PAYMENTS : pays
  STUDENTS ||--o{ PAYSLIPS : issued
  STUDENTS ||--o{ TC : requests
  CLASSES ||--o{ TC : relates_to
  TERMS ||--o{ TC : during
```
