export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(404).send('');
    return;
  } 

  res.status(200).json({
    url: 'https://i1.wp.com/c.cksource.com/a/1/img/default_avatar.png?ssl=1'
  });
}