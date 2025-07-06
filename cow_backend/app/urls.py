
from django.urls import path
from . import views



urlpatterns = [
    # authentication api
    path('signup/', views.UserSignupView.as_view(), name='signup'),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('refrashToken/', views.RefrashTokenApi.as_view(), name='refrashToken'),
    path('Tokenvalidcheck/', views.TokenValidCheck.as_view(), name='TokenValidCheck'),
    path('profile/', views.UserProfileView.as_view(), name='profile'),
    path('changepassword/', views.UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', views.SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', views.UserPasswordResetView.as_view(), name='reset-password'),
    
    # end authentication api
    
    # Cow Add Api
    path('cow-list/', views.CowListView.as_view(), name='cow-list'),
    path('cow-create/', views.CowCreateView.as_view(), name='cow-create'),
    path('cow-detail/<int:pk>/', views.CowDetailView.as_view(), name='cow-detail'),    
    path('cow-update/<int:pk>/', views.CowUpdateView.as_view(), name='cow-update'),
    path('cow-delete/<int:pk>/', views.CowDeleteView.as_view(), name='cow-delete'),
    # End Cow Add Api
    
    
    # Event Add Api
    path('event-list/', views.EventListView.as_view(), name='event-list'),
    path('event-create/', views.EventCreateView.as_view(), name='event-create'),
    # path('event-detail/<int:pk>/', views.EventDetailView.as_view(), name='event-detail'),
    # path('event-update/<int:pk>/', views.EventUpdateView.as_view(), name='event-update'),
    # path('event-delete/<int:pk>/', views.EventDeleteView.as_view(), name='event-delete'),
    # End Event Add Api


    # ML Api
    path('predict-disease/', views.PredictDiseaseView.as_view(), name='predict-disease'),
    path('get-symptoms/', views.getSymptomsView.as_view(), name='get-symptoms'),


    path('get-symptoms-all-event/<int:pk>/', views.getSymptomsAllEventView.as_view(), name='get-symptoms-all-event'),
    path('get-symptoms-last-cow-result/<int:pk>/', views.getSymptomsLastCowResultView.as_view(), name='get-symptoms-last-cow-result'),
    path('get-symptoms-specific-cow/<int:pk>/', views.getSymptomsSpecificCowView.as_view(), name='get-symptoms-specific-cow'),


    path('get-cow-status/<int:pk>/', views.getCowStatusView.as_view(), name='get-cow-status'),


    path('get-cow-update-status/<int:pk>/', views.getCowUpdateStatusView.as_view(), name='get-cow-update-status'),



    
]
