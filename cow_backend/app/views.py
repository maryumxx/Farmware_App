from rest_framework.exceptions import NotFound
from rest_framework.response import Response 
from django.shortcuts import redirect , render
from rest_framework import status , generics
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import authenticate
from .renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User 
from django.contrib.sites.shortcuts import get_current_site
from main.settings import SERVER_DOMAIN , MEDIA_ROOT
from django.db.models import Prefetch
import json
from PIL import Image , ExifTags
import io
import base64
from .country import COUNTRY
from datetime import datetime , date , time
from django.db.models import Avg , Sum , Count , Q
from django.db.models.functions import Radians, Power, Sin, Cos, ATan2, Sqrt, Radians
from django.db.models import F
from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import Cow, VaccineEvent
from .serializers import VaccineEventSerializer

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
import joblib
from google import genai

model = joblib.load('cow_disease_model.pkl')
disease_label_encoder = joblib.load('disease_label_encoder.pkl')

model2 = joblib.load('prescription_model.pkl')
prescription_label_encoder = joblib.load('prescription_label_encoder.pkl')

SYMPTOMS = list(pd.read_csv('Training.csv').drop(columns=['Disease' , 'Prescription']).columns)


# authentication and authrazation Start Api

def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }


def basetoimg(data , filename):
    name_without_space = "".join(filename.split())
    filedate = datetime.now().time().microsecond
    logo_split_base64 = data.split(';base64,')
    logo_extention = logo_split_base64[0].split(':image/')[1]
    logo_binary_data = base64.b64decode(logo_split_base64[1])
    logo_PIL = Image.open(io.BytesIO(logo_binary_data))

    try:
        for orientation in ExifTags.TAGS.keys():
            if ExifTags.TAGS[orientation]=='Orientation':
                break
        exif = logo_PIL._getexif()
        if exif[orientation] == 3:
            logo_PIL=logo_PIL.rotate(180, expand=True)
        elif exif[orientation] == 6:
            logo_PIL=logo_PIL.rotate(270, expand=True)
        elif exif[orientation] == 8:
            logo_PIL=logo_PIL.rotate(90, expand=True)
    except:
        pass


    logo_PIL.save(f"{MEDIA_ROOT}/app/images/{name_without_space}{filedate}.{logo_extention}")
    logo_PIL.close()
    logo_link = f"/app/images/{name_without_space}{filedate}.{logo_extention}"
    return logo_link


# SignUp
class UserSignupView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    # serializer = UserRegistrationSerializer(data=request.data)
    get_username = request.data['username']
    get_email = request.data['email']
    password = request.data['password']

    check_username = User.objects.filter(username=get_username).exists()
    check_email = User.objects.filter(email=get_email).exists()

    if check_username:
      return Response({'reponse_type':'error', 'msg':'Username Already Exist'})
    
    if check_email:
      return Response({'reponse_type':'error', 'msg':'Email Already Registered'})

    # user create
    user = User.objects.create_user(get_username, get_email, password)
    user.save()

    # serializer.is_valid(raise_exception=True)
    token = get_tokens_for_user(user)


    createbar = UserProfile.objects.create(
       user=user,
       Full_Name=get_username,
       Email=get_email,
    )


    return Response({'reponse_type':'success' , 'token':token, 'user_type':'user_account', 'msg':'Signup Successful'}, status=status.HTTP_201_CREATED)


# Login
class UserLoginView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      username = serializer.data.get('username')
      password = serializer.data.get('password')
      user = authenticate(username=username, password=password)
      if user is not None:
          token = get_tokens_for_user(user)
          try:
              UserProfile.objects.get(user=user)
              return Response({'success':{'token':token, 'user_type':'user_account' , 'msg':'Login Success'}})
          except:
              return Response({'errors':{'non_field_errors':['User Type Not Found']}})
        
      else:
        return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}})
    # print(serializer.errors)
    return Response(serializer.errors)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Serialize the user object
        user_serializer = UserSerializer(request.user)
        
        # Fetch the related UserProfile using the user object
        try:
            user_profile = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the UserProfile object
        user_profile_serializer = UserProfileSerializer(user_profile)
        
        # Return both the user data and the user profile data
        return Response({
            'response_type': 'success',
            'data': user_profile_serializer.data
        }, status=status.HTTP_200_OK)




