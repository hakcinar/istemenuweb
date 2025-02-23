import { assignWaiter } from '@/utils/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const waiter = await assignWaiter(body.restaurantNo);
    console.log(waiter);
    // Sadece atanan garsonu logla
    console.log('Assigned Waiter:', {
      name: waiter?.name,
      id: waiter?.id,
      isAvailable: waiter?.isAvailable,
      fcmToken: waiter?.fcmToken ? 'exists' : 'missing'
    });

    if (!waiter || !waiter.fcmToken) {
      throw new Error('No available waiter found');
    }

    let notificationData = {
      token: waiter.fcmToken,
      title: `Masa ${body.tableNo}`,
      body: ''
    };

    // Bildirim tipine göre body'i ayarla
    switch (body.type) {
      case 'order':
        // Sipariş içeriğini formatla
        const orderItems = body.orderDetails.basket.map(item => 
          `${item.quantity}x ${item.name}`
        ).join(', ');
        
        notificationData.body = `Yeni Sipariş: ${orderItems}`;
        break;
      
      case 'bill':
        notificationData.body = 'Hesap İstiyor!';
        break;
      
      case 'waiter':
        notificationData.body = 'Garson Çağırıyor!';
        break;
      
      default:
        throw new Error('Invalid notification type');
    }

    const response = await fetch('https://salty-dawn-34562-d1dff3392447.herokuapp.com/sendNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '791b6a46-c9a7-4d65-90be-971cef19c7ae'
      },
      body: JSON.stringify(notificationData)
    });

    if (!response.ok) {
      throw new Error('Notification failed');
    }

    const notificationResponse = await response.json();

    // Başarılı yanıtta garson bilgisini ve notification yanıtını birlikte dön
    return Response.json({
      success: true,
      waiter: {
        id: waiter.id,
        name: waiter.name,
        mail: waiter.mail
      },
      notification: notificationResponse
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
        response: null
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}