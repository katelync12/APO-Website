from django.shortcuts import render, redirect
from django.contrib.auth import logout

def home(request):
    return render(request, 'viteapp/index.html')

def logout_view(request):
    logout(request)
    return redirect("/")

class CreateEventView(APIView):
    def post(self, request):
        data = request.data
        errors = []

        # Validate event date range
        try:
            start_time = datetime.fromisoformat(data.get('dateTimeRange').get('start'))
            end_time = datetime.fromisoformat(data.get('dateTimeRange').get('end'))
            if start_time >= end_time:
                errors.append("End time must be after start time.")
            if start_time <= datetime.now():
                errors.append("Event date range must be in the future.")
        except Exception as e:
            errors.append("Invalid date format.")

        # Validate shifts
        shifts = data.get('shifts', [])
        for shift in shifts:
            try:
                shift_start = datetime.fromisoformat(shift.get('start'))
                shift_end = datetime.fromisoformat(shift.get('end'))
                if shift_start >= shift_end:
                    errors.append("Shift end time must be after start time.")
                if not shift_start or not shift_end:
                    errors.append("Shift times cannot be blank.")
            except Exception as e:
                errors.append("Invalid shift date format.")

        # If there are errors, return them
        if errors:
            return Response({"errors": errors}, status=status.HTTP_400_BAD_REQUEST)

        # If no errors, create the event and shifts
        event_serializer = EventSerializer(data=data)
        if event_serializer.is_valid():
            event_serializer.save()
            return Response(event_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)