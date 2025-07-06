from django.core.mail import EmailMessage
import os
from pyfcm import FCMNotification

class Util:
  @staticmethod
  def send_email(data):
    email = EmailMessage(
      subject=data['subject'],
      body=data['body'],
      from_email=os.environ.get('EMAIL_FROM'),
      to=[data['to_email']]
    )
    email.send()


 

def send_push_notification(registration_id, message_title, message_body):
    push_service = FCMNotification(api_key="YOUR_FCM_API_KEY")
    result = push_service.notify_single_device(
        registration_id=registration_id,
        message_title=message_title,
        message_body=message_body
    )
    return result