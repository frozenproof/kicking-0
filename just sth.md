git init
git remote add origin https://github.com/frozenproof/kicking-0.git
git branch -M main
git push -u origin main

git add .
git commit -m "Initial commit"
git push -u origin main

git config --global user.name "frozenproof"
git config --global user.email "trucling222@gmail.com"

npm config set cache "./node_cache" --global
