# npm install --prefix frontend && CI=false npm run build --prefix frontend && pip install -r requirements.txt && pip install psycopg2 && python backend/manage.py migrate && mkdir frontend/build/root && for file in $(ls frontend/build | grep -E -v '^(index\.html|static|root)$'); do mv "frontend/build/$file" frontend/build/root; done && python backend/manage.py collectstatic --no-input
