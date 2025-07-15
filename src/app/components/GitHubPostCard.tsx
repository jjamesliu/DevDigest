'use client';
import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

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
        <div className='space-y-6'>
         {/* <ul className="space-y-4">
        {repos.map(repo => (
          <li key={repo.id} className="bg-[#353535] p-3 rounded-md">
            <a href={repo.html_url} target="_blank" className="text-blue-400 font-medium hover:underline">
              {repo.owner.login}/{repo.name}
            </a>
            <p className="text-sm text-gray-300">{repo.description}</p>
            <p className="text-sm text-yellow-300">⭐ {repo.stargazers_count.toLocaleString()}</p>
          </li>
        ))}
          </ul> */}
            <div className="space-y-6">
        {repos.map((repo, index) => (
          <div 
            key={repo.id} 
            className="group relative bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/50 hover:border-gray-600/70 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02]"
          >
            {/* Rank Badge */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
              #{index + 1}
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={repo.owner.avatar_url} 
                  alt={repo.owner.login}
                  className="w-10 h-10 rounded-full border-2 border-gray-600 group-hover:border-blue-500 transition-colors"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>{repo.owner.login}</span>
                  </div>
                </div>
              </div>
              <a 
                href={repo.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
              >
                <ExternalLink />
              </a>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed text-center md:text-left">
              {repo.description}
            </p>

            {/* Topics */}
            

            {/* Stats */}


            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <a 
          href="https://github.com/trending" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm transition-colors hover:underline"
        >
          View all trending repositories →
        </a>
      </div>


    </div>
    )
}

