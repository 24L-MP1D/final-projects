// app/api/chat/route.ts

export async function POST(request: Request) {
  const { message } = await request.json();

  // OpenAI API-тай холбогдох
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAIKEY}`, // Таны OpenAI API түлхүүр
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Загвар
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      const botReply = data.choices[0].message.content;
      return Response.json({ success: true, reply: botReply });
    } else {
      return Response.json({ success: false, error: data.error.message }, { status: response.status });
    }
  } catch (error) {
    console.error('Chat Error:', error);
    return Response.json({ success: false, error: 'Чат процессын үед алдаа гарлаа.' }, { status: 500 });
  }
}
