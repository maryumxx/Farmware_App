from google import genai

api_key = "AIzaSyDfTVbT1GGfvzjMNIX-Y_tWL5XVEQ-q9og"
client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=f"defining {""} disease and its treatment",
)

print(response.text)