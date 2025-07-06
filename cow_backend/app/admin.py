from django.contrib import admin
from .models import *
from rangefilter.filters import DateRangeFilter, DateTimeRangeFilter
from django.utils.safestring import mark_safe
# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    fields = (
        ('user' , 'Full_Name'),
        ('Phone' , 'Email' , 'Birthday' , 'Agreement'),
        ('is_live_location' , 'Account_switch' , 'Profile_DP'),
        ('Address')
        
        # ('Name_Of_Bar_OR_Restaurent' , 'bar_category'),
    )
    list_display = ('user' , 'Full_Name' , 'Email', 'Phone' , 'Birthday' , 'Account_switch','created_date' , 'is_live_location' ,  'LOGO')
    list_filter = ('user' , 'Full_Name' , 'Phone' , 'Email' , 'is_live_location' , 'Account_switch' , ('created_date' , DateRangeFilter))
    search_fields = ('user__username' , 'Full_Name' ,'Email' , 'Phone' ,'Address')


admin.site.register(Apparence)

admin.site.register(UserProfile)

class CustomCow(admin.ModelAdmin):
    list_display = ('gender', 'tag_number', 'date_of_birth', 'breed', 'age')

# Register with the customized admin
admin.site.register(Cow, CustomCow)


class CustomVaccineEvent(admin.ModelAdmin):
    list_display = ('disease', 'treatment_medication', 'date')

# Register with the customized admin
admin.site.register(VaccineEvent, CustomVaccineEvent)
# admin.site.register(VaccineEvent)



admin.site.site_header="Bar Rat Dashboard"
admin.site.site_title = "Bar Rat Dashboard | Admin"
admin.site.index_title = "Welcome to Bar Rat Dashboard"

admin.site.search_fields="search"