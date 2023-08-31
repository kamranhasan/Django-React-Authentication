from .models import Product
from .serializers import ProductSerializer
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404

class ProductListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
	
    def get(self, request):
        sort_field = request.query_params.get('sort', 'name') # sort by name by default
        
        # Validate the sort field to prevent incorrect field names
        valid_sort_fields = ['product_id', 'name', 'description', 'price', 'available_stock']
        if sort_field not in valid_sort_fields:
            sort_field = 'name'
        
        products = Product.objects.all().order_by(sort_field)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
	
    def get(self, request, product_id):
        product = get_object_or_404(Product, product_id=product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class SelectProductAPIView(APIView):
    def post(self, request, product_id):
        product = get_object_or_404(Product, product_id=product_id)
        
        # Get the user's selected products from the session
        selected_products = request.session.get('selected_products', [])
        
        # Add the selected product to the list if not already present
        if product_id not in selected_products:
            selected_products.append(product_id)
            request.session['selected_products'] = selected_products
            return Response({'message': 'Product selected successfully'}, status=status.HTTP_200_OK)
        
        return Response({'message': 'Product already selected'}, status=status.HTTP_400_BAD_REQUEST)