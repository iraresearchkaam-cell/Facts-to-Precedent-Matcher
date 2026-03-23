TO UPDATE ON THE GIT
git status
git add app.py db/ OR
git add .
git commit -m "name"
git push

TO UPDATE LOCAL CODE FROM THE GIT
git pull

git config user.name

ORRR =================ORRRR

Create file in your project:

touch deploy.sh
chmod +x deploy.sh

Paste:

#!/bin/bash

echo "🔄 Adding changes..."
git add .

echo "📝 Commit message:"
read msg

git commit -m "$msg"

echo "🚀 Pushing to GitHub..."
git push origin main

echo "✅ Done!"

Now just run:

./deploy.sh
