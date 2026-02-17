
echo "Starting Energy Simulation Environment..."

docker compose down

docker compose build

docker compose up -d

echo "Environment started successfully"

echo ""
echo "Web: http://localhost:3000"
echo "API: http://localhost:5500"
echo ""
