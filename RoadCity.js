class CityGraph {
    constructor() {
      this.graph = {};
    }
  
    addRoad(city1, city2, price) {
      if (!this.graph[city1]) this.graph[city1] = {};
      if (!this.graph[city2]) this.graph[city2] = {};
      this.graph[city1][city2] = price;
      this.graph[city2][city1] = price;  // Если дорога двусторонняя
    }
  
    findShortestPath(start, end) {
      const distances = {};
      const visited = new Set();
      const queue = [];
  
      // Инициализация расстояний
      for (let city in this.graph) {
        distances[city] = Infinity;
      }
      distances[start] = 0;
      queue.push(start);
  
      while (queue.length > 0) {
        const city = queue.shift();
        if (visited.has(city)) continue;
  
        visited.add(city);
        for (let neighbor in this.graph[city]) {
          const newDist = distances[city] + this.graph[city][neighbor];
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            queue.push(neighbor);
          }
        }
      }
  
      return distances[end] === Infinity ? "undefined" : distances[end];
    }
  }
  
  
  const graph = new CityGraph();
  graph.addRoad('CityA', 'CityB', 10);
  graph.addRoad('CityB', 'CityC', 20);
  graph.addRoad('CityA', 'CityC', 15);
  
  console.log(graph.findShortestPath('CityA', 'CityC'));  // Выведет 15
  console.log(graph.findShortestPath('CityA', 'CityD'));  // Выведет "undefined"
  