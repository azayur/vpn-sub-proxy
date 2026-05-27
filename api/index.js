export default function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const user = url.searchParams.get('user');

  console.log('Request URL:', req.url);
  console.log('User param:', user);

  if (!user) {
    return res.status(404).send('Use: ?user=azayur');
  }

  const GIST_MAP = {
    'azayur': 'https://raw.githubusercontent.com/azayur/d3c41a59de83d8870a12fd4030f57a77/raw/b662e57ad052576d788451846dc4c3ae232b8c9b/azayur.txt',
  };

  const gistUrl = GIST_MAP[user];

  if (!gistUrl) {
    return res.status(404).send('User not found');
  }

  fetch(gistUrl)
    .then(r => r.text())
    .then(content => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.status(200).send(content);
    })
    .catch(err => {
      console.error('Fetch error:', err);
      res.status(500).send('Error fetching gist');
    });
}
