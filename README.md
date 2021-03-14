# Mailgun Mini

Work in progress basic UI for mailgun api

## Usage

### Step 1. Fill in the global settings required for every request

### Step 2. Click on the request you wish to use

### Step 3. Fill out the form shown

Given a `list.csv` with the following content

```csv
first_name,last_name,email
john,doe,email@email.com
```

If you would like the subject line to read:

`Hi, John`

make your subject line

`Hi, %recipient.first_name%` (this is called a recipient variable)

You may also use `%recipient.first_name%` and `%recipient.last_name%` in the body of the email template.

### Step 4. Send a sample to yourself
The recipient variables used above may also be used in the same way for the sample email.  If they do not work, then something is wrong.

### Step 5. Upload a list with `first_name`, `last_name`, `email`
Recommendation: use a list to send to yourself with multiple emails first to test your template and email.

### Step 6. Click send
This will send the list uploaded.  You may change the list.  The list may be at most 1k recipients at a time.
