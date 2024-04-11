from django.urls import path
from .views import create_diary, diary_list, view_diary, edit_diary, delete_diary

urlpatterns = [
    path('create/', create_diary, name='create_diary'),
    path('list/', diary_list, name='diary_list'),
    path('view/<int:pk>/', view_diary, name='view_diary'),
    path('edit/<int:pk>/', edit_diary, name='edit_diary'),
    path('delete/<int:pk>/', delete_diary, name='delete_diary'),
]