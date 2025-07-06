from django.db import models
from django.utils import timezone
from location_field.models.plain import PlainLocationField
# Create your models here.
from django.utils.html import mark_safe
from django.contrib.auth.models import User

from django.utils import timezone

class UserProfile(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    Full_Name = models.CharField(max_length=255 , default="" , blank=True , null=True)
    Email = models.CharField(max_length=255  , default="" , blank=True , null=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.Full_Name


    class Meta:
        verbose_name_plural = '01 User Profile'


    def LOGO(self):
        if self.Profile_DP:
            return mark_safe(f'<img src="{self.Profile_DP.url}" style="width:80px;height:80px;"/>')
        else:
            return mark_safe(f'<img src="/media/app/images/defualtImg.png" style="width:80px;height:80px;"/>')





THEME_COLOR = (
    ('Dark' , 'Dark'),
    ('Ligth' , 'Light'),
    ('System Color' , 'System Color')
)





class Apparence(models.Model):
    user = models.ForeignKey(User ,  on_delete=models.SET_DEFAULT , blank=True , null=True , default=None)
    color_theme = models.CharField(choices=THEME_COLOR,  max_length=50 , default='Ligth')

    class Meta:
        verbose_name_plural = '02 Apparence'

    def __str__(self):
        if self.user.username:
            return self.user.username
        else:
            return '-'



GENDER_CHOICES = (
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
)


CURRENT_STATUS = (
    ('healthy', 'Healthy'),
    ('risk', 'Risk'),
    ('under treatment', 'Under Treatment'),
)


class Cow(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    current_status = models.CharField(max_length=20, choices=CURRENT_STATUS, default='healthy')  
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    tag_number = models.CharField(max_length=250, unique=True)
    date_of_birth = models.CharField(max_length=250)
    image = models.ImageField(upload_to="app/cow_images" , max_length=1000)
    breed = models.CharField(max_length=250)
    age = models.CharField(max_length=250)

    def __str__(self):
        return self.gender


    class Meta:
        verbose_name_plural = '03 Cow'
        
        
        
class VaccineEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cow = models.ForeignKey(Cow, on_delete=models.CASCADE)
    user_summarized_symptoms = models.CharField(max_length=250, null=True, blank=True)
    symptoms_name = models.JSONField()
    symptoms_base_on_time = models.CharField(max_length=250)
    disease = models.CharField(max_length=250)
    treatment_medication = models.CharField(max_length=250)
    definition = models.CharField(max_length=5000)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        
        return str(self.cow.tag_number)

    class Meta:
        verbose_name_plural = '04 Vaccine Event'