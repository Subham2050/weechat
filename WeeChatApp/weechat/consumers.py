import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class ChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_code']
        self.room_group_name = "chat_%s" % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, event):
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    async def websocket_receive(self, text_data):
        print(text_data)
        text_data_json = json.loads(text_data['text'])
        message = text_data_json["message"]

        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_message", "message": message}
        )

    async def send_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))
