import React from 'react';

interface StarRatingProps {
  rating: number;
  technologies: string[];
  title: string;
  justification?: string;
}

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`h-8 w-8 ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.07 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

// Massively expanded mapping for higher accuracy.
const techIconMap: { [key: string]: string } = {
    // Languages
    javascript: 'devicon-javascript-plain',
    js: 'devicon-javascript-plain',
    typescript: 'devicon-typescript-plain',
    ts: 'devicon-typescript-plain',
    python: 'devicon-python-plain',
    java: 'devicon-java-plain',
    csharp: 'devicon-csharp-plain',
    'c#': 'devicon-csharp-plain',
    c: 'devicon-c-plain',
    'c++': 'devicon-cplusplus-plain',
    go: 'devicon-go-plain',
    golang: 'devicon-go-plain',
    rust: 'devicon-rust-plain',
    php: 'devicon-php-plain',
    ruby: 'devicon-ruby-plain',
    swift: 'devicon-swift-plain',
    kotlin: 'devicon-kotlin-plain',
    scala: 'devicon-scala-plain',
    elixir: 'devicon-elixir-plain',
    // Frontend Frameworks
    react: 'devicon-react-original',
    'react.js': 'devicon-react-original',
    nextjs: 'devicon-nextjs-original',
    'next.js': 'devicon-nextjs-original',
    next: 'devicon-nextjs-original',
    vue: 'devicon-vuejs-plain',
    'vue.js': 'devicon-vuejs-plain',
    angular: 'devicon-angularjs-plain',
    svelte: 'devicon-svelte-plain',
    // Backend Frameworks
    node: 'devicon-nodejs-plain',
    nodejs: 'devicon-nodejs-plain',
    'node.js': 'devicon-nodejs-plain',
    express: 'devicon-express-original',
    django: 'devicon-django-plain',
    flask: 'devicon-flask-original',
    spring: 'devicon-spring-plain',
    '.net': 'devicon-dot-net-plain',
    dotnet: 'devicon-dot-net-plain',
    laravel: 'devicon-laravel-plain',
    // Web & Styling
    html: 'devicon-html5-plain',
    html5: 'devicon-html5-plain',
    css: 'devicon-css3-plain',
    css3: 'devicon-css3-plain',
    sass: 'devicon-sass-original',
    tailwindcss: 'devicon-tailwindcss-plain',
    tailwind: 'devicon-tailwindcss-plain',
    // Databases
    sql: 'devicon-azuresql-plain',
    postgresql: 'devicon-postgresql-plain',
    postgres: 'devicon-postgresql-plain',
    mysql: 'devicon-mysql-plain',
    mongodb: 'devicon-mongodb-plain',
    redis: 'devicon-redis-plain',
    firebase: 'devicon-firebase-plain',
    // DevOps & Cloud
    docker: 'devicon-docker-plain',
    kubernetes: 'devicon-kubernetes-plain',
    k8s: 'devicon-kubernetes-plain',
    aws: 'devicon-amazonwebservices-original',
    gcp: 'devicon-googlecloud-plain',
    azure: 'devicon-azure-plain',
    git: 'devicon-git-plain',
    github: 'devicon-github-original',
    terraform: 'devicon-terraform-plain',
    jenkins: 'devicon-jenkins-line',
    ansible: 'devicon-ansible-plain',
    // Testing
    jest: 'devicon-jest-plain',
    mocha: 'devicon-mocha-plain',
};

interface MappedTech {
  name: string;
  iconClass: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, technologies, title, justification }) => {
  const renderedIconClasses = new Set<string>();
  const uniqueTechs: MappedTech[] = [];

  technologies.forEach(tech => {
    const normalizedTech = tech.trim().toLowerCase();
    const iconClass = techIconMap[normalizedTech];

    if (iconClass && !renderedIconClasses.has(iconClass)) {
      renderedIconClasses.add(iconClass);
      uniqueTechs.push({ name: tech, iconClass });
    }
  });

  return (
    <div className="flex flex-col items-center justify-center my-6">
        <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
            <h3 className="text-lg font-semibold text-purple-300">{title}</h3>
            {uniqueTechs.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                  {uniqueTechs.map(({ name, iconClass }) => (
                      <i key={name} className={`${iconClass} text-2xl text-gray-400`} title={name}></i>
                  ))}
              </div>
            )}
        </div>
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <Star key={index} filled={index < rating} />
            ))}
        </div>
        {justification && (
            <p className="text-xs text-gray-500 mt-2 italic">
                {justification}
            </p>
        )}
    </div>
  );
};

export default StarRating;