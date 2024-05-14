from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Student

@csrf_exempt
def student(request):
    print(request)
    print(request.method)
    if request.method == 'GET':
        students = Student.objects.all()
        data = [{'id': student.id, 'name': student.name} for student in students]
        return JsonResponse(data, safe=False)
    
    elif request.method == 'POST':
        # Assuming the request body contains JSON data with a 'name' field
        data = json.loads(request.body)
        
        # Assuming the request body contains a 'name' field
        name = data.get('name')
        print(name)
        student = Student.objects.create(name=name)
        return JsonResponse({'id': student.id, 'name': student.name}, status=201)

    elif request.method == 'DELETE':
        # Delete all students
        Student.objects.all().delete()
        return JsonResponse({'message': 'All students deleted'}, status=204)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
