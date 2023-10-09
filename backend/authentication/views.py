from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from knox.models import AuthToken
from .validators import custom_validation, validate_email, validate_password


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	
	# Register API
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				token = AuthToken.objects.create(user)[1]
				return Response({
    							  "user": UserSerializer(user).data,
    							  "token": token
    							}, 
								status=status.HTTP_201_CREATED
							)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	# authentication_classes = (SessionAuthentication,)
	
	# Login API
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			_, token = AuthToken.objects.create(user)
			# login(request, user)
			return Response({
    						  "user": UserSerializer(user).data,
    						  "token": token
    						}, 
							status=status.HTTP_200_OK
						)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	
	# Logout API
	def post(self, request):
		try:
			# logout(request)
			data = request.data
			auth_session = AuthToken.objects.filter(user__email=data['email']).delete()
			return Response(status=status.HTTP_200_OK)
		except:
			return Response(status=status.HTTP_404_NOT_FOUND)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	# authentication_classes = (SessionAuthentication,)
	
    # GET user API
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
	

from rest_framework.authtoken import views

class UserRegister(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		cleaned_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(cleaned_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(cleaned_data)
			if user:
				token = views.obtain_auth_token()
				user = UserSerializer(user).data
				return Response({
					token: token,
					user: user
				}, status=status.HTTP_201_CREATED)
