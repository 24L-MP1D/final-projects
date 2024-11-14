const QPAY_USERNAME = process.env.QPAY_USERNAME || '';
const QPAY_PASSWORD = process.env.QPAY_PASSWORD || '';
const INVOICE_CODE = process.env.INVOICE_CODE || '';

const getToken = async () => {
  try {
    const response = await fetch(`https://merchant-sandbox.qpay.mn/v2/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(QPAY_USERNAME + ':' + QPAY_PASSWORD).toString('base64'),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export async function POST(request: Request) {
  const { productId, amount } = await request.json();
  const token = await getToken();

  if (!token) return Response.json({ message: 'token not found' }, { status: 404 });
  try {
    const response = await fetch('https://merchant-sandbox.qpay.mn/v2/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        invoice_code: INVOICE_CODE,
        sender_invoice_no: productId,
        amount: amount,
        invoice_receiver_code: 'test1',
        invoice_description: 'test2',
      }),
    });

    const data = await response.json();

    return Response.json(data);
  } catch (err) {
    console.log(err);
    return Response.json(err);
  }
}

export async function PUT(request: Request) {
  const { invoice_id } = await request.json();
  const token = await getToken();

  if (!invoice_id) return Response.json({ message: 'invoice_id is not valid' });
  try {
    const response = await fetch(`https://merchant-sandbox.qpay.mn/v2/payment/${invoice_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('74', data);
    return Response.json(data);
  } catch (err) {
    return new Response(null, {
      status: 404,
    });
  }
}
