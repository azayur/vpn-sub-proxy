exports.handler = async (event, context) => {
  const user = event.queryStringParameters.user;

  if (!user) {
    return {
      statusCode: 404,
      body: 'Use: ?user=azayur'
    };
  }

  const GIST_MAP = {
    'azayur': 'https://gist.githubusercontent.com/azayur/d3c41a59de83d8870a12fd4030f57a77/raw/b662e57ad052576d788451846dc4c3ae232b8c9b/azayur.txt',
  };

  const gistUrl = GIST_MAP[user];
  
  if (!gistUrl) {
    return {
      statusCode: 404,
      body: 'User not found'
    };
  }

  try {
    const response = await fetch(gistUrl);
    const content = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      },
      body: content
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching gist'
    };
  }
};
