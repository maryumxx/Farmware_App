

from rest_framework import serializers
from django.contrib.auth.models import User 
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
from .models import *

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string

from django.core.mail import send_mail 
from django.utils.html import strip_tags

from main.settings import DEFAULT_FROM_EMAIL , EMAIL_HOST_USER, BASE_URL_BACKEND

# authentication and authrazation Start serializers
class UserRegistrationSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields=['username', 'email', 'password',]
    extra_kwargs={
      'password':{'write_only':True}
    }

  def create(self, validate_data):
    return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  username = serializers.CharField(max_length=255)
  class Meta:
    model = User
    fields = ['username', 'password']


class UserChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )
    password = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )
    password2 = serializers.CharField(
        max_length=255,
        style={'input_type': 'password'},
        write_only=True
    )

    class Meta:
        fields = ['current_password', 'password', 'password2']

    def validate(self, attrs):
        current_password = attrs.get('current_password')
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')

        # ✅ Check current password
        if not user.check_password(current_password):
            raise serializers.ValidationError("Current password is incorrect.")

        # ✅ Check new passwords match
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match.")

        return attrs

    def save(self):
        password = self.validated_data.get('password')
        user = self.context.get('user')
        user.set_password(password)
        user.save()
        return user

class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if User.objects.filter(email=email).exists():

      try:
        user = User.objects.get(email=email)
      except:
         raise serializers.ValidationError('You are not a Registered User')
  
      uid = urlsafe_base64_encode(force_bytes(user.id))
      token = PasswordResetTokenGenerator().make_token(user)

      link = BASE_URL_BACKEND+'/forget-change-password/'+uid+'/'+token
 
        # Sending email here for seller
      html_message = render_to_string('app/rest_password_email.html',
      {
          'link':link,
          'uid': uid,
          'token': token,
          'user':user,

      })
      plain_message = strip_tags(html_message)
      send_mail(
          'Bar-Rat Forget Password Mail',
          plain_message,
          DEFAULT_FROM_EMAIL,
          [email , EMAIL_HOST_USER],
          html_message=html_message
      )
      
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      id = smart_str(urlsafe_base64_decode(uid))
      user = User.objects.get(id=id)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')



class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']
    

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserProfile
    fields = '__all__'
    
    
    

class CowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cow
        fields = '__all__'
        
        
class VaccineEventSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%d-%m-%Y", read_only=True)
    class Meta:
        model = VaccineEvent
        fields = [
            'id',
            'user',
            'cow',
            'user_summarized_symptoms',
            'symptoms_name',
            'symptoms_base_on_time',
            'disease',
            'treatment_medication',
            'definition',
            'date',
        ]

