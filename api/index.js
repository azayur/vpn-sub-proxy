export default async function handler(req, res) {
  const user = req.query.user;

  if (!user) {
    return res.status(404).send('Use: ?user=azayur');
  }

  // Маппинг пользователей
  const GIST_MAP = {
    'azayur': 'https://raw.githubusercontent.com/azayur/d3c41a59de83d8870a12fd4030f57a77/raw/b662e57ad052576d788451846dc4c3ae232b8c9b/azayur.txt',
  };

  const gistUrl = GIST_MAP[user];
  if (!gistUrl) {
    return res.status(404).send('User not found');
  }

  try {
    const response = await fetch(gistUrl);
    const content = await response.text();

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(content);
  } catch (error) {
    res.status(500).send('Fetch error');
  }
}
