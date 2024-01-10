from django.shortcuts import render, redirect


def index(request):
    if request.method == "POST":
        print(request)
        room_code = request.POST.get("room_code")
        return redirect('chat/%s/' % room_code)
    return render(request, "index.html", {})


def room(request, room_code):
    context = {
        "room_code": room_code
    }
    return render(request, "room.html", context)
