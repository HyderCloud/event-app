import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_bulk_emails(recipient):
    print(recipient)
    smtp_server = "smtp.gmail.com"
    smtp_port = 587  # TLS port
    from_address = "yoav12303@gmail.com"
    password = "mgwl dzmw awjk vvpt"
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Secure the connection
            server.login(from_address, password)  # Login

            html_content = f"""
                <html>
                <head>
                {style}
                </head>
                <!DOCTYPE html>
                <body>
                    <h1>{recipient["origin"]} - ברכות קיבלת הצעת עבודה מ</h1>
                    <p dir="rtl" style="text-align: right;">
     {recipient["fullName"]} היקר ,<br><br>

    ברכות! שמחים להודיעך שהוזמנת לעבוד באירוע {recipient["origin"]}.<br>
    אנו נרגשים להוסיף אותך לצוות שלנו ומשוכנעים כי כישוריך יתרמו רבות להצלחת האירוע.<br><br>

    לאישור השתתפותך ולקבלת פרטים נוספים, אנא לחץ על הכפתור המצורף להשלמת התהליך.<br><br>

    נשמח לראותך איתנו,<br>
    בברכה,<br>
    צוות {recipient["origin"]}
</p>
 <a href="http://localhost:3000{recipient['link']}" class="button"> 
 <div style="color: #fff;" >לפרטים נוספים</div>
 </a>
                </body>
                </html>
                """
            email = recipient["email"]
            print(recipient)
            if email:  # Check if email exists
                message = MIMEMultipart("alternative")
                message["From"] = from_address
                message["To"] = email
                message["Subject"] = f"{recipient["origin"]} - הצעת עבודה מעת"
                html_part = MIMEText(html_content, "html")
                message.attach(html_part)
                server.sendmail(from_address, email, message.as_string())
                print(f"Email sent to {email}")
            else:
                print(f"No email found for recipient with ID: {recipient.get('id')}")

    except Exception as e:
        print(f"Error: {e}")



style = """
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        p {
            text-align: right;
            color: #555;
            width: 100%; /* To keep text right-aligned within the main container */
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #0056b3; /* Darker blue on hover */
        }
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
    </style>
"""

