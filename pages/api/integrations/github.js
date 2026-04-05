import cache from '../../../lib/cache';


export default async function handler(req, res) {
    const username = req.query.username;
    if (!username) return res.status(400).json({ error: 'Username required' });


    const cacheKey = `github:${username}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);


    const gh = await fetch(`https://api.github.com/users/${username}`);
    const user = await gh.json();


    const repos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json());


    const data = {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        public_repos: user.public_repos,
        totalStars: repos.reduce((a, r) => a + r.stargazers_count, 0),
    };

    cache.set(cacheKey, data, 3600);
    res.json(data);
}