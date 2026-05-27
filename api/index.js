export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user');

  if (!user) {
    return new Response('Use: ?user=azayur', { status: 404 });
  }

  const GIST_MAP = {
    'azayur': 'https://raw.githubusercontent.com/azayur/d3c41a59de83d8870a12fd4030f57a77/raw/b662e57ad052576d788451846dc4c3ae232b8c9b/azayur.txt',
  };

  const gistUrl = GIST_MAP[user];
  
  if (!gistUrl) {
    return new Response('User not found', { status: 404 });
  }

  try {
    const response = await fetch(gistUrl);
    const content = await response.text();

    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response('Fetch error', { status: 500 });
  }
}
