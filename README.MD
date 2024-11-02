# Structure
├── app                :backend         
│   ├── node_modules       
│   ├── .env               
│   ├── .gitignore         
│   ├── app.js             :use mongoDB, express, cors
│   ├── package-lock.json  
│   ├── package.json       
│   └── README.md          
└── view               :frontend     
    ├── .vscode            
    ├── node_modules       
    ├── src                
    |── theme              
    ├── .editorconfig          
    ├── .gitignore             
    ├── .jshintrc              
    ├── gulpfile.js            
    ├── LICENSE                
    ├── netlify.toml           
    ├── package-lock.json      
    ├── package.json           
    ├── README.md              
    ├── tailwind.config.js     
    ├── vercel-build.sh        
    └── vercel.json        


Node.js (ver >= 14.x)
Gulp to build
Netlify or Vercel

# Backend: 
cd app
npm install

cd app
npm start //host in port 5000

# Frontend: 
cd ../view
npm install

cd ../view
npm run dev / npm run build // host in port 3000

Netlify
Netlify.toml to deploy on Netlify.

Vercel
Vercel.json and script vercel-build.sh to deploy on Vercel.
