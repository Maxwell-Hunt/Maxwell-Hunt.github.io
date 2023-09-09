from flask import Flask, render_template, request, jsonify
from email.message import EmailMessage
import ssl
import smtplib

app = Flask(__name__)

email_sender = 'maxwellhuntwebsitecontact@gmail.com'
email_password = 'dgbdbqyfmfugjvpv'
email_receiver = 'max101hunt@gmail.com'

def submit_email(name, email, message):
    message_ob = EmailMessage()
    message_ob['From'] = email_sender
    message_ob['To'] = email_receiver
    message_ob['Subject'] = 'Contact Submission by ' + name
    message_ob.set_content(message + '\n\nSent from ' + email)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, message_ob.as_string())

@app.route('/home')
@app.route('/')
def main():
    return render_template('index.html')

@app.route('/contact', methods=["POST"])
def handle_contact():
    data = request.get_json(force=True)
    submit_email(data['name'], data['email'], data['message'])
    return jsonify({})

if __name__ == '__main__':
    app.run()