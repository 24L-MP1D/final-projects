export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLanguage,
      source: 'mn', // Таны эх хэл (жишээ нь монгол хэл)
    }),
  });

  const data = await response.json();
  return Response.json({ transalatedText: data.data.translations[0].translatedText });
}