class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(
            data=request.data,
            context={'user': request.user}  # pass current user to serializer
        )

        if serializer.is_valid():
            serializer.save()
            return Response({
                'response_type': 'success',
                'msg': 'Password changed successfully.'
            }, status=status.HTTP_200_OK)

        return Response({
            'response_type': 'error',
            'msg': 'Password change failed.'
        }, status=status.HTTP_400_BAD_REQUEST)

class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    # serializer.is_valid(raise_exception=True)
    if serializer.is_valid():
        return Response({'reponse_type':'success' , 'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
    else:
        return Response({'reponse_type':'error' ,  'msg':'You are not a Registered User'})
    

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    # serializer.is_valid(raise_exception=True)

    if serializer.is_valid():
        return Response({'reponse_type':'success' , 'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'reponse_type':'error' ,  'msg':'something went wrong'})


def decode_refresh_token(refresh_token):
    try:
        # Decode the refresh token and get a RefreshToken instance
        refresh_token_obj = RefreshToken(refresh_token)
        # Access token payload (claims)
        access_token_payload = refresh_token_obj.access_token.payload
        # Access token expiry (UTC timestamp)
        access_token_expiry = access_token_payload.get('exp')
        # Get user ID from the refresh token
        user_id = refresh_token_obj.payload.get('user_id')
        # Return the decoded data
        return {
            'user_id': user_id,
            'access_token_expiry': access_token_expiry
        }

    except Exception as e:
        return "decode_error"



def get_user_by_token(token):
    decode = decode_refresh_token(token)
    if decode != "decode_error":
        get_id = decode['user_id']
        try:
            get_user = User.objects.get(id=get_id)
        except:
            return {'user':None}
        
        gen_token = get_tokens_for_user(get_user)
        return {'user':get_user , 'token':gen_token} 

    else:
        return {'user':None}


class RefrashTokenApi(APIView):
    def post(self , request):
        refrash_token = str(request.data['RefrashToken'])
        decode = decode_refresh_token(refrash_token)
        if decode != "decode_error":
            get_id = decode['user_id']
            try:
                get_user = User.objects.get(id=get_id)
            except:
                return Response({"reponse_type":"error" , "msg":"User Not Exsit"})

            gen_token = get_tokens_for_user(get_user)

            
            try:
                UserProfile.objects.get(user=get_user)
                return Response({"reponse_type":"success" , "msg":"success" , "token":gen_token , 'user_type':'user_account'})
            except:
                return Response({"reponse_type":"error" , "msg":"User Type Not Found"})

        else:
            return Response({"reponse_type":"error" , "msg":"invalid Refrash Token"})
    


class TokenValidCheck(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                UserProfile.objects.get(user=request.user)
                return Response({'success': 'You are authenticated!' , 'user_type':'user_account'})
            except:
                return Response({'error': 'User Type Not Found'})
        else:
          return Response({'error': 'Access Token Error'})

# authentication and authrazation End Api





# List All Cows
class CowListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_query = request.GET.get('search', '')
        user = request.user  # Get the current authenticated user

        # Filter cows only belonging to the user and apply search
        cows = Cow.objects.filter(
            Q(user=user) & (
                Q(tag_number__icontains=search_query) |
                Q(breed__icontains=search_query) |
                Q(gender__icontains=search_query)
            )
        )

        serializer = CowSerializer(cows, many=True)
        return Response({
            'response_type': 'success',
            'total_cows': cows.count(),
            'data': serializer.data
        }, status=status.HTTP_200_OK)

# Create Cow
class CowCreateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        gender = request.data['gender']
        tag_number = request.data['tag_number']
        date_of_birth = request.data['date_of_birth']
        breed = request.data['breed']
        age = request.data['age']
        image = request.data['image']
        
        check_tag_number = Cow.objects.filter(tag_number=tag_number).exists()

        if check_tag_number:
            return Response({'reponse_type':'error', 'msg':'Tag Number Already Registered'})
        
        if image:
            image_link = basetoimg(image , f'{13123}_userdp')
        else:
            image_link = '/app/images/default_user_icon.png'
        


        cowCreate = Cow.objects.create(user=request.user, gender=gender, tag_number=tag_number, date_of_birth=date_of_birth, breed=breed, age=age, image=image_link)
        
        if cowCreate:
            return Response({'reponse_type':'success', 'msg':'Cow Created Successfully'})
        else:
            return Response({'reponse_type':'error', 'msg':'Something went wrong'})
       

# Retrieve Cow
class CowDetailView(APIView):
    def get(self, request, pk):
        cow = get_object_or_404(Cow, pk=pk)
        serializer = CowSerializer(cow)
        serializerData = serializer.data
        return Response({'response_type': 'success', 'data': serializerData})

# Update Cow
class CowUpdateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        cow = get_object_or_404(Cow, pk=pk)
        serializer = CowSerializer(cow)
        gender = request.data.get('gender')
        tag_number = request.data.get('tag_number')
        date_of_birth = request.data.get('date_of_birth')
        breed = request.data.get('breed')
        age = request.data.get('age')
        image = request.data.get('image', None)
        current_status = request.data.get('current_status', None)

        # Check for duplicate tag number excluding current cow
        if Cow.objects.exclude(id=cow.id).filter(tag_number=tag_number).exists():
            return Response({'reponse_type': 'error', 'msg': 'Tag Number Already Registered'})

        # Handle image if provided
        if image:
            image_link = basetoimg(image, f'{tag_number}_cow_image')
            cow.image = image_link  # Update only if new image is provided

        # Update other fields
        cow.gender = gender
        cow.tag_number = tag_number
        cow.date_of_birth = date_of_birth
        cow.breed = breed
        cow.age = age
        cow.current_status = current_status
        

        cow.save()

        return Response({'reponse_type': 'success', 'msg': 'Cow Updated Successfully', 'data': serializer.data})
    
    
# Delete Cow
class CowDeleteView(APIView):
    def delete(self, request, pk):
        cow = get_object_or_404(Cow, pk=pk)
        cow.delete()
        return Response({'response_type': 'success', 'msg': 'Cow deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



# Event List
class EventListView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cow_id = request.GET.get('cow_id', None)

        # Fetch all cows associated with the authenticated user
        cows_queryset = Cow.objects.filter(user=request.user)

        # If cow_id is provided, filter the events for that cow
        if cow_id is not None:
            try:
                cow_id = int(cow_id)
                # Check if the cow exists for the user
                cow = cows_queryset.filter(id=cow_id).first()

                if not cow:
                    return Response({
                        'response_type': 'error',
                        'msg': 'Cow not found.'
                    }, status=status.HTTP_404_NOT_FOUND)

                # Get all vaccine events for the specific cow
                events_queryset = VaccineEvent.objects.filter(cow=cow)

                # Serialize the vaccine events
                event_serializer = VaccineEventSerializer(events_queryset, many=True)

                return Response({
                    'response_type': 'success',
                    'total_events': events_queryset.count(),
                    'data': event_serializer.data,
                }, status=status.HTTP_200_OK)

            except ValueError:
                return Response({
                    'response_type': 'error',
                    'msg': 'Invalid cow_id provided.'
                }, status=status.HTTP_400_BAD_REQUEST)

        # If no cow_id is provided, return all cows for the authenticated user
        else:
            return Response({
                    'response_type': 'success',
                    'data': [],
                }, status=status.HTTP_200_OK)


# Create Event 


class EventCreateView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Retrieve event data from request
        event_name = request.data.get('event_name')
        short_detail = request.data.get('short_detail')
        date = request.data.get('date')
        cow_id = request.data.get('cow')

        # Validate required fields
        if not event_name or not short_detail or not date or not cow_id:
            return Response({
                'response_type': 'error',
                'msg': 'Missing required fields.',
                'data': None
            }, status=status.HTTP_400_BAD_REQUEST)

        # Retrieve the Cow object by its ID
        try:
            cow = Cow.objects.get(id=cow_id)
        except Cow.DoesNotExist:
            return Response({
                'response_type': 'error',
                'msg': 'Cow not found with the provided ID.',
                'data': None
            }, status=status.HTTP_404_NOT_FOUND)

        # Attempt to create the event
        try:
            event_create = VaccineEvent.objects.create(
                user=request.user, 
                cow=cow, 
                event_name=event_name, 
                short_detail=short_detail, 
                date=date
            )

            # Serialize the created event
            serializer = VaccineEventSerializer(event_create)

            return Response({
                'response_type': 'success', 
                'msg': 'Event Created Successfully', 
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            # If there is any other error (e.g., validation failure, database issues)
            return Response({
                'response_type': 'error',
                'msg': str(e),
                'data': None
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class PredictDiseaseView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def post(self, request):
        inputs = []
        user_selected_symptoms = []
        cowId = request.data.get('cowId')
        symptoms_base_on_time = request.data.get('symptoms_base_on_time')
        user_summarized_symptoms = request.data.get('user_summarized_symptoms', '')

        try:
            cow = Cow.objects.get(id=cowId)
        except Cow.DoesNotExist:
            return Response({'response_type': 'error', 'msg': 'Cow not found'}, status=status.HTTP_404_NOT_FOUND)

        for symptom in SYMPTOMS:
            key = symptom.replace(' ', '_').lower()
            value = request.data['diseases'].get(key, 0)
            inputs.append(int(value))
            if int(value) == 1:
                user_selected_symptoms.append({symptom: int(value)})

        prediction = model.predict([inputs])[0]
        predicted_disease = disease_label_encoder.inverse_transform([prediction])[0]
        trim_predicted_disease = predicted_disease.replace('_', ' ')

        prediction2 = model2.predict([inputs])[0]
        predicted_prescription = prescription_label_encoder.inverse_transform([prediction2])[0]

        try:
            api_key = "AIzaSyDfTVbT1GGfvzjMNIX-Y_tWL5XVEQ-q9og"
            client = genai.Client(api_key=api_key)

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=f"Provide definitions for {trim_predicted_disease}, {user_summarized_symptoms}, and {symptoms_base_on_time}, and describe the corresponding disease and its treatment.",
            )
            definition_response = response.text

        except:
            definition_response = "Definition Not Found"


        event_create = VaccineEvent.objects.create(
            user=request.user, 
            cow=cow, 
            user_summarized_symptoms=user_summarized_symptoms, 
            symptoms_name=user_selected_symptoms, 
            symptoms_base_on_time=symptoms_base_on_time, 
            disease=trim_predicted_disease, 
            treatment_medication=predicted_prescription, 
            definition=definition_response, 
            date=datetime.now()
        )

        event = VaccineEvent.objects.filter(id=event_create.id)
        serializer = VaccineEventSerializer(event, many=True)


        return Response({
                'response_type': 'success',
                'disease':  trim_predicted_disease,
                'prescription' :predicted_prescription,
                'definition':definition_response,
                'data': serializer.data,
            }, status=status.HTTP_200_OK)



class getSymptomsView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({ 'response_type': 'success', 'symptoms': SYMPTOMS})
    



    
class getSymptomsAllEventView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        vaccine_events = VaccineEvent.objects.filter(cow=pk)
        serializer = VaccineEventSerializer(vaccine_events, many=True)
        return Response({'response_type': 'success', 'data': serializer.data})
    

class getSymptomsLastCowResultView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            # Filter by both cow ID and the current authenticated user
            vaccine_event = VaccineEvent.objects.filter(
                cow=pk,
                user=request.user
            ).order_by('-date').first()

            if not vaccine_event:
                return Response({'response_type': 'error', 'msg': 'No record found.'}, status=404)

            serializer = VaccineEventSerializer(vaccine_event)
            return Response({'response_type': 'success', 'data': serializer.data})
        
        except Exception as e:
            return Response({'response_type': 'error', 'msg': str(e)}, status=500)

    


class getSymptomsSpecificCowView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        vaccine_event = VaccineEvent.objects.filter(id=pk, user=request.user).first()

        if not vaccine_event:
            return Response({'response_type': 'error', 'msg': 'No record found.'}, status=404)

        serializer = VaccineEventSerializer(vaccine_event)
        return Response({'response_type': 'success', 'data': serializer.data})
    



class getCowStatusView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            # Filter by both cow ID and the current authenticated user
            cow = Cow.objects.filter(
                id=pk,
                user=request.user
            ).first()

            if not cow:
                return Response({'response_type': 'error', 'msg': 'No record found.'}, status=404)

            serializer = CowSerializer(cow)
            return Response({'response_type': 'success', 'data': serializer.data})
        
        except Exception as e:
            return Response({'response_type': 'error', 'msg': str(e)}, status=500)


class getCowUpdateStatusView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            cow = Cow.objects.filter(id=pk, user=request.user).first()

            if not cow:
                return Response({'response_type': 'error', 'msg': 'Cow not found.'}, status=404)

            new_status = request.data.get('current_status')
            if not new_status:
                return Response({'response_type': 'error', 'msg': 'Missing current_status.'}, status=400)

            cow.current_status = new_status
            cow.save()

            serializer = CowSerializer(cow)
            return Response({'response_type': 'success', 'msg': "Cow status updated successfully", 'data': serializer.data})

        except Exception as e:
            return Response({'response_type': 'error', 'msg': str(e)}, status=500)