'use client';
import { useEffect, useState } from 'react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}


export default function GitHubPostCard() {
    const [repos, setRepos] = useState<Repo[]>([]);
    useEffect(() => {
        fetch('/api/github/')
        .then(res => res.json())
        .then(data => setRepos(data));
    }, []);

    return (
        <div>
          <ul className="space-y-4">
        {repos.map(repo => (
          <li key={repo.id} className="bg-white/5 p-3 rounded-md">
            <a href={repo.html_url} target="_blank" className="text-blue-400 font-medium hover:underline">
              {repo.owner.login}/{repo.name}
            </a>
            <p className="text-sm text-gray-300">{repo.description}</p>
            <p className="text-sm text-yellow-300">⭐ {repo.stargazers_count.toLocaleString()}</p>
          </li>
        ))}
          </ul>
        </div>
    )
}

