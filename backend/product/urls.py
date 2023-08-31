from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/<int:product_id>/', views.ProductDetailView.as_view(), name='product-detail'),
    path('select/<int:product_id>/', views.SelectProductAPIView.as_view(), name='select-product'),
]

