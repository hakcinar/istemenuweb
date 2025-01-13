import { assignWaiter } from '@/utils/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const waiter = await assignWaiter(body.restaurantNo);
    
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

    const notificationData = {
      token: waiter.fcmToken,
      title: `Masa ${body.tableNo}`,
      body: body.type === 'bill' ? 'Hesap İstiyor!' : 'Garson Çağırıyor!'
    };

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

    return Response.json(await response.json());
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