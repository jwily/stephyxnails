import requests

from django.conf import settings
from django.contrib.auth.views import LoginView

from django.shortcuts import redirect
from django.urls import reverse

class CustomAdminLoginView(LoginView):

    title = 'Testing'
    template_name = 'admin/login.html'

    def form_valid(self, form):
        # Generate the Instagram OAuth URL
        instagram_auth_url = "https://api.instagram.com/oauth/authorize"
        params = {
            "client_id": settings.INSTAGRAM_APP_ID,
            "redirect_uri": self.request.build_absolute_uri(reverse('instagram_callback')),
            "scope": "user_profile,user_media",
            "response_type": "code",
        }
        auth_url = f"{instagram_auth_url}?{'&'.join([f'{k}={v}' for k, v in params.items()])}"

        # Return a redirect response to the Instagram OAuth URL
        return redirect(auth_url)

def instagram_callback(request):
    code = request.GET.get('code')
    if not code:
        return redirect('admin:login')

    # Exchange the code for an access token
    token_url = "https://api.instagram.com/oauth/access_token"
    token_data = {
        "client_id": settings.INSTAGRAM_APP_ID,
        "client_secret": settings.INSTAGRAM_APP_SECRET,
        "grant_type": "authorization_code",
        "redirect_uri": request.build_absolute_uri(reverse('instagram_callback')),
        "code": code,
    }
    print('token_url ---->', token_url)
    print('token_data ------>', token_data)
    response = requests.post(token_url, data=token_data)
    response_data = response.json()
    print(response_data)

    # Here, you should handle the access token and any other required actions.
    # Then redirect the user to the Django admin homepage.
    return redirect('admin:index')
